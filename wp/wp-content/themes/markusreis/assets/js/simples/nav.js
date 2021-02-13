import {gsap} from 'gsap';
import {toNode} from "../utils";

const nav = () => {

    [...document.querySelectorAll('nav li a')].forEach(node => {
        const parts = node.innerText.split('')
        node.innerText = ''
        const totalParts = parts.length
        const mid = totalParts / 2
        parts.forEach((part, i) => {
            const dist = i - mid
            node.append(toNode(`<span style="transform:translateX(${dist * 15}px);transition-delay:${Math.random() * 400}ms">${part}</span>`))
        })
    })

    document.getElementById('nav-toggle').addEventListener('click', () => {
        const isExpanded = document.documentElement.dataset.navExpanded !== 'true'
        document.documentElement.dataset.navExpanded = isExpanded
        window.app._state.sphereSizeLocked = isExpanded
        window.app.three.setMaxColorShift(isExpanded ? 1.5 : 1)
        window.app.three.sphereTo(isExpanded ? 2 : 1, isExpanded ? null : 1.5, isExpanded ? 0.36 : 0.65)
    })
}

export {
    nav
}