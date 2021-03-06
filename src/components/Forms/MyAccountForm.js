
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import FontIcon from 'material-ui/FontIcon';
import { ImageCropDialog } from '../../containers/ImageCropDialog';
import IconButton from 'material-ui/IconButton';
import { AvatarImageField } from '../../components/ReduxFormFields';
import withAppConfigs from '../../withAppConfigs';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MyAccountForm = function (_Component) {
  _inherits(MyAccountForm, _Component);

  function MyAccountForm() {
    _classCallCheck(this, MyAccountForm);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  MyAccountForm.prototype.render = function render() {
    var _props = this.props,
        handleSubmit = _props.handleSubmit,
        intl = _props.intl,
        initialized = _props.initialized,
        setSimpleValue = _props.setSimpleValue,
        new_company_photo = _props.new_company_photo,
        auth = _props.auth,
        muiTheme = _props.muiTheme,
        isLinkedWithProvider = _props.isLinkedWithProvider,
        linkUserWithPopup = _props.linkUserWithPopup,
        getProviderIcon = _props.getProviderIcon,
        handleEmailVerificationsSend = _props.handleEmailVerificationsSend,
        appConfig = _props.appConfig,
        handlePhotoUploadSuccess = _props.handlePhotoUploadSuccess;


    var uid = auth.uid;
    var showPasswords = isLinkedWithProvider('password');

    return React.createElement(
      'form',
      { onSubmit: handleSubmit, style: {
          height: '100%',
          alignItems: 'strech',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center'
        } },
      React.createElement(
        'div',
        { style: { margin: 15, display: 'flex', flexDirection: 'column', alignItems: 'center' } },
        React.createElement(AvatarImageField, {
          disabled: !initialized,
          uid: uid,
          change: this.props.change,
          initialized: initialized,
          intl: intl,
          path: 'users' }),
        React.createElement(
          'div',
          null,
          appConfig.firebase_providers.map(function (p, i) {
            if (p !== 'email' && p !== 'password' && p !== 'phone') {
              return React.createElement(
                IconButton,
                {
                  key: i,
                  disabled: isLinkedWithProvider(p),
                  onClick: function onClick() {
                    linkUserWithPopup(p);
                  },
                  tooltip: intl.formatMessage({ id: 'link_with_' + p }) },
                getProviderIcon(p)
              );
            } else {
              return React.createElement('div', { key: i });
            }
          })
        )
      ),
      React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          null,
          React.createElement(Field, {
            name: 'displayName',
            disabled: !initialized,
            component: TextField,
            fullWidth: true,
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
              disabled: !initialized,
              component: TextField,
              hintText: intl.formatMessage({ id: 'fname_hint' }),
              floatingLabelText: intl.formatMessage({ id: 'fname_label' }),
              ref: 'firstName',
              withRef: true
            })
          ),
            React.createElement(
              'div',
              null,
              React.createElement(Field, {
                name: 'lastName',
                disabled: !initialized,
                component: TextField,
                hintText: intl.formatMessage({ id: 'lname_hint' }),
                floatingLabelText: intl.formatMessage({ id: 'lname_label' }),
                ref: 'lastName',
                withRef: true
              })
            ),
        React.createElement(
          'div',
          { style: { display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap' } },
          React.createElement(
            'div',
            null,
            React.createElement(Field, {
              name: 'email',
              disabled: !initialized,
              component: TextField,
              hintText: intl.formatMessage({ id: 'email' }),
              floatingLabelText: intl.formatMessage({ id: 'email' }),
              ref: 'email',
              withRef: true
            })
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              IconButton,
              {
                onClick: auth.emailVerified === true ? undefined : handleEmailVerificationsSend,
                tooltip: intl.formatMessage({ id: auth.emailVerified === true ? 'email_verified' : 'email_not_verified' }) },
              React.createElement(
                FontIcon,
                {
                  color: auth.emailVerified === true ? muiTheme.palette.primary1Color : muiTheme.palette.accent1Color,
                  style: { 'paddingLeft': 10 },
                  className: 'material-icons' },
                auth.emailVerified === true ? 'verified_user' : 'error'
              )
            )
          )
        ),
        showPasswords && React.createElement(
          'div',
          null,
          React.createElement(
            'div',
            null,
            React.createElement(Field, {
              name: 'old_password',
              disabled: !initialized,
              type: 'Password',
              component: TextField,
              fullWidth: true,
              hintText: intl.formatMessage({ id: 'password' }),
              floatingLabelText: intl.formatMessage({ id: 'password' }),
              ref: 'old_password',
              withRef: true
            })
          ),
          React.createElement(
            'div',
            null,
            React.createElement(Field, {
              name: 'new_password',
              disabled: !initialized,
              type: 'Password',
              component: TextField,
              fullWidth: true,
              hintText: intl.formatMessage({ id: 'password' }),
              floatingLabelText: intl.formatMessage({ id: 'new_password' }),
              ref: 'new_password',
              withRef: true
            })
          ),
          React.createElement(
            'div',
            null,
            React.createElement(Field, {
              name: 'new_password_confirmation',
              disabled: !initialized,
              type: 'Password',
              component: TextField,
              fullWidth: true,
              hintText: intl.formatMessage({ id: 'confirm_password' }),
              floatingLabelText: intl.formatMessage({ id: 'confirm_password' }),
              ref: 'new_password_confirmation',
              withRef: true
            })
          )
        )
      ),
      React.createElement(ImageCropDialog, {
        path: 'users/' + uid,
        fileName: 'photoURL',
        onUploadSuccess: function onUploadSuccess(s) {
          handlePhotoUploadSuccess(s);
        },
        open: new_company_photo !== undefined,
        src: new_company_photo,
        handleClose: function handleClose() {
          setSimpleValue('new_company_photo', undefined);
        },
        title: intl.formatMessage({ id: 'change_photo' })
      })
    );
  };

  return MyAccountForm;
}(Component);

MyAccountForm.propTypes = process.env.NODE_ENV !== "production" ? {
  getProviderIcon: PropTypes.func.isRequired,
  handleEmailVerificationsSend: PropTypes.func.isRequired,
  handlePhotoUploadSuccess: PropTypes.func.isRequired,
  handleUserDeletion: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialized: PropTypes.bool.isRequired,
  setSimpleValue: PropTypes.func.isRequired,
  muiTheme: PropTypes.object.isRequired,
  isLinkedWithProvider: PropTypes.func.isRequired,
  linkUserWithPopup: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  auth: PropTypes.object.isRequired
} : {};

export default reduxForm({ form: 'my_account' })(withAppConfigs(MyAccountForm));