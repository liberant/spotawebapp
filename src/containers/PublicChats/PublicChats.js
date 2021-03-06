

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { injectIntl, intlShape } from 'react-intl';
import { setSimpleValue } from '../../store/simpleValues/actions';
import Activity from '../../containers/Activity';
import { withRouter } from 'react-router-dom';
import { withFirebase } from 'firekit-provider';
import ChatMessages from '../../containers/ChatMessages/ChatMessages';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

export var Chat = function (_Component) {
  _inherits(Chat, _Component);

  function Chat() {
    _classCallCheck(this, Chat);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Chat.prototype.render = function render() {
    var _props = this.props,
        muiTheme = _props.muiTheme,
        intl = _props.intl,
        firebaseApp = _props.firebaseApp;


    return React.createElement(
      Activity,
      {
        containerStyle: { overflow: 'hidden', backgroundColor: muiTheme.chip.backgroundColor },
        title: intl.formatMessage({ id: 'public_chats' }) },
      React.createElement(ChatMessages, { path: 'public_chats', firebaseApp: firebaseApp })
    );
  };

  return Chat;
}(Component);

Chat.propTypes = process.env.NODE_ENV !== "production" ? {
  intl: intlShape.isRequired,
  muiTheme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
} : {};

var mapStateToProps = function mapStateToProps(state, ownPops) {
  var auth = state.auth;
  var match = ownPops.match;

  var uid = match.params.uid;

  return {
    uid: uid,
    auth: auth
  };
};

export default connect(mapStateToProps, { setSimpleValue: setSimpleValue })(injectIntl(muiThemeable()(withRouter(withFirebase(Chat)))));