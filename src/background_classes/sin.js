const draw = require("../helpers/draw");
class Sin {
  constructor(
    context,
    canvas,
    maxAmplitude = 150,
    wavelength = 200,
    y_position = this.canvas.height / 2,
    frequency = 0.017,
    angle = 0,
    color = { r: 0, g: 100, b: 100, a: 0.01 },
    start_from_zero = true
  ) {
    (this.canvas = canvas),
      (this.context = context),
      (this.maxAmplitude = maxAmplitude),
      (this.wavelength = wavelength),
      (this.y_position = y_position - maxAmplitude / 2);
    (this.frequency = frequency),
      (this.angle = angle),
      (this.start_from_zero = start_from_zero);
    this.x_position;
    this.color = color;
    if (start_from_zero) {
      this.x_position = 0;
    } else {
      this.x_position = this.canvas.width;
    }
  }
  rotateCoordinates(x, y) {
    const angleRadians = (this.angle * Math.PI) / 180;
    const xShifted = x - this.x_position;
    const yShifted = y - this.y_position;
    const xRotated =
      xShifted * Math.cos(angleRadians) -
      yShifted * Math.sin(angleRadians) +
      this.x_position;
    const yRotated =
      xShifted * Math.sin(angleRadians) + yShifted * Math.cos(angleRadians);
    const yTranslatedBack = yRotated + this.y_position;
    return { x: xRotated, y: yTranslatedBack };
  }
  calculateY(x, increment) {
    return (
      this.y_position -
      Math.sin(x / this.wavelength + increment) *
        this.maxAmplitude *
        Math.sin(increment)
    );
  }
  sinWave(increment) {
    const x_position = this.canvas.width;
    const { r, g, b, a } = this.color;
    this.context.strokeStyle = `rgba(${r},${g},${b},${a})`;
    this.context.beginPath();
    // increment = 100;
    const max_x =
      this.canvas.width / Math.cos((this.angle * Math.PI) / 180) +
      2 * this.maxAmplitude * Math.cos((this.angle * Math.PI) / 180);

    for (
      let x =
        this.angle == 0
          ? 0
          : ((-this.maxAmplitude / Math.sin((this.angle * Math.PI) / 180)) *
              this.angle) /
            Math.abs(this.angle);
      x < max_x;
      x += 30
    ) {
      const x_coord = x;
      const y_coord = this.calculateY(x, increment);
      const finalX = this.rotateCoordinates(x_coord, y_coord).x;
      const finalY = this.rotateCoordinates(x_coord, y_coord).y;

      draw(finalX, finalY, this.context);
    }
    for (let x = max_x - 30; x < max_x; x += 1) {
      const x_coord = x;
      const y_coord = this.calculateY(x, increment);
      const finalX = this.rotateCoordinates(x_coord, y_coord).x;
      const finalY = this.rotateCoordinates(x_coord, y_coord).y;
      draw(finalX, finalY, this.context);
    }
  }
}
module.exports = Sin;
