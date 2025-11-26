
// Agregar animaciones personalizadas
module.exports.theme.extend.animation = {
  ...module.exports.theme.extend.animation,
  'blob': 'blob 7s infinite',
}

module.exports.theme.extend.keyframes = {
  ...module.exports.theme.extend.keyframes,
  blob: {
    '0%': { transform: 'translate(0px, 0px) scale(1)' },
    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
    '100%': { transform: 'translate(0px, 0px) scale(1)' },
  },
}
