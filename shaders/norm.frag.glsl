#version 300 es

precision highp float;

float specularStrength = 0.5;

in vec2 TexCoords;
in vec3 FragPosition;
in vec3 FragNormal;

uniform vec3 LightColor;
uniform vec3 LightPosition;
uniform vec3 CameraPosition;
uniform sampler2D FragTexture;

out vec4 FragColor;

void main() {
    vec3 normal = normalize(FragNormal);

    FragColor = vec4(normal, 1.0);
}