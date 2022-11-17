$(window).ready(function () {
  var canvas,
    ctx,
    playerX,
    playerY,
    player_steps = 10, // steps for the player to move by
    width = 10, // width of the player
    height = 10; // height of the player

  init();

  function init() {
    canvas = $('#my_canvas');
    ctx = canvas[0].getContext('2d');
    playerX = canvas.width() / 2;
    playerY = canvas.height() / 2;

    window.addEventListener('keydown', update, false);
    render();
  }

  function update(event) {
    clear();

    if (event.key == 'ArrowLeft') {
      playerX -= player_steps; // going left
    }
    if (event.key == 'ArrowRight') {
      playerX += player_steps; // going right
    }

    render();
  }

  function clear() {
    ctx.clearRect(playerX, playerY, width, height);
  }

  function render() {
    ctx.fillRect(playerX, playerY, width, height);
  }
});
