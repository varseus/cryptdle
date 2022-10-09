import '../styles/Play.css';
import Web3 from 'web3';
import { useEffect, useReducer } from 'react'; // for functional programming state
import SixteenSegmentDisplay from '../components/SixteenSegment';

import cryptdleContract from '../contracts/Cryptdle.json';
const abi = cryptdleContract.abi;
const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';

const digits = 12;

function Play() {
    const [state, setState] = useReducer(
        reducer,
        {
            guess: '0',
            hint: 0,
            isGuessed: false,
        });
    function reducer(state, action) {
        return {
            guess: action.guess || action.guess === '' ? action.guess : state.guess,
            hint: action.hint ? action.hint : state.hint,
            isGuessed: action.isGuessed ? action.isGuessed : state.isGuessed,
        };
    }



    async function connectWallet() {
        const { ethereum } = window;
        if (!ethereum) {
            alert('Please install metamask');
        } else {
            try {
                const accounts = await ethereum.request
                    ({ method: 'eth_requestAccounts' })
                alert('Connected to Wallet!, your address is ' +
                    accounts[0]);
            } catch (err) {
                alert('Error connecting to wallet!');
            }
        }
        return;
    }

    async function submitGuess() {
        if (state.guess.trim === '') {
            return;
        }
        const web3 = new Web3(Web3.givenProvider);
        let cryptdleContract = await new web3.eth.Contract(
            abi, contractAddress);

        await cryptdleContract.methods.guess(state.guess).call((error, result) => {
            setState({ isGuessed: result })
        });
        return;
    }

    async function getHint() {
        const web3 = new Web3(Web3.givenProvider);
        let cryptdleContract = await new web3.eth.Contract(
            abi, contractAddress);
        await cryptdleContract.methods.getHint().call((error, result) => {
            setState({ hint: web3.utils.toBN(result).toString(2, digits * 16) });
            console.log(state.hint);
        });
        return;
    }


    return (
        <div className="App">
            <button onClick={connectWallet}>
                Connect wallet</button> <hr />
            <input type="text" onChange={(event) => setState({ guess: String(event.target.value) })}
                value={state.guess} />
            <button onClick={() => submitGuess()}>
                Submit Guess</button>
            <button onClick={() => getHint()}>
                Get Hint</button><hr />
            <SixteenSegmentDisplay
                    code={state.code}
                    backgroundColor={'black'}
                    onColor={"white"}
                    offColor={"rgba(20,20,20,1)"} className="App"
                    key={state.code}/>
        </div>
    );
}
export default Play;