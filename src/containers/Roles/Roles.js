

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import Activity from '../../containers/Activity';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { withFirebase } from 'firekit-provider';
import { withRouter } from 'react-router-dom';
import ReactList from 'react-list';
import Avatar from 'material-ui/Avatar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import Scrollbar from '../../components/Scrollbar/Scrollbar';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var path = 'roles';

export var Roles = function (_Component) {
  _inherits(Roles, _Component);

  function Roles() {
    var _temp, _this, _ret;

    _classCallCheck(this, Roles);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleCreateClick = function () {
      var _this$props = _this.props,
          firebaseApp = _this$props.firebaseApp,
          history = _this$props.history;


      var newRole = firebaseApp.database().ref('/' + path).push();

      newRole.update({ description: ' ' }).then(function () {
        history.push('/' + path + '/edit/' + newRole.key);
      });
    }, _this.renderItem = function (i, k) {
      var _this$props2 = _this.props,
          list = _this$props2.list,
          history = _this$props2.history;


      var key = list[i].key;
      var val = list[i].val;

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
          onClick: function onClick() {
            history.push('/' + path + '/edit/' + key);
          },
          key: key,
          id: key,
          primaryText: val.name,
          secondaryText: val.description
        }),
        React.createElement(Divider, { inset: true })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Roles.prototype.componentDidMount = function componentDidMount() {
    var watchList = this.props.watchList;


    watchList(path);
  };

  Roles.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        intl = _props.intl,
        list = _props.list;


    return React.createElement(
      Activity,
      {
        isLoading: list === undefined,
        title: intl.formatMessage({ id: 'roles' }) },
      React.createElement(
        'div',
        { style: { height: '100%' } },
        React.createElement(
          Scrollbar,
          null,
          React.createElement(
            List,
            { ref: function ref(field) {
                _this2.list = field;
              } },
            React.createElement(ReactList, {
              itemRenderer: this.renderItem,
              length: list ? list.length : 0,
              type: 'simple'
            })
          )
        ),
        React.createElement('div', {
          style: { float: "left", clear: "both" }
        }),
        React.createElement(
          FloatingActionButton,
          {
            onClick: this.handleCreateClick,
            style: { position: 'fixed', bottom: 15, right: 20, zIndex: 99 },
            secondary: true },
          React.createElement(
            FontIcon,
            { className: 'material-icons' },
            'add'
          )
        )
      )
    );
  };

  return Roles;
}(Component);

Roles.propTypes = process.env.NODE_ENV !== "production" ? {
  intl: intlShape.isRequired
} : {};

var mapStateToProps = function mapStateToProps(state) {
  var lists = state.lists;


  return {
    list: lists[path]
  };
};

export default connect(mapStateToProps)(injectIntl(withFirebase(withRouter(Roles))));