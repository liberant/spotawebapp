
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { setSimpleValue } from 'rmw-shell';
import { withRouter } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import { withFirebase } from 'firekit-provider';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Toggle from 'material-ui/Toggle';
import ReactList from 'react-list';
import { List } from 'material-ui/List';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



export var UserRoles = function (_Component) {
  _inherits(UserRoles, _Component);

  function UserRoles() {
    var _temp, _this, _ret;

    _classCallCheck(this, UserRoles);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleRoleToggleChange = function (e, isInputChecked, key) {
      var _this$props = _this.props,
          firebaseApp = _this$props.firebaseApp,
          match = _this$props.match;

      var uid = match.params.uid;

      if (isInputChecked) {
        firebaseApp.database().ref('/user_roles/' + uid + '/' + key).set(true);
      } else {
        firebaseApp.database().ref('/user_roles/' + uid + '/' + key).remove();
      }
    }, _this.renderRoleItem = function (i, k) {
      var _this$props2 = _this.props,
          roles = _this$props2.roles,
          user_roles = _this$props2.user_roles,
          match = _this$props2.match;


      var uid = match.params.uid;
      var key = roles[i].key;
      var val = roles[i].val;
      var userRoles = [];

      if (user_roles !== undefined) {
        user_roles.map(function (role) {
          if (role.key === uid) {
            if (role.val !== undefined) {
              userRoles = role.val;
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
            src: val.photoURL,
            icon: React.createElement(
              FontIcon,
              { className: 'material-icons' },
              'account_box'
            )
          }),
          rightToggle: React.createElement(Toggle, {
            toggled: userRoles[key] === true,
            onToggle: function onToggle(e, isInputChecked) {
              _this.handleRoleToggleChange(e, isInputChecked, key);
            }
          }),
          key: key,
          id: key,
          primaryText: val.name,
          secondaryText: val.description
        }),
        React.createElement(Divider, { inset: true })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  UserRoles.prototype.componentWillMount = function componentWillMount() {
    this.props.watchList('user_roles');
    this.props.watchList('roles');
  };

  UserRoles.prototype.render = function render() {
    var _this2 = this;

    var roles = this.props.roles;


    return React.createElement(
      'div',
      { style: { height: '100%' } },
      React.createElement(
        List,
        { style: { height: '100%' } },
        React.createElement(ReactList, {
          itemRenderer: function itemRenderer(i, k) {
            return _this2.renderRoleItem(i, k);
          },
          length: roles ? roles.length : 0,
          type: 'simple'
        })
      )
    );
  };

  return UserRoles;
}(Component);

UserRoles.propTypes = process.env.NODE_ENV !== "production" ? {
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
    user_roles: lists.user_roles,
    roles: lists.roles ? lists.roles : []
  };
};

export default connect(mapStateToProps, { setSimpleValue: setSimpleValue })(injectIntl(withRouter(withFirebase(muiThemeable()(UserRoles)))));