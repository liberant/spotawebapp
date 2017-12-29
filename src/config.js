import getMenuItems from './menuItems'
import locales from './locales'
import routes from './routes'
import themes from './themes'
import grants from './grants'

const config = {
  firebase_config: {
    apiKey: "AIzaSyDR6-mGXKNnkJ0Sv7ufX8oNCGYk5UxVVr0",
    authDomain: "spotaproject.firebaseapp.com",
    databaseURL: "https://spotaproject.firebaseio.com",
    projectId: "spotaproject",
    storageBucket: "spotaproject.appspot.com",
    messagingSenderId: "746405070068"
  },
  firebase_config_dev: {
    apiKey: "AIzaSyDR6-mGXKNnkJ0Sv7ufX8oNCGYk5UxVVr0",
    authDomain: "spotaproject.firebaseapp.com",
    databaseURL: "https://spotaproject.firebaseio.com",
    projectId: "spotaproject",
    storageBucket: "spotaproject.appspot.com",
    messagingSenderId: "746405070068"
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
    theme: 'dark',
    locale: 'en'
  },
  drawer_width: 256,
  locales,
  themes,
  grants,
  routes,
  getMenuItems,
  firebaseLoad: () => import('./firebase'),
}

export default config
