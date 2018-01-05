

import * as authTypes from './auth/types';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var rootReducer = function rootReducer(appReducer, initState, state, action) {
  if (action.type === authTypes.USER_LOGOUT) {
    var _state = state,
        responsiveDrawer = _state.responsiveDrawer,
        browser = _state.browser;

    state = _extends({ responsiveDrawer: responsiveDrawer, browser: browser }, initState);
  }

  return appReducer(state, action);
};

export default rootReducer;