

import { Component } from 'react';
import PropTypes from 'prop-types';

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppConfigProvider = (_temp = _class = function (_Component) {
    _inherits(AppConfigProvider, _Component);

    function AppConfigProvider() {
        _classCallCheck(this, AppConfigProvider);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    AppConfigProvider.prototype.getChildContext = function getChildContext() {
        return {
            appConfig: this.props.appConfig
        };
    };

    AppConfigProvider.prototype.render = function render() {
        return this.props.children;
    };

    return AppConfigProvider;
}(Component), _class.childContextTypes = {
    appConfig: PropTypes.object.isRequired
}, _temp);
AppConfigProvider.propTypes = process.env.NODE_ENV !== "production" ? {
    children: PropTypes.element
} : {};


export default AppConfigProvider;