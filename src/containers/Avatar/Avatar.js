import Avatar from 'material-ui/Avatar';
import { Component, createElement } from 'react';

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

      return createElement(MaterialUIComponent, _extends({}, mapProps(this.props), {
        ref: 'component'
      }));
    };

    return InputComponent;
  }(Component);

  InputComponent.displayName = 'ReduxFormMaterialUI' + MaterialUIComponent.name;
  return InputComponent;
}

var mapError = function mapError(_ref) {
  var _extends2;

  var errorProp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'errorText';
  var _ref$meta = _ref.meta;
  _ref$meta = _ref$meta === undefined ? {} : _ref$meta;

  var touched = _ref$meta.touched,
      error = _ref$meta.error,
      warning = _ref$meta.warning,
      input = _ref.input,
      props = _objectWithoutProperties(_ref, ['meta', 'input']);

  return touched && (error || warning) ? _extends({}, props, input, (_extends2 = {}, _extends2[errorProp] = error || warning, _extends2)) : _extends({}, input, props);
};

export default createComponent(Avatar, function (_ref2) {
  var input = _ref2.input,
      meta = _ref2.meta,
      props = _objectWithoutProperties(_ref2, ['input', 'meta']);

  return _extends({}, props, {
    src: input ? input.value : undefined
  }, mapError(props));
});