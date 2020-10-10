import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import SoundPool from './SoundPool';

function App() {
	const [audio, setAudio] = useState('');
	const [soundPool, setSoundPool] = useState(null);

	useEffect(() => {
		setSoundPool(new SoundPool());
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
				<button
					onClick={() => {
						soundPool
							.loadFromTTS('Hello, world! My name is tts that in rakuten api.')
							.then((id) => {
								console.log(id);
							});
					}}
				>
					prepareTTS
				</button>
				<button
					onClick={() => {
						soundPool.play(0);
						console.log(soundPool.getLength(0));
					}}
				>
					playTTS
				</button>
			</header>
		</div>
	);
}

export default App;
