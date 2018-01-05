

import React from 'react';
import Loadable from 'react-loadable';
import RestrictedRoute from '../../containers/RestrictedRoute';
import makeLoadable from '../../containers/MyLoadable';
import { Route } from 'react-router-dom';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var getAppRoutes = function getAppRoutes(firebaseLoader) {

  var MyLoadable = function MyLoadable(opts, preloadComponents) {
    return makeLoadable(_extends({}, opts, { firebase: firebaseLoader }), preloadComponents);
  };

  var AsyncChat = MyLoadable({ loader: function loader() {
      return import('../../containers/Chats/Chat');
    } });
  var AsyncCreateChat = MyLoadable({ loader: function loader() {
      return import('../../containers/Chats/CreateChat');
    } });
  var AsyncMyAccount = MyLoadable({ loader: function loader() {
      return import('../../containers/MyAccount/MyAccount');
    } });
  var AsyncPageNotFound = MyLoadable({ loader: function loader() {
      return import('../../components/PageNotFound/PageNotFound');
    } });
  var AsyncPredefinedChatMessages = MyLoadable({ loader: function loader() {
      return import('../../containers/PredefinedChatMessages/PredefinedChatMessages');
    } });
  var AsyncPublicChats = MyLoadable({ loader: function loader() {
      return import('../../containers/PublicChats/PublicChats');
    } });
  var AsyncRole = MyLoadable({ loader: function loader() {
      return import('../../containers/Roles/Role');
    } });
  var AsyncSignIn = MyLoadable({ loader: function loader() {
      return import('../../containers/SignIn/SignIn');
    } });
  var AsyncUser = MyLoadable({ loader: function loader() {
      return import('../../containers/Users/User');
    } });
  var AsyncLoading = MyLoadable({ loader: function loader() {
      return import('../../components/LoadingComponent/LoadingComponent');
    } });
  var AsyncRoles = MyLoadable({ loader: function loader() {
      return import('../../containers/Roles/Roles');
    } }, [AsyncRole]);
  var AsyncUsers = MyLoadable({ loader: function loader() {
      return import('../../containers/Users/Users');
    } }, [AsyncUser]);
  var AsyncChats = MyLoadable({ loader: function loader() {
      return import('../../containers/Chats/Chats');
    } }, [AsyncChat, AsyncCreateChat]);

  return [React.createElement(RestrictedRoute, { type: 'private', path: '/chats', exact: true, component: AsyncChats }), React.createElement(RestrictedRoute, { type: 'private', path: '/chats/create', exact: true, component: AsyncCreateChat }), React.createElement(RestrictedRoute, { type: 'private', path: '/chats/edit/:uid', exact: true, component: AsyncChat }), React.createElement(RestrictedRoute, { type: 'private', path: '/loading', exact: true, component: AsyncLoading }), React.createElement(RestrictedRoute, { type: 'private', path: '/my_account', exact: true, component: AsyncMyAccount }), React.createElement(RestrictedRoute, { type: 'private', path: '/predefined_chat_messages', exact: true, component: AsyncPredefinedChatMessages }), React.createElement(RestrictedRoute, { type: 'private', path: '/public_chats', exact: true, component: AsyncPublicChats }), React.createElement(RestrictedRoute, { type: 'private', path: '/roles', exact: true, component: AsyncRoles }), React.createElement(RestrictedRoute, { type: 'private', path: '/roles/create', exact: true, component: AsyncRole }), React.createElement(RestrictedRoute, { type: 'private', path: '/roles/edit/:uid', exact: true, component: AsyncRole }), React.createElement(RestrictedRoute, { type: 'private', path: '/users', exact: true, component: AsyncUsers }), React.createElement(RestrictedRoute, { type: 'private', path: '/users/:select', exact: true, component: AsyncUsers }), React.createElement(RestrictedRoute, { type: 'private', path: '/users/edit/:uid/:editType', exact: true, component: AsyncUser }), React.createElement(RestrictedRoute, { type: 'public', path: '/signin', component: AsyncSignIn }), React.createElement(RestrictedRoute, { type: 'private', path: '/', exact: true, component: AsyncUsers }), React.createElement(Route, { component: AsyncPageNotFound })];
};

export default getAppRoutes;