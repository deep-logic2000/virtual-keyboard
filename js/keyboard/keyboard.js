class Keyboard {
  constructor() {
    this.lang = "en";
  }

  set language(value) {
    this.lang = value;
  }

  get language() {
    return this.lang;
  }
}

const keyboard = new Keyboard();
console.log(keyboard.lang);
export { keyboard, Keyboard };
