import { useState, useEffect } from 'react'
import ChatComponent from './ChatComponent'
import logo from './assets/trade_pro.svg'

import './App.css'
import './style.css'
import axios from 'axios'

function App() {
  const [curPrice, setCurPrice] = useState(218.75)

  const getStockPrice = () => {
    const apiKey = 'cl4jve9r01qrlanpq7fgcl4jve9r01qrlanpq7g0'
    const apiUrl = 'https://finnhub.io/api/v1/quote?symbol=TSLA&token='
    const inputURL = apiUrl + apiKey
    console.log(inputURL)

    axios.get(inputURL)
      .then(response => {
        let c = response.data.c
        console.log(c)
        setCurPrice((c))

      }).catch(err => {
        console.log(err)
      })
  }

  // Only triggers when component mounts
  // useEffect(() => {
  //   getStockPrice()

  // }, [])


  return (
    <>
      <div className="container dark:bg-slate-800">

        <div className="item title flex items-center justify-center">
        {/* <img src={logo} className="" alt="Trade Pro Logo" /> */}
          <h1 className="text-center mb-4 text-3xl font-extrabold text-gray-900 
        dark:text-white md:text-5xl lg:text-6xl">
          Sentiment Analysis for Trading</h1>
          
        </div>
        <div className="item chat">
          <ChatComponent />
        </div>
        <div className="item tesla flex justify-center items-center ">
          <p className="text-3xl 
           text-gray-900 dark:text-white 
           ">
            Tesla, Inc.</p>
          <div className="219.27 USD row-span-2">
            <p className="text-3xl 
           text-gray-900 dark:text-white 
            ">
              {curPrice}
            </p>
            <p className="text-3xl 
           text-gray-900 dark:text-gray-500 
           ">
              USD
            </p>
          </div>




          <p className="text-2xl 
           text-gray-900 dark:text-red-500">
            -0.69 (0.31%) Today
          </p>
        </div>





        <div className="item apple">
         
        </div>
        <div className="item google">
          <p>Google</p>
        </div>
      </div>
    </>
  )
}

export default App
