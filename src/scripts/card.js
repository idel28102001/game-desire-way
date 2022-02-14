import { el, setChildren } from "redom";
import { links } from "./db";
import { resetNew, getArrayLocal, getNumber } from "./randoms";
import "babel-polyfill";
export function createCard(name, dict, items) {
  const token = `5284035313:AAE15tnvTYt5FAquffIzhWYVAWyTEb3WB_Y`;
  return el("div.card", [
    el("h3.card__heading", { textContent: name }),
    el("div.card__buttons buttons", [
      createBtn(token, dict.id, "Волшебное перо", "magicLeafs", {
        local: "leafs",
        elem: items.leafs,
      }),
      createBtn(token, dict.id, "Маккарта", `macCards`, {
        local: "maccards",
        elem: items.card,
      }),
      createBtn(token, dict.id, "Эмоция", "emotions", {
        local: "emotions",
        elem: items.emotions,
      }),
      createBtn(token, dict.id, "Цвет", "colors", { type: "colors" }),
      createBtn(token, dict.id, "Счастливчик", "happyOne"),
    ]),
  ]);
}

function createBtn(token, id, text, type = "", dict = {}) {
  const elem = el("button.buttons__item", { textContent: text });
  elem.addEventListener("click", () => {
    elem.innerHTML = "";
    elem.classList.add("buttons__item-disable");
    elem.append(el("div.loader"));
    if (type) {
      let number = 0;
      if (dict.local) {
        number = getNumber(dict.local);
      }
      if (dict.type) {
        number = Math.floor(Math.random() * 7);
      }
      sendPhoto(token, id, links[type][number], {
        elem,
        text,
        currElem: dict.elem,
        local: dict.local,
      });
    } else {
      sendMessage(token, id, text);
    }
  });
  return elem;
}

function getAllUsers(token, callBack, dict) {
  fetch(`https://api.telegram.org/bot${token}/getUpdates`)
    .then((e) => e.json())
    .then((e) => {
      callBack(e.result, dict);
    });
}

function createAdd(text, elem) {
  const element = el("button.btns-changes__item add", {
    textContent: text,
  });
  element.addEventListener("click", () => {
    if (element.textContent === text) {
      element.textContent = "Отмена";
      elem.classList.add("card__add-active");
      element.classList.add("add-active");
    } else {
      elem.classList.remove("card__add-active");
      element.classList.remove("add-active");
      element.textContent = text;
    }
  });
  return element;
}

function reset(allItems) {
  const element = el("button.btns-changes__item delete", {
    textContent: "Сбросить",
  });
  element.addEventListener("click", () => {
    resetNew("leafs", 36, allItems.leafs.lastChild);
    resetNew("maccards", 50, allItems.card.lastChild);
    resetNew("emotions", 50, allItems.emotions.lastChild);
  });
  return element;
}

function currItems() {
  const elements = el("div.all-items");
  const leafs = createTextRemain("Перьев: ", "leafs", "all-leaf");
  const card = createTextRemain("Маккарт: ", "maccards", "all-card");
  const emotions = createTextRemain("Эмоций: ", "emotions", "all-card");
  elements.append(leafs, card, emotions);
  return { elements, leafs, card, emotions };
}

function createTextRemain(text, local, lclass) {
  const span = el("span", { textContent: getArrayLocal(local).length });
  const elem = el(`span.all-items__item ${lclass}`, [
    el("h4", { textContent: text }),
    span,
  ]);
  return elem;
}

export function makeApp() {
  const token = `5284035313:AAE15tnvTYt5FAquffIzhWYVAWyTEb3WB_Y`;
  const container = el("div.container");
  const cards = el("div.cards");
  const allItems = currItems();
  const create = createAddBtn(token, cards, allItems);
  const modal = createModale();
  document.body.append(modal);

  const btns = el("div.btns-changes", [
    createAdd("Изменить", create),
    reset(allItems),
  ]);
  cards.append(create);
  container.append(btns, allItems.elements, cards);
  return container;
}

function createAddBtn(token, cards, items) {
  const elem = el("div.card card__add");
  elem.addEventListener("click", () => {
    const modal = document.querySelector(`.black-back`);
    modal.classList.add("black-back-active");
    getAllUsers(token, updateList, {
      block: modal.firstChild,
      cards: cards,
      items: items,
    });
  });
  return elem;
}

function parseNames(elems) {
  const newDict = {};
  Array.from(elems.children)
    .slice(0, -1)
    .forEach((e) => {
      newDict[e.firstChild.textContent] = e;
    });
  return newDict;
}

function updateList(listElems, dict) {
  dict.block.innerHTML = "";
  const allNames = getAllNames(listElems);
  const ul = el("ul.users");
  const names = parseNames(dict.cards);
  for (const [key, value] of Object.entries(allNames)) {
    const li = el("button.users__item", { textContent: key });
    let blockUser;
    if (Object.keys(names).includes(key)) {
      blockUser = names[key];
      li.classList.add("users__item-active");
    }
    li.addEventListener("click", () => {
      if (li.classList.contains("users__item-active")) {
        if (blockUser) {
          blockUser.remove();
        }
        li.classList.remove("users__item-active");
      } else {
        blockUser = createCard(key, value, dict.items);
        dict.cards.insertBefore(blockUser, dict.cards.lastChild);
        li.classList.add("users__item-active");
      }
    });
    ul.append(li);
  }
  dict.block.append(ul);
}
function sendMessage(token, id, text) {
  fetch(
    `https://api.telegram.org/bot${token}/sendMessage?chat_id=${id}&text=${text}`
  );
}

function sendPhoto(token, id, url, dict) {
  fetch(
    `https://api.telegram.org/bot${token}/sendPhoto?chat_id=${id}&photo=${url}`
  ).then((e) => {
    if (e.status === 200) {
      if (dict.local) {
        dict.currElem.lastChild.textContent =
          Number(dict.currElem.lastChild.textContent) - 1;
      }
      dict.elem.innerHTML = "";
      dict.elem.classList.remove("buttons__item-disable");
      dict.elem.textContent = dict.text;
    }
  });
}

function getAllNames(dict) {
  const allNames = dict.filter((e) => e.message);
  const newDict = {};
  for (const { message } of allNames) {
    newDict[`${message.from.first_name} ${message.from.last_name}`] = {
      id: message.from.id,
      username: message.from.username,
    };
  }
  return newDict;
}

function createModale() {
  const block = el("div.block", { id: "block-modal" });
  const elem = el("div.black-back", [block]);
  elem.addEventListener("click", (event) => {
    if (event._isClickWithinModal) return;
    elem.classList.remove("black-back-active");
  });

  block.addEventListener("click", (event) => {
    event._isClickWithinModal = true;
  });
  return elem;
}
