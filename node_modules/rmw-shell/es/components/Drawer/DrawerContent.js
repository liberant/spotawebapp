import FontIcon from 'material-ui/FontIcon';
import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import withAppConfigs from '../../withAppConfigs';
import { SelectableMenuList } from 'material-ui-selectable-menu-list';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

export var DrawerContent = function DrawerContent(props, context) {
  var appConfig = props.appConfig,
      dialogs = props.dialogs,
      intl = props.intl,
      match = props.match,
      messaging = props.messaging;


  var handleChange = function handleChange(event, index) {
    var history = props.history,
        responsiveDrawer = props.responsiveDrawer,
        setDrawerOpen = props.setDrawerOpen;


    if (responsiveDrawer.open && index !== undefined) {
      setDrawerOpen(false);
    }

    if (index !== undefined && index !== Object(index)) {
      history.push(index);
    }
  };

  var menuItems = appConfig.getMenuItems(props);

  var handleSignOut = function handleSignOut() {
    var userLogout = props.userLogout,
        setDialogIsOpen = props.setDialogIsOpen,
        appConfig = props.appConfig,
        setDrawerOpen = props.setDrawerOpen;


    appConfig.firebaseLoad().then(function (_ref) {
      var firebaseApp = _ref.firebaseApp;

      firebaseApp.database().ref('users/' + firebaseApp.auth().currentUser.uid + '/connections').remove();
      firebaseApp.database().ref('users/' + firebaseApp.auth().currentUser.uid + '/notificationTokens/' + messaging.token).remove();
      firebaseApp.database().ref('users/' + firebaseApp.auth().currentUser.uid + '/lastOnline').set(new Date());
      firebaseApp.auth().signOut().then(function () {
        userLogout();
        setDrawerOpen(false);
        setDialogIsOpen('auth_menu', false);
      });
    });
  };

  var authItems = [{
    value: '/my_account',
    primaryText: intl.formatMessage({ id: 'my_account' }),
    leftIcon: React.createElement(
      FontIcon,
      { className: 'material-icons' },
      'account_box'
    )
  }, {
    value: '/signin',
    onClick: handleSignOut,
    primaryText: intl.formatMessage({ id: 'sign_out' }),
    leftIcon: React.createElement(
      FontIcon,
      { className: 'material-icons' },
      'lock'
    )
  }];

  return React.createElement(
    'div',
    { style: {
        display: 'flex',
        flexDirection: 'column'
      } },
    React.createElement(SelectableMenuList, {
      items: dialogs.auth_menu ? authItems : menuItems,
      onIndexChange: handleChange,
      index: match ? match.path : '/'
    })
  );
};

export default injectIntl(muiThemeable()(withRouter(withAppConfigs(DrawerContent))));