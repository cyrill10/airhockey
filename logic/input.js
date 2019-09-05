export default class InputHandler {
  constructor(canvas, paddle) {
    document.addEventListener(
      "mousemove",
      event => {
        var relativeY = event.clientY - canvas.offsetLeft;
        if (relativeY > 0 && relativeY < canvas.height) {
          paddle.update(relativeY);
        }
      },
      false
    );
  }
}
