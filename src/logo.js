import logoData from "../model/TylerTechnologies.obj"
import { OBJ } from "webgl-obj-loader";
import { mat4 } from "gl-matrix";

export default class Logo {
    constructor(context, controller) {
        this.context = context;
        this.controller = controller;
        this.gl = context.getGl();
        this.model = mat4.create();

        this.loadModel();
    }

    loadModel() {
        mat4.scale(this.model, this.model, [0.02, 0.02, 0.02]);
        mat4.rotate(this.model, this.model, (90.0 * Math.PI) / 180.0, [1.0, 0.0, 0.0]);

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
        
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.mesh.indexBuffer);
    }

    update(delta) {
        if (this.controller.isClicked()) {
            mat4.rotate(this.model, this.model, ((this.controller.getMovementX() * 20.0) * delta * Math.PI) / 180.0, [0.0, 1.0, 0.0]);
            mat4.rotate(this.model, this.model, ((this.controller.getMovementY() * 20.0) * delta * Math.PI) / 180.0, [1.0, 0.0, 0.0]);
        } else {
            const degrees = (90.0 * delta);
            mat4.rotate(this.model, this.model, (degrees * Math.PI) / 180.0, [0.2, 0.4, 1.0]);
        }
    }

    draw(shader) {
        shader.setModelMatrix(this.model);
        this.gl.drawElements(this.gl.TRIANGLES, this.mesh.indexBuffer.numItems, this.gl.UNSIGNED_SHORT, 0);
    }
}