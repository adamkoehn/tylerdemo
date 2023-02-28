#version 300 es

layout (location = 0) in vec3 Vertex;
layout (location = 1) in vec2 UVs;

out vec2 TexCoords;

uniform mat4 ModelMatrix;
uniform mat4 ViewMatrix;
uniform mat4 ProjectionMatrix;

void main() {
    TexCoords = UVs;
    gl_Position = ProjectionMatrix * ViewMatrix * ModelMatrix * vec4(Vertex, 1.0);
}
