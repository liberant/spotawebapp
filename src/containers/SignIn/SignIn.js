

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Activity from '../../containers/Activity';
import AuthUI from './AuthUI';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import { withFirebase } from 'firekit-provider';
import { connect } from 'react-redux';
import withAppConfigs from '../../withAppConfigs';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

export var SignIn = function (_Component) {
  _inherits(SignIn, _Component);

  function SignIn() {
    _classCallCheck(this, SignIn);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  SignIn.prototype.render = function render() {
    var _props = this.props,
        intl = _props.intl,
        firebaseApp = _props.firebaseApp,
        appConfig = _props.appConfig;


    var uiConfig = {
      signInSuccessUrl: '/',
      signInFlow: 'popup',
      callbacks: {
        signInSuccess: function signInSuccess(user, credentials, redirect) {
          // initMessaging()

          // To avoid page reload on single page applications
          return false;
        }
      },
      signInOptions: appConfig.firebase_providers,
      credentialHelper: AuthUI.firebaseui.auth.CredentialHelper.NONE
    };

    return React.createElement(
      Activity,
      {
        title: intl.formatMessage({ id: 'sign_in' }) },
      React.createElement(AuthUI, { firebaseApp: firebaseApp, uiConfig: uiConfig })
    );
  };

  return SignIn;
}(Component);

SignIn.propTypes = process.env.NODE_ENV !== "production" ? {
  intl: PropTypes.object.isRequired
} : {};

var mapStateToProps = function mapStateToProps(state) {
  var browser = state.browser;

  return {
    browser: browser
  };
};

export default connect(mapStateToProps)(injectIntl(withFirebase(withAppConfigs(SignIn))));