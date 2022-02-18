import { el, setChildren } from "redom";
import { createElem } from "./create";
import { localSto } from "./db2";
import { createModalCurr } from "./create";

export function makePop(id) {
    const popup = document.getElementById(id);
    const head = popup.querySelector('.popup__title');
    const cont = popup.querySelector('.popup__text');
    return { popup, heading: head, content: cont };
}

export function createStartedSecond(secondElem) {
    if (!document.getElementById('accordion')) {
        const accordion = el('div#accordion');
        secondElem.append(accordion);
        const headerList = [];
        for (let [key, value] of Object.entries(localSto)) {
            const item = createElem(key, value, headerList, secondElem);
            accordion.append(item);
        }





        headerList.forEach(currHeader => {
            currHeader.addEventListener("click", () => {
                headerList.forEach(e => {
                    if (e === currHeader) {
                        changeSize(e);
                        e.classList.toggle("active");
                    } else {
                        changeSize(e, 'need');
                        e.classList.remove("active");
                    }
                });
            });
        });
    }

}

function changeSize(currHeader, conds) {
    const accItemBody = currHeader.nextElementSibling;
    if (conds === 'need') {
        accItemBody.style.maxHeight = 0;
        return;
    } else {
        if (currHeader.classList.contains("active")) {
            accItemBody.style.maxHeight = 0;
        } else {
            accItemBody.style.maxHeight = accItemBody.scrollHeight + "px";
        }
    }
}
