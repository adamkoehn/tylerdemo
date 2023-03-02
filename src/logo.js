import logoData from "../model/TylerTechnologies.obj"
import { OBJ } from "webgl-obj-loader";
import { mat3, mat4 } from "gl-matrix";

export default class Logo {
    constructor(context, controller) {
        this.context = context;
        this.controller = controller;
        this.gl = context.getGl();
        this.modelMatrix = mat4.create();
        this.normalMatrix = mat3.create();

        this.resetModel();
        this.loadModel();
    }

    resetModel() {
        this.modelMatrix = mat4.create();
        mat4.scale(this.modelMatrix, this.modelMatrix, [0.02, 0.02, 0.02]);
        mat4.rotate(this.modelMatrix, this.modelMatrix, (90.0 * Math.PI) / 180.0, [1.0, 0.0, 0.0]);
    }

    loadModel() {
        this.mesh = new OBJ.Mesh(logoData);
        OBJ.initMeshBuffers(this.gl, this.mesh);

        const texture = this.gl.createTexture();
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array([142, 154, 73, 255]));

        const image = new Image();
        image.onload = () => {
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
            this.gl.generateMipmap(this.gl.TEXTURE_2D);
        };
        image.src = 'TylerTechnologies.png';

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.mesh.vertexBuffer);
        this.gl.vertexAttribPointer(0, this.mesh.vertexBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(0);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.mesh.textureBuffer);
        this.gl.vertexAttribPointer(1, this.mesh.textureBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(1);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.mesh.normalBuffer);
        this.gl.vertexAttribPointer(2, this.mesh.normalBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(2);
        
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.mesh.indexBuffer);
    }

    update(delta) {
        if (this.controller.isClicked()) {
            mat4.rotate(this.modelMatrix, this.modelMatrix, ((this.controller.getMovementX() * 20.0) * delta * Math.PI) / 180.0, [0.0, 0.0, 1.0]);
            mat4.rotate(this.modelMatrix, this.modelMatrix, ((this.controller.getMovementY() * 20.0) * delta * Math.PI) / 180.0, [1.0, 0.0, 0.0]);
        } else if (this.controller.shouldReset()) {
            this.resetModel();
        } else if (!this.controller.isPaused()) {
            const degrees = (90.0 * delta);
            mat4.rotate(this.modelMatrix, this.modelMatrix, (degrees * Math.PI) / 180.0, [0.2, 0.4, 1.0]);
        }

        let normalMatrix = mat4.create();
        mat4.invert(normalMatrix, this.modelMatrix);
        mat4.transpose(normalMatrix, normalMatrix);
        mat3.fromMat4(this.normalMatrix, normalMatrix);
    }

    draw(shader) {
        shader.setModelMatrix(this.modelMatrix);
        shader.setNormalMatrix(this.normalMatrix);
        this.gl.drawElements(this.gl.TRIANGLES, this.mesh.indexBuffer.numItems, this.gl.UNSIGNED_SHORT, 0);
    }
}
