import { el, setChildren } from "redom";
import { links } from "./db";
import "babel-polyfill";
export function createCard(name, dict) {
  const token = `5284035313:AAE15tnvTYt5FAquffIzhWYVAWyTEb3WB_Y`;
  return el("div.card", [
    el("h3.card__heading", { textContent: name }),
    el("div.card__buttons buttons", [
      createBtn(token, dict.id, "Волшебное перо", "magicLeafs"),
      createBtn(token, dict.id, "Маккарта", `macCards`),
      createBtn(token, dict.id, "Эмоция", "emotions"),
      createBtn(token, dict.id, "Цвет", "colors"),
      createBtn(token, dict.id, "Счастливчик", "happyOne"),
    ]),
  ]);
}

function createBtn(token, id, text, type = "") {
  const elem = el("button.buttons__item", { textContent: text });
  elem.addEventListener("click", () => {
    if (type) {
      sendPhoto(token, id, links[type][0]);
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

export function makeApp() {
  const token = `5284035313:AAE15tnvTYt5FAquffIzhWYVAWyTEb3WB_Y`;
  const container = el("div");
  getAllUsers(token, createCurrent, { container: container });
  return container;
}

function createCurrent(listElems, dictElems) {
  const allNames = getAllNames(listElems);
  for (let [name, dict] of Object.entries(allNames)) {
    dictElems.container.append(createCard(name, dict));
  }
}

function sendMessage(token, id, text) {
  fetch(
    `https://api.telegram.org/bot${token}/sendMessage?chat_id=${id}&text=${text}`
  );
}

function sendPhoto(token, id, url) {
  fetch(
    `https://api.telegram.org/bot${token}/sendPhoto?chat_id=${id}&photo=${url}`
  );
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
