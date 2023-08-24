const sin = require("./background_classes/sin");
class AnimatedBg {
  constructor(canvas, height, width, bgColor, increment) {
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error("Expected a canvas element as the first argument");
    }
    if (!(typeof height === "number" && typeof width === "number")) {
      throw new Error(
        `Expected typeof height and width: number, got: ${typeof height}, ${typeof height}`
      );
    }
    if (
      !(
        typeof bgColor === "object" &&
        bgColor !== null &&
        "r" in bgColor &&
        "g" in bgColor &&
        "b" in bgColor
      )
    ) {
      throw new Error(`Expected a valid bgColor object with  keys: r, g, b`);
    } else if (
      !(
        Number.isInteger(bgColor.r) &&
        bgColor.r >= 0 &&
        bgColor.r <= 255 &&
        Number.isInteger(bgColor.g) &&
        bgColor.g >= 0 &&
        bgColor.g <= 255 &&
        Number.isInteger(bgColor.b) &&
        bgColor.b >= 0 &&
        bgColor.b <= 255
      )
    ) {
      throw new Error(
        `The keys r, g, b of the bgColor object must have a value between 0 and 255`
      );
    }
    this.canvas = canvas;
    this.canvas.height = height;
    this.canvas.width = width;
    this.bgColor = bgColor;
    this.context;
    this.increment = increment;
    this.frequency = 0.01;
  }
  init() {
    this.context = this.canvas.getContext("2d");
    this.context.fillStyle = `rgb(${this.bgColor.r},${this.bgColor.g},${this.bgColor.b})`;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fill();

    this.increment = 0;
  }
  // Trigger sinwave formation
  sinWaveBg(
    maxAmplitude,
    wavelength,
    y_position,
    frequency,
    angle,
    color,
    start_from_zero
  ) {
    const sinObj = new sin(
      this.context,
      this.canvas,
      maxAmplitude,
      wavelength,
      y_position,
      frequency,
      angle,
      color,
      start_from_zero
    );

    this.animate.bind(this)(sinObj);
  }
  animate(obj) {
    const self = this; // Store the reference to the current context
    const object = obj;
    self.increment = 0;
    function animationLoop() {
      object.sinWave(self.increment);

      requestAnimationFrame(animationLoop);
      self.context.fillStyle = `rgba(${self.bgColor.r},${self.bgColor.g},${self.bgColor.b},0.03)`;

      self.context.fillRect(0, 0, self.canvas.width, self.canvas.height);
      self.context.fill();
      self.increment += object.frequency;
    }

    animationLoop(); // Start the animation loop
  }
}
window.AnimatedBg = AnimatedBg;
