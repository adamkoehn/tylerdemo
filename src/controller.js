export default class Controller {
    constructor() {
        this.clicked = false;
        this.moveX = 0;
        this.moveY = 0;
        this.startTouchX = 0;
        this.startTouchY = 0;
        this.paused = false;
        this.reset = false;
        this.wireframe = false;
        this.cycleShader = () => {};

        document.addEventListener('mousedown', this.mouseDown.bind(this));
        document.addEventListener('mouseup', this.mouseUp.bind(this));
        document.addEventListener('mousemove', this.mouseMove.bind(this));
        document.addEventListener('touchstart', this.touchStart.bind(this));
        document.addEventListener('touchend', this.touchEnd.bind(this));
        document.addEventListener('touchmove', this.touchMove.bind(this));
        document.addEventListener('keydown', this.keyDown.bind(this));
        document.addEventListener('keyup', this.keyUp.bind(this));
    }

    keyDown(event) {
        switch (event.key) {
            case ' ':
                this.paused = !this.paused;
                break;

            case 'r':
                this.reset = true;
                break;

            case 'w':
                this.wireframe = !this.wireframe;
                break;

            case 's':
                this.cycleShader();
                break;
        }
    }

    keyUp(event) {
        switch (event.key) {
            case 'r':
                this.reset = false;
                break;
        }
    }

    setCycleShader(fn) {
        this.cycleShader = fn;
    }

    shouldReset() {
        return this.reset;
    }

    isPaused() {
        return this.paused;
    }

    shouldDrawWireframe() {
        return this.wireframe;
    }

    touchStart(event) {
        this.clicked = true;
        this.startTouchX = event.touches[0].screenX;
        this.startTouchY = event.touches[0].screenY;
    }

    touchEnd() {
        this.clicked = false;
    }

    touchMove(event) {
        this.moveX = (event.touches[0].screenX - this.startTouchX) / 20.0;
        this.moveY = (event.touches[0].screenY - this.startTouchY) / 20.0;
    }

    mouseUp() {
        this.clicked = false;
    }

    mouseDown() {
        this.clicked = true;
    }

    mouseMove(event) {
        this.moveX = event.movementX;
        this.moveY = event.movementY;
    }

    isClicked() {
        return this.clicked;
    }

    getMovementX() {
        return this.moveX;
    }

    getMovementY() {
        return this.moveY;
    }
}