import reducer from './reducer';

describe('Reducer utilities', ()=> {
  it('returns the reduced state if the action reducer is not undefined', ()=> {
    const defaultState = {testState: false, unchanged: false};
    const testReducer = reducer(defaultState, {
      'test/action': (state, {testState})=> ({
        ...state,
        testState
      })
    });
    const action = ()=> ({
      type: 'test/action',
      testState: true
    });

    expect(testReducer(undefined, action())).toEqual({
      testState: true,
      unchanged: false
    });
  });
});
