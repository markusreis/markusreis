uniform float time;
uniform vec3 mousePosition;
uniform float particleSizeFactor;
uniform float progress;
uniform float recoverySpeed;
uniform float animationDuration;
uniform float maxColorShift;

attribute float animationRandomness;
attribute float randomnessRecovery;
attribute vec3 colorRandomness;

varying vec3 vColorRandomness;
varying float vColorShift;
varying float vParticleSizeFactor;
varying float vAnimationProgress;
varying float vMaxColorShift;

void main() {
    vec3 p = position;

    vec3 distance = p - mousePosition;
    vec3 dir = normalize(distance);
    float distanceLength = length(distance);

    float force = clamp(1. / (distanceLength * distanceLength), 0., 1.) * .5;

    p += dir * force;

    p.y += .1  * (sin(p.y*3. + time * 2.) * .5 + .5);
    p.z += .05 * (sin(p.y*8. + time * .5) * .5 + .5);

    float animationProgress = (animationRandomness * max(0., 1. - time / (animationRandomness * animationDuration * .18)) + 1.);
    //p *= progress * animationProgress ;
    p *= progress * animationProgress + max(0., progress - 1.) * animationRandomness;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.);
    gl_PointSize = 30. * (1. / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;

    vColorShift = clamp(1. / (distanceLength * distanceLength), 0., 20.) * .2;
    vParticleSizeFactor = particleSizeFactor;
    vAnimationProgress = animationProgress;
    vColorRandomness = colorRandomness;
    vMaxColorShift = maxColorShift;
}




