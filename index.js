// this function converts rotation angles to forward and up vectors
// we use the aircraft terms – HEADING, PITCH, ROLL – to denote axes of rotation
// https://en.wikipedia.org/wiki/Aircraft_principal_axes
//
// we use trigonometric functions to establish relationships between the vectors
// and ensure they each circumscribe a sphere as they rotate
const principalAxesToOrientation = (y = 0, p = 0, r = 0) => {
  const { yaw = 0, pitch = 0, roll = 0 } = typeof y === 'object'
    ? y
    : { yaw: y, pitch: p, roll: r };
  // vector determining which way the listener is facing
  const forward = {};
  // vector determining the rotation of the listener's head
  // where no rotation means the head is pointing up
  const up = {};

  // Heading (a.k.a. Yaw) is the rotation around the Y axis
  // convert to radians first
  const yawRad = yaw * (Math.PI / 180);
  // at 0 degrees, the X component should be 0
  //so we calculate it using sin(), which starts at 0
  forward.x = Math.sin(yawRad);
  // at 0 degrees, the Z component should be -1,
  // because the negative Z axis points *away from* the listener
  // so we calculate it using cos(), which starts at 1
  // with a phase shift of 90 degrees (or PI radians)
  forward.z = Math.cos(yawRad + Math.PI);

  // Pitch is the rotation around the X axis
  // we can use it to calculate both vectors' Y components
  const pitchRad = pitch * (Math.PI / 180);
  // Forward Y component should start at 0
  forward.y = Math.sin(pitchRad);
  // Up Y component should start at 1 (top of the head pointing up)
  up.y = Math.cos(pitchRad);

  // Roll is the rotation around the Z axis
  const rollRad = roll * (Math.PI / 180);
  // both X and Y components should start at 0
  // (top of the head pointing directly upwards)
  up.x = Math.sin(rollRad);
  up.z = Math.sin(rollRad);

  return { forward, up };
};

const calculateListenerOrientation = principalAxesToOrientation;
// PannerNode orientation is a special case where there's no pitch rotation,
// i.e. we only calculate the `forward` vector
const calculatePannerOrientation = (yaw, pitch) =>
  principalAxesToOrientation(yaw, pitch).forward;

module.exports = { calculatePannerOrientation, calculateListenerOrientation };
