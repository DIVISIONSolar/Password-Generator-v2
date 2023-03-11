import { React, useState} from 'react';
import { toast, ToastContainer} from 'react-toastify';
import './Assets/CSS/App.min.css';
import { numbers, upperCaseLetters, lowerCaseLetters, specialCharacters } from './Components/Characters';
import 'react-toastify/dist/ReactToastify.css';
import { COPY_SUCCESS } from './Components/Message';

function App() {
    const [password, setPassword] = useState('')
    const [passwordLength, setPasswordLength] = useState(20)
    const [includeUppercase, setIncludeUppercase] = useState(false)
    const [includeLowercase, setIncludeLowercase] = useState(false)
    const [includeNumbers, setIncludeNumbers] = useState(false)
    const [includeSymbols, setIncludeSymbols] = useState(false)

    const handleGeneratePassword = (e) => {
        if (
            !includeUppercase &&
            !includeLowercase &&
            !includeNumbers &&
            !includeSymbols
        ) {
            notify('Error! You must select atleast one option.', true)
        }
        let characterList = ''

        if (includeLowercase) {
            characterList = characterList + lowerCaseLetters
        }

        if (includeUppercase) {
            characterList = characterList + upperCaseLetters
        }

        if (includeNumbers) {
            characterList = characterList + numbers
        }

        if (includeSymbols) {
            characterList = characterList + specialCharacters
        }

        setPassword(createPassword(characterList))
    }

    const createPassword = (characterList) => {
        let password = ''
        const characterListLength = characterList.length

        for (let i = 0; i < passwordLength; i++) {
            const characterIndex = Math.round(Math.random() * characterListLength)
            password = password + characterList.charAt(characterIndex)
        }

        return password
    }

    const copyToClipboard = () => {
        const newTextArea = document.createElement('textarea')
        newTextArea.innerText = password
        document.body.appendChild(newTextArea)
        newTextArea.select()
        document.execCommand('copy')
        newTextArea.remove()
    }

    const notify = (message, hasError = false) => {
        if (hasError) {
            toast.error(message, {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            })
        } else {
            toast(message, {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            })
        }
    }

    const handleCopyPassword = (e) => {
        if(password === '') {
            notify('Error! Nothing to copy', true)
        } else {
            copyToClipboard()
            notify(COPY_SUCCESS)
        }
    }

    return (
        <div className="App">
            <div className="container">
                <div className="generator">
                    <h2 className="generator__header">Simple Password Generator</h2>
                    <div className="generator__password">
                        <h3>{password}</h3>
                        <button onClick={handleCopyPassword} className='copy__btn'>
                            <i className="far fa-clipboard"></i>
                        </button>
                    </div>

                    <div className="form-group">
                        <label className='passgen-text' htmlFor='password-strength'>Password Length</label>
                        <input
                        defaultValue={passwordLength}
                        onChange={(e) => setPasswordLength(e.target.value)}
                        type='number'
                        id='password-strength'
                        name='password-strength'
                        max='22'
                        min='10'
                        />
                    </div>

                    <div className="form-group">
                        <label className='passgen-text' htmlFor='uppercase-letters'>Include Upppercase Characters</label>
                        <input
                        checked={includeUppercase}
                        onChange={(e) => setIncludeUppercase(e.target.checked)}
                        type='checkbox'
                        id='uppercase-letters'
                        name='uppercase-letters'
                        />
                    </div>

                    <div className="form-group">
                        <label className='passgen-text' htmlFor='lowercase-letters'>Include Lowercase Characters</label>
                        <input
                        checked={includeLowercase}
                        onChange={(e) => setIncludeLowercase(e.target.checked)}
                        type='checkbox'
                        id='lowercase-letters'
                        name='lowercase-letters'
                        />
                    </div>

                    <div className="form-group">
                        <label className='passgen-text' htmlFor='include-numbers'>Include Numbers</label>
                        <input
                        checked={includeNumbers}
                        onChange={(e) => setIncludeNumbers(e.target.checked)}
                        type='checkbox'
                        id='include-numbers'
                        name='include-numbers'
                        />
                    </div>

                    <div className="form-group">
                        <label className='passgen-text' htmlFor='include-symbols'>Include Symbols</label>
                        <input
                        checked={includeSymbols}
                        onChange={(e) => setIncludeSymbols(e.target.checked)}
                        type='checkbox'
                        id='include-symbols'
                        name='include-symbols'
                        />
                    </div>
                    
                    <button onClick={handleGeneratePassword} className="generator__btn">
                    Generate
                    </button>
                    <ToastContainer
                    position='top-center'
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={true}
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable={false}
                    />
                </div>
            </div>
            <footer className="footer">
                <h1 className="title">Built by: <a href='https://joshsevero.dev'>Josh Severo</a></h1>
                <p className="subtitle">Open Source on: <a href='https://github.com/DIVISIONSolar/Password-Generator-v2'>Github</a></p>
            </footer>
        </div>
    )
}

export default App