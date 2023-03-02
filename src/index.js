import Context from './context'
import Shader from './shader'
import Animation from './animation'
import Camera from './camera';
import Logo from './logo';
import Controller from './controller';
import Light from './light';

(function() {
    const context = new Context();
    const shader = new Shader(context);

    shader.use();
    const controller = new Controller();
    const logo = new Logo(context, controller);
    const camera = new Camera(context);
    const light = new Light();
    
    camera.configure(shader);
    light.draw(shader);

    const animation = new Animation(context, shader, camera, logo);

    context.configure();
    animation.start();
})();
