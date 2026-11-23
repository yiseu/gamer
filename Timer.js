// The frame-count timer pattern from the gba demo.
class Timer {
  constructor() {
    this.f = 0;
  }

  start(seconds) {
    this.f = seconds * 60;
  }

  tick() {
    if (this.f > 0) {
      this.f--;
    }
  }

  isEnded() {
    return this.f <= 0;
  }
}
