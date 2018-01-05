

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { injectIntl, intlShape } from 'react-intl';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import { withRouter } from 'react-router-dom';
import { withFirebase } from 'firekit-provider';
import ReactList from 'react-list';
import { FilterDrawer, filterSelectors, filterActions } from 'material-ui-filter';
import { GoogleIcon, FacebookIcon, GitHubIcon, TwitterIcon } from '../../components/Icons';
import Activity from '../../containers/Activity';
import Scrollbar from '../../components/Scrollbar/Scrollbar';
import SearchField from '../../components/SearchField';
import { ResponsiveMenu } from 'material-ui-responsive-menu';

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
          history = _this$props.history,
          isSelecting = _this$props.isSelecting;

      history.push(isSelecting ? '/' + isSelecting + '/' + user.key : '/' + path + '/edit/' + user.key + '/profile');
    }, _this.renderItem = function (index, key) {
      var _this$props2 = _this.props,
          list = _this$props2.list,
          intl = _this$props2.intl,
          muiTheme = _this$props2.muiTheme;

      var user = list[index].val;

      return React.createElement(
        'div',
        { key: key },
        React.createElement(
          ListItem,
          {
            key: key,
            id: key,
            onClick: function onClick() {
              _this.handleRowClick(list[index]);
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
            { style: { display: 'flex', flexWrap: 'wrap', alignItems: 'stretch' } },
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
    var setSearch = this.props.setSearch;


    setSearch('users', '');
    this.props.watchList(path);
  };

  Users.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        list = _props.list,
        muiTheme = _props.muiTheme,
        setSearch = _props.setSearch,
        intl = _props.intl,
        setFilterIsOpen = _props.setFilterIsOpen,
        hasFilters = _props.hasFilters;


    var menuList = [{
      text: intl.formatMessage({ id: 'open_filter' }),
      icon: React.createElement(
        FontIcon,
        { className: 'material-icons', color: hasFilters ? muiTheme.palette.accent1Color : muiTheme.palette.canvasColor },
        'filter_list'
      ),
      tooltip: intl.formatMessage({ id: 'open_filter' }),
      onClick: function onClick() {
        setFilterIsOpen('users', true);
      }
    }];

    var filterFields = [{
      name: 'displayName',
      label: intl.formatMessage({ id: 'name' })
    }, {
      name: 'email',
      label: intl.formatMessage({ id: 'email_label' })
    }];

    return React.createElement(
      Activity,
      {
        iconStyleLeft: { width: 'auto' },
        iconStyleRight: { width: '100%', textAlign: 'center', marginLeft: 0 },
        iconElementRight: React.createElement(
          'div',
          { style: { display: 'flex' } },
          React.createElement(
            'div',
            { style: { width: 'calc(100% - 84px)' } },
            React.createElement(SearchField, {
              onChange: function onChange(e, newVal) {
                setSearch('users', newVal);
              },
              hintText: '' + intl.formatMessage({ id: 'search' })
            })
          ),
          React.createElement(
            'div',
            { style: { position: 'absolute', right: 10, width: 100 } },
            React.createElement(ResponsiveMenu, {
              iconMenuColor: muiTheme.palette.canvasColor,
              menuList: menuList
            })
          )
        ),
        isLoading: list === undefined },
      React.createElement(
        'div',
        { style: { height: '100%', overflow: 'none', backgroundColor: muiTheme.palette.canvasColor } },
        React.createElement(
          Scrollbar,
          null,
          React.createElement(
            List,
            { id: 'test', ref: function ref(field) {
                return _this2.list = field;
              } },
            React.createElement(ReactList, {
              itemRenderer: this.renderItem,
              length: list ? list.length : 0,
              type: 'simple'
            })
          )
        )
      ),
      React.createElement(FilterDrawer, {
        name: 'users',
        fields: filterFields,
        formatMessage: intl.formatMessage
      })
    );
  };

  return Users;
}(Component);

Users.propTypes = process.env.NODE_ENV !== "production" ? {
  users: PropTypes.array,
  intl: intlShape.isRequired,
  muiTheme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
} : {};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var lists = state.lists,
      auth = state.auth,
      filters = state.filters;
  var match = ownProps.match;


  var isSelecting = match.params.select ? match.params.select : false;

  var _filterSelectors$sele = filterSelectors.selectFilterProps('companies', filters),
      hasFilters = _filterSelectors$sele.hasFilters;

  var list = filterSelectors.getFilteredList('users', filters, lists[path], function (fieldValue) {
    return fieldValue.val;
  });

  return {
    isSelecting: isSelecting,
    hasFilters: hasFilters,
    list: list,
    auth: auth
  };
};

export default connect(mapStateToProps, _extends({}, filterActions))(injectIntl(muiThemeable()(withFirebase(withRouter(Users)))));