import * as types from './types';

var theme = function theme() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'light';
  var action = arguments[1];

  switch (action.type) {
    case types.UPDATE_THEME:
      return action.theme;

    default:
      return state;
  }
};

export default theme;