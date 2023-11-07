import { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import axios from 'axios'

function StockComponent({companyName, curPrice, d, dp}) {
    
    let color = dp < 0 ? 'text-green-500': 'text-red-500'
    return (
        <>

            <div class="w-64 p-4 border border-gray-300 rounded-lg">
                <h1 class="text-xl font-semibold">{companyName}</h1>
                <p class="text-3xl font-bold mt-2">{curPrice}
                    <span class="text-usd-size text-gray-400"> USD</span>
                </p>
                <p class={`text-sm ${color}`}>{d} ({dp}%) Today</p>
            </div>

        </>
    )
}

export default StockComponent

