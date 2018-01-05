import getMenuItems from './menuItems'
import locales from './locales'
import routes from './routes'
import themes from './themes'
import grants from './grants'
import configureStore from './store';
import { SpotaIcon } from './components/Icons';



const config = {
  firebase_config: {
    apiKey: "AIzaSyBgXyshWBQQjvOCxUHKZnSCuhREqRiU66U",
    authDomain: "spota-2139f.firebaseapp.com",
    databaseURL: "https://spota-2139f.firebaseio.com",
    projectId: "spota-2139f",
    storageBucket: "spota-2139f.appspot.com",
    messagingSenderId: "738533213905"
  },
  firebase_config_dev: {
    apiKey: "AIzaSyBgXyshWBQQjvOCxUHKZnSCuhREqRiU66U",
    authDomain: "spota-2139f.firebaseapp.com",
    databaseURL: "https://spota-2139f.firebaseio.com",
    projectId: "spota-2139f",
    storageBucket: "spota-2139f.appspot.com",
    messagingSenderId: "738533213905"
  },
  firebase_providers: [
    'google.com',
    'facebook.com',
    'twitter.com',
    'github.com',
    'password',
    'phone'
  ],
  initial_state: {
    theme: 'light',
    locale: 'en'
  },
  drawer_width: 256,
  appIcon: SpotaIcon,
  configureStore,
  locales,
  themes,
  grants,
  routes,
  getMenuItems,
  firebaseLoad: () => import('./firebase'),
}

export default config
