

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import locales, { getLocaleMessages } from '../../locales';
import getThemeSource from '../../themes';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { IntlProvider } from 'react-intl';
import AppLayout from '../../containers/AppLayout';
import { watchAuth, clearInitialization, initConnection, watchList, watchPath } from 'firekit';
import createHistory from 'history/createBrowserHistory';
import { Router, Route, Switch } from 'react-router-dom';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var history = createHistory();

var Root = function (_Component) {
  _inherits(Root, _Component);

  function Root() {
    var _temp, _this, _ret;

    _classCallCheck(this, Root);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handlePresence = function (user, firebaseApp) {

      var myConnectionsRef = firebaseApp.database().ref('users/' + user.uid + '/connections');

      var lastOnlineRef = firebaseApp.database().ref('users/' + user.uid + '/lastOnline');
      lastOnlineRef.onDisconnect().set(new Date());

      var con = myConnectionsRef.push(true);
      con.onDisconnect().remove();
    }, _this.onAuthStateChanged = function (user, firebaseApp) {
      var _this$props = _this.props,
          clearInitialization = _this$props.clearInitialization,
          watchConnection = _this$props.watchConnection,
          watchList = _this$props.watchList,
          watchPath = _this$props.watchPath,
          appConfig = _this$props.appConfig;


      clearInitialization();

      if (user) {

        _this.handlePresence(user, firebaseApp);
        setTimeout(function () {
          watchConnection(firebaseApp);
        }, 1000);

        var userData = {
          displayName: user.displayName ? user.displayName : 'UserName',
          email: user.email ? user.email : '-',
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          isAnonymous: user.isAnonymous,
          uid: user.uid,
          providerData: user.providerData
        };

        watchList(firebaseApp, 'user_grants/' + user.uid);
        watchPath(firebaseApp, 'admins/' + user.uid);

        if (appConfig.onAuthStateChanged) {
          try {
            appConfig.onAuthStateChanged(user, _this.props, firebaseApp);
          } catch (err) {
            console.warn(err);
          }
        }

        firebaseApp.database().ref('users/' + user.uid).update(userData);

        return userData;
      } else {
        return null;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Root.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    var _props = this.props,
        watchAuth = _props.watchAuth,
        appConfig = _props.appConfig;


    appConfig.firebaseLoad().then(function (_ref) {
      var firebaseApp = _ref.firebaseApp;

      watchAuth(firebaseApp, function (user) {
        return _this2.onAuthStateChanged(user, firebaseApp);
      });
    });
  };

  Root.prototype.componentWillUnmount = function componentWillUnmount() {
    //const { clearApp }= this.props;
    //clearApp(this.firebaseApp); //TODO: add it after firekit update
  };

  Root.prototype.render = function render() {
    var _props2 = this.props,
        locale = _props2.locale,
        muiTheme = _props2.muiTheme,
        messages = _props2.messages,
        appConfig = _props2.appConfig;


    return React.createElement(
      MuiThemeProvider,
      { muiTheme: muiTheme },
      React.createElement(
        IntlProvider,
        { locale: locale, key: locale, messages: messages },
        React.createElement(
          Router,
          { history: history },
          React.createElement(
            Switch,
            null,
            React.createElement(Route, { children: function children(props) {
                return React.createElement(AppLayout, props);
              } })
          )
        )
      )
    );
  };

  return Root;
}(Component);

Root.propTypes = process.env.NODE_ENV !== "production" ? {
  locale: PropTypes.string.isRequired,
  source: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  muiTheme: PropTypes.object.isRequired
} : {};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var theme = state.theme,
      locale = state.locale;
  var appConfig = ownProps.appConfig;


  var source = getThemeSource(theme, appConfig.themes);
  var messages = _extends({}, getLocaleMessages(locale, locales), getLocaleMessages(locale, appConfig.locales));
  var muiTheme = getMuiTheme(source);

  return {
    locale: locale,
    source: source,
    messages: messages,
    muiTheme: muiTheme
  };
};

export default connect(mapStateToProps, { watchAuth: watchAuth, clearInitialization: clearInitialization, watchConnection: initConnection, watchList: watchList, watchPath: watchPath })(Root);