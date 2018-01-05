import { responsiveStateReducer } from 'redux-responsive';
import { combineReducers } from 'redux';
import responsiveDrawer from 'material-ui-responsive-drawer/lib/store/reducer';
import formReducer from 'redux-form/lib/reducer';
import initState from './init'
import dialogs from './dialogs/reducer';
//import { appReducers } from 'rmw-shell/lib/store/reducers'
import persistentValues from './persistentValues/reducer';
import simpleValues from './simpleValues/reducer';
import locale from './locale/reducer';
import theme from './theme/reducer';
import firekitReducers from 'firekit';
import filterReducer from 'material-ui-filter/lib/store/reducer';
import rootReducer from './rootReducer';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

export var appReducers = _extends({}, firekitReducers, {
  browser: responsiveStateReducer,
  dialogs: dialogs,
  filters: filterReducer,
  form: formReducer,
  locale: locale,
  persistentValues: persistentValues,
  responsiveDrawer: responsiveDrawer,
  simpleValues: simpleValues,
  theme: theme
});

var appReducer = combineReducers(appReducers);

export default (state, action) => rootReducer(appReducer, initState, state, action)
