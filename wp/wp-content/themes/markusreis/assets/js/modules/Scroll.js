import {clamp, getCumulativeElementOffset, lerp} from "../utils";

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
            speed                : 0,
            thumbPosition        : 0,
            scrollPosition       : 0,
            position             : 0,
            activeIndex          : 0,
            slideCount           : 0,
            slides               : [],
            slideDist            : {},
            slideHeight          : 0,
            killScrollGravitation: false,
            killThumbGravitation : false,
            isSlides             : true,
            isAnimating          : false,
            isAnimatingThumb     : false,
            isAnimatingSlides    : false,
            maxThumbOffset       : this._dom.dragbar.clientHeight - this._dom.thumb.clientHeight,
            dragbarOffset        : getCumulativeElementOffset(dragbar),
            dragEnabled          : false,
            lastDragPos          : 0,
            maxThumbOvershoot    : 0.1
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
        document.addEventListener('mouseup', (e) => this.endDrag(e.clientX, e.clientY))
        document.addEventListener('mouseleave', this.endDrag.bind(this))
        document.addEventListener('touchend', (e) => this.endDrag(e.touches[0].clientX, e.touches[0].clientY))

        window.addEventListener('mousemove', e => this.tryDrag(e.clientY))
        window.addEventListener('touchmove', e => this.tryDrag(e.touches[0].clientY))
    }

    startDrag(y) {
        this._app.cursor.forceLock = true
        document.documentElement.classList.add('c-line--active')
        document.documentElement.classList.remove('c-line--released')
        this._state.dragEnabled = true
        this._state.isAnimatingThumb = false
        this._state.lastDragPos = y

        if (this._app.three.skewImages._state.images.length > 0) {
            this._app.three.skewImages.dragActive = true
        }
    }

    endDrag(x, y) {
        if (this._state.dragEnabled) {
            this._app.cursor.forceLock = false
            document.documentElement.classList.remove('c-line--active')
            document.documentElement.classList.add('c-line--released')
            setTimeout(() => document.documentElement.classList.remove('c-line--released'), 1000)
            this._state.dragEnabled = false
            this._state.speed = 0
            if (!!x && !!y) {
                this._app.cursor.updateCursorTarget({x: x, y: y})
                if (!this._state.isAnimatingThumb) {
                    this.gravitateThumbPosition()
                }
            }
            if (this._app.three.skewImages._state.images.length > 0) {
                this._app.three.skewImages.dragActive = false
            }
        }
    }

    tryDrag(y) {
        if (this._state.dragEnabled) {
            const diff = (y - this._state.lastDragPos);
            this.setThumbPosition(this._state.thumbPosition + diff)
            this._state.lastDragPos = y
            let cursorTargetY = this._app.cursor.getCursorTargetPosition().y + diff;

            this.setActiveIndex(Math.round(((this._state.thumbPosition / this._state.maxThumbOffset) * (this._state.slideCount - 1))))
            this._state.position = this._state.activeIndex

            cursorTargetY = Math.max(
                this._state.dragbarOffset.top + this._dom.thumb.clientHeight / 2,
                Math.min(
                    cursorTargetY,
                    this._state.dragbarOffset.top + this._dom.dragbar.clientHeight - this._dom.thumb.clientHeight / 2
                )
            );
            this._app.cursor.updateCursorTarget({y: cursorTargetY})
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
            this._state.killScrollGravitation = true
            this._state.killThumbGravitation = true
            // How much can the thumb overshoot the dragbar
            const maxThumbOvershoot = 0.1;
            // Increase position according to speed
            this._state.position += this._state.speed * 1.1
            // Slow down speed
            this._state.speed *= 0.85
            // Determine current index
            this.setActiveIndex(Math.min(this._state.slideCount, Math.max(0, Math.round(this._state.position))))
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
            this.setThumbPosition((this._state.position / (this._state.slideCount - 1)) * this._state.maxThumbOffset)
            // Set the slides position
            this.updateSlides()
            // Loop
            this._state.isAnimating = this._state.position !== this._state.activeIndex
            if (this._state.isAnimating && !this._state.dragEnabled) {
                window.requestAnimationFrame(() => this.animateSlides())
            }
        }
    }

    setActiveIndex(i) {
        if (i !== this._state.activeIndex) {
            this._state.activeIndex = i
            this.setActiveProject(i)
            if (!this._state.isAnimatingSlides && this._state.dragEnabled) {
                this.gravitateScrollPosition()
            }
        }
    }

    setThumbPosition(p) {
        this._state.thumbPosition = clamp(0, this._state.maxThumbOffset, p)
        this._dom.thumb.style.top = `${this._state.thumbPosition}px`
    }

    setScrollPosition(p) {
        this._state.scrollPosition = p
        this._dom.slideWrap.style.transform = `translateY(${-this._state.scrollPosition}px)`
    }

    gravitateThumbPosition() {
        if (!this._state.dragEnabled) {
            const thumbPerSlide = (this._state.maxThumbOffset / (this._state.slideCount - 1))
            const newThumbPosition = lerp(this._state.thumbPosition, this._state.activeIndex * thumbPerSlide, 0.2);
            const diff = Math.abs(newThumbPosition - this._state.thumbPosition) % 1
            this._state.isAnimatingThumb = !(diff < 0.0001 || diff > 0.9999)
            this._state.thumbPosition = this._state.isAnimatingThumb ? newThumbPosition : this._state.activeIndex * thumbPerSlide;
            this.setThumbPosition(this._state.thumbPosition)
            if (this._state.isAnimatingThumb) {
                window.requestAnimationFrame(() => this.gravitateThumbPosition())
            }
        }
    }

    gravitateScrollPosition() {
        const newScrollPosition = lerp(this._state.scrollPosition, this._state.activeIndex * this._state.slideHeight, 0.1);
        const diff = Math.abs(newScrollPosition - this._state.scrollPosition) % 1
        this._state.isAnimatingSlides = !(diff < 0.0001 || diff > 0.9999)
        this.setScrollPosition(this._state.isAnimatingSlides ? newScrollPosition : this._state.activeIndex * this._state.slideHeight)
        if (this._state.isAnimatingSlides) {
            window.requestAnimationFrame(() => this.gravitateScrollPosition())
        }
    }

    updateSlides() {
        this._state.slideDist.forEach((slide, i) => {
            this._state.slideDist[i].dist = Math.min(Math.abs(this._state.position - i), 1)
            this._state.slideDist[i].dist = 1 - this._state.slideDist[i].dist ** 2
            this.setScrollPosition(this._state.position * this._state.slideHeight)
        })
    }


    setActiveProject(i) {
        [...document.querySelectorAll('.projects__title')].forEach((e, j) => e.dataset.active = i === j)
    }
}