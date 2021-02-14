import {getCumulativeElementOffset, lerp, selfOrClosest} from "../utils";

export class Cursor {
    constructor({app}) {
        this._app = app
        this.addListener()

        const defaultCursor = document.getElementById('cursor')
        const slowCursor = document.getElementById('cursor-slow')
        const slowCursorTwo = document.getElementById('cursor-slow-two')

        this.activeNode = null

        this.cursors = [
            {
                node          : defaultCursor,
                lerp          : 0.85,
                lastPosition  : {x: -1, y: 0},
                targetPosition: {x: 0, y: 0},
            },
            {
                node          : slowCursor,
                lerp          : 0.1,
                lastPosition  : {x: -1, y: 0},
                targetPosition: {x: 0, y: 0},
            },
        ]

        this.animate()
    }

    addListener() {
        this.cursor = document.getElementById('cursor')
        window.addEventListener('mousemove', e => {
            this._app.three.setMousePosition({x: e.clientX, y: e.clientY})
            const node = selfOrClosest(e.target, 'cursor', 'dataset')
            if (node) {
                document.documentElement.classList.add('cursor-locked')
                if (this.activeNode !== node) {

                    this.activeNode = node

                    if (node.dataset.cursorAction) {
                        this[node.dataset.cursorAction](node)
                    } else {
                        const {top, left} = getCumulativeElementOffset(node)
                        this.updateCursorTarget({
                                                    x: left + node.clientWidth / 2,
                                                    y: top + node.clientHeight / 2
                                                })
                    }

                    if (!this._app._state.sphereSizeLocked && document.documentElement.dataset.navExpanded !== 'true') {
                        this._app.three.sphereTo(1.1)
                    }
                    if (node.dataset.cursor !== '') {
                        this.cursors[1].node.style.width = node.dataset.cursor + 'px'
                        this.cursors[1].node.style.height = node.dataset.cursor + 'px'
                    }
                }
            } else {
                document.documentElement.classList.remove('cursor-locked')
                this.updateCursorTarget({x: e.clientX, y: e.clientY})
                if (!!this.activeNode) {
                    this.activeNode = null
                    if (!this._app._state.sphereSizeLocked) {
                        this._app.three.sphereTo(1)
                    }
                    this.cursors[1].node.style.removeProperty('width');
                    this.cursors[1].node.style.removeProperty('height');
                    this.cursors[1].node.style.removeProperty('border-radius');
                    this.cursors[1].node.style.removeProperty('opacity');
                    this.cursors[1].node.style.removeProperty('background');
                    this.cursors[1].node.style.removeProperty('mix-blend-mode');
                }
            }
        })
    }

    underline(node) {
        this.cursors[1].node.style.opacity = '.9'
        this.cursors[1].node.style.background = 'white'
        this.cursors[1].node.style.borderRadius = '0px'
        this.cursors[1].node.style.height = '10px'
        this.cursors[1].node.style.width = node.clientWidth + 'px'
        this.cursors[1].node.style.mixBlendMode = 'exclusion'
        this.updateCursorTarget({
                                    x: node.offsetLeft + node.clientWidth / 2,
                                    y: node.offsetTop + node.clientHeight
                                })
    }

    updateCursorTarget({x, y}) {
        if (this.cursors[0].lastPosition.x === -1) {
            this.cursors.forEach((cursor, i) => {
                if (x) {
                    this.cursors[i].lastPosition.x = x
                    this.cursors[i].targetPosition.x = x
                }
                if (y) {
                    this.cursors[i].lastPosition.y = y
                    this.cursors[i].targetPosition.y = y
                }
            })
        }
        this.cursors.forEach((cursor, i) => {
            if (x) {
                this.cursors[i].targetPosition.x = x
            }
            if (y) {
                this.cursors[i].targetPosition.y = y
            }
        })
    }

    getCursorTargetPosition() {
        return {
            x: this.cursors[0].targetPosition.x,
            y: this.cursors[0].targetPosition.y,
        }
    }

    animate() {
        this.cursors.forEach((cursor, i) => {
            const x = lerp(cursor.lastPosition.x, cursor.targetPosition.x, cursor.lerp)
            const y = lerp(cursor.lastPosition.y, cursor.targetPosition.y, cursor.lerp)
            cursor.node.style.transform = `translate(${x - cursor.node.clientWidth / 2}px, ${y - cursor.node.clientHeight / 2}px)`
            this.cursors[i].lastPosition.x = x
            this.cursors[i].lastPosition.y = y
        })

        window.requestAnimationFrame(this.animate.bind(this))
    }
}