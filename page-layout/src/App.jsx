import { useState, useEffect } from 'react'
import ChatComponent from './ChatComponent'
import logo from './assets/trade_pro.svg'

import './App.css'
import './style.css'
import axios from 'axios'
import StockComponent from './StockComponent'

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

        <div className="item tesla">
          <StockComponent companyName="Tesla, Inc." curPrice={222.18} d={2.91} dp={1.33}/>
        </div>

        <div className="item apple">
          <StockComponent companyName="Apple" curPrice={181.82} d={2.59} dp={1.45}/>
        </div>
        <div className="item meta">
          <StockComponent companyName="Meta" curPrice={318.82} d={-2.91} dp={-1.5}/>
        </div>
      </div>
    </>
  )
}

export default App
