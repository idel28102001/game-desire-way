function getLocal(local, counts) {
    let newArray;
    if (localStorage.getItem(local)) {
        newArray = JSON.parse(localStorage.getItem(local));
    } else {
        newArray = Array.from(Array(counts + 1).keys());
        newArray = newArray.slice(1);
        localStorage.setItem(local, JSON.stringify(newArray));
    }

    return newArray;
}

function popNew(elem, array) {
    return array.filter((e) => {
        if (e !== elem) {
            return e;
        }
    });
}

export function resetNew(local, count, elem) {
    if (elem) {
        elem.textContent = count;
    }
    let newArray = Array.from(Array(count).keys());
    localStorage.setItem(local, JSON.stringify(newArray));
}

export function update(array, name) {
    localStorage.setItem(name, JSON.stringify(array));
    return JSON.parse(localStorage.getItem(name));
}

export function getNumber(text) {
    const array = getArrayLocal(text);
    const number = Math.floor(Math.random() * array.length);
    const getNumber = array[number];
    update(popNew(getNumber, array), text);
    return getNumber;
}

export function getArrayLocal(text) {
    let local = localStorage.getItem(text);
    if (local) {
        local = JSON.parse(local);
    } else {
        local = [];
    }
    return local;
}

export function getDictLocal(text) {
    let local = localStorage.getItem(text);
    if (local) {
        local = JSON.parse(local);
    } else {
        local = {};
    }
    return local;
}

export function getStrLocal(text) {
    let local = localStorage.getItem(text);
    if (local) {
        local = JSON.parse(local);
    } else {
        local = "";
    }
    return local;
}
