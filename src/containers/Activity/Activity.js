

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ResponsiveAppBar } from 'material-ui-responsive-drawer';
import { Helmet } from 'react-helmet';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { BodyContainer } from 'material-ui-responsive-drawer';
import LinearProgress from 'material-ui/LinearProgress';
import { injectIntl } from 'react-intl';
import { deepOrange500, darkWhite } from 'material-ui/styles/colors';
import { withRouter } from 'react-router-dom';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

export var Activity = function (_Component) {
  _inherits(Activity, _Component);

  function Activity() {
    var _temp, _this, _ret;

    _classCallCheck(this, Activity);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.getIconElementLeft = function () {
      var onBackClick = _this.props.onBackClick;


      if (onBackClick) {
        return React.createElement(
          IconButton,
          { onClick: onBackClick },
          React.createElement(
            FontIcon,
            { className: 'material-icons' },
            'chevron_left'
          )
        );
      } else {
        return undefined;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Activity.prototype.render = function render() {
    var _props = this.props,
        muiTheme = _props.muiTheme,
        title = _props.title,
        children = _props.children,
        onBackClick = _props.onBackClick,
        history = _props.history,
        intl = _props.intl,
        isConnected = _props.isConnected,
        isLoading = _props.isLoading,
        dispatch = _props.dispatch,
        containerStyle = _props.containerStyle,
        pageTitle = _props.pageTitle,
        height = _props.height,
        staticContext = _props.staticContext,
        valueLink = _props.valueLink,
        customDrawerWidth = _props.customDrawerWidth,
        rest = _objectWithoutProperties(_props, ['muiTheme', 'title', 'children', 'onBackClick', 'history', 'intl', 'isConnected', 'isLoading', 'dispatch', 'containerStyle', 'pageTitle', 'height', 'staticContext', 'valueLink', 'customDrawerWidth']);

    var drawerWidth = customDrawerWidth ? customDrawerWidth : 256;

    var bodyContainerStyle = _extends({
      backgroundColor: muiTheme.palette.canvasColor,
      top: 64,
      bottom: 0,
      overflow: 'auto'
    }, containerStyle);

    var headerTitle = '';

    if (typeof title === 'string' || title instanceof String) {
      headerTitle = title;
    }

    if (pageTitle) {
      headerTitle = pageTitle;
    }

    return React.createElement(
      'div',
      { style: { backgroundColor: muiTheme.palette.canvasColor, height: '100%' } },
      React.createElement(
        Helmet,
        null,
        React.createElement('meta', { name: 'theme-color', content: muiTheme.palette.primary1Color }),
        React.createElement('meta', { name: 'apple-mobile-web-app-status-bar-style', content: muiTheme.palette.primary1Color }),
        React.createElement('meta', { name: 'msapplication-navbutton-color', content: muiTheme.palette.primary1Color }),
        React.createElement(
          'title',
          null,
          headerTitle
        )
      ),
      React.createElement(ResponsiveAppBar, _extends({
        width: drawerWidth,
        title: title,
        showMenuIconButton: onBackClick !== undefined ? true : undefined,
        onLeftIconButtonClick: onBackClick,
        iconElementLeft: this.getIconElementLeft()
      }, rest)),
      !isConnected && React.createElement(
        'div',
        {
          id: 'offline-indicator',
          style: {
            zIndex: 9999,
            position: 'fixed',
            top: 0,
            height: 12,
            backgroundColor: deepOrange500,
            color: darkWhite,
            width: '100%',
            fontSize: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'

          } },
        React.createElement(
          'span',
          null,
          intl.formatMessage({ id: 'no_connection' })
        )
      ),
      isLoading && React.createElement(LinearProgress, { mode: 'indeterminate', color: muiTheme.palette.accent1Color, style: { zIndex: 9998, position: 'fixed', top: 0, height: height ? height : 5 } }),
      React.createElement(
        BodyContainer,
        { width: drawerWidth, id: 'bodyContainer', ref: 'bodyContainer', withRef: true, style: bodyContainerStyle },
        children
      )
    );
  };

  return Activity;
}(Component);

var mapStateToProps = function mapStateToProps(state) {
  var connection = state.connection,
      intl = state.intl;


  return {
    isConnected: connection ? connection.isConnected : false,
    intl: intl
  };
};

export default connect(mapStateToProps)(injectIntl(muiThemeable()(withRouter(Activity))));