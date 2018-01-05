
import Activity from '../../containers/Activity';
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import FireForm from 'fireform';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import React, { Component } from 'react';
import RoleForm from '../../components/Forms/RoleForm';
import Toggle from 'material-ui/Toggle';
import muiThemeable from 'material-ui/styles/muiThemeable';
import withAppConfigs from '../../withAppConfigs';
import { ListItem } from 'material-ui/List';
import { ResponsiveMenu } from 'material-ui-responsive-menu';
import { change, submit } from 'redux-form';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { setDialogIsOpen } from '../../store/dialogs/actions';
import { withFirebase } from 'firekit-provider';
import { withRouter } from 'react-router-dom';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


var path = '/roles';
var form_name = 'role';

export var Role = function (_Component) {
  _inherits(Role, _Component);

  function Role() {
    var _temp, _this, _ret;

    _classCallCheck(this, Role);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.validate = function (values) {
      var intl = _this.props.intl;

      var errors = {};

      errors.name = !values.name ? intl.formatMessage({ id: 'error_required_field' }) : '';

      return errors;
    }, _this.handleClose = function () {
      var setDialogIsOpen = _this.props.setDialogIsOpen;


      setDialogIsOpen('delete_role', false);
    }, _this.handleDelete = function () {
      var _this$props = _this.props,
          history = _this$props.history,
          match = _this$props.match,
          firebaseApp = _this$props.firebaseApp;

      var uid = match.params.uid;

      if (uid) {
        firebaseApp.database().ref().child(path + '/' + uid).remove().then(function () {
          _this.handleClose();
          history.goBack();
        });
      }
    }, _this.handleGrantToggleChange = function (e, isInputChecked, key) {
      var _this$props2 = _this.props,
          firebaseApp = _this$props2.firebaseApp,
          match = _this$props2.match;

      var uid = match.params.uid;

      if (isInputChecked) {
        firebaseApp.database().ref('/role_grants/' + uid + '/' + key).set(true);
      } else {
        firebaseApp.database().ref('/role_grants/' + uid + '/' + key).remove();
      }
    }, _this.renderGrantItem = function (i, k) {
      var _this$props3 = _this.props,
          role_grants = _this$props3.role_grants,
          match = _this$props3.match,
          intl = _this$props3.intl,
          appConfig = _this$props3.appConfig;


      var uid = match.params.uid;
      var key = i;
      var val = appConfig.grants[i];
      var roleGrants = [];

      if (role_grants !== undefined) {
        role_grants.map(function (role) {
          if (role.key === uid) {
            if (role.val !== undefined) {
              roleGrants = role.val;
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
            toggled: roleGrants[val] === true,
            onToggle: function onToggle(e, isInputChecked) {
              _this.handleGrantToggleChange(e, isInputChecked, val);
            }
          }),
          key: key,
          id: key,
          primaryText: intl.formatMessage({ id: 'grant_' + val })
          //secondaryText={val.description}
        }),
        React.createElement(Divider, { inset: true })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Role.prototype.componentDidMount = function componentDidMount() {
    this.props.watchList('grants');
    this.props.watchList('role_grants');
  };

  Role.prototype.render = function render() {
    var _props = this.props,
        history = _props.history,
        intl = _props.intl,
        dialogs = _props.dialogs,
        setDialogIsOpen = _props.setDialogIsOpen,
        submit = _props.submit,
        muiTheme = _props.muiTheme,
        match = _props.match,
        firebaseApp = _props.firebaseApp,
        appConfig = _props.appConfig;


    var uid = match.params.uid;

    var actions = [React.createElement(FlatButton, {
      label: intl.formatMessage({ id: 'cancel' }),
      primary: true,
      onClick: this.handleClose
    }), React.createElement(FlatButton, {
      label: intl.formatMessage({ id: 'delete' }),
      secondary: true,
      onClick: this.handleDelete
    })];

    var menuList = [{
      text: intl.formatMessage({ id: 'save' }),
      icon: React.createElement(
        FontIcon,
        { className: 'material-icons', color: muiTheme.palette.canvasColor },
        'save'
      ),
      tooltip: intl.formatMessage({ id: 'save' }),
      onClick: function onClick() {
        submit('role');
      }
    }, {
      hidden: uid === undefined,
      text: intl.formatMessage({ id: 'delete' }),
      icon: React.createElement(
        FontIcon,
        { className: 'material-icons', color: muiTheme.palette.canvasColor },
        'delete'
      ),
      tooltip: intl.formatMessage({ id: 'delete' }),
      onClick: function onClick() {
        setDialogIsOpen('delete_role', true);
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
          history.goBack();
        },
        title: intl.formatMessage({
          id: this.props.match.params.uid ? 'edit_role' : 'create_role'
        }) },
      React.createElement(
        'div',
        { style: { margin: 15, display: 'flex' } },
        React.createElement(
          FireForm,
          {
            firebaseApp: firebaseApp,
            name: form_name,
            path: path + '/',
            validate: this.validate,
            onSubmitSuccess: function onSubmitSuccess(values) {
              history.push('' + path);
            },
            onDelete: function onDelete(values) {
              history.push('' + path);
            },
            uid: this.props.match.params.uid },
          React.createElement(RoleForm, _extends({
            grants: appConfig.grants,
            renderGrantItem: this.renderGrantItem
          }, this.props))
        )
      ),
      React.createElement(
        Dialog,
        {
          title: intl.formatMessage({ id: 'delete_role_title' }),
          actions: actions,
          modal: false,
          open: dialogs.delete_role === true,
          onRequestClose: this.handleClose },
        intl.formatMessage({ id: 'delete_role_message' })
      )
    );
  };

  return Role;
}(Component);

var mapStateToProps = function mapStateToProps(state) {
  var auth = state.auth,
      intl = state.intl,
      dialogs = state.dialogs,
      lists = state.lists;


  return {
    auth: auth,
    intl: intl,
    dialogs: dialogs,
    role_grants: lists.role_grants
  };
};

export default connect(mapStateToProps, { setDialogIsOpen: setDialogIsOpen, change: change, submit: submit })(injectIntl(withRouter(withFirebase(withAppConfigs(muiThemeable()(Role))))));