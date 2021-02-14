uniform float time;
uniform float uScrollSpeed;
uniform float uScrollPosition;
uniform float uZPosition;

varying vec2 vUv;

void main() {

    vec3 pos = position;
    vUv = uv;

    pos.y += uScrollPosition;
    pos.y += (-uScrollSpeed) * (pos.x * pos.x  * .15);

    vUv.y += uScrollSpeed * -1.5;

    pos.z = uZPosition;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}