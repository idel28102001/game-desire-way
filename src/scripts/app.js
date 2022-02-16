import { el, setChildren } from "redom";
import { makeApp } from "./card.js";
import { resetNew, getStrLocal, update } from "./randoms";

//makeApp()
export function app() {
    return mainPage();
}

export function mainPage() {
    const modal = createModale();
    document.body.appendChild(modal);
    const container = el("div.container");
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
    const exit = el("button.main-buttons__item exit-button", {
        textContent: `Выход`,
    });

    settings.addEventListener("click", () => {
        modal.classList.add("black-back-active");
        const input = document.querySelector(".settings__input");
        input.value = getStrLocal("telegramAPI");
    });

    start.addEventListener("click", () => {
        if (!getStrLocal("telegramAPI")) {
            settings.click();
            const input = document.querySelector(".settings__input");
            input.classList.add("settings__input-danger");
        } else {
            if (confirm("Начать новую игру?")) {
                resetNew("leafs", 36);
                resetNew("maccards", 50);
                resetNew("emotions", 50);
                document.body.innerHTML = "";
                localStorage.removeItem("currGame");
                document.body.appendChild(makeApp());
            }
        }
    });
    if (!localStorage.getItem("leafs")) {
        contin.classList.add("continue-button-disable");
    } else {
        contin.classList.remove("continue-button-disable");
    }

    contin.addEventListener("click", () => {
        document.body.innerHTML = "";
        document.body.appendChild(makeApp());
    });

    exit.addEventListener("click", () => {
        if (confirm("Вы уверены, что хотите выйти?")) {
            window.close();
        }
    });
    btns.append(start, contin, settings, exit);
    container.append(btns);
    return container;
}

function createModale() {
    const block = el("div.block block-settings", { id: "block-modal" });
    const button = el("button.settings__button", { textContent: "Сохранить" });
    const input = el("input.settings__input", {
        placeHolder: "API Telegram Ключ",
    });

    input.addEventListener("input", () => {
        input.classList.remove("settings__input-danger");
    });
    block.append(
        el("div.settings", [
            el("label.settings__label", { textContent: "API" }, input),
            button,
        ])
    );

    button.addEventListener("click", () => {
        update(input.value, "telegramAPI");
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
    return elem;
}
