

import React from 'react';
import PropTypes from 'prop-types';
import config from './config';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var withAppConfigs = function withAppConfigs(Component) {
  var ChildComponent = function ChildComponent(props, context) {
    var appConfig = context.appConfig;


    return React.createElement(Component, _extends({
      appConfig: _extends({}, config, appConfig)
    }, props));
  };

  ChildComponent.contextTypes = {
    appConfig: PropTypes.object.isRequired
  };

  return ChildComponent;
};

export default withAppConfigs;