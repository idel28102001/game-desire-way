import { el, setChildren } from "redom";
import { makeApp } from "./card.js";
import { resetNew, getStrLocal, update } from "./randoms";
import { createStartedSecond } from "./tips.js";
import { createModalCurr } from "./create";
//makeApp()
export function app(telegramBot) {
  return mainPage(telegramBot);
}

function madeBehave(array, cls, cond = true) {
  array.forEach((e) => {
    if (cond) {
      e.classList.add(cls);
    } else {
      e.classList.remove(cls);
    }
  });
}

function mmoveElements(array, behave) {
  array.forEach((e) => {
    e.style.left = behave;
  });
}

function createSecondOne() {
  const { popup: popup1 } = createModalCurr("popup", "Заголовок", "Текст");
  const { popup: popup2 } = createModalCurr("popup2", "Заголовок", "Текст");
  const arr = [popup1, popup2];
  const line = el("div.line");
  let vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  const element = el("div.second-one");
  element.style.left = `${-vw}px`;
  if (popup1) {
    popup1.style.left = `${-vw}px`;
  }
  document.body.appendChild(line);
  let xElemStart = 0;
  let xElemCurr = 0;
  const conds = {};
  ["touchstart", "click"].forEach((currE) => {
    line.addEventListener(currE, (start) => {
      switch (currE) {
        case "touchstart":
          xElemStart = start.touches[0]["clientX"];
          break;
        case "click":
          xElemStart = start.clientX;
          conds["Левая сторона"] = Math.abs(xElemStart) <= vw / 5;
          break;
      }
    });
  });

  getStartedDict(conds);
  element.append(...arr);

  window.addEventListener("resize", (e) => {
    line.classList.add("line-drag");
    vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    xElemCurr = 0;
    xElemStart = Number(line.style.left.slice(0, -2))
      ? -Number(line.style.left.slice(0, -2))
      : Number(line.style.left.slice(0, -2));
    getStartedDict(conds);
    if (conds["Вправо"]) {
      if (conds["Уперлись"] || !conds["Левая сторона"]) {
        createSits("Прижать вправо");
      } else {
        createSits("Двигать вправо");
      }
    } else {
      if (conds["Уперлись"] || conds["Левая сторона"]) {
        createSits("Прижать влево");
      } else {
        createSits("Двигать влево");
      }
    }
    line.classList.remove("line-drag");
  });

  function getStartedDict(conds) {
    conds["Вправо"] = xElemCurr >= 0;
    conds["Уперлись"] = Math.abs(xElemCurr) >= vw;
    conds["Пересекли"] = Math.abs(xElemCurr) >= vw / 5;
    conds["Левая сторона"] = Math.abs(xElemStart) <= vw / 5;
  }

  function createSits(sit) {
    element.classList.remove("second-one-drag");
    madeBehave(arr, "popup-drag", false);
    line.classList.remove("line-drag");
    switch (sit) {
      case "Прижать влево":
        element.classList.add("second-one-drag");
        madeBehave(arr, "popup-drag", true);
        line.classList.add("line-drag");

        element.style.left = `${-vw}px`;
        mmoveElements(arr, `${-vw}px`);
        line.style.left = 0;
        break;
      case "Прижать вправо":
        element.classList.add("second-one-drag");
        madeBehave(arr, "popup-drag", true);
        line.classList.add("line-drag");

        element.style.left = 0;
        mmoveElements(arr, 0);
        line.style.left = `${vw}px`;
        break;
      case "Двигать вправо":
        element.style.left = `${xElemCurr - vw}px`;
        mmoveElements(arr, `${xElemCurr - vw}px`);
        line.style.left = `${xElemCurr}px`;
        break;
      case "Двигать влево":
        element.style.left = `${xElemCurr}px`;
        mmoveElements(arr, `${xElemCurr}px`);
        line.style.left = `${vw + xElemCurr}px`;
        break;
    }
  }

  line.addEventListener("touchend", funcMove);
  line.addEventListener("click", () => {
    if (conds["Левая сторона"]) {
      createSits("Прижать вправо");
    } else {
      createSits("Прижать влево");
    }
  });

  line.addEventListener("touchmove", (eStart) => {
    xElemCurr = eStart.touches[0]["clientX"] - xElemStart;
    getStartedDict(conds);
    if (conds["Вправо"]) {
      if (conds["Уперлись"] || !conds["Левая сторона"]) {
        createSits("Прижать вправо");
      } else {
        createSits("Двигать вправо");
      }
    } else {
      if (conds["Уперлись"] || conds["Левая сторона"]) {
        createSits("Прижать влево");
      } else {
        createSits("Двигать влево");
      }
    }
  });

  function funcMove(end) {
    if (conds["Вправо"]) {
      if (conds["Пересекли"] || !conds["Левая сторона"]) {
        createSits("Прижать вправо");
      } else {
        createSits("Прижать влево");
      }
    } else {
      if (conds["Пересекли"]) {
        createSits("Прижать влево");
      } else {
        createSits("Прижать вправо");
      }
    }

    xElemStart = 0;
    xElemCurr = 0;
  }

  return { element, vw, arr, line };
}

export function mainPage(telegramBot) {
  let firstGame = document.querySelector(".first-game");
  if (!firstGame) {
    firstGame = el("div.first-game");
  }

  let secondGame = document.querySelector(".second-one");
  let vw, arr, line;

  if (!secondGame) {
    const dictCurr = createSecondOne();
    secondGame = dictCurr.element;
    vw = dictCurr.vw;
    arr = dictCurr.arr;
    line = dictCurr.line;
    document.body.append(secondGame);
  }
  document.body.append(firstGame);

  createStartedSecond(secondGame);

  const container = el("div.container2");
  const btns = el("div.main-buttons");

  const start = el("button.main-buttons__item start-button", {
    textContent: `Новая игра`,
  });
  const contin = el("button.main-buttons__item continue-button", {
    textContent: `Продолжить`,
  });
  const settings = el("button.main-buttons__item settings-button", {
    textContent: `Настройка`,
  });

  const modal = createModale(telegramBot);
  firstGame.appendChild(modal.elem);
  settings.addEventListener("click", () => {
    modal.elem.classList.add("black-back-active");
    modal.zoom.value = getStrLocal("zoomValue");
    modal.inpZ.checked = getStrLocal("zoomCheck");
    modal.inpM.checked = getStrLocal("mapCheck");
  });

  start.addEventListener("click", () => {
    if (confirm("Начать новую игру?")) {
      resetNew("leafs", 36);
      resetNew("maccards", 50);
      resetNew("emotions", 50);
      firstGame.innerHTML = "";
      localStorage.removeItem("currGame");
      firstGame.appendChild(makeApp());
    }
  });
  if (!localStorage.getItem("leafs")) {
    contin.classList.add("continue-button-disable");
  } else {
    contin.classList.remove("continue-button-disable");
  }

  contin.addEventListener("click", () => {
    firstGame.innerHTML = "";
    firstGame.appendChild(makeApp());
  });
  btns.append(start, contin, settings);
  container.append(btns);
  firstGame.append(container);
  return container;
}

function createModale(telegramBot) {
  const zoom = el("input.settings__input", {
    placeHolder: "Ссылка на трансляцию",
  });
  const bot = telegramBot;
  const newElem = el("span.settings__input", {
    textContent: `Бот : ${bot}`,
  });

  const newElemBot = el("div.settings__label", newElem);

  const block = el("div.block block-settings", { id: "block-modal" });
  const button = el("button.settings__button", { textContent: "Сохранить" });

  const inputZ = el("span.settings__slider round");

  const inputM = el("span.settings__slider round");

  const inpZoom = el("label.switch", [
    el("input.settings__inp-zoom", { type: "checkbox" }),
    inputZ,
  ]);
  const inpMap = el("label.switch", [
    el("input.settings__inp-map", { type: "checkbox" }),
    inputM,
  ]);

  zoom.addEventListener("input", () => {
    zoom.classList.remove("danger");
    if (!zoom.value) {
      inpZoom.firstChild.checked = false;
    }
  });

  inpZoom.addEventListener("click", (e) => {
    if (!zoom.value) {
      e.preventDefault();
      zoom.classList.add("danger");
    }
  });

  const divZ = el("div.settings__label", [
    el("span.setting__check-name", { textContent: "Отправлять ссылку" }),
    inpZoom,
  ]);
  const divM = el("div.settings__label", [
    el("span.setting__check-name", {
      textContent: "Отправлять маршрутный лист",
    }),
    inpMap,
  ]);

  block.append(
    el("div.settings", [
      el("label.settings__label", [
        el("span.settings__name", { textContent: "Ссылка" }),
        zoom,
      ]),
      newElemBot,
      divZ,
      divM,
      button,
    ])
  );

  button.addEventListener("click", () => {
    update(zoom.value, "zoomValue");
    update(inpZoom.firstChild.checked, "zoomCheck");
    update(inpMap.firstChild.checked, "mapCheck");
  });

  const cross = el("span.cross", { textContent: "x" });
  const elem = el("div.black-back", [block]);
  elem.append(cross);
  elem.addEventListener("click", (event) => {
    if (event._isClickWithinModal) return;
    elem.classList.remove("black-back-active");
  });

  block.addEventListener("click", (event) => {
    event._isClickWithinModal = true;
  });
  return {
    elem,
    zoom,
    inpZ: inpZoom.firstChild,
    inpM: inpMap.firstChild,
  };
}
