(function () {
  const maxWidth = 3840

  const shadeBase_R = 13
  const shadeBase_G = 52
  const shadeBase_B = 87

  const colorVariance = 0.095

  const textString = 'loading'

  let alpha = 10;

  let fillerRemoved = false

  let ctx;
  let canvas;
  let width
  let height
  let squareSize
  let fontSize
  let x_squares
  let y_squares
  let callback

  ready(function () {
    updateDimensions()

    canvas = document.getElementById('c');

    updateCanvasSize()

    ctx = canvas.getContext('2d');

    window.addEventListener('orientationchange', screenChange);
    window.addEventListener('resize', screenChange);
    if (screen && screen.addEventListener) {
      screen.addEventListener('orientationchange', screenChange);
    }

    window.__stop_loader = function (_callback) {
      callback = _callback
      alpha = 1
    }

    fadeOut();
  })

  function screenChange() {
    window.setTimeout(() => {
      updateDimensions()
      updateCanvasSize()
    }, 100)
  }

  function updateDimensions() {
    width = window.innerWidth || document.documentElement.clientWidth ||
      document.body.clientWidth;
    height = window.innerHeight || document.documentElement.clientHeight ||
      document.body.clientHeight;

    squareSize = Math.floor(100 * (((width > maxWidth) ? maxWidth : width) / maxWidth))
    fontSize = Math.floor(50 + 150 * (((width > maxWidth) ? maxWidth : width) / maxWidth))

    x_squares = Math.ceil(width / squareSize)
    y_squares = Math.ceil(height / squareSize)
  }

  function updateCanvasSize() {
    canvas.width = width
    canvas.height = height
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  }

  function ready(callbackFunc) {
    if (document.readyState !== 'loading') {
      callbackFunc();
    } else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', callbackFunc);
    }
  }

  function rndColorBit(bit) {
    return bit + (Math.random() * colorVariance * (255 - bit))
  }

  function clearScreen() {
    ctx.globalAlpha = alpha;
    ctx.clearRect(0, 0, width, height);
  }

  function fadeOut() {
    if (alpha <= 1 && fillerRemoved === false) {
      const filler = document.getElementById('d');
      filler.parentNode.removeChild(filler);
      document.body.style.overflow = 'auto'
      fillerRemoved = true
    }

    if (alpha < 0) {
      alpha = 0

      clearScreen()

      canvas.parentNode.removeChild(canvas);

      callback()

      return;
    }

    clearScreen()

    for (let i = 0; i < y_squares; i += 1) {
      for (let j = 0; j < x_squares; j += 1) {
        ctx.fillStyle = `rgba(${rndColorBit(shadeBase_R)}, ${rndColorBit(shadeBase_G)}, ${rndColorBit(shadeBase_B)}, ${alpha})`;
        ctx.fillRect(squareSize * j, squareSize * i, squareSize, squareSize);
      }
    }

    ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 1.8})`;
    ctx.strokeStyle = `rgba(0, 0, 0, ${alpha * 1.8})`;
    ctx.font = `normal bold ${fontSize}px Arial`;

    const textWidth = ctx.measureText(textString).width;

    ['fillText', 'strokeText'].forEach((method) => {
      ctx[method](textString, (width / 2) - (textWidth / 2), (height / 2) + 25)
    })

    if (alpha <= 1) {
      alpha -= 0.01;
    }

    requestAnimationFrame(fadeOut);
  }
}());
