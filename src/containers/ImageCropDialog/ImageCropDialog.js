

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import firebase from 'firebase';
import { Cropper } from 'react-image-cropper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { withFirebase } from 'firekit-provider';
import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  container: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  dialog: {
    width: '100%',
    maxWidth: 'none'
  },
  cropper: {
    height: 250,
    width: 250
  }
};

export var ImageCropDialog = function (_Component) {
  _inherits(ImageCropDialog, _Component);

  function ImageCropDialog(props) {
    _classCallCheck(this, ImageCropDialog);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handlePhotoURLUpload = function (photo_url) {
      var _this$props = _this.props,
          path = _this$props.path,
          fileName = _this$props.fileName,
          onUploadSuccess = _this$props.onUploadSuccess,
          firebaseApp = _this$props.firebaseApp;


      _this.setState({ isUploading: true, uploadProgress: 0 });

      var uploadTask = firebaseApp.storage().ref(path + '/' + fileName).putString(photo_url, 'data_url');

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
        var progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        _this.setState({ isUploading: true, uploadProgress: progress });
      }, function (error) {
        console.log(error);
      }, function () {
        _this.setState({ isUploading: false, uploadProgress: 100 }, function () {
          onUploadSuccess(uploadTask.snapshot);
        });
      });
    };

    _this.handlePhotoULRChange = function (e) {
      e.preventDefault();

      _this.setState({ isLoading: true });

      var files = void 0;
      if (e.dataTransfer) {
        files = e.dataTransfer.files;
      } else if (e.target) {
        files = e.target.files;
      }
      var reader = new FileReader();
      reader.onload = function () {
        _this.setState({ src: reader.result, isLoading: false, file: files[0] });
      };
      reader.readAsDataURL(files[0]);
    };

    _this.handleClose = function () {
      var handleClose = _this.props.handleClose;

      _this.setState({ src: undefined });
      handleClose();
    };

    _this.cropper = null;
    _this.state = {
      src: undefined,
      isLoading: false,
      isUploading: false,
      uploadProgress: 0
    };
    return _this;
  }

  ImageCropDialog.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        intl = _props.intl,
        open = _props.open,
        title = _props.title;


    var actions = [React.createElement(FlatButton, {
      disabled: !this.state.src || this.state.isLoading || this.state.isUploading,
      label: intl.formatMessage({ id: 'submit' }),
      primary: true,
      onClick: function onClick() {
        _this2.handlePhotoURLUpload(_this2.cropper.crop());
      }
    }), React.createElement(FlatButton, {
      label: intl.formatMessage({ id: 'cancel' }),
      secondary: true,
      onClick: this.handleClose
    })];

    return React.createElement(
      Dialog,
      {
        contentStyle: styles.dialog,
        title: title,
        actions: actions,
        onRequestClose: this.handleClose,
        open: open },
      React.createElement(
        'div',
        { style: styles.container },
        React.createElement(
          'div',
          { style: styles.cropper },
          (!this.state.src || this.state.isLoading) && React.createElement('input', {
            ref: function ref(field) {
              if (field !== null) {
                field.click();
              }
            },
            type: 'file',
            accept: 'image/*'
            //style={{visibility:'hidden'}}
            , onChange: this.handlePhotoULRChange
          }),
          this.state.isLoading && React.createElement(CircularProgress, { size: 80, thickness: 5 }),
          this.state.isUploading && React.createElement(LinearProgress, { mode: 'determinate', value: this.state.uploadProgress }),
          this.state.src && React.createElement(Cropper, {
            ref: function ref(field) {
              _this2.cropper = field;
            },
            src: this.state ? this.state.src : undefined,
            aspectRatio: 9 / 9
          })
        )
      )
    );
  };

  return ImageCropDialog;
}(Component);

ImageCropDialog.propTypes = process.env.NODE_ENV !== "production" ? {
  intl: intlShape.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  path: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  onUploadSuccess: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
} : {};

var mapStateToProps = function mapStateToProps(state) {
  var auth = state.auth;

  return {
    auth: auth
  };
};

export default connect(mapStateToProps)(injectIntl(withFirebase(ImageCropDialog)));