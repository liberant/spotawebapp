

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { withFirebase } from 'firekit-provider';
import { withRouter } from 'react-router-dom';
import ReactList from 'react-list';
import Avatar from 'material-ui/Avatar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import PropTypes from 'prop-types';
import Activity from '../../containers/Activity';
import Scrollbar from '../../components/Scrollbar';
import ChatMessages from '../../containers/ChatMessages';
import { setPersistentValue } from '../../store/persistentValues/actions';
import { filterSelectors } from 'material-ui-filter';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

export var Chats = function (_Component) {
  _inherits(Chats, _Component);

  function Chats() {
    var _temp, _this, _ret;

    _classCallCheck(this, Chats);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleDeleteChat = function (key, val) {
      var _this$props = _this.props,
          firebaseApp = _this$props.firebaseApp,
          auth = _this$props.auth;


      firebaseApp.database().ref('user_chats/' + auth.uid + '/' + key).remove();
    }, _this.handleMarkAsUnread = function (key, val) {
      var _this$props2 = _this.props,
          firebaseApp = _this$props2.firebaseApp,
          auth = _this$props2.auth;


      firebaseApp.database().ref('user_chats/' + auth.uid + '/' + key + '/unread').set(1);
    }, _this.handleItemClick = function (val, key) {
      var _this$props3 = _this.props,
          usePreview = _this$props3.usePreview,
          history = _this$props3.history,
          setPersistentValue = _this$props3.setPersistentValue,
          firebaseApp = _this$props3.firebaseApp,
          auth = _this$props3.auth;


      if (val.unread > 0) {
        firebaseApp.database().ref('user_chats/' + auth.uid + '/' + key + '/unread').remove();
      }

      if (usePreview) {
        setPersistentValue('current_chat_uid', key);
      } else {
        history.push('/chats/edit/' + key);
      }
    }, _this.renderItem = function (i, k) {
      var _this$props4 = _this.props,
          list = _this$props4.list,
          intl = _this$props4.intl,
          currentChatUid = _this$props4.currentChatUid,
          usePreview = _this$props4.usePreview,
          muiTheme = _this$props4.muiTheme;


      var key = list[i].key;
      var val = list[i].val;
      var isPreviewed = usePreview && currentChatUid === key;

      var rightIconMenu = React.createElement(
        'div',
        { style: { width: 'auto', fontSize: 11, color: muiTheme.listItem.secondaryTextColor } },
        React.createElement(
          'div',
          { style: { display: 'flex', justifyContent: 'flex-end' } },
          val.unread > 0 && React.createElement(
            'div',
            { style: { textAlign: 'right' } },
            React.createElement(
              Avatar,
              {
                size: 20,
                backgroundColor: muiTheme.palette.primary1Color,
                color: muiTheme.palette.primaryTextColor,
                alt: 'unread' },
              React.createElement(
                'div',
                { style: { color: muiTheme.listItem.secondaryTextColor } },
                val.unread
              )
            )
          ),
          React.createElement(
            IconMenu,
            {
              style: { marginTop: -18, marginRight: -10 },
              anchorOrigin: { horizontal: 'left', vertical: 'top' },
              targetOrigin: { horizontal: 'left', vertical: 'top' },
              iconButtonElement: React.createElement(
                IconButton,
                null,
                React.createElement(
                  FontIcon,
                  { className: 'material-icons' },
                  'more_horiz'
                )
              )
            },
            React.createElement(
              MenuItem,
              {
                onClick: function onClick() {
                  _this.handleDeleteChat(key, val);
                } },
              intl.formatMessage({ id: 'delete_chat' })
            ),
            React.createElement(
              MenuItem,
              {
                onClick: function onClick() {
                  _this.handleMarkAsUnread(key, val);
                } },
              intl.formatMessage({ id: 'mark_chat_as_unread' })
            )
          )
        ),
        React.createElement(
          'div',
          { style: { width: 'auto', color: val.unread > 0 ? muiTheme.palette.primary1Color : undefined, textAlign: 'right', marginRight: 5 } },
          val.lastCreated ? intl.formatTime(new Date(val.lastCreated), 'hh:mm') : undefined
        )
      );

      return React.createElement(
        'div',
        { key: i },
        React.createElement(ListItem, {
          leftAvatar: React.createElement(Avatar, {
            alt: 'person',
            src: val.photoURL,
            icon: React.createElement(
              FontIcon,
              { className: 'material-icons' },
              'person'
            )
          }),
          style: isPreviewed ? { backgroundColor: muiTheme.toolbar.separatorColor } : undefined,
          onClick: function onClick() {
            _this.handleItemClick(val, key);
          },
          key: key,
          id: key,
          rightIconButton: rightIconMenu,
          primaryText: val.unread > 0 ? React.createElement(
            'div',
            null,
            React.createElement(
              'b',
              null,
              val.displayName
            )
          ) : val.displayName,
          secondaryText: val.unread > 0 ? React.createElement(
            'div',
            null,
            React.createElement(
              'b',
              null,
              val.lastMessage
            )
          ) : val.lastMessage
        }),
        React.createElement(Divider, { inset: true })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Chats.prototype.componentDidMount = function componentDidMount() {
    var _props = this.props,
        watchList = _props.watchList,
        path = _props.path;

    watchList(path);
  };

  Chats.prototype.render = function render() {
    var _props2 = this.props,
        intl = _props2.intl,
        list = _props2.list,
        history = _props2.history,
        currentChatUid = _props2.currentChatUid,
        usePreview = _props2.usePreview,
        auth = _props2.auth;


    var isDisplayingMessages = usePreview && currentChatUid;

    return React.createElement(
      Activity,
      {
        isLoading: list === undefined,
        title: intl.formatMessage({ id: 'chats' }) },
      React.createElement(
        'div',
        { style: {
            height: '100%',
            width: '100%',
            alignItems: 'strech',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            flexDirection: 'row'
          } },
        React.createElement(
          Scrollbar,
          { style: { maxWidth: usePreview ? 300 : undefined } },
          React.createElement(
            List,
            { style: { padding: 0, height: '100%', width: '100%', maxWidth: usePreview ? 300 : undefined } },
            React.createElement(ReactList, {
              style: { maxWidth: 300 },
              itemRenderer: this.renderItem,
              length: list ? list.length : 0,
              type: 'simple'
            })
          )
        ),
        React.createElement(
          'div',
          { style: { position: 'absolute', width: usePreview ? 300 : '100%', bottom: 5 } },
          React.createElement(
            FloatingActionButton,
            {
              onClick: function onClick() {
                history.push('/chats/create');
              },
              style: { position: 'absolute', right: 20, bottom: 10, zIndex: 99 },
              secondary: true },
            React.createElement(
              FontIcon,
              { className: 'material-icons' },
              'chat'
            )
          )
        ),
        React.createElement(
          'div',
          { style: { marginLeft: 0, flexGrow: 1 } },
          isDisplayingMessages && React.createElement(ChatMessages, { path: 'user_chat_messages/' + auth.uid + '/' + currentChatUid })
        ),
        React.createElement('div', {
          style: { float: "left", clear: "both" }
        })
      )
    );
  };

  return Chats;
}(Component);

Chats.propTypes = process.env.NODE_ENV !== "production" ? {
  list: PropTypes.array.isRequired,
  history: PropTypes.object,
  intl: intlShape
} : {};

var mapStateToProps = function mapStateToProps(state, ownPops) {
  var lists = state.lists,
      auth = state.auth,
      browser = state.browser,
      persistentValues = state.persistentValues;


  var path = 'user_chats/' + auth.uid;
  var usePreview = browser.greaterThan.small;
  var currentChatUid = persistentValues['current_chat_uid'] ? persistentValues['current_chat_uid'] : undefined;

  var list = lists[path] ? lists[path].sort(filterSelectors.dynamicSort('lastCreated', false, function (fieldValue) {
    return fieldValue.val;
  })) : [];

  return {
    auth: auth,
    path: path,
    usePreview: usePreview,
    currentChatUid: currentChatUid,
    list: list
  };
};

export default connect(mapStateToProps, { setPersistentValue: setPersistentValue })(injectIntl(withFirebase(withRouter(muiThemeable()(Chats)))));