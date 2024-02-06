import React, { useState } from 'react';
import '../App.css'; // Import custom CSS file for additional styling

function App() {
  const [word, setWord] = useState('');
  const [phonetic, setPhonetic] = useState('');
  const [partsOfSpeech, setPartsOfSpeech] = useState('');
  const [synonyms, setSynonyms] = useState('');
  const [antonyms, setAntonyms] = useState('');
  const [definitions, setDefinitions] = useState(['', '', '']);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = () => {
    if (!inputValue.trim()) {
      setErrorMessage('Please enter a word.');
      return;
    }
    setIsLoading(true);
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Word not found.');
        }
        return response.json();
      })
      .then(data => {
        const wordData = data[0];
        setWord(wordData.word);
        setPhonetic(wordData.phonetic || 'Not found');
        setPartsOfSpeech(wordData.meanings[0]?.partOfSpeech || 'Not found');
        setSynonyms(wordData.meanings[0]?.synonyms?.join(', ') || 'Not found');
        setAntonyms(wordData.meanings[0]?.antonyms?.join(', ') || 'Not found');
        setDefinitions([
          wordData.meanings[0]?.definitions[0]?.definition || 'Not found',
          wordData.meanings[0]?.definitions[1]?.definition || 'Not found',
          wordData.meanings[0]?.definitions[2]?.definition || 'Not found',
        console.log(wordData)
        ]);
        setInputValue('');
        setIsLoading(false);
        setErrorMessage('');
      })
      .catch(error => {
        setIsLoading(false);
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="container bg-white rounded p-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-center text-purple-900">Dictionary Application</h1>
        <input
          className="input-field mb-4 outline-none border-2 border-purple-900 rounded p-2"
          placeholder="Enter Your Word"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <button
          className="btn-primary mb-6 ml-1 text-purple-900 border-2 border-purple-900 rounded p-2"
          onClick={fetchData}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Generate'}
        </button>
        {word && (
          <div>
            <h2 className="text-xl font-bold text-purple-900">Word: {word}</h2>
            <p className="mb-2">Phonetic: {phonetic}</p>
            <p className="mb-2">Parts of Speech: {partsOfSpeech}</p>
            <p className="mb-2">Synonyms: {synonyms}</p>
            <p className="mb-2">Antonyms: {antonyms}</p>
            <p className="mb-2">Definitions:</p>
            <ol>
              {definitions.map((definition, index) => (
                <li key={index} className="mb-2">{definition}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
