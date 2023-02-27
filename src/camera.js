import { mat4 } from "gl-matrix";

export default class Camera {
    constructor(context) {
        this.context = context;
        this.aspect = this.context.getWidth() / this.context.getHeight();
        this.projection = mat4.create();
        this.view = mat4.create();

        mat4.perspective(this.projection, (45.0 * Math.PI) / 180.0, this.aspect, 0.1, 100.0);
        mat4.lookAt(this.view, [0.0, 0.0, 3.0], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]);
    }

    configure(shader) {
        shader.setProjectionMatrix(this.projection);
    }

    draw(shader) {
        shader.setViewMatrix(this.view);
    }
}