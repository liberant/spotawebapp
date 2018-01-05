
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import ReactList from 'react-list';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RoleForm = function (_Component) {
  _inherits(RoleForm, _Component);

  function RoleForm() {
    _classCallCheck(this, RoleForm);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  RoleForm.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        handleSubmit = _props.handleSubmit,
        intl = _props.intl,
        initialized = _props.initialized,
        renderGrantItem = _props.renderGrantItem,
        grants = _props.grants;


    return React.createElement(
      'form',
      { onSubmit: handleSubmit, style: {
          height: '100%',
          alignItems: 'stretch',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center'
        } },
      React.createElement('button', { type: 'submit', style: { display: 'none' } }),
      React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          null,
          React.createElement(Field, {
            name: 'name',
            disabled: !initialized,
            component: TextField,
            hintText: intl.formatMessage({ id: 'name_hint' }),
            floatingLabelText: intl.formatMessage({ id: 'name_label' }),
            ref: 'name',
            withRef: true
          })
        ),
        React.createElement(
          'div',
          null,
          React.createElement(Field, {
            name: 'description',
            component: TextField,
            disabled: !initialized,
            hintText: intl.formatMessage({ id: 'description_hint' }),
            floatingLabelText: intl.formatMessage({ id: 'description_label' }),
            multiLine: true,
            rows: 2,
            ref: 'description',
            withRef: true
          })
        )
      ),
      React.createElement(
        'div',
        null,
        React.createElement(
          Subheader,
          null,
          intl.formatMessage({ id: 'grants' })
        ),
        React.createElement(
          List,
          { style: { height: '100%' }, ref: function ref(field) {
              _this2.grants = field;
            } },
          React.createElement(ReactList, {
            itemRenderer: renderGrantItem,
            length: grants ? grants.length : 0,
            type: 'simple'
          })
        )
      )
    );
  };

  return RoleForm;
}(Component);

RoleForm.propTypes = process.env.NODE_ENV !== "production" ? {
  handleSubmit: PropTypes.func.isRequired,
  renderGrantItem: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  initialized: PropTypes.bool.isRequired,
  uid: PropTypes.string
} : {};

export default reduxForm({ form: 'role' })(RoleForm);