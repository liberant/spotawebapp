import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import Activity from 'rmw-shell';
import { setSimpleValue } from 'rmw-shell';
import MyAccountForm from '../../components/Forms/MyAccountForm';
import { withRouter } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { withFirebase } from 'firekit-provider';
import FireForm from 'fireform';
import { GoogleIcon, FacebookIcon, GitHubIcon, TwitterIcon } from 'rmw-shell';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { change, submit, formValueSelector } from 'redux-form';
import { ResponsiveMenu } from 'material-ui-responsive-menu';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var path = '/users/';
var form_name = 'my_account';

export var MyAccount = function (_Component) {
  _inherits(MyAccount, _Component);

  function MyAccount() {
    var _temp, _this, _ret;

    _classCallCheck(this, MyAccount);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.getProviderIcon = function (p) {
      var muiTheme = _this.props.muiTheme;

      var color = muiTheme.palette.primary2Color;

      switch (p) {
        case 'google.com':
          return React.createElement(GoogleIcon, { color: color });

        case 'facebook.com':
          return React.createElement(FacebookIcon, { color: color });

        case 'twitter.com':
          return React.createElement(TwitterIcon, { color: color });

        case 'github.com':
          return React.createElement(GitHubIcon, { color: color });

        default:
          return undefined;
      }
    }, _this.handleEmailVerificationsSend = function () {
      var firebaseApp = _this.props.firebaseApp;

      firebaseApp.auth().currentUser.sendEmailVerification().then(function () {
        alert('Verification E-Mail send');
      });
    }, _this.handlePhotoUploadSuccess = function (snapshot) {
      var _this$props = _this.props,
          setSimpleValue = _this$props.setSimpleValue,
          change = _this$props.change;

      change(form_name, 'photoURL', snapshot.downloadURL);
      setSimpleValue('new_company_photo', undefined);
    }, _this.handleUserDeletion = function () {
      var _this$props2 = _this.props,
          change = _this$props2.change,
          submit = _this$props2.submit;

      change(form_name, 'delete_user', true);
      submit(form_name);
    }, _this.getProvider = function (provider) {
      if (provider.indexOf('facebook') > -1) {
        return new firebase.auth.FacebookAuthProvider();
      }
      if (provider.indexOf('github') > -1) {
        return new firebase.auth.GithubAuthProvider();
      }
      if (provider.indexOf('google') > -1) {
        return new firebase.auth.GoogleAuthProvider();
      }
      if (provider.indexOf('twitter') > -1) {
        return new firebase.auth.TwitterAuthProvider();
      }
      if (provider.indexOf('phone') > -1) {
        return new firebase.auth.PhoneAuthProvider();
      }

      throw new Error('Provider is not supported!');
    }, _this.reauthenticateUser = function (values, onSuccess) {
      var _this$props3 = _this.props,
          auth = _this$props3.auth,
          firebaseApp = _this$props3.firebaseApp,
          authError = _this$props3.authError;


      if (_this.isLinkedWithProvider('password') && !values) {
        if (onSuccess && onSuccess instanceof Function) {
          onSuccess();
        }
      } else if (_this.isLinkedWithProvider('password') && values) {
        var credential = firebase.auth.EmailAuthProvider.credential(auth.email, values.old_password);
        firebaseApp.auth().currentUser.reauthenticateWithCredential(credential).then(function () {
          if (onSuccess && onSuccess instanceof Function) {
            onSuccess();
          }
        }, function (e) {
          authError(e);
        });
      } else {
        firebaseApp.auth().currentUser.reauthenticateWithPopup(_this.getProvider(auth.providerData[0].providerId)).then(function () {
          if (onSuccess && onSuccess instanceof Function) {
            onSuccess();
          }
        }, function (e) {
          authError(e);
        });
      }
    }, _this.isLinkedWithProvider = function (provider) {
      var auth = _this.props.auth;


      try {
        return auth && auth.providerData && auth.providerData.find(function (p) {
          return p.providerId === provider;
        }) !== undefined;
      } catch (e) {
        return false;
      }
    }, _this.linkUserWithPopup = function (provider) {
      var _this$props4 = _this.props,
          firebaseApp = _this$props4.firebaseApp,
          authError = _this$props4.authError,
          authStateChanged = _this$props4.authStateChanged;


      firebaseApp.auth().currentUser.linkWithPopup(_this.getProvider(provider)).then(function (payload) {
        authStateChanged(firebaseApp.auth().currentUser);
      }, function (e) {
        authError(e);
      });
    }, _this.handleCreateValues = function (values) {
      return false;
    }, _this.clean = function (obj) {
      Object.keys(obj).forEach(function (key) {
        return obj[key] === undefined && delete obj[key];
      });
      return obj;
    }, _this.handleUpdateValues = function (values, dispatch, props) {
      var _this$props5 = _this.props,
          auth = _this$props5.auth,
          firebaseApp = _this$props5.firebaseApp,
          authStateChanged = _this$props5.authStateChanged,
          authError = _this$props5.authError;

debugger;
      var simpleChange = values.displayName && values.displayName.localeCompare(auth.displayName) || values.photoURL && values.photoURL.localeCompare(auth.photoURL);

      var simpleValues = {
        displayName: values.displayName,
        photoURL: values.photoURL

        //Change simple data
      };if (simpleChange) {
        firebaseApp.auth().currentUser.updateProfile(simpleValues).then(function () {

          firebaseApp.database().ref('users/' + auth.uid).update(_this.clean(simpleValues)).then(function () {
            authStateChanged(values);
          }, function (e) {
            authError(e);
          });
        }, function (e) {
          authError(e);
        });
      }

      //Change email
      if (values.email && values.email.localeCompare(auth.email)) {

        _this.reauthenticateUser(values, function () {
          firebaseApp.auth().currentUser.updateEmail(values.email).then(function () {
            firebaseApp.database().ref('users/' + auth.uid).update({ email: values.email }).then(function () {
              authStateChanged({ email: values.email });
            }, function (e) {
              authError(e);
            });
          }, function (e) {
            authError(e);

            if (e.code === 'auth/requires-recent-login') {
              firebaseApp.auth().signOut().then(function () {
                setTimeout(function () {
                  alert('Please sign in again to change your email.');
                }, 1);
              });
            }
          });
        });
      }

      //Change password
      if (values.new_password) {

        _this.reauthenticateUser(values, function () {
          firebaseApp.auth().currentUser.updatePassword(values.new_password).then(function () {
            firebaseApp.auth().signOut();
          }, function (e) {
            authError(e);

            if (e.code === 'auth/requires-recent-login') {
              firebaseApp.auth().signOut().then(function () {
                setTimeout(function () {
                  alert('Please sign in again to change your password.');
                }, 1);
              });
            }
          });
        });
      }

      // We manage the data saving above
      return false;
    }, _this.handleClose = function () {
      var setSimpleValue = _this.props.setSimpleValue;

      setSimpleValue('delete_user', false);
      setSimpleValue('auth_menu', false);
    }, _this.handleDelete = function () {
      var _this$props6 = _this.props,
          firebaseApp = _this$props6.firebaseApp,
          authError = _this$props6.authError;


      _this.reauthenticateUser(false, function () {
        firebaseApp.auth().currentUser.delete().then(function () {
          _this.handleClose();
        }, function (e) {
          authError(e);

          if (e.code === 'auth/requires-recent-login') {
            firebaseApp.auth().signOut().then(function () {
              setTimeout(function () {
                alert('Please sign in again to delete your account.');
              }, 1);
            });
          }
        });
      });
    }, _this.validate = function (values) {
      var auth = _this.props.auth;

      var providerId = auth.providerData[0].providerId;
      var errors = {};

      if (!values.displayName) {
        errors.displayName = 'Required';
      }

      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      } else if (!values.old_password && providerId === 'password' && auth.email.localeCompare(values.email)) {
        errors.old_password = 'For email change enter your password';
      }

      if (values.new_password) {
        if (values.new_password.length < 6) {
          errors.new_password = 'Password should be at least 6 characters';
        } else if (values.new_password.localeCompare(values.new_password_confirmation)) {
          errors.new_password = 'Must be equal';
          errors.new_password_confirmation = 'Must be equal';
        }
      }

      return errors;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  MyAccount.prototype.render = function render() {
    var _props = this.props,
        history = _props.history,
        intl = _props.intl,
        setSimpleValue = _props.setSimpleValue,
        delete_user = _props.delete_user,
        auth = _props.auth,
        muiTheme = _props.muiTheme,
        submit = _props.submit,
        firebaseApp = _props.firebaseApp;


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
      hidden: auth.uid === undefined,
      text: intl.formatMessage({ id: 'save' }),
      icon: React.createElement(
        FontIcon,
        { className: 'material-icons', color: muiTheme.palette.canvasColor },
        'save'
      ),
      tooltip: intl.formatMessage({ id: 'save' }),
      onClick: function onClick() {
        return submit('my_account');
      }
    }, {
      hidden: auth.uid === undefined,
      text: intl.formatMessage({ id: 'delete' }),
      icon: React.createElement(
        FontIcon,
        { className: 'material-icons', color: muiTheme.palette.canvasColor },
        'delete'
      ),
      tooltip: intl.formatMessage({ id: 'delete' }),
      onClick: function onClick() {
        return setSimpleValue('delete_user', true);
      }
    }];

    return React.createElement(
      Activity,
      {
        iconStyleRight: { width: '50%' },
        iconElementRight: React.createElement(ResponsiveMenu, {
          iconMenuColor: muiTheme.palette.canvasColor,
          menuList: menuList
        }),
        title: intl.formatMessage({ id: 'my_account' }) },
      auth.uid && React.createElement(
        'div',
        { style: { margin: 15, display: 'flex' } },
        React.createElement(
          FireForm,
          {
            firebaseApp: firebaseApp,
            validate: this.validate,
            name: form_name,
            path: path,
            handleUpdateValues: this.handleUpdateValues,
            onSubmitSuccess: function onSubmitSuccess(values) {
              history.push('/dashboard');setSimpleValue('auth_menu', false);
            },
            onDelete: function onDelete(values) {
              history.push('/signin');
            },
            handleCreateValues: this.handleCreateValues,
            uid: auth.uid },
          React.createElement(MyAccountForm, _extends({
            linkUserWithPopup: this.linkUserWithPopup,
            isLinkedWithProvider: this.isLinkedWithProvider,
            getProviderIcon: this.getProviderIcon,
            handleEmailVerificationsSend: this.handleEmailVerificationsSend,
            handlePhotoUploadSuccess: this.handlePhotoUploadSuccess,
            handleUserDeletion: this.handleUserDeletion
          }, this.props))
        )
      ),
      React.createElement(
        Dialog,
        {
          title: intl.formatMessage({ id: 'delete_account_dialog_title' }),
          actions: actions,
          modal: false,
          open: delete_user === true,
          onRequestClose: this.handleClose },
        intl.formatMessage({ id: 'delete_account_dialog_message' })
      )
    );
  };

  return MyAccount;
}(Component);

MyAccount.propTypes = process.env.NODE_ENV !== "production" ? {
  history: PropTypes.object,
  setSimpleValue: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  isGranted: PropTypes.func,
  auth: PropTypes.object.isRequired,
  vehicle_types: PropTypes.array
} : {};

var selector = formValueSelector(form_name);

var mapStateToProps = function mapStateToProps(state) {
  var intl = state.intl,
      simpleValues = state.simpleValues,
      auth = state.auth;


  var delete_user = simpleValues.delete_user;
  var new_user_photo = simpleValues.new_user_photo;
debugger;
  return {
    new_user_photo: new_user_photo,
    intl: intl,
    delete_user: delete_user,
    auth: auth,
    photoURL: selector(state, 'photoURL'),
    old_password: selector(state, 'old_password')
  };
};

export default connect(mapStateToProps, { setSimpleValue: setSimpleValue, change: change, submit: submit })(injectIntl(withRouter(muiThemeable()(withFirebase(MyAccount)))));