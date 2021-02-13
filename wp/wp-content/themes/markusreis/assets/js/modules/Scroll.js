import {lerp} from "../utils";

export class Scroll {
    constructor() {
        this._state = {
            speed      : 0,
            position   : 0,
            activeIndex: 0,
            slideCount : 0,
            slides     : [],
            slideDist  : {},
            slideHeight: 0,
            isSlides   : true
        }
        this._dom = {
            slideWrap: null,
            thumb    : document.getElementById('thumb')
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
        })
    }

    initSlides() {
        this._dom.slideWrap = document.querySelector('.projects__images__slider')
        this._state.slides = [...this._dom.slideWrap.children]
        this._state.slideHeight = this._state.slides[0].clientHeight
        this._state.slideCount = this._state.slides.length
        this._state.slideDist = Array(this._state.slideCount).fill({dist: 0})
    }

    animateSlides() {
        if (this._state.isSlides) {
            this._state.position += this._state.speed
            this._state.speed *= 0.8
            this._state.activeIndex = Math.min(this._state.slideCount, Math.max(0, Math.round(this._state.position)))
            const diff = this._state.activeIndex - this._state.position
            //this._state.position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.015
            this._state.position += diff * 0.015
            this._dom.thumb.style.top = `${(this._state.position * 100)}px`
            this.updateSlides()
            window.requestAnimationFrame(() => this.animateSlides())
        }
    }

    updateSlides() {
        this._state.slideDist.forEach((slide, i) => {
            this._state.slideDist[i].dist = Math.min(Math.abs(this._state.position - i), 1)
            this._state.slideDist[i].dist = 1 - this._state.slideDist[i].dist ** 2
            //this._state.slides[i].style.transform = `scale(${1 + 0.4 * this._state.slideDist[i].dist})`
            console.log(`translateY(${-this._state.position * 100 + 50}px)`)
            this._dom.slideWrap.style.transform = `translateY(${-this._state.position * this._state.slideHeight}px)`
        })
    }
}