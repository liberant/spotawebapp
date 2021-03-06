

import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { fade } from 'material-ui/utils/colorManipulator';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Scrollbar = function Scrollbar(props) {
  var muiTheme = props.muiTheme,
      rest = _objectWithoutProperties(props, ['muiTheme']);

  var thumbStyle = {
    backgroundColor: fade(muiTheme.palette.primary1Color, 0.65),
    borderRadius: 3
  };

  return React.createElement(Scrollbars, _extends({
    renderThumbVertical: function renderThumbVertical(_ref) {
      var style = _ref.style,
          p = _objectWithoutProperties(_ref, ['style']);

      return React.createElement('div', _extends({ style: _extends({}, style, thumbStyle) }, p));
    }
  }, rest));
};

export default muiThemeable()(Scrollbar);