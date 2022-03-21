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
import { token, telegramBot } from "..";




export function createCard(name, dict, items) {
    return el("div.card", { id: dict.id }, [
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
            elem.classList.remove("buttons__item-danger");
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

function createAdd(text, dict) {
    const element = el("button.btns-changes__item add", {
        textContent: text,
    });
    element.addEventListener("click", () => {
        const modal = document.querySelector(`.black-back`);
        const back = modal.querySelector("#block-modal");
        const users = back.querySelector(".users");
        if (users) {
            users.remove();
        }
        back.classList.add("block-loading");
        modal.classList.add("black-back-active");
        back.append(el("div.loader loader-get"));
        getAllUsers(dict.token, updateList, {
            block: modal.firstChild,
            cards: dict.cards,
            items: dict.allItems,
            back: back,
            users,
            token: dict.token,
        });
    });
    return element;
}

function reset(allItems) {
    const element = el("button.btns-changes__item delete", {
        textContent: "Главное меню",
    });
    element.addEventListener("click", () => {
        if (confirm("Вы уверены, что хотите выйти в главное меню?")) {
            const firstGame = document.querySelector(".first-game");
            firstGame.innerHTML = "";
            firstGame.append(mainPage(telegramBot));
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
        el("h4.all-items__name", { textContent: text }),
        span,
    ]);
    return elem;
}

export function makeApp() {
    const firstGame = document.querySelector(".first-game");
    firstGame.append(el("div.threads"));
    const container = el("div.container2");
    const cards = el("div.cards");
    const allItems = currItems();
    const modal = createModale();
    firstGame.append(modal);
    const btns = el("div.btns-changes", [
        createAdd("Изменить", { token, cards, allItems }),
        reset(allItems),
    ]);
    const currDict = getDictLocal("currGame");
    for (const [key, value] of Object.entries(currDict)) {
        cards.append(createCard(key, value, allItems, token));
    }
    container.append(btns, allItems.elements, cards);
    return container;
}

function parseNames(elems) {
    const newDict = {};
    Array.from(elems.children).forEach((e) => {
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
    dict.back.classList.remove("block-loading");
    dict.block.append(ul);
    if (!Object.keys(allNames).length) {
        ul.classList.add("ul-no-elements");
        ul.textContent = "Участников пока нет";
    } else {
        for (const [key, value] of Object.entries(allNames)) {
            const link = el(
                "button.broadcast",
                el("img.broadcast-image", {
                    src: "https://i.ibb.co/t4pvzRk/link.png",
                })
            );
            const map = el(
                "button.map-list",
                el("img.map-list-image", {
                    src: "https://i.ibb.co/f98JGQs/check-list.png",
                })
            );

            link.addEventListener("click", sendZoom.bind(null, link, dict, value));

            map.addEventListener("click", sendMap.bind(null, map, dict, value));

            function sendMap(map, dict, value) {
                map.firstChild.classList.add("link-anim");
                sendPhoto(dict.token, value.id, "https://i.ibb.co/zPMjcNn/image.png", {
                    map: map.firstChild,
                });
            }
            const btn = el("button.add-user", { "data-name": "+" });
            const currName = el("span.name-user", { textContent: key });
            const li = el("div.users__item", [btn, currName, link, map]);
            let blockUser;
            if (Object.keys(names).includes(key)) {
                blockUser = names[key];
                console.log(getStrLocal("zoomCheck"));
                li.classList.add("users__item-active");
                btn.setAttribute("data-name", "-");
                if (!getStrLocal("zoomValue")) {
                    link.classList.add("broadcast-gray");
                } else {
                    link.classList.remove("broadcast-gray");
                }
            }
            btn.addEventListener("click", (event) => {
                if (!li.classList.contains("users__item-active")) {
                    if (getStrLocal("zoomCheck")) {
                        sendZoom(link, dict, value);
                    }
                    if (getStrLocal("mapCheck")) {
                        sendMap(map, dict, value);
                    }
                }

                addElem({ li, key, blockUser, dict, value, btn, link });
            });

            ul.append(li);
        }
    }
}

function sendZoom(link, dict, value) {
    const url = getStrLocal("zoomValue");
    if (url) {
        link.firstChild.classList.add("link-anim");
        sendMessage(dict.token, value.id, url, {
            elem: link.firstChild,
        });
    }
}

function addElem(newDict) {
    const currDict = getDictLocal("currGame");
    if (newDict.li.classList.contains("users__item-active")) {
        newDict.btn.setAttribute("data-name", "+");
        delete currDict[newDict.key];
        update(currDict, "currGame");
        const blockUser = document.getElementById(`${newDict.value.id}`);
        if (blockUser) {
            blockUser.remove();
        }
        newDict.li.classList.remove("users__item-active");
    } else {
        if (!getStrLocal("zoomValue")) {
            newDict.link.classList.add("broadcast-gray");
        } else {
            newDict.link.classList.remove("broadcast-gray");
        }
        newDict.btn.setAttribute("data-name", "-");
        currDict[newDict.key] = newDict.value;
        update(currDict, "currGame");
        const blockUser = createCard(
            newDict.key,
            newDict.value,
            newDict.dict.items
        );
        newDict.dict.cards.append(blockUser);
        newDict.li.classList.add("users__item-active");
    }
}

function sendMessage(token, id, text, dict = {}) {
    fetch(
            `https://api.telegram.org/bot${token}/sendMessage?chat_id=${id}&text=${text}`
        )
        .then((e) => {
            if (e.status === 200) {
                if (dict.elem) {
                    dict.elem.classList.remove("link-anim");
                }
            }
        })
        .catch((e) => {
            if (dict.elem) {
                dict.elem.classList.remove("link-anim");
            }
            createThread(e);
        });
}

function sendPhoto(token, id, url, dict) {
    fetch(
            `https://api.telegram.org/bot${token}/sendPhoto?chat_id=${id}&photo=${url}`
        )
        .then((e) => {
            if (e.status === 200 || e.status === 201) {
                if (dict.local) {
                    dict.currElem.lastChild.textContent =
                        Number(dict.currElem.lastChild.textContent) - 1;
                }
                if (dict.elem) {
                    dict.elem.innerHTML = "";
                    dict.elem.classList.remove("buttons__item-disable");
                    dict.elem.textContent = dict.text;
                }
                if (dict.map) {
                    dict.map.classList.remove("link-anim");
                }
            } else if (e.status === 404) {
                if (dict.elem) {
                    dict.elem.innerHTML = "";
                    dict.elem.classList.remove("buttons__item-disable");
                    dict.elem.classList.add("buttons__item-danger");
                    dict.elem.textContent = dict.text;
                }
                if (dict.map) {
                    dict.map.classList.remove("link-anim");
                }
                createThread("Неизвестная ошибка");
            }
        })
        .catch((e) => {
            if (dict.elem) {
                dict.elem.innerHTML = "";
                dict.elem.classList.remove("buttons__item-disable");
                dict.elem.classList.add("buttons__item-danger");
                dict.elem.textContent = dict.text;
            }
            if (dict.map) {
                dict.map.classList.remove("link-anim");
            }
            createThread(e);
        });
}

function createThread(e) {
    const elem = el("div.thread", { textContent: "Неизвестная ошибка" });
    if (e.name === "TypeError") {
        if (e.message.trim() === "Failed to fetch") {
            elem.textContent = "Нет подключения к интернету";
        }
    }
    document.querySelector(".threads").append(elem);
    setTimeout(() => {
        elem.remove();
    }, 5000);
}

function getAllNames(dict) {
    const allNames = dict.filter((e) => e.message);
    const newDict = {};
    for (const { message }
        of allNames) {
        const surname = message.from.last_name ? ` ${message.from.last_name}` : '';
        newDict[`${message.from.first_name}${surname}`] = {
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
        const change = document.querySelector(".btns-changes__item.add");
        change.classList.remove("add-active");
        change.textContent = "Изменить";
    });

    block.addEventListener("click", (event) => {
        event._isClickWithinModal = true;
    });
    return elem;
}

// document.addEventListener("touchstart", handleTouchStart, false);
// document.addEventListener("touchmove", handleTouchMove, false);

// let xDown = null;
// let yDown = null;

// function getTouches(evt) {
//     return evt.touches || evt.originalEvent.touches;
// }

// function handleTouchStart(evt) {
//     const firstTouch = getTouches(evt)[0];
//     xDown = firstTouch.clientX;
//     yDown = firstTouch.clientY;
// }

// function handleTouchMove(evt) {
//     console.log(evt.touches[0]);
//     const xUp = evt.touches[0].clientX;
//     const yUp = evt.touches[0].clientY;

//     const xDiff = xDown - xUp;
//     const yDiff = yDown - yUp;

//     console.log(xDiff, yDiff);
//     if (Math.abs(xDiff) > Math.abs(yDiff)) {
//         if (xDiff > 0) {
//             /* right swipe */
//             console.log("dasdas-right");
//         } else {
//             /* left swipe */
//             console.log("dasdas-left");
//         }
//     }
//     /* reset values */
//     xDown = null;
//     yDown = null;
// }
