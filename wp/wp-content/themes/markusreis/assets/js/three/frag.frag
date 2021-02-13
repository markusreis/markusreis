uniform float time;

varying float vColorShift;
varying float vParticleSizeFactor;
varying float vAnimationProgress;
varying vec3 vColorRandomness;
varying float vMaxColorShift;


void main() {

    gl_FragColor = vec4(0.886, 0.961, 1.000, .6);
    gl_FragColor = vec4(gl_PointCoord, 1.000, .6);

    float strength = (.075 *  vParticleSizeFactor) / distance(gl_PointCoord, vec2(.5));

    float a = length(gl_PointCoord - vec2(0.5));
    a =  smoothstep(.025, .5, a);

    float colorImpact = .05;

    vec3 color = vec3(
    strength + (vColorShift) * .1 * vParticleSizeFactor,
    strength + (vColorShift) * .75 * vParticleSizeFactor,
    strength + (vColorShift) * .7 * vParticleSizeFactor);

    color = color + 3. * (vColorRandomness * (vMaxColorShift - vAnimationProgress));

    gl_FragColor = vec4(color, (.95 - a) * min(.95, time * 3.5));
}