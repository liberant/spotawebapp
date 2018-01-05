

import React, { Component } from 'react';
import DatePicker from './DatePicker';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { injectIntl, intlShape } from 'react-intl';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import { formatDateToObject, formatDateToString } from '../../utils/dateTime';
import PropTypes from 'prop-types';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };

var DateField = function (_Component) {
  _inherits(DateField, _Component);

  function DateField(props) {
    _classCallCheck(this, DateField);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleOnDatePickerChange = function (e, newVal) {
      var _this$props = _this.props,
          change = _this$props.change,
          name = _this$props.name,
          formatOptions = _this$props.formatOptions;


      var format = formatOptions ? formatOptions : defaultFormatOptions;

      if (newVal !== null) {
        _this.setState({ value: new Date(newVal).toLocaleString('de-DE', format) });
        change(name, new Date(newVal).toISOString());
      }
    };

    _this.handleDateTextBlur = function (state, e) {
      var _this$props2 = _this.props,
          change = _this$props2.change,
          input = _this$props2.input,
          formatOptions = _this$props2.formatOptions;
      var name = input.name;


      var newVal = _this.state.value;
      var format = formatOptions ? formatOptions : defaultFormatOptions;

      if (!newVal) {
        return;
      }

      _this.setState({ value: formatDateToString(newVal, format) });
      change(name, formatDateToObject(newVal, format).toISOString());
    };

    _this.handleDateTextChange = function (evt) {
      _this.setState({ value: evt.target.value });
    };

    _this.state = {
      value: ''
    };
    return _this;
  }

  DateField.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var formatOptions = this.props.formatOptions;


    var format = formatOptions ? formatOptions : defaultFormatOptions;

    if (nextProps !== undefined) {
      var input = nextProps.input;
      var value = input.value;


      if (value !== undefined && value !== null && value.length > 0) {
        this.setState({ value: new Date(value).toLocaleString('de-DE', format) });
      }
    }
  };

  DateField.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        disabled = _props.disabled,
        input = _props.input,
        floatingLabelText = _props.floatingLabelText,
        datePickerText = _props.datePickerText,
        muiTheme = _props.muiTheme,
        intl = _props.intl;
    var name = input.name;


    return React.createElement(
      'div',
      { style: { display: 'flex', alignItems: 'flex-end' } },
      React.createElement(TextField, {
        name: name + 'Text',
        value: this.state.value,
        onBlur: this.handleDateTextBlur,
        onChange: this.handleDateTextChange,
        disabled: disabled,
        floatingLabelText: floatingLabelText,
        style: { width: 90, alignItems: 'center' },
        ref: name + 'Text'
      }),
      React.createElement(Field, {
        name: name,
        textFieldStyle: { display: 'none' },
        autoOk: true,
        tabIndex: -1,
        DateTimeFormat: global.Intl.DateTimeFormat,
        okLabel: 'OK',
        cancelLabel: intl.formatMessage({ id: 'cancel' }),
        locale: intl.formatMessage({ id: 'current_locale' }),
        disabled: disabled,
        component: DatePicker,
        onChange: this.handleOnDatePickerChange,
        floatingLabelText: '',
        ref: name,
        withRef: true
      }),
      React.createElement(
        IconButton,
        {
          onClick: function onClick() {
            _this2.refs[name].getRenderedComponent().refs.component.openDialog();
          },
          tabIndex: -1,
          disabled: disabled,
          tooltip: datePickerText },
        React.createElement(
          FontIcon,
          {
            className: 'material-icons',
            style: { fontSize: 12 },
            color: muiTheme.palette.primary1Color },
          'event'
        )
      )
    );
  };

  return DateField;
}(Component);

DateField.propTypes = process.env.NODE_ENV !== "production" ? {
  disabled: PropTypes.bool.isRequired,
  input: PropTypes.object.isRequired,
  floatingLabelText: PropTypes.string.isRequired,
  datePickerText: PropTypes.string.isRequired,
  muiTheme: PropTypes.object.isRequired,
  intl: intlShape.isRequired
} : {};

export default muiThemeable()(injectIntl(DateField));