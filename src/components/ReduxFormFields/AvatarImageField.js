

import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Avatar } from '../../containers/Avatar';
import { Field } from 'redux-form';
import { ImageCropDialog } from '../../containers/ImageCropDialog';
import { intlShape } from 'react-intl';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AvatarImageField = function (_Component) {
  _inherits(AvatarImageField, _Component);

  function AvatarImageField(props) {
    _classCallCheck(this, AvatarImageField);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handlePhotoUploadSuccess = function (snapshot) {
      var change = _this.props.change;


      change('photoURL', snapshot.downloadURL);
      _this.setState({ selected_avatar_image: undefined });
    };

    _this.state = {
      selected_avatar_image: undefined
    };
    return _this;
  }

  AvatarImageField.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        altIconName = _props.altIconName,
        disabled = _props.disabled,
        initialized = _props.initialized,
        intl = _props.intl,
        path = _props.path,
        uid = _props.uid;


    return React.createElement(
      'div',
      { style: { margin: 20 } },
      React.createElement(
        'div',
        null,
        React.createElement(Field, {
          name: 'photoURL',
          size: 120,
          component: Avatar,
          icon: React.createElement(
            FontIcon,
            {
              className: 'material-icons' },
            altIconName
          ),
          ref: 'photoURL',
          withRef: true
        })
      ),
      React.createElement(
        'div',
        null,
        React.createElement(FlatButton, {
          style: { width: '100%' },
          onClick: function onClick() {
            _this2.setState({ selected_avatar_image: 'true' });
          },
          disabled: disabled === true ? true : uid === undefined || !initialized,
          containerElement: 'label',
          primary: true,
          icon: React.createElement(
            FontIcon,
            {
              className: 'material-icons' },
            'photo_camera'
          )
        })
      ),
      React.createElement(ImageCropDialog, {
        path: path + '/' + uid,
        fileName: 'photoURL',
        onUploadSuccess: function onUploadSuccess(s) {
          _this2.handlePhotoUploadSuccess(s);
        },
        open: this.state.selected_avatar_image !== undefined,
        src: this.state.selected_avatar_image,
        handleClose: function handleClose() {
          _this2.setState({ 'selected_avatar_image': undefined });
        },
        title: intl.formatMessage({ id: 'change_photo' })
      })
    );
  };

  return AvatarImageField;
}(Component);

export { AvatarImageField as default };


AvatarImageField.propTypes = process.env.NODE_ENV !== "production" ? {
  disabled: PropTypes.bool.isRequired,
  initialized: PropTypes.bool.isRequired,
  uid: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
  altIconName: PropTypes.string,
  path: PropTypes.string.isRequired
} : {};