import {preload} from "./preload";
import {Three} from "./three/three";
import {Cursor} from "./modules/Cursor";
import {nav} from "./simples/nav";

(function () {

    class App {
        constructor() {

            this.three = new Three({container: document.documentElement, app: this})
            this.cursor = new Cursor({app: this})
            this.three.init()

            this._state = {
                sphereSizeLocked: true
            }

            nav()
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        preload(({p}) => {console.log(p)}).then(() => window.app = new App())
    })
})()

