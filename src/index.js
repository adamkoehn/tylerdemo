import Context from './context'
import Shader from './shader'
import Animation from './animation'
import Camera from './camera';
import Logo from './logo';

(function() {
    const context = new Context();
    const shader = new Shader(context);

    shader.use();
    const logo = new Logo(context, shader);
    const camera = new Camera(context);
    camera.configure(shader);

    const animation = new Animation(context, shader, camera, logo);

    context.configure();
    animation.start();
})();
