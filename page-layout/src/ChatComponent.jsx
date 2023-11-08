import { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import axios from 'axios'
import StockComponent from './StockComponent'


function ChatComponent() {

    const apiKey = import.meta.env.VITE_VECTARA_API_KEY;
    const customerID = import.meta.env.VITE_VECTARA_CUSTOMER_ID

    const [isTyping, setIsTyping] = useState(false);

    const [messages, setMessages] = useState([
        {
            message: "Hello, I'm your Trading Assistant! How can i help you?",
            direction: 'incoming',
            sender: "TradePro"
        }
    ]);

    const handleClick = (event) => {

        const buttonText = event.target.innerText;
        handleSend(buttonText);
    };

    const handleSend = async (message) => {
        setMessages(oldMessages => [...oldMessages, {
            message,
            direction: 'outgoing',
            sender: "user"
        }]);

        setIsTyping(true);
        processMessageToChatGPT(message).then((reply) => {
            setIsTyping(false);
            setMessages(oldMessages => [...oldMessages, {
                message: reply,
                direction: 'incoming',
                sender: "TradePro"
            }]);
        });
    };

    async function processMessageToChatGPT(message) {
        let data = JSON.stringify({
            "query": [
                {
                    "query": `${message}`,
                    "start": 0,
                    "numResults": 1,
                    "contextConfig": {
                        "charsBefore": 30,
                        "charsAfter": 30,
                        "sentencesBefore": 3,
                        "sentencesAfter": 3,
                        "startTag": "<b>",
                        "endTag": "</b>"
                    },
                    "corpusKey": [
                        {
                            "customerId": `${customerID}`,
                            "corpusId": 3,
                            "semantics": "DEFAULT",
                            "dim": [
                                {
                                    "name": "string",
                                    "weight": 0
                                }
                            ],
                            "metadataFilter": "part.lang = 'eng'",
                            "lexicalInterpolationConfig": {
                                "lambda": 0
                            }
                        }
                    ],
                    "rerankingConfig": {
                        "rerankerId": 272725717
                    },
                    "summary": [
                        {
                            "summarizerPromptName": "string",
                            "maxSummarizedResults": 0,
                            "responseLang": "string"
                        }
                    ]
                }
            ]
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.vectara.io/v1/query',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'customer-id': '3044609865',
                'x-api-key': 'zwt_tXkPSbQ6T5QCFbKJZx8quK_WZ3nerJ-zFknzsw'
            },
            data: data
        };

        return axios(config)
            .then((response) => {
                let r = response.data.responseSet[0].response[0].text;
                return response.data.responseSet[0].response[0].text.trim();

            })
            .catch((error) => {
                return error.message
            });
    }

    return (
        <>
            <div className="item chat" style={{ height: "100%", width: "100%" }}>
                <MainContainer>
                    <ChatContainer>
                        <MessageList
                            scrollBehavior="smooth"
                            typingIndicator={isTyping ? <TypingIndicator content="TradePro is typing" /> : null}
                        >
                            {messages.map((message, i) => {
                                return <Message key={i} model={message} />
                            })}
                        </MessageList>
                        <MessageInput className=".cs-message-input" placeholder="Send a message" onSend={handleSend}
                            attachButton={false} />
                    </ChatContainer>
                </MainContainer>
            </div>

            <div className="item tesla flex p-5 items-center">
                <StockComponent companyName="Tesla, Inc." symbol="TSLA" />
                <button class="w-48 h-16 p-5 bg-saft hover:bg-saft-hover text-white font-bold py-2 px-4 
            border border-gray-300 rounded-lg mr-auto ml-20"
                    onClick={handleClick}>
                    Should I invest in Tesla?
                </button>
            </div>

            <div className="item apple flex p-5 items-center">
                <StockComponent companyName="Apple" symbol="AAPL" />
                <button class="w-48 h-16 p-5 bg-saft hover:bg-saft-hover text-white font-bold py-2 px-4 
            border border-gray-300 rounded-lg mr-auto ml-20"
                    onClick={handleClick}>
                    Should I invest in Apple?
                </button>

            </div>
            <div className="item meta flex p-5 items-center">
                <StockComponent companyName="Meta" symbol="META" />
                <button class="w-48 h-16 p-5 bg-saft hover:bg-saft-hover text-white font-bold py-2 px-4 
            border border-gray-300 rounded-lg mr-auto ml-20"
                    onClick={handleClick}>
                    Should I invest in Meta?
                </button>
            </div>
        </>
    )
}


export default ChatComponent

