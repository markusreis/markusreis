import {clamp, lerp} from "../utils";

export class Scroll {
    constructor({app}) {

        this._app = app
        const dragbar = document.getElementById('dragbar')
        this._dom = {
            slideWrap: null,
            dragbar  : dragbar,
            thumb    : dragbar.querySelector('#thumb')
        }

        this._state = {
            speed            : 0,
            thumbPosition    : 0,
            position         : 0,
            activeIndex      : 0,
            slideCount       : 0,
            slides           : [],
            slideDist        : {},
            slideHeight      : 0,
            isSlides         : true,
            isAnimating      : false,
            maxThumbOffset   : this._dom.dragbar.clientHeight - this._dom.thumb.clientHeight,
            dragEnabled      : false,
            lastDragPos      : 0,
            maxThumbOvershoot: 0.1
        }

        this.initListener()

        if (this._state.isSlides) {
            this.initSlides()
            this.animateSlides()
        } else {
            // Free scroll behaviour
        }
    }

    initListener() {
        window.addEventListener('wheel', e => {
            this._state.speed += e.deltaY * .0003;
            if (!this._state.isAnimating) {
                this._state.isAnimating = true
                this.animateSlides()
            }
        })

        this._dom.thumb.addEventListener('mousedown', e => this.startDrag(e.clientY))
        this._dom.thumb.addEventListener('touchstart', e => this.startDrag(e.touches[0].clientY))
        this._dom.thumb.addEventListener('mouseup', this.endDrag.bind(this))
        this._dom.thumb.addEventListener('mouseleave', this.endDrag.bind(this))
        this._dom.thumb.addEventListener('touchend', this.endDrag.bind(this))

        window.addEventListener('mousemove', e => this.tryDrag(e.clientY))
        window.addEventListener('touchmove', e => this.tryDrag(e.touches[0].clientY))
    }

    startDrag(y) {
        document.documentElement.classList.add('c-line--active')
        this._state.dragEnabled = true
        this._state.lastDragPos = y
    }

    endDrag() {
        document.documentElement.classList.remove('c-line--active')
        this._state.dragEnabled = false
    }

    tryDrag(y) {
        if (this._state.dragEnabled) {
            //console.log(y)
            const diff = (y - this._state.lastDragPos);
            this.setThumbPosition(this._state.thumbPosition + diff)
            //console.log((y - this._state.lastDragPos))
            this._state.lastDragPos = y
            this._app.cursor.updateCursorTarget({y: this._app.cursor.getCursorTargetPosition().y + diff})
            //this.animateSlides()
        }
    }

    initSlides() {
        this._dom.slideWrap = document.querySelector('.projects__images__slider')
        this._state.slides = [...this._dom.slideWrap.children]
        this._state.slideHeight = this._state.slides[0].clientHeight
        this._state.slideCount = this._state.slides.length
        this._state.slideDist = Array(this._state.slideCount).fill({dist: 0})
    }

    animateSlides() {
        if (this._state.isSlides || false) {
            // How much can the thumb overshoot the dragbar
            const maxThumbOvershoot = 0.1;
            // Increase position according to speed
            this._state.position += this._state.speed * 1.1
            // Slow down speed
            this._state.speed *= 0.85
            // Determine current index
            this._state.activeIndex = Math.min(this._state.slideCount, Math.max(0, Math.round(this._state.position)))
            // Gravitate position back to current index
            const diff = this._state.activeIndex - this._state.position
            this._state.position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.2) * 0.02
            //this._state.position = this._state.position + diff * 0.05;
            // Cancel if position very close to target index to stop loop
            this._state.position = Math.abs(diff % 1) < 0.01 || Math.abs(diff % 1) > .99 ? this._state.activeIndex : this._state.position
            //Clamp the overall position
            const tmpPos = this._state.position;
            this._state.position = Math.max(-maxThumbOvershoot, Math.min((this._state.slideCount - 1) + maxThumbOvershoot, this._state.position))
            this._state.speed = this._state.position !== tmpPos ? 0 : this._state.speed
            // Set the thumb position
            this._dom.thumb.style.top = `${((this._state.position / (this._state.slideCount - 1)) * this._state.maxThumbOffset)}px`
            // Set the slides position
            this.updateSlides()
            // Loop
            this._state.isAnimating = this._state.position !== this._state.activeIndex
            if (this._state.isAnimating) {
                window.requestAnimationFrame(() => this.animateSlides())
            }
        }
    }

    setThumbPosition(p) {
        //console.log(p, 'p')
        this._state.thumbPosition = clamp(0, this._state.maxThumbOffset, p)
        this._dom.thumb.style.top = `${this._state.thumbPosition}px`
    }

    gravitateThumbPosition() {

    }

    setScrollPosition() {
        
    }

    gravitateScrollPosition() {

    }

    updateSlides() {
        this._state.slideDist.forEach((slide, i) => {
            this._state.slideDist[i].dist = Math.min(Math.abs(this._state.position - i), 1)
            this._state.slideDist[i].dist = 1 - this._state.slideDist[i].dist ** 2
            //this._state.slides[i].style.transform = `scale(${1 + 0.4 * this._state.slideDist[i].dist})`
            this._dom.slideWrap.style.transform = `translateY(${-this._state.position * this._state.slideHeight}px)`
        })
    }
}