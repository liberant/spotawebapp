
import Activity from './containers/Activity';
import ChatMessages from './containers/ChatMessages';
import Scrollbar from './components/Scrollbar';
import SearchField from './components/SearchField';
import registerServiceWorker from './registerServiceWorker';
import withAppConfigs from './withAppConfigs';

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Root from './containers/Root';
import AppConfigProvider from './components/AppConfigProvider';
import configureStore from './store';
import config from './config';
import locales, { addLocalizationData } from './locales';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

addLocalizationData(locales);

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  App.prototype.render = function render() {
    var appConfig = this.props.appConfig;


    var store = appConfig && appConfig.configureStore ? appConfig.configureStore() : configureStore();

    var configs = _extends({}, config, appConfig);

    return React.createElement(
      Provider,
      { store: store },
      React.createElement(
        AppConfigProvider,
        { appConfig: configs },
        React.createElement(Root, { appConfig: configs })
      )
    );
  };

  return App;
}(Component);

App.propTypes = process.env.NODE_ENV !== "production" ? {
  appConfig: PropTypes.object
} : {};

export { GoogleIcon, FacebookIcon, GitHubIcon, TwitterIcon } from './components/Icons';
export { getGeolocation } from './utils/googleMaps';
export { setPersistentValue } from './store/persistentValues/actions';
export { setSimpleValue } from './store/simpleValues/actions';

export default App;