uniform float time;
uniform float uImageXScale;
uniform float uImageYScale;
uniform float uScrollSpeed;
uniform sampler2D uImage;

varying vec2 vUv;

uniform float uImageAspect;

float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {

    vec2 newUV = vec2(
    map(vUv.x, 0., 1., 0.5 - uImageXScale / 2., 0.5 + uImageXScale / 2.),
    map(vUv.y, 0., 1., 0.5 - uImageYScale / 2., 0.5 + uImageYScale / 2.)
    );

    float r = texture2D(uImage, newUV + (vec2(.025, .015) * uScrollSpeed)).r;
    float g  = texture2D(uImage, newUV - (vec2(.02, .025) * uScrollSpeed)).g;
    float b = texture2D(uImage, newUV + (vec2(.012, .02) * uScrollSpeed)).b;

    vec4 img = texture2D(uImage, newUV);

    gl_FragColor = img;
}