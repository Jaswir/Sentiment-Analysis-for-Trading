import { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import axios from 'axios'
import StockComponent from './StockComponent'

function ChatComponent() {

    const apiKey = import.meta.env.VITE_VECTARA_API_KEY;
    const customerID = import.meta.env.VITE_VECTARA_CUSTOMER_ID

    const [isTyping, setIsTyping] = useState(false);
    const [doShowDisclaimer, showDisclaimer] = useState("none");
    const [doShowMainPage, showMainPage] = useState("");

    const [messages, setMessages] = useState([
        {
            message: "Hello, I'm your Trading Assistant! How can i help you?",
            direction: 'incoming',
            sender: "TradePro"
        }
    ]);

    const handleDisclaimer = (event) => {
        showMainPage("none");
        showDisclaimer("");
    };

    const handleMainPage = (event) => {
        showMainPage("");
        showDisclaimer("none");
    };

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
            <div className="item chat" style={{ display: doShowMainPage, height: "100%", width: "100%" }}>
            <button style={{ float: "right", "margin-top": "-35px", "margin-right": "5px", "color": "red" }} class="hover:bg-saft-hover font-bold border border-gray-300"
                    onClick={handleDisclaimer}>
                    Read Disclaimer
                </button>
  
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

            <div style={{ display: doShowMainPage }} className="item tesla flex p-5 items-end">
                <StockComponent companyName="Tesla, Inc." symbol="TSLA" />
                <button class="w-48 h-16 p-5 bg-saft hover:bg-saft-hover text-white font-bold py-2 px-4 
            border border-gray-300 rounded-lg mr-auto ml-20"
                    onClick={handleClick}>
                    Should I invest in Tesla?
                </button>
            </div>

            <div style={{ display: doShowMainPage }} className="item apple flex p-5 items-center">
                <StockComponent companyName="Apple" symbol="AAPL" />
                <button class="w-48 h-16 p-5 bg-saft hover:bg-saft-hover text-white font-bold py-2 px-4 
            border border-gray-300 rounded-lg ml-auto mr-10"
                    onClick={handleClick}>
                    Should I invest in Apple?
                </button>

            </div>
            <div style={{ display: doShowMainPage }} className="item meta flex p-5 ">
                <StockComponent companyName="Meta" symbol="META" />
                <button class="w-48 h-16 p-5 bg-saft hover:bg-saft-hover text-white font-bold py-2 px-4 
            border border-gray-300 rounded-lg mr-auto ml-20"
                    onClick={handleClick}>
                    Should I invest in Meta?
                </button>
            </div>

            <button style={{ display: doShowDisclaimer }} class="w-24 h-12 bg-saft hover:bg-saft-hover text-white font-bold 
            border border-gray-300"
                    onClick={handleMainPage}>
                    Go Back
            </button>
            <div style={{ display: doShowDisclaimer, "fontSize": "12pt", "color": "white", "textAlign": "justify", "padding": "10px" }}>
            Trade Pro is a financial advice application designed to provide general information and guidance on stock investments. The content provided by Trade Pro is for informational purposes only and should not be considered as financial advice.

Not Professional Advice: Trade Pro is not a licensed financial advisor, and the information provided should not be construed as professional financial advice. Users are encouraged to consult with a qualified financial professional before making any investment decisions.

Risk of Investments: Investing in stocks involves risks, and past performance is not indicative of future results. The value of investments can fluctuate, and users should be aware that they may lose money.

Individual Financial Situation: The information provided by Trade Pro does not take into account the individual financial situation, investment objectives, risk tolerance, or other factors that may be relevant to a user's specific financial situation.

Accuracy of Information: While Trade Pro strives to provide accurate and up-to-date information, we cannot guarantee the accuracy, completeness, or reliability of any information on the app. Users should independently verify any information before making investment decisions.

No Endorsement: Mention of specific stocks or investment strategies on Trade Pro does not constitute an endorsement. Users should conduct their own research and due diligence before making any investment decisions.

No Guarantee of Results: There is no guarantee that any investment strategy or recommendation provided by Trade Pro will be successful. Investment decisions are the responsibility of the user, and outcomes may vary.

By using Trade Pro, users acknowledge and agree to these disclaimers. Trade Pro and its creators shall not be held liable for any financial losses or damages resulting from the use of the information provided on the app
            </div>
        </>
    )
}


export default ChatComponent

