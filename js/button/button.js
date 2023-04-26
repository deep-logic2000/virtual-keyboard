class Button {
  constructor(buttonObj, lang) {
    this.buttonObj = buttonObj;
    this.lang = lang;
    this.textArea = document.querySelector(".text");
  }

  createButton() {
    const buttonIsLarge =
      this.buttonObj.code === "Backspace" ||
      this.buttonObj.code === "CapsLock" ||
      this.buttonObj.code === "ShiftLeft";
    const buttonIsMedium =
      this.buttonObj.code === "Enter" || this.buttonObj.code === "ShiftRight";
    const buttonIsTab = this.buttonObj.code === "Tab";
    this.buttonWrapper = document.createElement("div");
    this.buttonWrapper.classList.add("key");
    if (buttonIsLarge) this.buttonWrapper.classList.add("key-l");
    if (buttonIsMedium) this.buttonWrapper.classList.add("key-m");
    if (buttonIsTab) this.buttonWrapper.classList.add("key-tab");
    this.buttonWrapper.setAttribute("id", `${this.buttonObj.code}`);
    this.buttonWrapper.insertAdjacentHTML(
      "afterbegin",
      `
      <span class="en" ${this.lang === "en" ? "" : "hidden"}>
        <span class="caseDown">${this.buttonObj.caseDown}</span>
        <span class="caseUp" hidden>${this.buttonObj.caseUp}</span>
        <span class="caps" hidden>${this.buttonObj.caseUp}</span>
        <span class="shiftCaps" hidden>${this.buttonObj.caseDown}</span>
      </span>
      <span class="ru" ${this.lang === "en" ? "hidden" : ""}>
        <span class="caseDown">${this.buttonObj.caseDownRu}</span>
        <span class="caseUp" hidden>${this.buttonObj.caseUpRu}</span>
        <span class="caps" hidden>${this.buttonObj.caseUpRu}</span>
        <span class="shiftCaps" hidden>${this.buttonObj.caseDownRu}</span>
      </span>
      `
    );
    return this.buttonWrapper;
  }

  changeColor(event) {
    this.pressedKey = document.getElementById(`${event.code}`);
    this.pressedKey.classList.add("active");
    this.pressedKey.style.backgroundColor = "rgb(88, 182, 88)";
  }

  removeColor(event) {
    this.pressedKey = document.getElementById(`${event.code}`);
    this.pressedKey.classList.remove("active");
    this.pressedKey.style.backgroundColor = "";
  }

  pressShiftDown() {
    this.keysDown = document.querySelectorAll(".caseDown");
    this.keysUp = document.querySelectorAll(".caseUp");
    this.keysDown.forEach((key) => {
      key.setAttribute("hidden", "true");
    });
    this.keysUp.forEach((key) => {
      key.removeAttribute("hidden");
    });
  }

  keyShiftUp() {
    this.keysDown = document.querySelectorAll(".caseDown");
    this.keysUp = document.querySelectorAll(".caseUp");
    this.keysDown.forEach((key) => {
      key.removeAttribute("hidden");
    });
    this.keysUp.forEach((key) => {
      key.setAttribute("hidden", "true");
    });
  }
}

const keyboardButton = new Button();
export { keyboardButton, Button };
