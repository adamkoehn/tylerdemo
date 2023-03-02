export default class Light {
    constructor() {
        this.position = [0.0, 0.0, 5.0];
        this.color = [0.96, 0.96, 0.96];
    }

    draw(shader) {
        shader.setLightPosition(this.position);
        shader.setLightColor(this.color);
    }
}