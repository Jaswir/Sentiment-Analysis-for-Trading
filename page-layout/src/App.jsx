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

        <div className="item title flex items-center justify-start">
          <img className="object-cover h-48 w-48 md:w-72 lg:w-96" src={logo} alt="image description" />
          <div className="text-center mr-15">
            <p className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              Sentiment Analysis for Trading
            </p>
          </div>
        </div>


        <div className="item chat">
          <ChatComponent />
        </div>
        <div className="item tesla flex p-5 items-center">
          <StockComponent companyName="Tesla, Inc." symbol="TSLA" />
          <button class="w-48 h-16 p-5 bg-saft hover:bg-saft-hover text-white font-bold py-2 px-4 
            border border-gray-300 rounded-lg mr-auto ml-20">
            Should I invest in Tesla?
          </button>
        </div>

        <div className="item apple flex p-5 items-center">
          <StockComponent companyName="Apple" symbol="AAPL" />
          <button class="w-48 h-16 p-5 bg-saft hover:bg-saft-hover text-white font-bold py-2 px-4 
            border border-gray-300 rounded-lg mr-auto ml-20">
            Should I invest in Apple?
          </button>

        </div>
        <div className="item meta flex p-5 items-center">
          <StockComponent companyName="Meta" symbol="META" />
          <button class="w-48 h-16 p-5 bg-saft hover:bg-saft-hover text-white font-bold py-2 px-4 
            border border-gray-300 rounded-lg mr-auto ml-20">
            Should I invest in Meta?
          </button>
        </div>
      </div>
    </>
  )
}

export default App