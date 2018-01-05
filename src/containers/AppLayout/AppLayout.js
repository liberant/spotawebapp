

import React, { Component } from 'react';
import { connect } from 'react-redux';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { ResponsiveDrawer } from 'material-ui-responsive-drawer';
import { DrawerHeader } from '../../containers/Drawer';
import { DrawerContent } from '../../containers/Drawer';
import { withRouter } from 'react-router-dom';
import Scrollbar from '../../components/Scrollbar';
import getAppRoutes from '../../components/AppRoutes';
import withAppConfigs from '../../withAppConfigs';
import { Switch } from 'react-router-dom';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

export var AppLayout = function (_Component) {
  _inherits(AppLayout, _Component);

  function AppLayout() {
    _classCallCheck(this, AppLayout);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  AppLayout.prototype.render = function render() {
    var _props = this.props,
        muiTheme = _props.muiTheme,
        history = _props.history,
        appConfig = _props.appConfig;

    var drawerWidth = appConfig.drawer_width;
    var path = history.location.pathname;
    var customRoutes = appConfig.routes ? appConfig.routes : [];
    var appRoutes = getAppRoutes(appConfig.firebaseLoad);

    return React.createElement(
      'div',
      { style: { backgroundColor: muiTheme.palette.canvasColor, height: '100%' } },
      React.createElement(
        ResponsiveDrawer,
        { width: drawerWidth },
        React.createElement(
          Scrollbar,
          null,
          React.createElement(DrawerHeader, null),
          React.createElement(DrawerContent, { path: path, history: history })
        )
      ),
      React.createElement(
        Switch,
        null,
        customRoutes.map(function (Route, i) {
          return React.cloneElement(Route, { key: '@customRoutes/' + i });
        }),
        appRoutes.map(function (Route, i) {
          return React.cloneElement(Route, { key: '@appRoutes/' + i });
        })
      )
    );
  };

  return AppLayout;
}(Component);

var mapStateToProps = function mapStateToProps(state) {
  var theme = state.theme,
      locale = state.locale,
      messaging = state.messaging;


  return {
    theme: theme, // We need this so the theme change triggers rerendering
    locale: locale,
    messaging: messaging
  };
};

export default connect(mapStateToProps)(muiThemeable()(withRouter(withAppConfigs(AppLayout))));