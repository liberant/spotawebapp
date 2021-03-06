

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import Activity from '../../containers/Activity';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { withFirebase } from 'firekit-provider';
import { withRouter } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import _isGranted from '../../utils/auth';
import PropTypes from 'prop-types';
import { setSimpleValue } from '../../store/simpleValues/actions';
import { TextField } from 'redux-form-material-ui';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import { BottomNavigation } from 'material-ui/BottomNavigation';
import Dialog from 'material-ui/Dialog';
import muiThemeable from 'material-ui/styles/muiThemeable';
import ReactList from 'react-list';
import Scrollbar from '../../components/Scrollbar';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var path = 'predefined_chat_messages';

export var PredefinedChatMessages = function (_Component) {
  _inherits(PredefinedChatMessages, _Component);

  function PredefinedChatMessages() {
    var _temp, _this, _ret;

    _classCallCheck(this, PredefinedChatMessages);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleClose = function () {
      var setSimpleValue = _this.props.setSimpleValue;

      setSimpleValue('delete_predefined_chat_message', undefined);
    }, _this.handleDelete = function (key) {
      var _this$props = _this.props,
          firebaseApp = _this$props.firebaseApp,
          delete_predefined_chat_message = _this$props.delete_predefined_chat_message;


      if (key) {
        firebaseApp.database().ref('/' + path + '/' + delete_predefined_chat_message).remove().then(function () {
          _this.handleClose();
        });
      }
    }, _this.handleKeyDown = function (event, onSuccess) {
      if (event.keyCode === 13) {
        onSuccess();
      }
    }, _this.handleAddMessage = function () {
      var firebaseApp = _this.props.firebaseApp;

      var message = _this.refs["predefinedChatMessage"].refs.component.input.value;
      _this.refs["predefinedChatMessage"].refs.component.input.value = '';

      if (message.length > 0) {
        firebaseApp.database().ref('/' + path + '/').push({ message: message });
      }
    }, _this.renderItem = function (i, k) {
      var _this$props2 = _this.props,
          list = _this$props2.list,
          setSimpleValue = _this$props2.setSimpleValue;


      var key = list[i].key;
      var message = list[i].val.message;

      return React.createElement(
        'div',
        { key: key },
        React.createElement(ListItem, {
          key: key,
          primaryText: message,
          rightIconButton: React.createElement(
            IconButton,
            {
              onClick: function onClick() {
                return setSimpleValue('delete_predefined_chat_message', key);
              } },
            React.createElement(
              FontIcon,
              { className: 'material-icons', color: 'red' },
              'delete'
            )
          ),
          id: key
        }),
        React.createElement(Divider, null)
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  PredefinedChatMessages.prototype.componentWillMount = function componentWillMount() {
    var watchList = this.props.watchList;

    watchList(path);
  };

  PredefinedChatMessages.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        intl = _props.intl,
        list = _props.list,
        muiTheme = _props.muiTheme,
        delete_predefined_chat_message = _props.delete_predefined_chat_message;


    var actions = [React.createElement(FlatButton, {
      label: intl.formatMessage({ id: 'cancel' }),
      primary: true,
      onClick: this.handleClose
    }), React.createElement(FlatButton, {
      label: intl.formatMessage({ id: 'delete' }),
      secondary: true,
      onClick: this.handleDelete
    })];

    return React.createElement(
      Activity,
      {
        isLoading: list === undefined,
        containerStyle: { overflow: 'hidden' },
        title: intl.formatMessage({ id: 'predefined_messages' }) },
      React.createElement(
        'div',
        { style: { overflow: 'auto', height: '100%', width: '100%', backgroundColor: muiTheme.palette.canvasColor, paddingBottom: 56 } },
        React.createElement(
          Scrollbar,
          null,
          React.createElement(
            List,
            { ref: function ref(field) {
                _this2.list = field;
              } },
            React.createElement(ReactList, {
              itemRenderer: this.renderItem,
              length: list ? list.length : 0,
              type: 'simple'
            })
          )
        ),
        React.createElement('div', { style: { float: "left", clear: "both" },
          ref: function ref(el) {
            _this2.listEnd = el;
          }
        })
      ),
      list && React.createElement(
        BottomNavigation,
        { style: { width: '100%', position: 'absolute', bottom: 0, right: 0, left: 0, zIndex: 50 } },
        React.createElement(
          'div',
          { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 15 } },
          React.createElement(TextField, {
            id: 'predefinedChatMessage',
            fullWidth: true,
            onKeyDown: function onKeyDown(event) {
              _this2.handleKeyDown(event, _this2.handleAddMessage);
            },
            ref: 'predefinedChatMessage',
            type: 'Text'
          }),
          React.createElement(
            IconButton,
            {
              onClick: this.handleAddMessage },
            React.createElement(
              FontIcon,
              { className: 'material-icons', color: muiTheme.palette.primary1Color },
              'send'
            )
          )
        )
      ),
      React.createElement(
        Dialog,
        {
          title: intl.formatMessage({ id: 'delete_predefined_chat_message_title' }),
          actions: actions,
          modal: false,
          open: delete_predefined_chat_message !== undefined,
          onRequestClose: this.handleClose },
        intl.formatMessage({ id: 'delete_predefined_chat_message_message' })
      )
    );
  };

  return PredefinedChatMessages;
}(Component);

PredefinedChatMessages.propTypes = process.env.NODE_ENV !== "production" ? {
  list: PropTypes.array.isRequired,
  history: PropTypes.object,
  intl: intlShape.isRequired,
  isGranted: PropTypes.func.isRequired
} : {};

var mapStateToProps = function mapStateToProps(state) {
  var lists = state.lists,
      simpleValues = state.simpleValues,
      browser = state.browser;


  var delete_predefined_chat_message = simpleValues.delete_predefined_chat_message;

  return {
    browser: browser,
    delete_predefined_chat_message: delete_predefined_chat_message,
    list: lists[path],
    isGranted: function isGranted(grant) {
      return _isGranted(state, grant);
    }
  };
};

export default connect(mapStateToProps, { setSimpleValue: setSimpleValue })(injectIntl(muiThemeable()(withRouter(withFirebase(PredefinedChatMessages)))));