

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Activity from 'rmw-shell';
import { ResponsiveMenu } from 'material-ui-responsive-menu';
import { setSimpleValue } from 'rmw-shell';
import { withRouter } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import { withFirebase } from 'firekit-provider';
import FireForm from 'fireform';
import { change, submit } from 'redux-form';
import UserForm from '../../components/Forms/UserForm';
import UserGrants from './UserGrants';
import UserRoles from './UserRoles';
import { Tabs, Tab } from 'material-ui/Tabs';
import Scrollbar from 'rmw-shell/es/components/Scrollbar/Scrollbar';
import { filterSelectors, filterActions } from 'material-ui-filter';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var path = '/users';
var form_name = 'user';

export var User = function (_Component) {
  _inherits(User, _Component);

  function User() {
    var _temp, _this, _ret;

    _classCallCheck(this, User);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleTabActive = function (value) {
      var _this$props = _this.props,
          history = _this$props.history,
          uid = _this$props.uid;


      history.push(path + '/edit/' + uid + '/' + value);
    }, _this.handleAdminChange = function (e, isInputChecked) {
      var _this$props2 = _this.props,
          firebaseApp = _this$props2.firebaseApp,
          match = _this$props2.match;

      var uid = match.params.uid;

      if (isInputChecked) {
        firebaseApp.database().ref('/admins/' + uid).set(true);
      } else {
        firebaseApp.database().ref('/admins/' + uid).remove();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  User.prototype.componentWillMount = function componentWillMount() {
    this.props.watchList('admins');
  };

  User.prototype.render = function render() {
    var _props = this.props,
        history = _props.history,
        intl = _props.intl,
        muiTheme = _props.muiTheme,
        match = _props.match,
        admins = _props.admins,
        editType = _props.editType,
        setFilterIsOpen = _props.setFilterIsOpen,
        hasFilters = _props.hasFilters,
        firebaseApp = _props.firebaseApp;


    var uid = match.params.uid;
    var isAdmin = false;
    if (admins !== undefined) {
      for (var _iterator = admins, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var admin = _ref;

        if (admin.key === uid) {
          isAdmin = true;
          break;
        }
      }
    }

    var menuList = [{
      hidden: editType !== 'grants',
      text: intl.formatMessage({ id: 'open_filter' }),
      icon: React.createElement(
        FontIcon,
        { className: 'material-icons', color: hasFilters ? muiTheme.palette.accent1Color : muiTheme.palette.canvasColor },
        'filter_list'
      ),
      tooltip: intl.formatMessage({ id: 'open_filter' }),
      onClick: function onClick() {
        return setFilterIsOpen('user_grants', true);
      }
    }];

    return React.createElement(
      Activity,
      {
        iconStyleRight: { width: '50%' },
        iconElementRight: React.createElement(
          'div',
          null,
          React.createElement(ResponsiveMenu, {
            iconMenuColor: muiTheme.palette.canvasColor,
            menuList: menuList
          })
        ),

        onBackClick: function onBackClick() {
          return history.push('/users');
        },
        title: intl.formatMessage({ id: 'edit_user' }) },
      React.createElement(
        Scrollbar,
        null,
        React.createElement(
          Tabs,
          {
            value: editType,
            onChange: this.handleTabActive },
          React.createElement(
            Tab,
            {
              value: 'profile',
              icon: React.createElement(
                FontIcon,
                { className: 'material-icons' },
                'person'
              ) },
            editType === 'profile' && React.createElement(
              'div',
              { style: { margin: 15, display: 'flex', justifyContent: 'center' } },
              React.createElement(
                FireForm,
                {
                  firebaseApp: firebaseApp,
                  name: form_name,
                  path: path + '/',
                  onSubmitSuccess: function onSubmitSuccess(values) {
                    history.push('' + path);
                  },
                  onDelete: function onDelete(values) {
                    history.push('' + path);
                  },
                  uid: uid },
                React.createElement(UserForm, _extends({
                  handleAdminChange: this.handleAdminChange,
                  isAdmin: isAdmin
                }, this.props))
              )
            )
          ),
          React.createElement(
            Tab,
            {
              value: 'roles',
              icon: React.createElement(
                FontIcon,
                { className: 'material-icons' },
                'account_box'
              ) },
            editType === 'roles' && React.createElement(UserRoles, this.props)
          ),
          React.createElement(
            Tab,
            {
              value: 'grants',
              icon: React.createElement(
                FontIcon,
                { className: 'material-icons' },
                'lock'
              ) },
            editType === 'grants' && React.createElement(UserGrants, this.props)
          )
        )
      )
    );
  };

  return User;
}(Component);

User.propTypes = process.env.NODE_ENV !== "production" ? {
  history: PropTypes.object,
  intl: intlShape.isRequired,
  submit: PropTypes.func.isRequired,
  muiTheme: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  admins: PropTypes.array.isRequired
} : {};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var auth = state.auth,
      intl = state.intl,
      lists = state.lists,
      filters = state.filters;
  var match = ownProps.match;


  var uid = match.params.uid;
  var editType = match.params.editType ? match.params.editType : 'data';

  var _filterSelectors$sele = filterSelectors.selectFilterProps('user_grants', filters),
      hasFilters = _filterSelectors$sele.hasFilters;

  return {
    hasFilters: hasFilters,
    auth: auth,
    uid: uid,
    editType: editType,
    intl: intl,
    admins: lists.admins
  };
};

export default connect(mapStateToProps, _extends({ setSimpleValue: setSimpleValue, change: change, submit: submit }, filterActions))(injectIntl(withRouter(withFirebase(muiThemeable()(User)))));