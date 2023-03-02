#version 300 es

precision highp float;

in vec2 TexCoords;
in vec3 FragPosition;
in vec3 FragNormal;

uniform vec3 LightColor;
uniform vec3 LightPosition;
uniform sampler2D FragTexture;

out vec4 FragColor;

void main() {
    vec3 normal = normalize(FragNormal);
    vec3 lightDirection = normalize(LightPosition - FragPosition);
    float diff = max(dot(normal, lightDirection), 0.0);
    vec3 diffuse = diff * vec3(1.0);

    FragColor = vec4(diffuse, 1.0) * texture(FragTexture, TexCoords);
}