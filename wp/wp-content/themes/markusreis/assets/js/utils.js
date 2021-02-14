const lerp = function (a, b, amount) {
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    return a + (b - a) * amount;
}

const toNode = (str) => {
    const d = document.createElement('div')
    d.innerHTML = str
    return d.children[0]
}

const clamp = (min, max, v) => {
    return Math.max(min, Math.min(max, v))
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
    var el2 = el;
    var curtop = 0;
    var curleft = 0;
    if (document.getElementById || document.all) {
        do {
            curleft += el.offsetLeft - el.scrollLeft;
            curtop += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
            el2 = el2.parentNode;
            while (el2 != el) {
                curleft -= el2.scrollLeft;
                curtop -= el2.scrollTop;
                el2 = el2.parentNode;
            }
        } while (el.offsetParent);

    } else if (document.layers) {
        curtop += el.y;
        curleft += el.x;
    }
    return {top: curtop, left: curleft};
};

export {
    lerp,
    toNode,
    selfOrClosest,
    getCumulativeElementOffset,
    clamp
};