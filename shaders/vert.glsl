#version 300 es

layout (location = 0) in vec3 Vertex;
layout (location = 1) in vec2 UV;
layout (location = 2) in vec3 Normal;

out vec2 TexCoords;
out vec3 FragPosition;
out vec3 FragNormal;

uniform mat3 NormalMatrix;
uniform mat4 ModelMatrix;
uniform mat4 ViewMatrix;
uniform mat4 ProjectionMatrix;

void main() {
    TexCoords = UV;
    FragNormal = NormalMatrix * Normal;
    FragPosition = vec3(ModelMatrix * vec4(Vertex, 1.0));
    gl_Position = ProjectionMatrix * ViewMatrix * ModelMatrix * vec4(Vertex, 1.0);
}
