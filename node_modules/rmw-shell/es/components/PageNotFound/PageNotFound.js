import ActionHome from 'material-ui/svg-icons/action/home';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Paper from 'material-ui/Paper';
import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import withAppConfigs from '../../withAppConfigs';
import { injectIntl } from 'react-intl';

var styles = {
  paper: {
    height: '100%',
    margin: 0,
    padding: 1
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  icon: {
    width: 192,
    height: 192
  }
};

var PageNotFound = function PageNotFound(_ref) {
  var muiTheme = _ref.muiTheme,
      intl = _ref.intl,
      appConfig = _ref.appConfig;

  var AppIcon = appConfig.appIcon;

  return React.createElement(
    Paper,
    { zDepth: 1, style: styles.paper },
    React.createElement(
      'div',
      { style: styles.container },
      React.createElement(AppIcon, { color: muiTheme.palette.primary2Color, style: styles.icon }),
      React.createElement(
        'h3',
        null,
        intl.formatMessage({ id: 'warning_404_message' })
      ),
      React.createElement(
        'p',
        null,
        intl.formatMessage({ id: 'warning_404_description' })
      ),
      React.createElement(
        FloatingActionButton,
        { secondary: true, href: '/' },
        React.createElement(ActionHome, null)
      )
    )
  );
};

export default injectIntl(muiThemeable()(withAppConfigs(PageNotFound)));