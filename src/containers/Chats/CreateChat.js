

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { injectIntl, intlShape } from 'react-intl';
import Activity from '../../containers/Activity';
import Scrollbar from '../../components/Scrollbar';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import { withRouter } from 'react-router-dom';
import { GoogleIcon, FacebookIcon, GitHubIcon, TwitterIcon } from '../../components/Icons';
import { withFirebase } from 'firekit-provider';
import ReactList from 'react-list';
import { filterSelectors, filterActions } from 'material-ui-filter';
import { setPersistentValue } from '../../store/persistentValues/actions';
import SearchField from '../../components/SearchField/SearchField';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var path = 'users';

export var Users = function (_Component) {
  _inherits(Users, _Component);

  function Users() {
    var _temp, _this, _ret;

    _classCallCheck(this, Users);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.getProviderIcon = function (provider) {
      var muiTheme = _this.props.muiTheme;

      var color = muiTheme.palette.primary2Color;

      switch (provider.providerId) {
        case 'google.com':
          return React.createElement(GoogleIcon, { color: color });
        case 'facebook.com':
          return React.createElement(FacebookIcon, { color: color });
        case 'twitter.com':
          return React.createElement(TwitterIcon, { color: color });
        case 'github.com':
          return React.createElement(GitHubIcon, { color: color });
        case 'phone':
          return React.createElement(
            FontIcon,
            { className: 'material-icons', color: color },
            'phone'
          );
        case 'password':
          return React.createElement(
            FontIcon,
            { className: 'material-icons', color: color },
            'email'
          );
        default:
          return undefined;
      }
    }, _this.handleRowClick = function (user) {
      var _this$props = _this.props,
          auth = _this$props.auth,
          firebaseApp = _this$props.firebaseApp,
          history = _this$props.history,
          usePreview = _this$props.usePreview,
          setPersistentValue = _this$props.setPersistentValue;


      var key = user.key;
      var userValues = user.val;
      var userChatsRef = firebaseApp.database().ref('/user_chats/' + auth.uid + '/' + key);

      var chatData = {
        displayName: userValues.displayName,
        photoURL: userValues.photoURL ? userValues.photoURL : '',
        lastMessage: ''
      };

      userChatsRef.update(_extends({}, chatData));

      if (usePreview) {
        setPersistentValue('current_chat_uid', key);
        history.push('/chats');
      } else {
        history.push('/chats/edit/' + key);
      }
    }, _this.renderItem = function (index, key) {
      var _this$props2 = _this.props,
          users = _this$props2.users,
          intl = _this$props2.intl,
          muiTheme = _this$props2.muiTheme,
          auth = _this$props2.auth;


      var user = users[index].val;

      if (user.uid === auth.uid) {
        return React.createElement('div', { key: key });
      }

      return React.createElement(
        'div',
        { key: key },
        React.createElement(
          ListItem,
          {
            key: key,
            id: key,
            onClick: function onClick() {
              _this.handleRowClick(users[index]);
            },
            leftAvatar: React.createElement(Avatar, { style: { marginTop: 10 }, src: user.photoURL, alt: 'person', icon: React.createElement(
                FontIcon,
                { className: 'material-icons' },
                'person'
              ) }),
            rightIcon: React.createElement(
              FontIcon,
              { style: { marginTop: 22 }, className: 'material-icons', color: user.connections ? muiTheme.palette.primary1Color : muiTheme.palette.disabledColor },
              'offline_pin'
            ) },
          React.createElement(
            'div',
            { style: { display: 'flex', flexWrap: 'wrap', alignItems: 'strech' } },
            React.createElement(
              'div',
              { style: { display: 'flex', flexDirection: 'column', width: 120 } },
              React.createElement(
                'div',
                null,
                user.displayName
              ),
              React.createElement(
                'div',
                {
                  style: {
                    fontSize: 14,
                    lineHeight: '16px',
                    height: 16,
                    margin: 0,
                    marginTop: 4,
                    color: muiTheme.listItem.secondaryTextColor
                  } },
                !user.connections && !user.lastOnline ? intl.formatMessage({ id: 'offline' }) : intl.formatMessage({ id: 'online' }),
                ' ',
                !user.connections && user.lastOnline ? intl.formatRelative(new Date(user.lastOnline)) : undefined
              )
            ),
            React.createElement(
              'div',
              { style: { marginLeft: 20, display: 'flex', flexWrap: 'wrap', alignItems: 'center' } },
              user.providerData && user.providerData.map(function (p, i) {
                return React.createElement(
                  'div',
                  { key: i, style: { paddingLeft: 10 } },
                  _this.getProviderIcon(p)
                );
              })
            )
          )
        ),
        React.createElement(Divider, { inset: true })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Users.prototype.componentDidMount = function componentDidMount() {
    this.props.watchList(path);
  };

  Users.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        users = _props.users,
        muiTheme = _props.muiTheme,
        setSearch = _props.setSearch,
        intl = _props.intl;


    return React.createElement(
      Activity,
      {
        iconStyleLeft: { width: 'auto' },
        iconStyleRight: { width: '100%', textAlign: 'center', marginLeft: 0 },
        iconElementRight: React.createElement(
          'div',
          { style: { width: 'calc(100% - 48px)' } },
          React.createElement(SearchField, {
            onChange: function onChange(e, newVal) {
              setSearch('select_user', newVal);
            },
            hintText: '' + intl.formatMessage({ id: 'user_label_search' })
          })
        ),
        isLoading: users === undefined },
      React.createElement(
        'div',
        { style: { height: '100%', overflow: 'none', backgroundColor: muiTheme.palette.convasColor } },
        React.createElement(
          Scrollbar,
          null,
          React.createElement(
            List,
            { id: 'test', ref: function ref(field) {
                _this2.users = field;
              } },
            React.createElement(ReactList, {
              itemRenderer: this.renderItem,
              length: users ? users.length : 0,
              type: 'simple'
            })
          )
        )
      )
    );
  };

  return Users;
}(Component);

Users.propTypes = process.env.NODE_ENV !== "production" ? {
  users: PropTypes.array.isRequired,
  intl: intlShape.isRequired,
  muiTheme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
} : {};

var mapStateToProps = function mapStateToProps(state) {
  var lists = state.lists,
      auth = state.auth,
      filters = state.filters,
      browser = state.browser;


  var users = filterSelectors.getFilteredList('select_user', filters, lists['users'], function (fieldValue) {
    return fieldValue.val;
  });
  var usePreview = browser.greaterThan.small;

  return {
    usePreview: usePreview,
    users: users,
    auth: auth
  };
};

export default connect(mapStateToProps, _extends({}, filterActions, { setPersistentValue: setPersistentValue }))(injectIntl(muiThemeable()(withFirebase(withRouter(Users)))));