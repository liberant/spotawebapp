
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { AvatarImageField } from '../ReduxFormFields';
import Toggle from 'material-ui/Toggle';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserForm = function (_Component) {
  _inherits(UserForm, _Component);

  function UserForm() {
    _classCallCheck(this, UserForm);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  UserForm.prototype.render = function render() {
    var _props = this.props,
      handleSubmit = _props.handleSubmit,
      intl = _props.intl,
      initialized = _props.initialized,
      uid = _props.uid,
      handleAdminChange = _props.handleAdminChange,
      isAdmin = _props.isAdmin;


    return React.createElement(
      'form',
      {
        onSubmit: handleSubmit, style: {
          height: '100%',
          alignItems: 'stretch',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start'
        }
      },
      React.createElement('button', { type: 'submit', style: { display: 'none' } }),
      React.createElement(
        'div',
        { style: { marginLeft: -10 } },
        React.createElement(AvatarImageField, {
          disabled: true,
          uid: uid,
          change: this.props.change,
          initialized: initialized,
          intl: intl,
          path: 'users'
        })
      ),
      React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          null,
          React.createElement(Field, {
            name: 'displayName',
            disabled: true,
            component: TextField,
            hintText: intl.formatMessage({ id: 'name_hint' }),
            floatingLabelText: intl.formatMessage({ id: 'name_label' }),
            ref: 'displayName',
            withRef: true
          })
        ),
        React.createElement(
          'div',
          null,
          React.createElement(Field, {
            name: 'firstName',
            disabled: true,
            component: TextField,
            hintText: intl.formatMessage({ id: 'fname_hint' }),
            floatingLabelText: intl.formatMessage({ id: 'fname_label' }),
            ref: 'firstName',
            withRef: true
          }),
          React.createElement(Field, {
            name: 'lastName',
            disabled: true,
            component: TextField,
            hintText: intl.formatMessage({ id: 'lname_hint' }),
            floatingLabelText: intl.formatMessage({ id: 'lname_label' }),
            ref: 'lastName',
            withRef: true
          })
        )
      ),
      React.createElement(
        'div',
        null,
        React.createElement(Field, {
          name: 'email',
          disabled: true,
          component: TextField,
          hintText: intl.formatMessage({ id: 'email_hint' }),
          floatingLabelText: intl.formatMessage({ id: 'email_label' }),
          ref: 'email',
          withRef: true
        })
      ),
      React.createElement('br', null),
      React.createElement(
        'div',
        null,
        React.createElement(Toggle, {
          label: intl.formatMessage({ id: 'is_admin_label' }),
          toggled: isAdmin,
          onToggle: handleAdminChange
        })
      )
    );
  };

  return UserForm;
}(Component);

UserForm.propTypes = process.env.NODE_ENV !== "production" ? {
  handleSubmit: PropTypes.func.isRequired,
  handleAdminChange: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
  initialized: PropTypes.bool.isRequired,
  setDialogIsOpen: PropTypes.any.isRequired,
  uid: PropTypes.string.isRequired
} : {};

export default reduxForm({ form: 'user' })(UserForm);