
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { injectIntl, intlShape } from 'react-intl';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import { withRouter } from 'react-router-dom';
import { withFirebase } from 'firekit-provider';
import Chip from 'material-ui/Chip';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ReactList from 'react-list';
import Scrollbar from '../../components/Scrollbar';
import { setSimpleValue } from '../../store/simpleValues/actions';
import { getGeolocation } from '../../utils/googleMaps';
import Image from 'material-ui-image';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


var pageStep = 20;

var ChatMessages = (_temp = _class = function (_Component) {
  _inherits(ChatMessages, _Component);

  function ChatMessages(props) {
    _classCallCheck(this, ChatMessages);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _initialiseProps.call(_this);

    _this.name = null;
    _this.listEnd = null;
    return _this;
  }

  ChatMessages.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _props = this.props,
        unwatchList = _props.unwatchList,
        path = _props.path;
    var nextPath = nextProps.path;


    if (path !== nextPath) {
      unwatchList(path);
      this.initMessages(nextProps);
    }
  };

  ChatMessages.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom();
  };

  ChatMessages.prototype.componentDidMount = function componentDidMount() {
    this.initMessages(this.props);
    this.scrollToBottom();
  };

  ChatMessages.prototype.renderList = function renderList(messages) {
    var _this2 = this;

    var _props2 = this.props,
        auth = _props2.auth,
        intl = _props2.intl,
        muiTheme = _props2.muiTheme,
        history = _props2.history;


    var currentDate = '';
    var currentAuthor = '';

    if (messages === undefined) {
      return React.createElement('div', null);
    }

    return messages.map(function (row, i) {
      var values = row.val;
      //const key=row.key

      if (values.created === null) {
        return undefined;
      }

      var stringDate = new Date(values.created).toISOString().slice(0, 10);
      var dataChanged = false;
      var authorChanged = false;
      var backgroundColor = values.authorUid === auth.uid ? muiTheme.palette.primary2Color : muiTheme.palette.canvasColor;
      var color = muiTheme.chip.textColor;
      var type = values.message ? 'text' : values.link ? "link" : values.location ? 'location' : values.image ? 'image' : undefined;

      if (currentDate !== stringDate) {
        currentDate = stringDate;
        dataChanged = true;
      }

      if (currentAuthor !== values.authorUid) {
        currentAuthor = values.authorUid;
        authorChanged = true;
      }

      return React.createElement(
        'div',
        { key: i, style: { width: '100%' } },
        React.createElement(
          'div',
          null,
          dataChanged && React.createElement(
            'div',
            { style: {
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 10,
                paddingBottom: 10
              } },
            React.createElement(
              'div',
              null,
              React.createElement(
                Chip,
                {
                  backgroundColor: muiTheme.palette.primary3Color },
                '' + (values.created ? intl.formatRelative(new Date(values.created), { units: 'day' }) : undefined)
              )
            )
          ),
          React.createElement(
            'div',
            { style: { display: 'flex', width: '100%', justifyContent: values.authorUid === auth.uid ? 'flex-end' : 'flex-start' } },
            React.createElement(
              'div',
              { style: _extends({}, muiTheme.chip, {
                  margin: 1,
                  marginTop: authorChanged === true ? 8 : 1,
                  boxShadow: muiTheme.chip.shadow,
                  borderRadius: authorChanged === true ? values.authorUid === auth.uid ? '8px 0 8px 8px' : '0 8px 8px 8px' : '8px 8px 8px 8px',
                  backgroundColor: backgroundColor,
                  color: color,
                  fontFamily: muiTheme.fontFamily
                }) },
              React.createElement(
                'div',
                { style: {
                    display: 'flex',
                    margin: 5,
                    flexOrientation: 'row',
                    justifyContent: 'space-between',
                    width: 'fit-content'
                  } },
                React.createElement(
                  'div',
                  { style: {
                      maxWidth: 500,
                      width: 'fit-content',
                      fontSize: 16,
                      paddingLeft: 8,
                      margin: 'auto',
                      whiteSpace: 'pre-wrap',
                      overflowWrap: 'break-word',
                      fontFamily: muiTheme.fontFamily
                    } },
                  values.authorUid !== auth.uid && React.createElement(
                    'div',
                    {
                      onClick: function onClick() {
                        history.push('/chats/edit/' + values.authorUid);
                      },
                      style: { color: muiTheme.palette.accent1Color, fontSize: 12, marginLeft: 0, cursor: 'pointer' } },
                    values.authorName
                  ),
                  type === 'location' && React.createElement(
                    'div',
                    { style: { padding: 7 } },
                    React.createElement(
                      'div',
                      { style: { textAlign: 'center', width: '100%', height: '100%' } },
                      React.createElement(
                        IconButton,
                        {
                          target: '_blank',
                          href: values.location
                        },
                        React.createElement(
                          FontIcon,
                          { className: 'material-icons', color: muiTheme.palette.accent1Color },
                          'map'
                        )
                      ),
                      intl.formatMessage({ id: 'my_location' })
                    )
                  ),
                  type === 'link' && React.createElement(
                    'a',
                    { target: '_blank', href: values.link },
                    values.link
                  ),
                  type === 'image' && values.image !== null && React.createElement(Image, {
                    style: { width: 'auto', height: 'auto', paddingTop: 0 },
                    imageStyle: { maxWidth: '100%', padding: 7, position: 'relative' },
                    onLoad: _this2.scrollToBottom,
                    src: values.image,
                    color: backgroundColor
                  }),
                  type === 'text' && values.message
                ),
                React.createElement(
                  'div',
                  { style: {
                      fontSize: 9,
                      color: values.authorUid !== auth.uid ? muiTheme.palette.primary2Color : muiTheme.palette.canvasColor,
                      marginLeft: 8,
                      //marginRight: 3,
                      //marginLeft: 5,
                      alignSelf: 'flex-end',
                      fontFamily: muiTheme.fontFamily
                    } },
                  '' + (values.created ? intl.formatTime(new Date(values.created)) : undefined)
                )
              )
            )
          )
        )
      );
    });
  };

  ChatMessages.prototype.render = function render() {
    var _this3 = this;

    var _props3 = this.props,
        messages = _props3.messages,
        muiTheme = _props3.muiTheme,
        intl = _props3.intl,
        setSimpleValue = _props3.setSimpleValue,
        chatMessageMenuOpen = _props3.chatMessageMenuOpen,
        predefinedMessages = _props3.predefinedMessages,
        uid = _props3.uid,
        firebaseApp = _props3.firebaseApp,
        auth = _props3.auth;


    return React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          backgroundColor: muiTheme.chip.backgroundColor
        },
        onClick: function onClick() {
          firebaseApp.database().ref('user_chats/' + auth.uid + '/' + uid + '/unread').remove();
        } },
      React.createElement(
        Scrollbar,
        {
          style: {
            backgroundColor: muiTheme.palette.canvasColor,
            width: '100%'
          } },
        React.createElement(
          'div',
          { style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
          React.createElement(
            'div',
            { style: { maxWidth: 600, margin: 8, width: '100%' } },
            React.createElement(
              'div',
              { style: { display: 'flex', justifyContent: 'center' } },
              React.createElement(
                Chip,
                {
                  onClick: this.handleLoadMore,
                  backgroundColor: muiTheme.palette.primary3Color },
                intl.formatMessage({ id: 'load_more_label' })
              )
            ),
            this.renderList(messages)
          )
        ),
        React.createElement('div', {
          style: { float: "left", clear: "both" },
          ref: function ref(el) {
            _this3.listEnd = el;
          } })
      ),
      React.createElement(
        'div',
        { style: {
            display: 'block',
            alignItems: 'row',
            justifyContent: 'center',
            height: chatMessageMenuOpen ? 300 : 56,
            backgroundColor: muiTheme.palette.canvasColor
          } },
        React.createElement(
          'div',
          { style: { display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          React.createElement(
            IconButton,
            {
              onClick: function onClick() {
                if (chatMessageMenuOpen === true) {
                  setSimpleValue('chatMessageMenuOpen', false);
                } else {
                  setSimpleValue('chatMessageMenuOpen', true);
                }
              } },
            React.createElement(
              FontIcon,
              { className: 'material-icons', color: muiTheme.palette.borderColor },
              chatMessageMenuOpen === true ? 'keyboard_arrow_down' : 'keyboard_arrow_up'
            )
          ),
          React.createElement(
            'div',
            { style: {
                backgroundColor: muiTheme.chip.backgroundColor,
                flexGrow: 1,
                borderRadius: 8,
                paddingLeft: 8,
                paddingRight: 8
              } },
            React.createElement(
              'div',
              { style: { position: 'relative', display: 'inline-block', width: '100%' } },
              React.createElement(TextField, {
                id: 'message',
                style: { height: 42, width: 'calc(100% - 72px)', lineHeight: undefined },
                underlineShow: false,
                fullWidth: true,
                autoComplete: 'off',
                hintText: intl.formatMessage({ id: 'write_message_hint' }),
                onKeyDown: function onKeyDown(event) {
                  _this3.handleKeyDown(event, function () {
                    return _this3.handleAddMessage("text", _this3.name.getValue());
                  });
                },
                ref: function ref(field) {
                  _this3.name = field;
                },
                type: 'Text'
              }),
              React.createElement(
                'div',
                { style: { position: 'absolute', right: 25, top: -3, width: 20, height: 0 } },
                React.createElement(
                  IconButton,
                  {
                    onClick: function onClick() {
                      return getGeolocation(function (pos) {
                        if (!pos) {
                          return;
                        } else if (!pos.coords) {
                          return;
                        }

                        var lat = pos.coords.latitude;
                        var long = pos.coords.longitude;
                        _this3.handleAddMessage("location", 'https://www.google.com/maps/place/' + lat + '+' + long + '/@' + lat + ',' + long);
                      }, function (error) {
                        return console.log(error);
                      });
                    } },
                  React.createElement(
                    FontIcon,
                    { className: 'material-icons', color: muiTheme.palette.primary1Color },
                    'my_location'
                  )
                )
              ),
              React.createElement('input', {
                style: { display: 'none' },
                type: 'file',
                onChange: function onChange(e) {
                  return _this3.uploadSelectedFile(e.target.files[0], _this3.handleAddMessage);
                },
                ref: function ref(input) {
                  _this3.fileInput = input;
                }
              }),
              React.createElement(
                'div',
                { style: { position: 'absolute', right: 55, top: -3, width: 20, height: 0 } },
                React.createElement(
                  IconButton,
                  {
                    containerElement: 'label',
                    onClick: function onClick() {
                      return _this3.fileInput.click();
                    } },
                  React.createElement(
                    FontIcon,
                    { className: 'material-icons', color: muiTheme.palette.primary1Color },
                    'photo'
                  )
                )
              )
            )
          ),
          React.createElement(
            IconButton,
            {
              disabled: messages === undefined,
              onClick: function onClick() {
                return _this3.handleAddMessage("text", _this3.name.getValue());
              } },
            React.createElement(
              FontIcon,
              { className: 'material-icons', color: muiTheme.palette.primary1Color },
              'send'
            )
          )
        ),
        chatMessageMenuOpen && React.createElement(
          Scrollbar,
          { style: { height: 200, backgroundColor: muiTheme.chip.backgroundColor } },
          React.createElement(
            'div',
            { style: { padding: 10, paddingRight: 0 } },
            React.createElement(ReactList, {
              itemRenderer: this.renderItem,
              length: predefinedMessages ? predefinedMessages.length : 0,
              type: 'simple'
            })
          )
        )
      )
    );
  };

  return ChatMessages;
}(Component), _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.scrollToBottom = function () {
    var node = ReactDOM.findDOMNode(_this4.listEnd);
    if (node) {
      node.scrollIntoView({ behavior: "smooth" });
    }
  };

  this.initMessages = function (props) {
    var watchList = props.watchList,
        firebaseApp = props.firebaseApp,
        path = props.path;


    var messagesRef = firebaseApp.database().ref(path).orderByKey().limitToLast(pageStep);
    watchList(messagesRef);
    watchList('predefined_chat_messages');
  };

  this.handleLoadMore = function () {
    var _props4 = _this4.props,
        watchList = _props4.watchList,
        unwatchList = _props4.unwatchList,
        firebaseApp = _props4.firebaseApp,
        setSimpleValue = _props4.setSimpleValue,
        simpleValues = _props4.simpleValues,
        path = _props4.path;


    var currentAmount = simpleValues['chat_messages_limit'] ? simpleValues['chat_messages_limit'] : pageStep;
    var nextAmount = currentAmount + pageStep;

    unwatchList(path);
    setSimpleValue('chat_messages_limit', nextAmount);
    var messagesRef = firebaseApp.database().ref(path).orderByKey().limitToLast(nextAmount);
    watchList(messagesRef);
  };

  this.handleKeyDown = function (event, onSucces) {
    if (event.keyCode === 13) {
      onSucces();
    }
  };

  this.handleAddMessage = function (type, message) {
    var _props5 = _this4.props,
        auth = _props5.auth,
        firebaseApp = _props5.firebaseApp,
        path = _props5.path;


    var newMessage = {
      created: firebase.database.ServerValue.TIMESTAMP,
      authorName: auth.displayName,
      authorUid: auth.uid,
      authorPhotoUrl: auth.photoURL
    };

    if (type === 'image') {
      newMessage.image = message;
    } else if (type === 'location') {
      newMessage.location = message;
    } else {
      if (message.startsWith('http') || message.startsWith('https')) {
        newMessage.link = message;
      } else {
        newMessage.message = message;
      }
    }

    _this4.name.input.value = '';
    _this4.name.state.hasValue = false;

    if (message.length > 0) {
      firebaseApp.database().ref(path).push(newMessage);
    }
  };

  this.renderItem = function (i, k) {
    var _props6 = _this4.props,
        predefinedMessages = _props6.predefinedMessages,
        muiTheme = _props6.muiTheme,
        setSimpleValue = _props6.setSimpleValue;


    var key = predefinedMessages[i].key;
    var message = predefinedMessages[i].val.message;

    return React.createElement(
      'div',
      { key: key },
      React.createElement(ListItem, {
        rightIconButton: React.createElement(
          IconButton,
          {
            onClick: function onClick() {
              setSimpleValue('chatMessageMenuOpen', false);
              _this4.handleAddMessage("text", message);
            } },
          React.createElement(
            FontIcon,
            { className: 'material-icons', color: muiTheme.palette.textColor },
            'send'
          )
        ),
        onClick: function onClick() {
          setSimpleValue('chatMessageMenuOpen', false);
          _this4.name.input.value = message;
          _this4.name.state.hasValue = true;
          _this4.name.state.isFocused = true;
          _this4.name.focus();
        },
        key: key,
        id: key,
        primaryText: message
      }),
      React.createElement(Divider, null)
    );
  };

  this.uploadSelectedFile = function (file, handleAddMessage) {
    var _props7 = _this4.props,
        firebaseApp = _props7.firebaseApp,
        intl = _props7.intl;


    if (file === null) {
      return;
    }

    if ((file.size / 1024 / 1024).toFixed(4) > 20) {
      //file larger than 10mb
      alert(intl.formatMessage({ id: 'max_file_size' }));
      return;
    }

    var reader = new FileReader();

    var key = firebaseApp.database().ref('/user_chat_messages/').push().key;

    reader.onload = function (fileData) {
      var uploadTask = firebaseApp.storage().ref('/user_chats/' + key).putString(fileData.target.result, 'data_url');

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {}, function (error) {
        console.log(error);
      }, function () {
        handleAddMessage('image', uploadTask.snapshot.downloadURL);
      });
    };

    reader.readAsDataURL(file);
  };
}, _temp);


ChatMessages.propTypes = process.env.NODE_ENV !== "production" ? {
  intl: intlShape.isRequired,
  muiTheme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
} : {};

var mapStateToProps = function mapStateToProps(state, ownPops) {
  var lists = state.lists,
      auth = state.auth,
      browser = state.browser,
      simpleValues = state.simpleValues;
  var uid = ownPops.uid,
      path = ownPops.path;


  var chatMessageMenuOpen = simpleValues['chatMessageMenuOpen'] === true;
  var imageDialogOpen = simpleValues.chatOpenImageDialog;

  return {
    imageDialogOpen: imageDialogOpen,
    simpleValues: simpleValues,
    path: path,
    uid: uid,
    chatMessageMenuOpen: chatMessageMenuOpen,
    messages: lists[path],
    predefinedMessages: lists['predefined_chat_messages'],
    auth: auth,
    browser: browser
  };
};

export default connect(mapStateToProps, { setSimpleValue: setSimpleValue })(injectIntl(muiThemeable()(withRouter(withFirebase(ChatMessages)))));