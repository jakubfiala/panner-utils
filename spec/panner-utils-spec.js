const { calculatePannerOrientation, calculateListenerOrientation }
  = require('../index.js');

const expectVectorToBeCloseTo = (vector, target) => {
  return ['x', 'y', 'z'].forEach(d => expect(vector[d]).toBeCloseTo(target[d]));
}

const SpecData = require('./spec-data.js');

describe('calculatePannerOrientation function', () => {
  it('does not return the default vector with no arguments', () => {
    expect(calculatePannerOrientation()).not.toEqual(SpecData.PANNER_DEFAULT_ORIENTATION);
  });

  it('returns a forward-facing vector with no arguments', () => {
    expect(calculatePannerOrientation()).toEqual(SpecData.FORWARD_ORIENTATION);
  });

  it('returns the correct orientation vector when rotated towards the top-left corner', () => {
    const calculated = calculatePannerOrientation(SpecData.PANNER_TOP_LEFT_ROTATION);
    expectVectorToBeCloseTo(calculated, SpecData.PANNER_TOP_LEFT_ORIENTATION);
  });
});


describe('calculateListenerOrientation function', () => {
  it('returns a forward-facing vector with no arguments', () => {
    expect(calculateListenerOrientation()).toEqual({
      forward: SpecData.FORWARD_ORIENTATION,
      up: SpecData.UP_ORIENTATION
    });
  });

  it('returns the correct up vector when rotated towards the top-left corner and tilted', () => {
    const { up } = calculateListenerOrientation(SpecData.LISTENER_TOP_LEFT_TILT_ROTATION);
    expectVectorToBeCloseTo(up, SpecData.LISTENER_TOP_LEFT_TILT_UP_VECTOR);
  });
});
