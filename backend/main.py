from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pydantic.networks import EmailStr
from typing import Optional
import os
from datetime import datetime, timedelta
from jose import JWTError, jwt
import bcrypt

app = FastAPI(title="AI Doctor API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Config
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")

# Initialize groq_client with error handling
groq_client = None
if GROQ_API_KEY and GROQ_API_KEY.strip():
    try:
        from groq import Groq
        groq_client = Groq(api_key=GROQ_API_KEY)
        print("Groq client initialized successfully")
    except ImportError:
        print("Groq library not available")
    except Exception as e:
        print(f"Failed to initialize Groq client: {e}")
else:
    print("No GROQ_API_KEY provided, AI functionality will be disabled")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")
users_db = {}

# Models
class User(BaseModel):
    username: str
    email: EmailStr
    full_name: Optional[str] = None

class UserInDB(User):
    hashed_password: str

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    full_name: Optional[str] = None

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

# Auth functions
def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode('utf-8'), hashed.encode('utf-8'))

def get_password_hash(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def create_access_token(data: dict):
    to_encode = data.copy()
    # Use timezone-aware datetime to avoid deprecation warning
    expire = datetime.now() + timedelta(minutes=30)
    to_encode.update({"exp": expire.timestamp()})
    return jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        username: str = payload.get("sub")
        if username is None or username not in users_db:
            raise HTTPException(status_code=401)
        return users_db[username]
    except JWTError:
        raise HTTPException(status_code=401)

# Routes
@app.get("/")
def root():
    return {"message": "AI Doctor API", "version": "2.0.0", "status": "production"}

@app.get("/health")
def health():
    return {"status": "healthy", "groq": "connected" if groq_client else "not configured"}

@app.post("/api/v1/auth/register", response_model=User)
def register(user: UserCreate):
    if user.username in users_db:
        raise HTTPException(status_code=400, detail="Username already exists")

    hashed = get_password_hash(user.password)
    user_in_db = UserInDB(
        username=user.username,
        email=user.email,
        full_name=user.full_name,
        hashed_password=hashed
    )
    users_db[user.username] = user_in_db
    return User(username=user.username, email=user.email, full_name=user.full_name)

@app.post("/api/v1/auth/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = users_db.get(form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect credentials")

    token = create_access_token(data={"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}

@app.get("/api/v1/auth/me", response_model=User)
def get_me(current_user: UserInDB = Depends(get_current_user)):
    return User(username=current_user.username, email=current_user.email, full_name=current_user.full_name)

@app.post("/api/v1/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, current_user: UserInDB = Depends(get_current_user)):
    if not groq_client:
        raise HTTPException(status_code=500, detail="AI service not configured")

    try:
        completion = groq_client.chat.completions.create(
            model="llama-3.1-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful medical AI assistant. Provide educational health information only. Never diagnose. Always recommend consulting healthcare professionals for medical concerns."
                },
                {
                    "role": "user",
                    "content": request.message
                }
            ],
            temperature=0.7,
            max_tokens=1024,
        )

        response_text = completion.choices[0].message.content

        disclaimer = "\n\n⚠️ **MEDICAL DISCLAIMER**: This information is for educational purposes only. Always consult healthcare professionals for medical advice."

        return ChatResponse(response=response_text + disclaimer)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
