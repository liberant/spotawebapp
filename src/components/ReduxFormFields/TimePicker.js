

import TimePicker from 'material-ui/TimePicker';
import { Component, createElement } from 'react';
import { mapError } from '../../utils/mapError';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function createComponent(MaterialUIComponent, mapProps) {
  var InputComponent = function (_Component) {
    _inherits(InputComponent, _Component);

    function InputComponent() {
      _classCallCheck(this, InputComponent);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    InputComponent.prototype.getRenderedComponent = function getRenderedComponent() {
      return this.refs.component;
    };

    InputComponent.prototype.render = function render() {
      var _props = this.props,
          input = _props.input,
          rest = _objectWithoutProperties(_props, ['input']);

      var value = input.value,
          inputRest = _objectWithoutProperties(input, ['value']);

      var newProps = this.props;

      if (typeof value === 'string' || value instanceof String) {

        if (value) {
          var newValue = new Date(value);

          newProps = _extends({
            input: _extends({
              value: newValue
            }, inputRest)
          }, rest);
        } else {
          newProps = _extends({
            input: _extends({
              value: null
            }, inputRest)
          }, rest);
        }
      }

      return createElement(MaterialUIComponent, _extends({}, mapProps(newProps), {
        ref: 'component'
      }));
    };

    return InputComponent;
  }(Component);

  InputComponent.displayName = 'ReduxFormMaterialUI' + MaterialUIComponent.name;
  return InputComponent;
}

export default createComponent(TimePicker, function (_ref) {
  var _ref$input = _ref.input,
      onBlur = _ref$input.onBlur,
      inputProps = _objectWithoutProperties(_ref$input, ['onBlur']),
      defaultDate = _ref.defaultDate,
      _onChange = _ref.onChange,
      props = _objectWithoutProperties(_ref, ['input', 'defaultDate', 'onChange']);

  return _extends({
    format: '24hr'
  }, inputProps, mapError(props), {
    onChange: function onChange(event, value) {
      var newValue = new Date(value).toISOString();
      inputProps.onChange(newValue);
      if (_onChange) {
        _onChange(newValue);
      }
    }
  });
});