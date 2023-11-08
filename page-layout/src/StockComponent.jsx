import { useState, useEffect } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import axios from 'axios'

function StockComponent({ companyName, symbol }) {

    const [curPrice, setCurPrice] = useState(219.32)
    const [deltaPrice, setDeltaPrice] = useState(-2.86)
    const [deltaPercentage, setDeltaPercentage] = useState(-1.2872)

    const apiKey = import.meta.env.VITE_FINNHUB_API_KEY
    const apiUrl = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=`
    const inputURL = apiUrl + apiKey

    function getStockPrice() {
        axios.get(inputURL)
            .then(response => {
                // console.log("Price:  " + symbol + "  " + response.data.c)

                let c = response.data.c.toFixed(2)
                let d = response.data.d.toFixed(2)
                let dp = response.data.dp.toFixed(2)

                setCurPrice((c))
                setDeltaPrice((d))
                setDeltaPercentage((dp))

            }).catch(err => {
                console.log(err)
            })
    }

    // Only triggers when component mounts
    useEffect(() => {

        getStockPrice()

        console.log("triggered")
        const callsPerMinute = 1;
        const interval = 60 * 1000 / callsPerMinute;
        const intervalId = setInterval(getStockPrice, interval);

        // Clear the interval when the component unmounts
        return () => {
            console.log("cleared")
            clearInterval(intervalId);
        };

    }, [])



    let color = deltaPercentage > 0 ? 'text-green-500' : 'text-red-500'
    if (deltaPercentage == 0) {
        color = 'text-gray-500'
    }

    return (
        <>

            <div className="w-48 p-4 border border-gray-300 rounded-lg">
                <h1 className="text-xl font-semibold">{companyName}</h1>
                <p className="text-3xl font-bold mt-2">{curPrice}
                    <span className="text-usd-size text-gray-400"> USD</span>
                </p>
                <p className={`text-sm ${color}`}>
                    {deltaPrice} ({deltaPercentage}%) Today</p>
            </div>

        </>
    )
}

export default StockComponent
