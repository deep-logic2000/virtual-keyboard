import {
  FIRST_ROW,
  SECOND_ROW,
  THIRD_ROW,
  FOURTH_ROW,
  FIFTH_ROW,
} from "../constants.js";

class Keyboard {
  constructor() {
    this.lang = "en";
    this.wrapper = document.body;
  }

  set language(value) {
    this.lang = value;
  }

  get language() {
    return this.lang;
  }

  createButton(buttonObj) {
    const buttonIsLarge = buttonObj.code === "Backspace" || buttonObj.code === "CapsLock" || buttonObj.code === "ShiftLeft";
    const buttonIsMedium = buttonObj.code === "Enter" || buttonObj.code === "ShiftRight";
    const buttonIsTab = buttonObj.code === "Tab";
    this.buttonWrapper = document.createElement("div");
    this.buttonWrapper.classList.add("key");
    if (buttonIsLarge) this.buttonWrapper.classList.add("key-l");
    if (buttonIsMedium) this.buttonWrapper.classList.add("key-m");
    if (buttonIsTab) this.buttonWrapper.classList.add("key-tab");
    this.buttonWrapper.setAttribute("id", `${buttonObj.code}`);
    this.buttonWrapper.insertAdjacentHTML(
      "afterbegin",
      `
    <span class="en" ${this.lang === "en" ? "" : "hidden"}>
      <span class="caseDown">${buttonObj.caseDown}</span>
      <span class="caseUp" hidden>${buttonObj.caseUp}</span>
      <span class="caps" hidden>${buttonObj.caseUp}</span>
      <span class="shiftCaps" hidden>${buttonObj.caseDown}</span>
    </span>
    <span class="ru" ${this.lang === "en" ? "hidden" : ""}>
      <span class="caseDown">${buttonObj.caseDownRu}</span>
      <span class="caseUp" hidden>${buttonObj.caseUpRu}</span>
      <span class="caps" hidden>${buttonObj.caseUpRu}</span>
      <span class="shiftCaps" hidden>${buttonObj.caseDownRu}</span>
    </span>
    `,
    );
    return this.buttonWrapper;
  }

  createRow(rowObj) {
    this.row = document.createElement("div");
    this.row.classList.add("row");

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < rowObj.length; i++) {
      const element = this.createButton(rowObj[i]);
      this.row.append(element);
    }
    return this.row;
  }

  render() {
    const section = document.createElement("section");
    section.setAttribute("id", "section-main");

    const container = document.createElement("div");
    container.classList.add("container");

    const title = document.createElement("h1");
    title.innerHTML = "Virtual Keyboard";
    title.classList.add("title");

    const textArea = document.createElement("textarea");
    textArea.setAttribute("id", "keyboard-screen");
    textArea.setAttribute("name", "keyboard-screen");
    textArea.setAttribute("rows", "10");
    textArea.setAttribute("cols", "50");
    textArea.setAttribute("autofocus", "");
    textArea.classList.add("text");

    const keyboardWrapper = document.createElement("div");
    keyboardWrapper.classList.add("keyboard");

    container.append(title);
    container.append(textArea);

    this.firstRow = this.createRow(FIRST_ROW);
    this.secondRow = this.createRow(SECOND_ROW);
    this.thirdRow = this.createRow(THIRD_ROW);
    this.fourthRow = this.createRow(FOURTH_ROW);
    this.fifthRow = this.createRow(FIFTH_ROW);

    keyboardWrapper.append(this.firstRow);
    keyboardWrapper.append(this.secondRow);
    keyboardWrapper.append(this.thirdRow);
    keyboardWrapper.append(this.fourthRow);
    keyboardWrapper.append(this.fifthRow);

    container.append(keyboardWrapper);
    section.append(container);
    this.wrapper.append(section);
  }
}

const keyboard = new Keyboard();
export { keyboard, Keyboard };
