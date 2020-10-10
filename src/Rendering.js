import './Rendering.css';
import React, { useState, useEffect } from 'react';
import SoundPool from './api/SoundPool';
import Keyword from './api/Keyword';

function Rendering() {
	const [soundPool, setSoundPool] = useState(null);
	const [keyword, setKeyword] = useState(null);

	useEffect(() => {
		setSoundPool(new SoundPool());
	}, []);

	useEffect(() => {
		setKeyword(new Keyword());
	}, []);

	return (
		<div className="rendering_page">
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
				}}
			>
				playTTS
			</button>
			<button
				onClick={() => {
					keyword
						.getKeyword(['Hello, world! My name is tts that in rakuten api.'])
						.then((result) => {
							console.log(result);
						});
				}}
			>
				test
			</button>
		</div>
	);
}

export default Rendering;
