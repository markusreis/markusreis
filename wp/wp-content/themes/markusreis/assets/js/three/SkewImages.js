import * as THREE from 'three';
import vshader from './imageDisplacement.vert';
import fshader from './imageFragment.frag';
import {getCumulativeElementOffset} from "../utils";
import {Elastic, gsap,} from 'gsap';

export class SkewImages {

    constructor({three, app}) {
        this._three = three;
        this._app = app;

        this.loader = new THREE.TextureLoader()

        this._mat = new THREE.ShaderMaterial(
            {
                vertexShader  : vshader,
                fragmentShader: fshader,
                uniforms      : {
                    time           : new THREE.Uniform(0),
                    uImage         : {type: 't', value: null},
                    uImageXScale   : new THREE.Uniform(0),
                    uImageYScale   : new THREE.Uniform(0),
                    uScrollSpeed   : new THREE.Uniform(0),
                    uScrollPosition: new THREE.Uniform(0),
                    uZPosition     : new THREE.Uniform(0),
                }
            })

        this._state = {
            lastScroll   : 0,
            images       : [],
            uZPosition   : 0,
            visibleWidth : this._three.visibleWidthAtZDepth(),
            visibleHeight: this._three.visibleHeightAtZDepth(),
            windowCenter : {x: window.innerWidth / 2, y: window.innerHeight / 2}
        }
    }

    set dragActive(bool) {
        gsap.to(this._state, {
            uZPosition: !bool ? 0 : -.2,
            duration  : 1.5,
            ease      : Elastic.easeOut.config(1.1, .35)
        })
    }

    init(imageWraps) {
        // TODO destroy existing setup
        imageWraps.forEach(imageWrap => this.addPlane(imageWrap))
    }

    updatePositions() {
        if (window.booted) {
            const diff = this._app.scroll._state.scrollPosition - this._state.lastScroll
            const totalScrollOffsetP = (diff) / window.innerHeight
            const inCanvas = totalScrollOffsetP * this._state.visibleHeight
            const scrollPos = (this._app.scroll._state.scrollPosition / window.innerHeight) * this._state.visibleHeight
            this._state.images.forEach(imgObj => {
                imgObj.mat.uniforms.uScrollSpeed.value = inCanvas
                imgObj.mat.uniforms.uScrollPosition.value = scrollPos
                imgObj.mat.uniforms.uZPosition.value = this._state.uZPosition
                imgObj.mat.uniforms.time.value = this._three.time
            })
            this._state.lastScroll = this._app.scroll._state.scrollPosition
        }
    }


    addPlane(imageWrap) {
        const img = imageWrap.querySelector('img')
        console.log(img.currentSrc)
        const tex = this.loader.load(img.currentSrc, texture => {
            const mat = this._mat.clone()
            const aspects = this.getImageAspectSides(img)
            mat.uniforms.uImage.value = tex
            mat.uniforms.uImageXScale.value = aspects.x
            mat.uniforms.uImageYScale.value = aspects.y
            console.log(aspects)
            const w = (imageWrap.clientWidth / window.innerWidth) * this._state.visibleWidth
            const h = (imageWrap.clientHeight / window.innerHeight) * this._state.visibleHeight
            const geo = new THREE.PlaneBufferGeometry(w, h, 20, 20)
            const mesh = new THREE.Mesh(geo, mat)
            const {x, y} = this.getOffsetToCenterInPercent(imageWrap)
            mesh.position.set(x * this._state.visibleWidth, y * this._state.visibleHeight, 0)
            this._three.scene.add(mesh)
            this._state.images.push({mesh, imageWrap, img, mat})
        })
    }

    getImageAspectSides(img) {
        const w = img.clientWidth
        const h = img.clientHeight
        const x = w > h ? 1 : (w / h) * 2;
        const y = w > h ? (h / w) * 2 : 1;
        return {x, y}
    }

    getOffsetToCenterInPercent(node) {
        const offset = getCumulativeElementOffset(node)
        const imgCenter = {
            x: (offset.left + node.clientWidth / 2),
            y: (offset.top + node.clientHeight / 2)
        }
        const imgOffset = {
            x: imgCenter.x < this._state.windowCenter.x ? (imgCenter.x - this._state.windowCenter.x) : (this._state.windowCenter.x - imgCenter.x),
            y: imgCenter.y < this._state.windowCenter.y ? (imgCenter.y - this._state.windowCenter.y) : (this._state.windowCenter.y - imgCenter.y),
        }
        return {
            x: imgOffset.x / window.innerWidth,
            y: imgOffset.y / window.innerHeight,
        }
    }

    setPlaneSizes() {
    }
}