import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Eve from 'evejs'
import BoardAgent from './BoardAgent'

Eve.system.init({
  transports: [
    {
      type: 'distribus',
      id: 'transport'
    }
  ],
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
