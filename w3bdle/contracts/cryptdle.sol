//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "../libraries/dateTime.sol";
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract Cryptdle is ERC20 {

    uint private currentWord; // today/tomorrow's yet to be succesfully guessed word
    uint private previousWord; // today's already successfully guessed word
    uint private wordTimeStamp; // the start time for currentWord
    uint private wordPrice; // price to submit new words to the pool
    uint[] private words; // pool of words
    mapping(uint => bool) private wordsArchive; // pool of used words
    mapping(uint => address[]) winners; // list of successful guessers for each word

    /// Initializes the cryptdle.
    /// @dev populate words with 100 starting words and let currentWord and previousWord automatically populate
    constructor()
        ERC20("Cryptdle", "TDL")
    {
        currentWord = 244397417455759935995648;
        previousWord = 244397417455759935995648;
        wordTimeStamp = block.timestamp;
        wordPrice = (uint)(10**32) / 2 + (uint)(10**32) / (2**100);
        words.push(4902930);
        // wordsArchive empty
        // winners empty
    }

    /// Determines whether a guess is correct
    /// @param _guess : An attempt at the cryptdle
    /// @return Is the guess right?
    function guess(uint _guess) public view returns (bool) {
        if (_getWord() == _guess) {
            return true;
        }

        return false;
    }

    /// gets the word being guessed
    /// @return the word
    function _getWord() private view returns (uint) {
        if (block.timestamp >= wordTimeStamp) {
            return currentWord;
        }
        return previousWord;
    }

    /// Retrieves the current cryptdle
    /// @return The current hint
    /// @dev time formatting is at GMT instead of EST
    function getHint() public view returns (uint) {
        unchecked {
            uint16 _year;
            uint8 _month;
            uint8 _day;
            uint8 _hour;
            uint8 _minute;
            (
                _year,
                _month,
                _day,
                _hour,
                _minute,
                /*_second*/

            ) = DateTime.convertTimestampToYMDHMS(block.timestamp);

            uint _numHintsToRemove = (_hour * uint(60) + _minute) / uint(5);
            console.log(_hour);
            console.log(_minute);
            console.log(_numHintsToRemove);

            uint _word;
            if (block.timestamp >= wordTimeStamp) {
                _word = currentWord;
            } else {
                _word = previousWord;
            }

            uint _numHintsRemoved = 0;
            uint _modulator = 0;
            uint _tempModulator = 0;
            uint _hint = _word;
            uint _tempWord = _word;
            while (_tempWord != 0) {
                _tempWord &= _tempWord - 1;
                _modulator++;
            }

            if (_numHintsToRemove <= _modulator) {
                _numHintsToRemove = _modulator - _numHintsToRemove;
            } else {
                _numHintsToRemove = 0;
            }
            _modulator /= uint(2);

            while (_numHintsRemoved < _numHintsToRemove) {
                _tempWord = _hint;
                _tempModulator =
                    ((_modulator * (_numHintsRemoved + 1)) - _numHintsRemoved) %
                    (_modulator * uint(2) - _numHintsRemoved);
                while (_tempModulator > 1) {
                    _tempWord &= _tempWord - 1;
                    _tempModulator--;
                }

                _tempWord = ((_tempWord - 1) ^ _tempWord) & _tempWord;
                _hint ^= _tempWord;

                _numHintsRemoved++;
            }

            return _hint;
        }
    }

    /// Claims tokens for a correct guess
    /// @param _guess the uint guess for the active word
    /// @param _address the address of the guesser to claim their coins
    /// @return whether the claim is successful
    function claim(uint _guess, address _address) public returns (bool) {
        if (guess(_guess) && !_in(_address, winners[currentWord])) {
            _mint(_address, getReward());
            if (winners[currentWord].length <= 0) {
                previousWord = _getWord();
                winners[currentWord].push(_address);
                currentWord = _nextWord();
                uint16 _year;
                uint8 _month;
                uint8 _day;
                uint8 _hour;
                uint8 _minute;
                uint8 _second;
                (
                    _year,
                    _month,
                    _day,
                    _hour,
                    _minute,
                    _second

                ) = DateTime.convertTimestampToYMDHMS(block.timestamp);

                wordTimeStamp = DateTime.timestampFromDate(_year, _month, _day+1);

                return true;
            }
        }
        
        return false;
    }

    /// randomly removes a word from words
    /// @return the removed word
    function _nextWord() private returns (uint) {
        if (words.length > 1){
            uint256 nextWord = words[((words.length-2) * _rand()) / 999];
            words[((words.length-2) * _rand()) / 999] = words[words.length-1];
            delete words[words.length-1];
            //words.length--;
            wordsArchive[nextWord] = true;
            return nextWord;
        } else {
            return 0;
        }
    }

    /// finds the reward based on guesses so far
    /// @return num coins to be rewarded
    function getReward() public view returns (uint) {
        uint reward = uint(10**32/(2**(winners[_getWord()].length + 1)));
        if (reward == 0) {
            reward = 1;
        }

        return reward;
    }
        


    /// submits a new word to the pool
    /// @return whether the word was successfully submitted
    function submitWord(uint word, address from) public returns (bool) {
        if(wordsArchive[word] || balanceOf(from) < wordPrice) {
            return false;
        } else {
            words.push(word);
            _burn(from, wordPrice);
            return true;
        }
    }



    /// computes random number
    /// @return random number 0-999
    /// from https://stackoverflow.com/questions/58188832/solidity-generate-unpredictable-random-number-that-does-not-depend-on-input
    function _rand() private view returns(uint256){
        uint256 seed = uint256(keccak256(abi.encodePacked(
            block.timestamp + block.difficulty +
            ((uint256(keccak256(abi.encodePacked(block.coinbase)))) / (block.timestamp)) +
            block.gaslimit + 
            ((uint256(keccak256(abi.encodePacked(msg.sender)))) / (block.timestamp)) +
            block.number
        )));

        return (seed - ((seed / 1000) * 1000));
    }

    /// determines whether a given address is in a given list
    /// @return whether _address is in _list
    function _in(address _address, address[] memory _list) private pure returns(bool) {
        for (uint i = 0; i < _list.length; i++) {
            if (_list[i] == _address) {
                return true;
            }
        }
        return false;
    }
}