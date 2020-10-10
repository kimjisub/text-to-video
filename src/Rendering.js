import './Rendering.css';
import React, { useState, useEffect } from 'react';
import SoundPool from './api/SoundPool';
import Keyword from './api/Keyword';
import ImageSearch from './api/ImageSearch';

import {
	TextField,
	Button,
	TableContainer,
	Table,
	TableHead,
	TableCell,
	TableRow,
	TableBody,
	Paper,
	IconButton,
} from '@material-ui/core';
import { VolumeUp } from '@material-ui/icons';

function Rendering() {
	const [soundPool, setSoundPool] = useState(null);
	const [keyword, setKeyword] = useState(null);
	const [imageSearch, setImageSearch] = useState(null);

	const [scriptText, setScriptText] = useState(
		"There is no place like home. Love will find a way. Slow and steady win the game. Life's not all gloom and despondency. Age does not protect you from love. Believe you can, then you will. If I have lost confidence in myself, I have the universe against me. Hold it high, look the world straight in the eye. Better the last smile than the first laughter. Behind the cloud is the sun still shining."
	);
	const [scriptSpeech, setScriptSpeech] = useState([]);

	useEffect(() => {
		setSoundPool(new SoundPool());
		setKeyword(new Keyword());
		setImageSearch(new ImageSearch());
	}, []);

	console.log(scriptSpeech);

	return (
		<div className="Rendering">
			<div>
				<TextField
					id="outlined-multiline-static"
					label="대본"
					multiline
					rows={4}
					variant="outlined"
					defaultValue={scriptText}
					onChange={(event) => {
						setScriptText(event.target.value);
					}}
				/>
			</div>

			<div>
				<Button
					variant="contained"
					onClick={() => {
						const scriptList = scriptText
							.split('.')
							.filter((s) => s.length > 0)
							.map((s) => s.trim() + '.');

						const soundList = scriptList.map((s) => soundPool.loadFromTTS(s));

						setScriptSpeech([]);

						Promise.all(soundList).then((indices) => {
							const tmpScriptSpeech = [];
							scriptList.forEach((script, i) => {
								console.log(soundPool.getDuration(i), script);
								tmpScriptSpeech.push({
									script,
									index: indices[i],
									duration: soundPool.getDuration(i),
								});
							});
							setScriptSpeech(tmpScriptSpeech);
						});
					}}
				>
					TTS, 소리 길이 가져오기
				</Button>
			</div>

			<TableContainer component={Paper}>
				<Table aria-label="simple table" size="small">
					<TableHead>
						<TableRow>
							<TableCell>Index</TableCell>
							<TableCell>Script</TableCell>
							<TableCell>Duration</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{scriptSpeech.map((row) => (
							<TableRow key={row.index}>
								<TableCell component="th" scope="row">
									{row.index}
								</TableCell>
								<TableCell>{row.script}</TableCell>
								<TableCell>{row.duration}</TableCell>
								<IconButton
									aria-label="delete"
									onClick={() => {
										soundPool.play(row.index);
									}}
								>
									<VolumeUp />
								</IconButton>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

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

			<button
				onClick={() => {
					imageSearch.getImages('cat').then((result) => {
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
