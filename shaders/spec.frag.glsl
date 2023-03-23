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
    vec3 lightDirection = normalize(LightPosition - FragPosition);
    float diff = max(dot(normal, lightDirection), 0.0);
    vec3 diffuse = diff * vec3(1.0);

    vec3 viewDirection = normalize(CameraPosition - FragPosition);
    vec3 reflectionDirection = reflect(-lightDirection, normal);
    float spec = pow(max(dot(viewDirection, reflectionDirection), 0.0), 32.0);
    vec3 specular = specularStrength * spec * LightColor;

    FragColor = vec4(specular, 1.0);
}