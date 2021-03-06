

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var RestrictedRoute = function RestrictedRoute(_ref) {
  var type = _ref.type,
      isAuthorised = _ref.isAuthorised,
      Component = _ref.component,
      rest = _objectWithoutProperties(_ref, ['type', 'isAuthorised', 'component']);

  return React.createElement(Route, _extends({}, rest, { render: function render(props) {
      return isAuthorised && type === 'private' || !isAuthorised && type === 'public' ? React.createElement(Component, props) : React.createElement(Redirect, { to: {
          pathname: type === 'private' ? '/signin' : props.location.state ? props.location.state.from.pathname : '/',
          search: 'from=' + props.location.pathname,
          state: { from: props.location }
        } });
    } }));
};

export { RestrictedRoute };
RestrictedRoute.propTypes = process.env.NODE_ENV !== "production" ? {
  isAuthorised: PropTypes.bool.isRequired

} : {};

var mapStateToProps = function mapStateToProps(state) {
  var auth = state.auth;


  return {
    isAuthorised: auth.isAuthorised
  };
};

export default connect(mapStateToProps)(RestrictedRoute);