import React, { useCallback, useEffect, useRef, useState } from 'react'
import './css/index.css'

function App() {
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [symbolAllowed, setSymbolAllowed] = useState(false);
    const [length, setLength] = useState(20);
    const [passwoard, setPassword] = useState('');
    const messageRef = useRef(null);
    const MIN_LENGTH = 10;
    const MAX_LENGTH = 50;

    const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const number = "0123456789";
    const symbol = "`./?()[]{}:;#$&*@!\"\\";
    const passwordGenerator = useCallback(() => {
        let chars = alpha;
        console.log(numberAllowed, symbolAllowed);
        if (numberAllowed) chars += chars += number;
        if (symbolAllowed) chars += chars += symbol;

        let str = '';
        for (let i = 0; i < length; ++i) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }

        setPassword(str);
    }, [numberAllowed, symbolAllowed, length, setPassword]);
    useEffect(
        passwordGenerator,
        [numberAllowed, symbolAllowed, length, setPassword]
    );
    const copy = () => {
        const message = messageRef.current;
        if(message){
            message.classList.add('active');
            setTimeout(() => {
                    message.classList.remove('active');
            }, 2000);
        }

        window.navigator.clipboard.writeText(passwoard)
    }

    return (
        <>
            <div id='message-box' ref={messageRef}>copied</div>
            <div className='card'>
                <h1>Password Generator</h1>
                <div id='input-box' tabIndex={0}>
                    <input
                        type='text'
                        value={passwoard}
                        placeholder='Password'
                        readOnly
                    />
                    <button id='copy' onClick={copy}>copy</button>
                </div>

                <div className='flex-box'>
                    <div id='range-box'>
                        <input
                            type="range"
                            id="range-input"
                            min={MIN_LENGTH}
                            max={MAX_LENGTH}
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                        />
                        <span id='length'>{length}</span>
                    </div>
                    <label>
                        number
                        <input type='checkbox' onClick={() => setNumberAllowed(prev => !prev)} />
                    </label>
                    <label>
                        symbol
                        <input type='checkbox'
                            onClick={() => setSymbolAllowed(prev => !prev)}
                        />
                    </label>
                </div>
            </div>
        </>
    )
}

export default App