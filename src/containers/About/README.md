

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This is a `shell` for my future applications with the minimum features I would like them to have.

I tried to make the project as clean as possible and to use all libraries in their pure ways.

## Table of Contents

- [Features](#features)
- [Folder Structure](#folder-structure)
- [Usage](#usage)
- [Customatisation](#customatisation)
  - [Internationalization](#internationalization)
  - [Theming](#theming)
  - [Firebase lists](#firebase-lists)
  - [Drawer width](#drawer-width)
  - [Authorisation](#authorisation)
- [TO DO](#to-do)
- [License](#license)
- [Logo](#logo)


## Features

`React to This` is a "base project", "starter kit", "boilerplate" (call it whatever you like) project with my "Most Wanted" features:
* **easy to maintain**
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

All these features can be programmed from scratch. But why should anyone do this? There are so many great developers out there creating great applications, libraries and tools to help them and you to develop fast and easily.

There are also other cool features:
* **realtime database**
* **realtime forms**
* **messaging/notifications** - every logged user that approved messaging on login will receive notifications for new tasks created
* **full authentication** - with Google, Facebook, Twitter, GitHub, email and **phone**
* **online and last time offline state for users**
* **file uploads to the firebase storage**


The further text explains which libraries/modules are used, and why. Some of them are installed and used in their `pure` way as described in their documentation. In those cases we will just show the link to the official documentation to avoid outdated descriptions of their usage.

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

## Usage

To just run the project on you own device you should have installed: git, node and npm. Let's assume that this is the case.

Now in your console go to the destination where you want to save the project and run this command:

```js
git clone git@bitbucket.org:novenpw/spotawebapp.git new_project
```

if you want to save the project into a specific folder (in this example "new_project"). The folder must be empty!

Now go with the console into the folder.

Make a mirror of the repository so you don't push changes onto my source.  


After cloning the repo into your own you should change the configurations like project name and the firebase config. Here is a list of all changes you should make:
* **package.json**  - here you should change the name and version
* **src/config.js**  - here you should change all firebase data and other options
* **public/index.html**  - change the title (it will be overridden, but it looks better)
* **public/firebase-messaging-sw.js**  - change the ``messagingSenderId``

In he folder run this command to start the development mode of the project:

```js
npm run dev
```

For publishing run:

```js
npm run build
```

After it finished follow the instructions or publish the project build folder to your preferred  provider or own server.



After setting up the code we need to deploy our application to Firebase. As first create an application build by running `npm run build`.

To use firebase we need to install the firebase tools by running `npm install -g firebase-tools` and after that login to firebase with `firebase login`.

After the login run `fribease init` to setup the Firebase project. Override the existing project and select yours from your Firebase console.
Override only the '.firebasesrc' file and leave the other as they are because the database and storage rules, functions and firebase settings should stay as they are. If you override them the project will probably not work as it should.

Don't forget to setup the email configs into the firebase functions using `firebase functions:config:set gmail.email="myusername@gmail.com" gmail.password="secretpassword"`.

You should now be able to deploy your application to your Firebase using `firebase deploy`.


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

**WARNING:** In this demo the rules are manipulated such that everyone can make other users admins, and a user can even become an admin on their own. Everyone can see how this part works. In production a change should be made in the database.rules file.

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



## TO DO

- [X] implement all or most firebase functionalities
- [X] implement [redux-offline](https://github.com/jevakallio/redux-offline) with examples
- [X] implement code splitting
- [X] implement continuous integration
- [ ] update to material-ui@next
- [ ] finish tests

## License


## Logo


[logo-image]: https://spotaproject.firebaseapp.com/favicon-32x32.png
[code-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[code-style-url]: https://standardjs.com/
