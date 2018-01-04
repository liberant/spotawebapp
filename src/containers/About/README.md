

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Table of Contents

- [Features](#features)
- [Folder Structure](#folder-structure)
- [Customatisation](#customatisation)
  - [Internationalization](#internationalization)
  - [Theming](#theming)
  - [Firebase lists](#firebase-lists)
  - [Drawer width](#drawer-width)
  - [Authorisation](#authorisation)
- [Logo](#logo)


## Features

* ***PWA** - has Progressive Web App features
* **responsive** - included with PWA
* **material-ui**
* **routing**
* **theming**
* **forms** - with realtime sync of untouched fields
* **internationalization**
* **authentication**
* **authorisation**
* **code splitting**
* **CI** and **CD**
* **realtime database**
* **realtime forms**
* **messaging/notifications** - every logged user that approved messaging on login will receive notifications for new tasks created
* **full authentication** - with Google, Facebook, Twitter, GitHub, email and **phone**
* **online and last time offline state for users**
* **file uploads to the firebase storage**

## Folder Structure

The project has following folder structure:

```
spotawebapp/
  .gitignore
  README.md
  node_modules/
  package.json
  sw-precache-config.js
  public/
    icons/
    index.html
    favicon.ico
    manifest.json
  src/
    components/
    containers/
    firebase/
    utils/
    locales/
    store/
      index.js
      reducers.js
    themes/
    config.js
    index.js
```

All application parts and code should be stored in the `src` folder.

All `react` components should be separated in presentational and container components. This great [article](https://www.fullstackreact.com/p/using-presentational-and-container-components-with-redux/) describes the why and how. For this purpose we have the `components` and `containers` folders.

All `redux` related files are in the `store` folder. You can find more about redux [here](https://redux.js.org/docs/introduction/).

The folders `locales` and `themes` are used to store data for different locales and themes.


##Customatisation

### Internationalization

Internationalization is very important. Even if you use just a single language your application should be prepared for more of them. It is easier to apply this from the start than to refactor the whole application afterwards.

The only thing you'll have to do to add a new language is that you have to add the localisationData in the locales [index.js](/src/locales/index.js) folder like in the code sniped below. Here we add the language for to the project:

```js

import fr from 'react-intl/locale-data/fr';
import fr_messages from './fr';

//... other code

const locales = [
  {
    locale: 'en',
    messages: en_messages,
    data: en
  },
  {
    locale: 'de',
    messages: de_messages,
    data: de
  },
  {
    locale: 'bs',
    messages: bs_messages,
    data: bs
  },
  {
    locale: 'fr',
    messages: fr_messages,
    data: fr
  },

]

```

We also need to create a file 'fr.js' into the 'locales' folder. I would recommend to juts copy the 'en.js' file and to translate the strings.

To add more translated strings just add them to every language file you have in the 'locales' folder.

### Theming

To change or to add a new theme you would have to add or edit a theme file into the 'themes' folder and a reference to it into the 'index.js' file.

For example we crate a file 'my_theme.js' and change the 'index.j' file like below. You can use the 'ics_theme' as bootstrap for new projects or get a new one from the official 'material-ui' documentation.

```js

import ics_theme from './ics_theme';
import my_theme from './my_theme';

const themes= [
  {
    id: 'light',
    source: lightBaseTheme,
  },
  {
    id: 'dark',
    source: darkBaseTheme,
  },
  {
    id: 'ics',
    source: ics_theme,
  },
  {
    id: 'my_theme',
    source: my_theme,
  },
];

```

### Firebase lists

To add a new list that is synced with Firebase there are more steps to take.
First we need to create a component that will represent the list. You can use the 'Tasks.js' component as example.

In that you should change following code parts to make it work:

```js
//....code before
const actions = new ListActions('your_list').createActions();
//....code after

```

In the folder 'store' you should add the generated reducers into the 'reducers.js' file, like so:

```js
//....code before
const reducers = combineReducers({
  browser: responsiveStateReducer,
  responsiveDrawer,
  form: formReducer,
  auth,
  connection,
  dialogs,
  messaging,
  locale,
  theme,
  tasks: getListReducers('public_tasks'),
  companies: getListReducers('companies'),
  your_list: getListReducers('your_list'), //your new list
  users: getListReducers('users')
})
//....code after

```

That is all you have to do to add a new list. It is up to you how the lists will be presented. Just don't forget to leave into the mounting and unmounting part of you component following code parts:

```js
//....code before
componentDidMount() {
  const {initialiseList}=this.props;
  initialiseList();
}

componentWillUnmount() {
  const {unsubscribeList}=this.props;
  unsubscribeList();
}
//....code after

```

These are initializing the list and unsubscribing from it if we leave the component. You can add other code to those functions or move those calls to other places of your component life cycle if you wish.

### Drawer width

To change the drawer (left menu) width go to the 'config.js' file and change the value of  'drawer_width' :)

### Authorisation

Note that authentication and authorization are not the same thing! With authentication we identify who we have as user and with authorization we identify what that user can do in our application. In this project authorization is managed over `grants` and `roles`. Every grant gives the user the authorization to do a specific action (read, create, edit or delete) in the database. Roles are defining a group of grants you can give a user. They are just for managing large number of grants easily. Every grant can still be managed separately.

Only administrators have access to add or remove grants and roles to a user. Only administrators can make other users to administrators.

**WARNING:** In dev the rules are that everyone can make other users admins, and a user can even become an admin on their own. In production a change should be made in the database.rules file.

From:

```js
"admins":{
  ".read": "auth != null",
  "$uid":{
    ".write": "auth != null || root.child('admins/'+auth.uid).exists()"
  }
},

```

To:

```js
"admins":{
  ".read": "auth != null",
  "$uid":{
    ".write": "auth != null && root.child('admins/'+auth.uid).exists()"
  }
},

```


## Logo


[logo-image]: https://spota-2139f.firebaseapp.com/favicon-32x32.png
[code-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[code-style-url]: https://standardjs.com/
