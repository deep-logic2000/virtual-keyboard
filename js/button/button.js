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
        <span class="caps" hidden>${this.buttonObj.capsEn}</span>
        <span class="shiftCaps" hidden>${this.buttonObj.capsShiftEn}</span>
      </span>
      <span class="ru" ${this.lang === "en" ? "hidden" : ""}>
        <span class="caseDown">${this.buttonObj.caseDownRu}</span>
        <span class="caseUp" hidden>${this.buttonObj.caseUpRu}</span>
        <span class="caps" hidden>${this.buttonObj.capsRu}</span>
        <span class="shiftCaps" hidden>${this.buttonObj.capsShiftRu}</span>
      </span>
      `
    );
    return this.buttonWrapper;
  }

  changeColor(event, isCapsLockPressed) {
    if (event.code === "CapsLock" && isCapsLockPressed) {
      this.removeColor(event);
      return;
    }
    this.pressedKey = document.getElementById(`${event.code}`);
    this.pressedKey.classList.add("active");
    this.pressedKey.style.backgroundColor = "rgb(88, 182, 88)";
  }

  removeColor(event) {
    this.pressedKey = document.getElementById(`${event.code}`);
    this.pressedKey.classList.remove("active");
    this.pressedKey.style.backgroundColor = "";
  }

  changeColorMouseEvent(key, isCapsLockPressed) {
    if (key.id === "CapsLock" && isCapsLockPressed) {
      this.removeColorMouseEvent(key);
      return;
    }
    this.key = key;
    this.key.classList.add("active");
    this.key.style.backgroundColor = "rgb(88, 182, 88)";
  }

  removeColorMouseEvent(key) {
    this.key = key;
    this.key.classList.remove("active");
    this.key.style.backgroundColor = "";
  }

  pressShiftDown(isCapsLockPressed) {
    this.keysDown = document.querySelectorAll(".caseDown");
    this.keysUp = document.querySelectorAll(".caseUp");
    this.keysCaps = document.querySelectorAll(".caps");
    this.keysCapsShift = document.querySelectorAll(".shiftCaps");
    this.keys = document.querySelectorAll(".key>span>span");
    this.keys.forEach((element) => {
      element.setAttribute("hidden", "true");
    });
    if (isCapsLockPressed) {
      this.keysCapsShift.forEach((key) => {
        key.removeAttribute("hidden");
      });
    } else {
      this.keysUp.forEach((key) => {
        key.removeAttribute("hidden");
      });
    }
  }

  keyShiftUp(isCapsLockPressed) {
    this.keysDown = document.querySelectorAll(".caseDown");
    this.keysUp = document.querySelectorAll(".caseUp");
    this.keysCaps = document.querySelectorAll(".caps");
    this.keys = document.querySelectorAll(".key>span>span");
    this.keys.forEach((element) => {
      element.setAttribute("hidden", "true");
    });
    if (!isCapsLockPressed) {
      this.keysDown.forEach((key) => {
        key.removeAttribute("hidden");
      });
    } else {
      this.keysCaps.forEach((key) => {
        key.removeAttribute("hidden");
      });
    }
  }

  pressCapsLockDown(isCapsLockPressed, isShiftPressed) {
    this.keysDown = document.querySelectorAll(".caseDown");
    this.keysUp = document.querySelectorAll(".caseUp");
    this.keysCapsShift = document.querySelectorAll(".shiftCaps");
    this.keysCaps = document.querySelectorAll(".caps");
    if (!isCapsLockPressed) {
      if (!isShiftPressed) {
        this.keysDown.forEach((key) => {
          key.setAttribute("hidden", "true");
        });
        this.keysCaps.forEach((key) => {
          key.removeAttribute("hidden");
        });
      } else {
        this.keysUp.forEach((key) => {
          key.setAttribute("hidden", "true");
        });
        this.keysCapsShift.forEach((key) => {
          key.removeAttribute("hidden");
        });
      }
    } else if (!isShiftPressed) {
      this.keysCaps.forEach((key) => {
        key.setAttribute("hidden", "true");
      });
      this.keysDown.forEach((key) => {
        key.removeAttribute("hidden");
      });
    } else {
      this.keysCapsShift.forEach((key) => {
        key.setAttribute("hidden", "true");
      });
      this.keysUp.forEach((key) => {
        key.removeAttribute("hidden");
      });
    }
  }
}

const keyboardButton = new Button();
export { keyboardButton, Button };
