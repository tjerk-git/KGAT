const lerp = (current, target, factor) =>
  current * (1 - factor) + target * factor;

class LoopingText {
  constructor(el) {
    this.el = el;
    this.lerp = { current: 0, target: 0 };
    this.interpolationFactor = 0.1;
    this.speed = 0.05;
    this.direction = -1; // -1 (to-left), 1 (to-right)
    this.isMouseOver = false;

    // Init
    this.el.style.cssText = `position: relative; display: inline-flex; white-space: nowrap;`;
    this.el.children[1].style.cssText = `position: absolute; left: ${100 * -this.direction
      }%;`;
    this.events();
    this.render();
  }

  events() {
    this.el.addEventListener("mouseover", () => {
      this.isMouseOver = true;
    });

    this.el.addEventListener("mouseout", () => {
      this.isMouseOver = false;
    });
  }

  animate() {
    if (!this.isMouseOver) {
      this.lerp.target += this.speed;
      this.lerp.current = lerp(
        this.lerp.current,
        this.lerp.target,
        this.interpolationFactor,
      );

      if (this.lerp.target > 100) {
        this.lerp.current -= this.lerp.target;
        this.lerp.target = 0;
      }

      const x = this.lerp.current * this.direction;
      this.el.style.transform = `translateX(${x}%)`;
    }
  }

  render() {
    this.animate();
    window.requestAnimationFrame(() => this.render());
  }
}

document
  .querySelectorAll(".loop-container")
  .forEach((el) => new LoopingText(el));
