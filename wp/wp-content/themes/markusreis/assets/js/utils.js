const lerp = function (value1, value2, amount) {
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    return value1 + (value2 - value1) * amount;
}

const toNode = (str) => {
    const d = document.createElement('div')
    d.innerHTML = str
    return d.children[0]
}

const selfOrClosest = (el, key, type = 'class') => {
    if (type === 'class') {
        if (el.classList.contains(key)) {
            return el
        } else if (el.classList.closest(key)) {
            return el.classList.closest(key)
        }
    } else if (type === 'dataset') {
        if (!!el.dataset[key] || el.dataset[key] === '') {
            return el
        } else if (el.closest(`[data-${key}]`)) {
            return el.closest(`[data-${key}]`)
        }
    }
    return null
}


const getCumulativeElementOffset = (el) => {
    var _x = 0;
    var _y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.parentElement;
    }
    return {top: _y, left: _x};
};

export {
    lerp,
    toNode,
    selfOrClosest,
    getCumulativeElementOffset
};