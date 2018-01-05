import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store'
import config from './config'
import locales from './locales'
import registerServiceWorker from './registerServiceWorker'
import { addLocalizationData } from './locales'

addLocalizationData(locales)

ReactDOM.render(
  <App appConfig={{ configureStore, ...config }} />
  , document.getElementById('root')
)

registerServiceWorker()
