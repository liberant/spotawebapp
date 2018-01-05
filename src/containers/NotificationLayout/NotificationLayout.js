

import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontIcon from 'material-ui/FontIcon';
import { injectIntl } from 'react-intl';
import muiThemeable from 'material-ui/styles/muiThemeable';
import ReactMaterialUiNotifications from 'react-materialui-notifications';
import { withFirebase } from 'firekit-provider';
import { withRouter } from 'react-router-dom';
import Snackbar from 'material-ui/Snackbar';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

export var NotificationLayout = function (_Component) {
  _inherits(NotificationLayout, _Component);

  function NotificationLayout() {
    var _temp, _this, _ret;

    _classCallCheck(this, NotificationLayout);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleActionTouchTap = function () {
      var _this$props = _this.props,
          messaging = _this$props.messaging,
          history = _this$props.history,
          clearMessage = _this$props.clearMessage;


      clearMessage();

      var click_action = messaging.message ? messaging.message.notification.click_action : false;

      if (click_action) {
        var indexOfCom = click_action.indexOf('.com') + 4;
        history.push(click_action.substring(indexOfCom));
      }
    }, _this.handleTokenChange = function (token) {
      var firebaseApp = _this.props.firebaseApp;


      firebaseApp.database().ref('users/' + firebaseApp.auth().currentUser.uid + '/notificationTokens/' + token).set(true);
    }, _this.getNotifications = function (notification) {
      var history = _this.props.history;

      return {
        chat: {
          path: 'chats',
          autoHide: 3000,
          title: notification.title,
          icon: React.createElement(
            'div',
            null,
            React.createElement(
              FontIcon,
              { className: 'material-icons', style: { fontSize: 12 } },
              'chat'
            )
          ),
          additionalText: notification.body,
          onTouchTap: function onTouchTap() {
            history.push('/chats');
          }
        }
      };
    }, _this.showMessage = function () {
      var _this$props2 = _this.props,
          location = _this$props2.location,
          messaging = _this$props2.messaging,
          isDesktop = _this$props2.isDesktop,
          clearMessage = _this$props2.clearMessage;


      if (!messaging.message || isDesktop) {
        return false;
      }

      var notification = messaging.message.notification;
      var pathname = location ? location.pathname : '';
      var tag = notification.tag;
      var notifications = _this.getNotifications(notification);
      var notificationData = notifications[tag] ? notifications[tag] : {};

      var show = false;

      if (notificationData) {
        show = pathname.indexOf(notificationData.path) === -1;
      }

      if (!show) {
        clearMessage();
      }

      return show;
    }, _this.handleMessageReceived = function (payload) {
      var _this$props3 = _this.props,
          muiTheme = _this$props3.muiTheme,
          location = _this$props3.location;


      var notification = payload.notification;
      var pathname = location ? location.pathname : '';
      var tag = notification.tag;
      var notifications = _this.getNotifications(notification);
      var notificationData = notifications[tag] ? notifications[tag] : false;

      if (notificationData) {
        if (pathname.indexOf(notificationData.path) === -1) {

          ReactMaterialUiNotifications.showNotification(_extends({
            avatar: notification.icon,
            iconBadgeColor: muiTheme.palette.accent1Color,
            timestamp: notification.timestamp,
            personalised: true
          }, notificationData));
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  NotificationLayout.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var _props = this.props,
        messaging = _props.messaging,
        initMessaging = _props.initMessaging;


    if (messaging === undefined || !messaging.isInitialized) {
      initMessaging(function (token) {
        _this2.handleTokenChange(token);
      }, this.handleMessageReceived);
    }
  };

  NotificationLayout.prototype.render = function render() {
    var _props2 = this.props,
        muiTheme = _props2.muiTheme,
        isDesktop = _props2.isDesktop,
        intl = _props2.intl,
        messaging = _props2.messaging,
        clearMessage = _props2.clearMessage;


    return React.createElement(
      'div',
      { style: { backgroundColor: muiTheme.palette.canvasColor, height: '100%' } },
      isDesktop && React.createElement(ReactMaterialUiNotifications
      //desktop={true} //NOT WORKING
      , { transitionName: {
          leave: 'dummy',
          leaveActive: 'fadeOut',
          appear: 'dummy',
          appearActive: 'zoomInUp'
        },
        rootStyle: { bottom: 30, right: 30, zIndex: 999999 },
        transitionAppear: true,
        transitionLeave: true
      }),
      this.showMessage() && React.createElement(Snackbar, {
        open: messaging.message !== undefined,
        message: messaging.message ? messaging.message.notification.title + ' - ' + messaging.message.notification.body : '',
        action: intl.formatMessage({ id: 'open_label' }),
        autoHideDuration: 4000,
        onActionTouchTap: this.handleActionTouchTap,
        onRequestClose: clearMessage
      })
    );
  };

  return NotificationLayout;
}(Component);

var mapStateToProps = function mapStateToProps(state) {
  var theme = state.theme,
      locale = state.locale,
      messaging = state.messaging,
      browser = state.browser,
      intl = state.intl;


  var isDesktop = browser.greaterThan.medium;

  return {
    theme: theme, //We need this so the theme change triggers rerendering
    locale: locale,
    messaging: messaging,
    isDesktop: isDesktop,
    intl: intl
  };
};

export default connect(mapStateToProps)(muiThemeable()(injectIntl(withFirebase(withRouter(NotificationLayout)))));