import { el, setChildren } from "redom";
import { links } from "./db";
import {
    resetNew,
    getArrayLocal,
    getDictLocal,
    getNumber,
    update,
    getStrLocal,
} from "./randoms";
import { mainPage } from "./app.js";
import "babel-polyfill";
export function createCard(name, dict, items) {
    //const token = `5284035313:AAE15tnvTYt5FAquffIzhWYVAWyTEb3WB_Y`;
    const token = getStrLocal("telegramAPI");
    return el("div.card", [
        el("h3.card__heading", { textContent: name }),
        el("div.card__buttons buttons", [
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
            createBtn(token, dict.id, "Волшебное перо", "magicLeafs", {
                local: "leafs",
                elem: items.leafs,
            }),
        ]),
    ]);
}

function createBtn(token, id, text, type = "", dict = {}) {
    const elem = el("button.buttons__item", { textContent: text });
    elem.classList.add(type);
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
        .then((e) => {
            if (e.status === 200 || e.status === 201) {
                return e.json();
            } else if (e.status === 404) {
                return { status: 404 };
            }
        })
        .then((e) => {
            if (e.ok) {
                callBack(e.result, dict);
            } else if (e.status === 404) {
                if (!document.querySelector(".danger-modal")) {
                    document.querySelector(".black-back").append(createDanger());
                }
            }
        });
}

function createDanger() {
    const element = el("div.danger-modal", {
        textContent: "Ошибка 404. Возможно невалидный API ключ или нет подключения к интернету.",
    });
    return element;
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
        textContent: "Главное меню",
    });
    element.addEventListener("click", () => {
        if (confirm("Вы уверены, что хотите выйти в главное меню?")) {
            document.body.innerHTML = "";
            document.body.append(mainPage());
        }
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
    //const token = `5284035313:AAE15tnvTYt5FAquffIzhWYVAWyTEb3WB_Y`;
    const token = getStrLocal("telegramAPI");
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
    const currDict = getDictLocal("currGame");
    for (const [key, value] of Object.entries(currDict)) {
        cards.append(createCard(key, value, allItems));
    }
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
    const currDict = getDictLocal("currGame");
    const currNames = getAllNames(listElems);
    const allNames = {...currDict, ...currNames };
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
            const currDict = getDictLocal("currGame");
            if (li.classList.contains("users__item-active")) {
                delete currDict[key];
                update(currDict, "currGame");
                if (blockUser) {
                    blockUser.remove();
                }
                li.classList.remove("users__item-active");
            } else {
                currDict[key] = value;
                update(currDict, "currGame");
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
    for (const { message }
        of allNames) {
        newDict[`${message.from.first_name} ${message.from.last_name}`] = {
            id: message.from.id,
            username: message.from.username,
        };
    }
    return newDict;
}

function createModale() {
    const block = el("div.block", { id: "block-modal" });
    const cross = el("span.cross", { textContent: "x" });
    const elem = el("div.black-back", [block]);
    elem.append(cross);
    elem.addEventListener("click", (event) => {
        if (event._isClickWithinModal) return;
        elem.classList.remove("black-back-active");
        document
            .querySelector(".card.card__add")
            .classList.remove("card__add-active");
        const change = document.querySelector(".btns-changes__item.add");
        change.classList.remove("add-active");
        change.textContent = "Изменить";
    });

    block.addEventListener("click", (event) => {
        event._isClickWithinModal = true;
    });
    return elem;
}
