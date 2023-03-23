function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(`shader compile error`, gl.getShaderInfoLog(shader));
    }

    return shader;
}

function linkProgram(gl, vertSource, fragSource) {
    const vertShader = loadShader(gl, gl.VERTEX_SHADER, vertSource);
    const fragShader = loadShader(gl, gl.FRAGMENT_SHADER, fragSource);
    const program = gl.createProgram();

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(`program link error`, gl.getProgramInfoLog(program));
    }

    gl.deleteShader(vertShader);
    gl.deleteShader(fragShader);

    return program;
}

export default class Shader {
    constructor(context, vertSource, fragSource) {
        this.gl = context.getGl();
        this.program = linkProgram(this.gl, vertSource, fragSource);
        this.lightPosition = this.gl.getUniformLocation(this.program, 'LightPosition');
        this.lightColor = this.gl.getUniformLocation(this.program, 'LightColor');
        this.cameraPosition = this.gl.getUniformLocation(this.program, 'CameraPosition');
        this.modelMatrix = this.gl.getUniformLocation(this.program, 'ModelMatrix');
        this.viewMatrix = this.gl.getUniformLocation(this.program, 'ViewMatrix');
        this.projectionMatrix = this.gl.getUniformLocation(this.program, 'ProjectionMatrix');
        this.normalMatrix = this.gl.getUniformLocation(this.program, 'NormalMatrix');
    }

    getVertexLocation() {
        return this.vertexLocation;
    }

    setLightPosition(lightPosition) {
        this.gl.uniform3fv(this.lightPosition, lightPosition);
    }

    setLightColor(lightColor) {
        this.gl.uniform3fv(this.lightColor, lightColor);
    }

    setCameraPosition(cameraPosition) {
        this.gl.uniform3fv(this.cameraPosition, cameraPosition);
    }

    setModelMatrix(modelMatrix) {
        this.gl.uniformMatrix4fv(this.modelMatrix, false, modelMatrix);
    }

    setViewMatrix(viewMatrix) {
        this.gl.uniformMatrix4fv(this.viewMatrix, false, viewMatrix);
    }

    setProjectionMatrix(projectionMatrix) {
        this.gl.uniformMatrix4fv(this.projectionMatrix, false, projectionMatrix);
    }

    setNormalMatrix(normalMatrix) {
        this.gl.uniformMatrix3fv(this.normalMatrix, false, normalMatrix);
    }

    use() {
        this.gl.useProgram(this.program);
    }
}
