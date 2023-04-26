import {
  FIRST_ROW,
  SECOND_ROW,
  THIRD_ROW,
  FOURTH_ROW,
  FIFTH_ROW,
  keysNotCapsLockedEn,
  keysNotCapsLockedRu,
} from "../constants.js";
import { Button, keyboardButton } from "../button/button.js";
import { setLocalStorage, getLocalStorage } from "../localStorage.js";

class Keyboard {
  constructor() {
    this.lang = "en";
    this.wrapper = document.body;
    this.textArea = document.querySelector(".text");
    this.isCapsLockPressed = false;
    this.isShiftPressed = false;
    this.isAltPressed = false;
    this.isControlPressed = false;
  }

  set language(value) {
    this.lang = value;
  }

  get language() {
    return this.lang;
  }

  createRow(rowObj) {
    this.row = document.createElement("div");
    this.row.classList.add("row");

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < rowObj.length; i++) {
      const element = new Button(rowObj[i], this.lang);
      const newElement = element.createButton();
      this.row.append(newElement);
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
    textArea.setAttribute("autofocus", "true");
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

    keyboardWrapper.addEventListener(
      "mousedown",
      this.handleMouseDown.bind(this)
    );

    keyboardWrapper.addEventListener("mouseup", this.handleMouseUp.bind(this));

    container.append(keyboardWrapper);
    section.append(container);
    this.wrapper.append(section);
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  handleKeyUp(event) {
    const key = event.code;
    if (key === "CapsLock") return;
    if (key === "ShiftLeft" || key === "ShiftRight") {
      keyboardButton.keyShiftUp();
      this.isShiftPressed = false;
    }
    if (key === "AltLeft") {
      this.isAltPressed = false;
    }

    if (key === "ControlLeft") {
      this.isControlPressed = false;
    }
    // if (event.code === "CapsLock") {
    //   this.isCapsLockPressed = false;
    //   keyboardButton.removeColor(event);
    // }
    keyboardButton.removeColor(event);
  }

  changeLanguage() {
    const enElements = document.querySelectorAll(".en");
    const ruElements = document.querySelectorAll(".ru");
    if (this.lang === "en") {
      this.lang = "ru";
      enElements.forEach((element) => {
        element.setAttribute("hidden", true);
      });
      ruElements.forEach((element) => {
        element.removeAttribute("hidden");
      });
      setLocalStorage("lang", "ru");
    } else {
      this.lang = "en";
      enElements.forEach((element) => {
        element.removeAttribute("hidden");
      });
      ruElements.forEach((element) => {
        element.setAttribute("hidden", true);
      });
      setLocalStorage("lang", "en");
    }
  }

  handleKeyDown(event) {
    const key = event.code;
    if (key === "ShiftLeft" || key === "ShiftRight") {
      keyboardButton.pressShiftDown();
      this.isShiftPressed = true;
    }

    if (key === "Tab") {
      event.preventDefault();
    }
    if (key !== "CapsLock") {
      keyboardButton.changeColor(event);
    }

    if (key === "AltLeft") {
      event.preventDefault();
      this.isAltPressed = true;
    }

    if (key === "ControlLeft") {
      event.preventDefault();
      this.isControlPressed = true;
    }

    if (
      (key === "ControlLeft" && this.isAltPressed) ||
      (key === "AltLeft" && this.isControlPressed)
    ) {
      this.changeLanguage();
      // return;
    }
    // console.log(key);

    // if (key === "CapsLock" && !event.repeat) {
    //   const lowerCaseLetters = Array.from(
    //     document.querySelectorAll(".caseDown"),
    //   ).filter((el) => (this.lang === "en"
    //     ? !keysNotCapsLockedEn.includes(el.parentElement.parentElement.id)
    //     : !keysNotCapsLockedRu.includes(el.parentElement.parentElement.id)));
    //   const upperCaseLetters = Array.from(
    //     document.querySelectorAll(".caseUp"),
    //   ).filter((el) => (this.lang === "en"
    //     ? !keysNotCapsLockedEn.includes(el.parentElement.parentElement.id)
    //     : !keysNotCapsLockedRu.includes(el.parentElement.parentElement.id)));
    //   // console.log("document.querySelectorAll('.caseDown')", document.querySelectorAll(".caseDown"));
    //   // console.log("lowerCaseButtons", lowerCaseButtons);
    //   // const upperCaseButtons = document.querySelectorAll(".caseUp");
    //   if (!this.isCapsLockPressed) {
    //     keyboardButton.changeColor(event);
    //     this.isCapsLockPressed = true;
    //     lowerCaseLetters.forEach((elem) => elem.setAttribute("hidden", "true"));
    //     upperCaseLetters.forEach((elem) => elem.removeAttribute("hidden"));
    //   } else {
    //     this.isCapsLockPressed = false;
    //     keyboardButton.removeColor(event);
    //     lowerCaseLetters.forEach((elem) => elem.removeAttribute("hidden"));
    //     upperCaseLetters.forEach((elem) => elem.setAttribute("hidden", "true"));
    //   }
    // }
  }

  getCaretPosition(textAreaElement) {
    this.caretPos = 0;
    if (document.selection) {
      textAreaElement.focus();
      const selection = document.selection.createRange();
      selection.moveStart("character", -textAreaElement.value.length);
      this.caretPos = selection.text.length;
    } else if (
      textAreaElement.selectionStart ||
      textAreaElement.selectionStart === "0"
    ) {
      this.caretPos = textAreaElement.selectionStart;
    }
    return this.caretPos;
  }

  handleMouseDown(event) {
    console.log("this", this);
    const ativeKeyElement =
      event.target.nodeName === "DIV"
        ? event.target.querySelector("span span:not([hidden])")
        : event.target;

    const key = ativeKeyElement.closest("div");
    console.log("key", key);

    const textArea = document.getElementById("keyboard-screen");
    if (key.id === "Backspace") {
      const position = this.getCaretPosition(textArea);
      if (position < 1) return;

      textArea.value =
        textArea.value.substr(0, position - 1) +
        textArea.value.substr(position);
      textArea.selectionStart = position - 1;
      textArea.focus();
      return;
    }
    if (key.id === "Tab") {
      textArea.value += "    ";
      return;
    }
    if (key.id === "Delete") {
      const position = this.getCaretPosition(textArea);
      textArea.value =
        textArea.value.substr(0, position) +
        textArea.value.substr(position + 1);
      textArea.selectionStart = position;
      textArea.focus();
      return;
    }

    if (key.id === "ShiftLeft" || key.id === "ShiftRight") {
      keyboardButton.pressShiftDown();
      this.isShiftPressed = true;
      return;
    }

    textArea.value += ativeKeyElement.innerHTML;
    // console.log("textArea.focus()");
    textArea.focus();
  }

  handleMouseUp(event) {
    const ativeKeyElement =
      event.target.nodeName === "DIV"
        ? event.target.querySelector("span span:not([hidden])")
        : event.target;

    const key = ativeKeyElement.closest("div");
    if (key.id === "ShiftLeft" || key.id === "ShiftRight") {
      keyboardButton.keyShiftUp();
      this.isShiftPressed = false;
      // return;
    }
  }
}

const keyboard = new Keyboard();
export { keyboard, Keyboard };
