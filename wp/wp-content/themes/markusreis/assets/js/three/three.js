import * as THREE from 'three';

import fshader from './frag.frag';
import vshader from './vert.vert';
import {Elastic, gsap} from 'gsap';
import * as dat from 'dat.gui';

import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import {lerp} from "../utils";
import {SkewImages} from "./SkewImages";

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


export class Three {
    constructor({app, container = window}) {
        this._app = app;

        this.width = container === window ? window.innerWidth : container.clientWidth
        this.height = container === window ? window.innerHeight : container.clientHeight

        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, .1, 100)
        this.camera.position.set(0, 0, 4);
        this.camera.lookAt(0, 0, 0);

        this.scene = new THREE.Scene()
        this.scene.add(this.camera);
        this.scene.background = new THREE.Color('#181818');

        this.renderer = new THREE.WebGLRenderer({antialias: true})
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        if (container === window) {
            document.getElementById('content').prepend(this.renderer.domElement)
        } else {
            container.prepend(this.renderer.domElement)
        }

        this.controls = new OrbitControls(this.camera, this.renderer.domElement)

        this.onWindowResize();
        window.addEventListener('resize', this.onWindowResize.bind(this), false)

        this.addProperties()

        this.addPost()
        //this.addMouseMove()
        //this.addParticles();
        //this.removeParticles()

        this.skewImages = new SkewImages({three: this, app: app})
        this.skewImages.init([...document.querySelectorAll('.projects__images__inner .projects__image__inner')])

        this.animate()
    }

    setContainer(c) {
        this.width = c === window ? window.innerWidth : c.clientWidth
        this.height = c === window ? window.innerHeight : c.clientHeight
        this.onWindowResize()
        c.append(this.renderer.domElement)
    }

    init() {
        this.clock = new THREE.Clock()
        gsap.to(this.settings,
                {
                    progress: 1,
                    duration: this.settings.animationDuration,
                    ease    : Elastic.easeOut.config(this.settings.animationMax, this.settings.animationelasticness)
                }
        );
        setTimeout(() => {
            this._app._state.sphereSizeLocked = false
        }, 2000)
    }

    rotateAboutPoint(obj, point, axis, theta, pointIsWorld) {
        pointIsWorld = (pointIsWorld === undefined) ? false : pointIsWorld;

        if (pointIsWorld) {
            obj.parent.localToWorld(obj.position); // compensate for world coordinate
        }

        obj.position.sub(point); // remove the offset
        obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
        obj.position.add(point); // re-add the offset

        if (pointIsWorld) {
            obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
        }

        obj.rotateOnAxis(axis, theta); // rotate the OBJECT
    }

    sphereTo(progress, max, elasticness) {
        gsap.to(this.settings,
                {
                    progress: progress,
                    duration: this.settings.animationDuration,
                    ease    : Elastic.easeOut.config(!!max ? max : this.settings.animationMax, !!elasticness ? elasticness : this.settings.animationelasticness)
                }
        );
    }

    setMaxColorShift(v, max, elasticness) {
        gsap.to(this.settings, {
            maxColorShift: v,
            ease         : Elastic.easeOut.config(!!max ? max : this.settings.animationMax, !!elasticness ? elasticness : this.settings.animationelasticness)
        })
    }

    setSphereScale(v, max, elasticness) {
        gsap.to(this.settings, {
            progress: v,
            ease    : Elastic.easeOut.config(!!max ? max : this.settings.animationMax, !!elasticness ? elasticness : this.settings.animationelasticness)
        })
    }

    addPost() {
        const renderScene = new RenderPass(this.scene, this.camera);

        this.bloomPass = new UnrealBloomPass(new THREE.Vector2(this.width, this.height), 1, 1, 1);
        this.bloomPass.threshold = this.settings.bloomThreshold;
        this.bloomPass.strength = this.settings.bloomStrength;
        this.bloomPass.radius = this.settings.bloomRadius;

        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(renderScene);
        this.composer.addPass(this.bloomPass);
    }

    addProperties() {

        this.time = 0
        this.lerpMousePosition = new THREE.Vector3()
        this.raycaster = new THREE.Raycaster()

        this.settings = {
            time                  : 0,
            bloomThreshold        : .3,
            bloomStrength         : .9,
            bloomRadius           : .3,
            perfectShortSideLength: 850,
            shortSideFactorImpact : 1,
            progress              : 0,
            animationDuration     : 6.5,
            recoverySpeed         : 1,
            maxColorShift         : 1,
            animationMax          : 2.3,
            pointLightIntensity   : .2,
            pointLightDistance    : 5,
            pointLightIntensity2  : .2,
            pointLightDistance2   : 5,
            pointLightDistance2z  : .2,
            animationelasticness  : .25,
            runAnimation() {
                this.progress = 0;
                setTimeout(() => {
                    gsap.to(this,
                            {
                                progress: 1,
                                duration: this.animationDuration,
                                ease    : Elastic.easeOut.config(this.animationMax, this.animationelasticness)
                            }
                    );
                }, 100)
            }
        }


        //this.gui = new dat.GUI();
        //this.gui.closed = true
        //this.gui.add(this.settings, "pointLightIntensity", 0, 1, 0.01)
        //this.gui.add(this.settings, "pointLightDistance", 0, 20, 0.01)
        //this.gui.add(this.settings, "pointLightIntensity2", 0, 1, 0.01)
        //this.gui.add(this.settings, "pointLightDistance2", 0, 20, 0.01)
        //this.gui.add(this.settings, "pointLightDistance2z", 0, 2, 0.01)
    }

    setMousePosition({x, y}) {
        if (this.lastMousePosition) {
            this.lastMousePosition.x = (x / this.width) * 2 - 1
            this.lastMousePosition.y = (y / this.height) * 2 - 1
            this.raycaster.setFromCamera(this.lastMousePosition, this.camera)
            const intersects = this.raycaster.intersectObject(this.testPlane)
            if (intersects.length > 0) {
                intersects[0].point.y = -intersects[0].point.y
                this.mousePosition = intersects[0].point
            }
        }
    }

    addMouseMove() {
        this.testPlane = new THREE.Mesh(new THREE.PlaneBufferGeometry(10, 10), new THREE.MeshBasicMaterial())
        this.mousePosition = new THREE.Vector3(0, 0, -10)
        this.lastMousePosition = {x: 0, y: 0}
    }

    addParticles() {
        this.particleGeometry = new THREE.BufferGeometry()
        this.particleMaterial = new THREE.ShaderMaterial(
            {
                vertexShader  : vshader,
                fragmentShader: fshader,
                blending      : THREE.AdditiveBlending,
                depthWrite    : false,
                uniforms      : {
                    time              : new THREE.Uniform(0),
                    mousePosition     : this.mousePosition,
                    particleSizeFactor: {value: 1},
                    progress          : {value: 0},
                    recoverySpeed     : {value: this.settings.recoverySpeed},
                    animationDuration : {value: this.settings.animationDuration},
                    maxColorShift     : {value: this.settings.maxColorShift}
                }
            }
        )
        this.particleMaterial.transparent = true

        const shortSide = this.width < this.height ? this.width : this.height;
        const particleCount = Math.ceil(5000 * (shortSide / this.settings.perfectShortSideLength))

        const positions = new Float32Array(particleCount * 3)
        const animationRandomness = new Float32Array(particleCount)
        const randomnessRecovery = new Float32Array(particleCount)
        const colorRandomness = new Float32Array(particleCount * 3)

        let inc = Math.PI * (3 - Math.sqrt(5))
        let offset = 2 / particleCount


        for (let i = 0; i < particleCount; i++) {

            const y = i * offset - 1 + (offset / 2)
            const r = Math.sqrt(1 - y * y)
            const phi = i * inc

            positions[i * 3] = Math.cos(phi) * r
            positions[i * 3 + 1] = y
            positions[i * 3 + 2] = Math.sin(phi) * r

            animationRandomness[i] = Math.random() * 1.25
            randomnessRecovery[i] = Math.random()

            colorRandomness[i * 3] = Math.random() - .5
            colorRandomness[i * 3 + 1] = Math.random() - .5
            colorRandomness[i * 3 + 2] = Math.random() - .5
        }

        this.particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        this.particleGeometry.setAttribute('animationRandomness', new THREE.BufferAttribute(animationRandomness, 1))
        this.particleGeometry.setAttribute('randomnessRecovery', new THREE.BufferAttribute(animationRandomness, 1))
        this.particleGeometry.setAttribute('colorRandomness', new THREE.BufferAttribute(colorRandomness, 3))

        this.particles = new THREE.Points(this.particleGeometry, this.particleMaterial)

        this.scene.add(this.particles)
    }

    animate() {
        this.time = !!this.clock ? this.clock.getElapsedTime() : 0

        if (this.particles) {
            this.lerpMousePosition.x = lerp(this.lerpMousePosition.x, this.mousePosition.x, .05)
            this.lerpMousePosition.y = lerp(this.lerpMousePosition.y, this.mousePosition.y, .05)
            this.lerpMousePosition.z = lerp(this.lerpMousePosition.z, this.mousePosition.z, .05)

            const shortSide = this.width < this.height ? this.width : this.height;
            const shortSideFactor = Math.pow(shortSide / this.settings.perfectShortSideLength, this.settings.shortSideFactorImpact)

            this.particleMaterial.uniforms.mousePosition.value = this.lerpMousePosition
            this.particleMaterial.uniforms.particleSizeFactor.value = shortSideFactor
            this.particleMaterial.uniforms.progress.value = this.settings.progress
            this.particleMaterial.uniforms.recoverySpeed.value = this.settings.recoverySpeed
            this.particleMaterial.uniforms.animationDuration.value = this.settings.animationDuration
            this.particleMaterial.uniforms.maxColorShift.value = this.settings.maxColorShift

            this.bloomPass.strength = this.settings.bloomStrength * shortSideFactor
            this.particleMaterial.uniforms.time.value = this.time
            this.composer.render();
        } else {
            this.renderer.render(this.scene, this.camera);

            this.skewImages.updatePositions()
        }
        requestAnimationFrame(this.animate.bind(this));
    }

    visibleHeightAtZDepth(depth = 0) {
        return (2 * Math.tan(this.camera.fov * Math.PI / 180 / 2) * (this.camera.position.z - depth));
    };

    visibleWidthAtZDepth(depth = 0) {
        return this.visibleHeightAtZDepth(depth) * this.camera.aspect;
    };

    onWindowResize() {
        this.camera.aspect = this.width / this.height
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
    }
}
