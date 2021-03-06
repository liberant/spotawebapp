

import React, { Component } from 'react';
import { TimePicker } from '../../components/ReduxFormFields';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import muiThemeable from 'material-ui/styles/muiThemeable';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import { formatTimeToObject, formatTimeToString } from '../../utils/dateTime';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeField = function (_Component) {
  _inherits(TimeField, _Component);

  function TimeField(props) {
    _classCallCheck(this, TimeField);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleTimePickerChange = function (e, newVal) {
      var _this$props = _this.props,
          change = _this$props.change,
          name = _this$props.name,
          formatOptions = _this$props.formatOptions;


      if (newVal !== null) {

        _this.setState({
          value: new Date(newVal).toLocaleString('de-DE', formatOptions)
        });
        change(name, new Date(newVal).toISOString());
      }
    };

    _this.handleTimeTextBlur = function (state, e) {
      var _this$props2 = _this.props,
          change = _this$props2.change,
          input = _this$props2.input,
          formatOptions = _this$props2.formatOptions;
      var name = input.name;


      var newVal = _this.state.value;

      if (!newVal) {
        return;
      }

      _this.setState({ value: formatTimeToString(newVal, formatOptions) });
      change(name, formatTimeToObject(newVal, formatOptions).toISOString());
    };

    _this.handleTimeTextChange = function (evt) {
      _this.setState({ value: evt.target.value });
    };

    _this.state = {
      value: ''
    };
    return _this;
  }

  TimeField.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var formatOptions = this.props.formatOptions;


    if (nextProps !== undefined) {
      var input = nextProps.input;
      var value = input.value;


      if (value !== undefined && value !== null && value.length > 0) {
        this.setState({ value: new Date(value).toLocaleString('de-DE', formatOptions) });
      }
    }
  };

  TimeField.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        muiTheme = _props.muiTheme,
        input = _props.input,
        floatingLabelText = _props.floatingLabelText,
        timePickerText = _props.timePickerText,
        disabled = _props.disabled;
    var name = input.name;


    return React.createElement(
      'div',
      { style: { display: 'flex', alignItems: 'flex-end' } },
      React.createElement(TextField, {
        name: name + 'Text',
        value: this.state.value,
        onBlur: this.handleTimeTextBlur,
        onChange: this.handleTimeTextChange,
        disabled: disabled,
        floatingLabelText: floatingLabelText,
        style: { width: 50, alignItems: 'center' },
        ref: name + 'Text'
      }),
      React.createElement(Field, {
        name: name,
        textFieldStyle: { display: 'none' },
        autoOk: true,
        tabIndex: -1,
        minutesStep: 5,
        onChange: this.handleTimePickerChange,
        disabled: disabled,
        component: TimePicker,
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
          tooltip: timePickerText },
        React.createElement(
          FontIcon,
          {
            className: 'material-icons',
            style: { fontSize: 12 },
            color: muiTheme.palette.primary1Color },
          'access_time'
        )
      )
    );
  };

  return TimeField;
}(Component);

TimeField.propTypes = process.env.NODE_ENV !== "production" ? {
  disabled: PropTypes.bool.isRequired,
  input: PropTypes.object.isRequired,
  floatingLabelText: PropTypes.string.isRequired,
  timePickerText: PropTypes.string.isRequired,
  muiTheme: PropTypes.object.isRequired
} : {};

export default muiThemeable()(injectIntl(TimeField));