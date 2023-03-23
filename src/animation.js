export default class Animation {
    constructor(context, shaders, controller, light, camera, logo) {
        this.context = context;
        this.shaders = shaders;
        this.controller = controller;
        this.light = light;
        this.camera = camera;
        this.logo = logo;
        this.last = 0.0;
        this.drawFrame = this.draw.bind(this);
        
        this.shader = null;
        this.availableShaders = Object.keys(shaders);
        this.currentShaderIndex = 0;
        this.useShader(this.availableShaders[this.currentShaderIndex]);

        this.controller.setCycleShader(this.cycleShader.bind(this));
    }

    useShader() {
        const name = this.availableShaders[this.currentShaderIndex];
        this.shader = this.shaders[name];

        this.shader.use();
        this.camera.configure(this.shader);
        this.light.draw(this.shader);
    }

    cycleShader() {
        const nextIndex = this.currentShaderIndex + 1 >= this.availableShaders.length ? 0 : this.currentShaderIndex + 1;
        this.currentShaderIndex = nextIndex;
        this.useShader();
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