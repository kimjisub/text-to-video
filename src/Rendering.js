import './Rendering.css';
import React, { useState, useEffect } from 'react';
import SoundPool from './SoundPool';

function rendering_page() {
  const [audio, setAudio] = useState('');
	const [soundPool, setSoundPool] = useState(null);

	useEffect(() => {
		setSoundPool(new SoundPool());
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
    </div>
  );
}

export default rendering_page;
