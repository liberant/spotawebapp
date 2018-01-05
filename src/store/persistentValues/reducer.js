

import * as types from './types';
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

export default function persistentValues() {
  var _extends2;

  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];


  switch (action.type) {
    case types.ON_PERSISTENT_VALUE_CHANGED:
      return _extends({}, state, (_extends2 = {}, _extends2[action.id] = action.value, _extends2));
    default:
      return state;
  }
}