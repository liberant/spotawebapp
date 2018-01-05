import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { fade } from 'material-ui/utils/colorManipulator';
import { injectIntl } from 'react-intl';
import TextField from 'material-ui/TextField';

var SearchField = function SearchField(_ref) {
  var onChange = _ref.onChange,
      hintText = _ref.hintText,
      muiTheme = _ref.muiTheme,
      intl = _ref.intl;


  return React.createElement(
    'div',
    { style: {
        display: 'inline-block',
        backgroundColor: '#fff',
        borderRadius: 5,
        width: 600,
        maxWidth: '100%'
      }
    },
    React.createElement(
      'div',
      { style: {
          display: 'flex',
          backgroundColor: fade(muiTheme.palette.primary1Color, 0.70),
          borderRadius: 4,
          paddingLeft: 10,
          paddingRight: 10
        }
      },
      React.createElement(
        FontIcon,
        { style: { marginLeft: 10, marginTop: 12, marginRight: 15 }, className: 'material-icons', color: muiTheme.palette.textColor },
        'search'
      ),
      React.createElement(TextField, {
        style: { width: '100%' },
        underlineShow: false,
        onChange: onChange,
        hintText: hintText ? hintText : intl.formatMessage({ id: 'search' })
      })
    )
  );
};

export default injectIntl(muiThemeable()(SearchField));