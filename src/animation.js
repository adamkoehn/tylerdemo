export default class Animation {
    constructor(context, shader, camera, logo) {
        this.context = context;
        this.shader = shader;
        this.camera = camera;
        this.logo = logo;
        this.last = 0.0;
        this.drawFrame = this.draw.bind(this);
    }

    start() {
        requestAnimationFrame(this.drawFrame);
    }

    draw(current) {
        current *= 0.001;
        const delta = current - this.last;
        this.last = current;

        this.logo.update(delta);

        this.context.clear();
        this.camera.draw(this.shader);
        this.logo.draw(this.shader);
        
        requestAnimationFrame(this.drawFrame);
    }
}