

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { setSimpleValue } from 'rmw-shell/es/store/simpleValues/actions';
import { withRouter } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import { withFirebase } from 'firekit-provider';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Toggle from 'material-ui/Toggle';
import ReactList from 'react-list';
import { List } from 'material-ui/List';
import { FilterDrawer, filterSelectors, filterActions } from 'material-ui-filter';
import withAppConfigs from 'rmw-shell/es/withAppConfigs';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

export var UserGrants = function (_Component) {
  _inherits(UserGrants, _Component);

  function UserGrants() {
    var _temp, _this, _ret;

    _classCallCheck(this, UserGrants);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleGrantToggleChange = function (e, isInputChecked, key) {
      var _this$props = _this.props,
          firebaseApp = _this$props.firebaseApp,
          match = _this$props.match;

      var uid = match.params.uid;

      if (isInputChecked) {
        firebaseApp.database().ref('/user_grants/' + uid + '/' + key).set(true);
      } else {
        firebaseApp.database().ref('/user_grants/' + uid + '/' + key).remove();
      }
    }, _this.renderGrantItem = function (list, i, k) {
      var _this$props2 = _this.props,
          user_grants = _this$props2.user_grants,
          match = _this$props2.match,
          intl = _this$props2.intl,
          appConfig = _this$props2.appConfig;


      var uid = match.params.uid;
      var key = list[i].key;
      var val = appConfig.grants[list[i].key];
      var userGrants = [];

      if (user_grants !== undefined) {
        user_grants.map(function (role) {
          if (role.key === uid) {
            if (role.val !== undefined) {
              userGrants = role.val;
            }
          }
          return role;
        });
      }

      return React.createElement(
        'div',
        { key: key },
        React.createElement(ListItem, {
          leftAvatar: React.createElement(Avatar, {
            alt: 'person',
            src: undefined,
            icon: React.createElement(
              FontIcon,
              { className: 'material-icons' },
              'checked'
            )
          }),
          rightToggle: React.createElement(Toggle, {
            toggled: userGrants[val] === true,
            onToggle: function onToggle(e, isInputChecked) {
              _this.handleGrantToggleChange(e, isInputChecked, val);
            }
          }),
          key: key,
          id: key,
          primaryText: intl.formatMessage({ id: 'grant_' + val }),
          secondaryText: val
        }),
        React.createElement(Divider, { inset: true })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  UserGrants.prototype.componentWillMount = function componentWillMount() {
    this.props.watchList('user_grants');
  };

  UserGrants.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        intl = _props.intl,
        filters = _props.filters,
        appConfig = _props.appConfig;


    var grantList = [];
    appConfig.grants.forEach(function (grant, index) {
      grantList.push({ key: index, val: { name: intl.formatMessage({ id: 'grant_' + grant }), value: grant } });
    });

    var list = filterSelectors.getFilteredList('user_grants', filters, grantList, function (fieldValue) {
      return fieldValue.val;
    });

    var filterFields = [{
      name: 'name',
      label: intl.formatMessage({ id: 'name_label' })
    }, {
      name: 'value',
      label: intl.formatMessage({ id: 'value_label' })
    }];

    return React.createElement(
      'div',
      { style: { height: '100%' } },
      React.createElement(
        List,
        { style: { height: '100%' }, ref: function ref(field) {
            _this2.list = field;
          } },
        React.createElement(ReactList, {
          itemRenderer: function itemRenderer(i, k) {
            return _this2.renderGrantItem(list, i, k);
          },
          length: list ? list.length : 0,
          type: 'simple'
        })
      ),
      React.createElement(FilterDrawer, {
        name: 'user_grants',
        fields: filterFields,
        formatMessage: intl.formatMessage
      })
    );
  };

  return UserGrants;
}(Component);

UserGrants.propTypes = process.env.NODE_ENV !== "production" ? {
  intl: intlShape.isRequired,
  muiTheme: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
} : {};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var auth = state.auth,
      intl = state.intl,
      lists = state.lists,
      filters = state.filters;
  var match = ownProps.match;


  var uid = match.params.uid;

  return {
    filters: filters,
    auth: auth,
    uid: uid,
    intl: intl,
    user_grants: lists.user_grants
  };
};

export default connect(mapStateToProps, _extends({ setSimpleValue: setSimpleValue }, filterActions))(injectIntl(withRouter(withFirebase(withAppConfigs(muiThemeable()(UserGrants))))));