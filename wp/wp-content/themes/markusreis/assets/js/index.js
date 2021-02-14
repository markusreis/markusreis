import {preload} from "./preload";
import {Three} from "./three/three";
import {Cursor} from "./modules/Cursor";
import {nav} from "./simples/nav";
import {Scroll} from "./modules/Scroll";

(function () {

    class App {
        constructor() { this.init(); }

        init() {
            this.three = new Three({container: document.documentElement, app: this})
            this.cursor = new Cursor({app: this})
            this.three.init()

            this.scroll = new Scroll({app: this})

            this._state = {
                sphereSizeLocked: true
            }

            nav()

            window.booted = true
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        preload(({p}) => {console.log(p)}).then(() => window.app = new App())
    })
})()