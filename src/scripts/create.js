import { makePop } from "./tips";
import { el } from "redom";

export function createElem(name, dict, headerList, secondElem) {
    const cont = el("div.accordion-item-body-content");
    for (let currDict of dict) {
        const elem = createForIcon(currDict, secondElem);
        cont.append(elem);
    }
    const header = el('div.accordion-item-header', { textContent: name });
    headerList.push(header);
    const item = el("div.accordion-item", [header,
        el('div.accordion-item-body', cont)
    ]);
    return item;
}

function createForIcon(dict, secondElem) {
    const currSrc = require(`${'../assets/img/icons/'}${dict.src.slice(20)}`);
    const button = el("button.modal-btn", { role: 'button' }, el('img.modal-img', { src: currSrc }));
    button.addEventListener("click", () => {
        makePop('popup').popup.classList.add('open');
        changeModal(makePop('popup'), dict.title, dict.text, dict.color);

    });
    return button;
}


export function createModalCurr(id, heading, content) {
    const cross = el('button.popup__close', { textContent: 'x' });
    const head = el('h2.popup__title', { textContent: heading });
    const cont = el('div.popup__text', { textContent: content });
    const contentElem = el('div.popup__content', [
        cross,
        head,
        cont,
    ]);
    const body = el('div.popup__body', contentElem);
    const elem = el(`div#${id}.popup`, body);



    cross.addEventListener('click', () => {
        elem.classList.remove('open');
    });
    contentElem.addEventListener('click', e => {
        e._withinModal = true;
    });

    elem.addEventListener('click', e => {
        if (e._withinModal) return;
        e.currentTarget.classList.remove('open');
    });

    return { popup: elem, content: cont, heading: head };
}



function firstBody(dict, title, color) {
    const cont = el("div.main-item-curr");
    for (let [key, value] of Object.entries(dict)) {
        const [currClassH, currClassI, currClassA, currClassII] = value.cls ? [value.cls[0], value.cls[1], value.cls[2], value.cls[3]] : ['.head-item-curr', '.content-item-curr', '.content-all-curr', '.item-item-curr'];
        if (key !== "extra") {
            if (!value.array) {
                const action = el(`div${currClassA}`, [
                    el(`h3${currClassH}`, value.title),
                    el(`span${currClassI}`, value.text)
                ]);
                cont.append(action);
            } else {
                const anss = el(`ul${currClassI}`);
                for (let curr of value.array) {
                    const ans = el(`li${currClassII}`, curr);
                    anss.append(ans);
                }
                const answers = el(`div${currClassA}`, [
                    el(`h3${currClassH}`, value.title),
                    anss
                ]);
                cont.append(answers);
            }
        }
    }

    if (dict.extra) {
        const extra = el(`button.btn btn-primary ${color}`, { textContent: dict.extra.btnTitle });
        extra.addEventListener('click', e => {
            makePop('popup').popup.classList.remove('open');
            makePop('popup2').popup.classList.add('open');
        });
        const modal2Dict = makePop('popup2');
        const extra2 = el("div");
        const [currClassH, currClassI, currClassA] = dict.extra.cls ? [dict.extra.cls[0], dict.extra.cls[1], dict.extra.cls[2]] : ['.head-item-curr', '.content-item-curr-extra', '.content-all-curr'];

        extra2.append(el(`h3${currClassA}`, { text: dict.extra.title }));
        if (dict.extra.array) {
            const ul = el(`ul${currClassH}`);
            for (let curr of dict.extra.array) {
                if (typeof curr === "string") {
                    const ext = el(`li${currClassI}`, curr);
                    ul.append(ext);
                } else {
                    const ext = el(`li${currClassI}`);
                    ext.classList.add(dict.extra.classList[0]);
                    const first = el("span", { textContent: curr[0] });
                    const second = el("span", { textContent: curr[1] });
                    if (dict.extra.classList) {
                        first.classList.add(dict.extra.classList[1]);
                        second.classList.add(dict.extra.classList[2]);
                    }
                    ext.append(first, second);
                    ul.append(ext);
                }
            }
            extra2.append(ul);
        } else {
            const p = el(`p${currClassI}`, { textContent: dict.extra.text });
            extra2.append(p);
        }
        modal2Dict.content.innerHTML = '';
        modal2Dict.content.append(extra2);
        modal2Dict.heading.textContent = title;
        cont.append(extra);
    }

    return cont;
}

function changeModal(popupDict, title, dict, color) {
    popupDict.heading.textContent = title;
    popupDict.content.innerHTML = '';
    popupDict.content.append(firstBody(dict, title, color));
}
