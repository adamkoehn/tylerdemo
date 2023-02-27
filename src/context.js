export default class Context {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.gl = this.canvas.getContext('webgl2');
        this.width =  this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;
    }

    getGl() {
        return this.gl;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    configure() {
        this.gl.clearColor(0.96, 0.96, 0.96, 1.0);
        this.gl.clearDepth(1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
    }

    clear() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
}