import { useState, useEffect } from 'react'
import ChatComponent from './ChatComponent'
import logo from './assets/trade_pro3.svg'

import './App.css'
import './style.css'
import axios from 'axios'
import StockComponent from './StockComponent'

function App() {

  return (
    <>
      <div className="container dark:bg-slate-800">

        <div className="item title flex items-center justify-center">
          <img class="object-cover  h-48 w-96" src={logo}
            alt="image description" />
          <h1 className="text-center mb-4 text-3xl font-extrabold text-gray-900 
        dark:text-white md:text-5xl lg:text-6xl">
            Sentiment Analysis for Trading</h1>



        </div>
        <div className="item chat">
          <ChatComponent />
        </div>
        <div className="item tesla">
          <StockComponent companyName="Tesla, Inc." symbol="TSLA"/>
        </div>

        <div className="item apple">
          <StockComponent companyName="Apple" symbol="AAPL"/>
        </div>
        <div className="item meta">
          <StockComponent companyName="Meta" symbol="META"/>
        </div>
      </div>
    </>
  )
}

export default App