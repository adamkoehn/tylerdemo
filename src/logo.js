import logoData from "../model/TylerTechnologies.obj"
import { OBJ } from "webgl-obj-loader";
import { mat4 } from "gl-matrix";

export default class Logo {
    constructor(context, shader) {
        this.context = context;
        this.gl = context.getGl();
        this.model = mat4.create();
        mat4.translate(this.model, this.model, [0.0, 0.2, 0.0]);
        mat4.scale(this.model, this.model, [0.02, 0.02, 0.02]);
        mat4.rotate(this.model, this.model, (90.0 * Math.PI) / 180.0, [1.0, 0.0, 0.0]);
        mat4.rotate(this.model, this.model, (90.0 * Math.PI) / 180.0, [0.0, -1.0, 0.0]);

        this.mesh = new OBJ.Mesh(logoData);
        OBJ.initMeshBuffers(this.gl, this.mesh);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.mesh.vertexBuffer);
        this.gl.vertexAttribPointer(shader.getPositionLocation(), this.mesh.vertexBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(shader.getPositionLocation());
    }

    update(delta) {
        const degrees = (90.0 * delta);
        mat4.rotate(this.model, this.model, (degrees * Math.PI) / 180.0, [-1.0, 0.2, 0.4]);
    }

    draw(shader) {
        shader.setModelMatrix(this.model);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.mesh.indexBuffer);
        this.gl.drawElements(this.gl.TRIANGLES, this.mesh.indexBuffer.numItems, this.gl.UNSIGNED_SHORT, 0);
    }
}