

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { injectIntl, intlShape } from 'react-intl';
import { setSimpleValue } from '../../store/simpleValues/actions';
import Activity from '../../containers/Activity';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import { withRouter } from 'react-router-dom';
import { withFirebase } from 'firekit-provider';
import ChatMessages from '../../containers/ChatMessages';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

export var Chat = function (_Component) {
  _inherits(Chat, _Component);

  function Chat() {
    _classCallCheck(this, Chat);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Chat.prototype.componentDidMount = function componentDidMount() {
    var _props = this.props,
        watchList = _props.watchList,
        chatsPath = _props.chatsPath;

    watchList(chatsPath);
  };

  Chat.prototype.render = function render() {
    var _props2 = this.props,
        messages = _props2.messages,
        muiTheme = _props2.muiTheme,
        history = _props2.history,
        receiverDisplayName = _props2.receiverDisplayName,
        receiverPhotoURL = _props2.receiverPhotoURL,
        path = _props2.path;


    return React.createElement(
      Activity,
      {
        isLoading: messages === undefined,
        containerStyle: {
          overflow: 'hidden',
          backgroundColor: muiTheme.chip.backgroundColor
        },
        onBackClick: function onBackClick() {
          history.push('/chats');
        },
        pageTitle: receiverDisplayName,
        title: React.createElement(
          'div',
          { style: { display: 'flex', flexOrientation: 'row', flexWrap: 'wrap', alignItems: 'center' } },
          React.createElement(Avatar, {
            src: receiverPhotoURL,
            alt: 'person',
            icon: React.createElement(
              FontIcon,
              {
                className: 'material-icons' },
              'person'
            )
          }),
          React.createElement(
            'div',
            { style: { paddingLeft: 8 } },
            '' + receiverDisplayName
          )
        ) },
      React.createElement(ChatMessages, { path: path })
    );
  };

  return Chat;
}(Component);

Chat.propTypes = process.env.NODE_ENV !== "production" ? {
  intl: intlShape.isRequired,
  muiTheme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
} : {};

var mapStateToProps = function mapStateToProps(state, ownPops) {
  var lists = state.lists,
      auth = state.auth;
  var match = ownPops.match;

  var uid = match.params.uid;

  var path = 'user_chat_messages/' + auth.uid + '/' + uid;
  var chatsPath = 'user_chats/' + auth.uid;
  var chats = lists[chatsPath] ? lists[chatsPath] : [];

  var receiverDisplayName = '';
  var receiverPhotoURL = '';

  chats.map(function (chat) {
    if (chat.key === uid) {
      receiverDisplayName = chat.val.displayName;
      receiverPhotoURL = chat.val.photoURL;
    }
    return chat;
  });

  return {
    uid: uid,
    path: path,
    receiverDisplayName: receiverDisplayName,
    receiverPhotoURL: receiverPhotoURL,
    chatsPath: chatsPath,
    auth: auth,
    messages: lists[path]
  };
};

export default connect(mapStateToProps, { setSimpleValue: setSimpleValue })(injectIntl(muiThemeable()(withRouter(withFirebase(Chat)))));