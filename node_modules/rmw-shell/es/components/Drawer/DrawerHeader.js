import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Paper from 'material-ui/Paper';
import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import withAppConfigs from '../../withAppConfigs';
import { injectIntl } from 'react-intl';

export var DrawerHeader = function DrawerHeader(_ref) {
  var muiTheme = _ref.muiTheme,
      intl = _ref.intl,
      auth = _ref.auth,
      setAuthMenuOpen = _ref.setAuthMenuOpen,
      fetchUser = _ref.fetchUser,
      dialogs = _ref.dialogs,
      setDialogIsOpen = _ref.setDialogIsOpen,
      appConfig = _ref.appConfig;

  var styles = {
    header: {
      padding: 5
    },
    header_content: {
      padding: 5
    },
    paper: {
      backgroundColor: muiTheme.palette.primary2Color,
      color: muiTheme.palette.alternateTextColor,
      margin: 0,
      padding: 0
    },
    icon: {
      width: 48,
      height: 48,
      top: 4
    }
  };

  var AppIcon = appConfig.appIcon;

  return React.createElement(
    Paper,
    { zDepth: 1, style: styles.paper },
    auth.isAuthorised && React.createElement(
      'div',
      null,
      React.createElement(
        List,
        null,
        React.createElement(ListItem, {
          disabled: true,
          leftAvatar: React.createElement(Avatar, { size: 45, src: auth.photoURL, alt: 'person', icon: React.createElement(
              FontIcon,
              { className: 'material-icons' },
              'person'
            ) })
        }),
        React.createElement(ListItem, {
          primaryText: auth.displayName,
          secondaryText: auth.email,
          rightIconButton: React.createElement(
            IconButton,
            { onClick: function onClick() {
                setDialogIsOpen('auth_menu', !dialogs.auth_menu);
              } },
            React.createElement(
              FontIcon,
              { className: 'material-icons' },
              dialogs.auth_menu ? 'arrow_drop_up' : 'arrow_drop_down'
            )
          ),
          disableFocusRipple: true,
          style: { backgroundColor: 'transparent' },
          onClick: function onClick() {
            setDialogIsOpen('auth_menu', !dialogs.auth_menu);
          }
        })
      )
    ),
    !auth.isAuthorised && React.createElement(
      List,
      null,
      React.createElement(ListItem, {
        disabled: true,
        primaryText: intl.formatMessage({ id: 'app_name' }),
        leftAvatar: React.createElement(AppIcon, { color: muiTheme.palette.accent1Color, style: styles.icon })
      })
    )
  );
};

export default injectIntl(muiThemeable()(withAppConfigs(DrawerHeader)));