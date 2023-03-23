import Context from './context'
import Shader from './shader'
import Animation from './animation'
import Camera from './camera';
import Logo from './logo';
import Controller from './controller';
import Light from './light';

// shaders
import standardVertSource from '../shaders/std.vert.glsl';
import standardFragSource from '../shaders/std.frag.glsl';
import normalFragSource from '../shaders/norm.frag.glsl';
import specularFragSource from '../shaders/spec.frag.glsl';

(function() {
    const context = new Context();
    const standardShader = new Shader(context, standardVertSource, standardFragSource);
    const normalShader = new Shader(context, standardVertSource, normalFragSource);
    const specularShader = new Shader(context, standardVertSource, specularFragSource);
    standardShader.use();

    const controller = new Controller();
    const logo = new Logo(context, controller);
    const camera = new Camera(context);
    const light = new Light();
    const shaders = {'std': standardShader, 'norm': normalShader, 'spec': specularShader};
    const animation = new Animation(context, shaders, controller, light, camera, logo);

    animation.useShader('std');

    context.configure();
    animation.start();
})();
