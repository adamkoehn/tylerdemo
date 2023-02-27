import { mat4 } from "gl-matrix";

export default class Triangle {
    constructor(context, shader) {
        this.gl = context.getGl();
        this.location = mat4.create();

        const vertices = [
            0.0, 0.5, 0.0, // top
            -0.5, -0.5, 0.0, // left
            0.5, -0.5, 0.0, // right
        ];

        this.vao = this.gl.createVertexArray();
        this.gl.bindVertexArray(this.vao);

        this.vbo = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbo);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

        this.gl.vertexAttribPointer(shader.getPositionLocation(), 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(shader.getPositionLocation());
    }

    update(delta) {
        mat4.rotate(this.location, this.location, delta, [0.0, 0.0, 1.0]);
    }

    draw(shader) {
        shader.setModelMatrix(this.location);
        this.gl.bindVertexArray(this.vao);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
    }
}