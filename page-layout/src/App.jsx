import { useState, useEffect } from 'react'
import ChatComponent from './ChatComponent'
import logo from './assets/trade_pro4.svg'

import './App.css'
import './style.css'
import axios from 'axios'
import StockComponent from './StockComponent'

function App() {

  return (
    <>
      <div className="container dark:bg-slate-800">

        <div className="item title flex items-center">

          <img className="object-none h-48 w-48 md:w-72 lg:w-48" src={logo} alt="image description" />
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            Trade Pro:
            <span className="p-5 text-3xl md:text-4xl lg:text-5xl"> Sentiment Analysis Tool for Trading</span>
          </h1>


        </div>

        <ChatComponent />

      </div>
    </>
  )
}

export default App