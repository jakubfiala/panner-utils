# panner-utils

Utility functions to calculate vector values for the [Web Audio PannerNode](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode).

They convert between rotation around [aircraft principal axes](https://en.wikipedia.org/wiki/Aircraft_principal_axes)
to forward/up orientation vectors as required by the `AudioListener` and `PannerNode`
interfaces of the Web Audio API.

![Aircraft principal axes visualisation](https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Flight_dynamics_with_text.png/320px-Flight_dynamics_with_text.png)
[Image source](https://commons.wikimedia.org/wiki/File:Flight_dynamics_with_text.png)

```
npm i panner-utils
```

## Usage example

```js
const context = new AudioContext();
// point the listener 45 degrees to the left, 60 degrees up and tilt by 15 degrees
const listenerOrientation = calculateListenerOrientation(45, 60, -15);

context.listener.forwardX.setValueAtTime(listenerOrientation.forward.x, context.currentTime);
context.listener.forwardY.setValueAtTime(listenerOrientation.forward.y, context.currentTime);
context.listener.forwardZ.setValueAtTime(listenerOrientation.forward.z, context.currentTime);
context.listener.upX.setValueAtTime(listenerOrientation.up.x, context.currentTime);
context.listener.upY.setValueAtTime(listenerOrientation.up.y, context.currentTime);
context.listener.upZ.setValueAtTime(listenerOrientation.up.z, context.currentTime);

const panner = new PannerNode(context, { panningModel: 'HRTF' });
// point the panner 45 degrees to the right and 15 degrees up
const pannerOrientation = calculatePannerOrientation({ yaw: -45, pitch: 15 });

panner.orientationX.setValueAtTime(pannerOrientation.x, context.currentTime);
panner.orientationY.setValueAtTime(pannerOrientation.y, context.currentTime);
panner.orientationZ.setValueAtTime(pannerOrientation.z, context.currentTime);
```


## Reference

The module exports the following two functions:

### calculatePannerOrientation

This function takes two arguments, all defaulting to 0:

+ `yaw` – rotation around the Y axis (in degrees)
+ `pitch` – rotation around the X axis (in degrees)

and returns an object with properties `x, y, z` corresponding to the
`PannerNode.{orientationX,orientationY,orientationZ}` parameters.

You can also pass the arguments in a single object.

*Note: this function assumes that, at no rotation (`{ yaw: 0, pitch: 0 }`),
the panner is pointing **forward**, i.e. away from the listener. This is to harmonise the rotation
calculations for both the panner and listener, since by default in Web Audio,
the Panner is facing 90 degrees to the left.*

### calculateListenerOrientation

This function takes three arguments, all defaulting to 0:

+ `yaw` – rotation around the Y axis (in degrees)
+ `pitch` – rotation around the X axis (in degrees)
+ `roll` - rotation around the Z axis (in degrees)

and returns an object with properties `forward, up`,
each of which has the properties `x, y, z` corresponding to the
appropriate `PannerNode` parameters.

You can also pass the arguments in a single object.


