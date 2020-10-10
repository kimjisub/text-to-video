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
		'There is no place like home. Love will find a way. ' //Slow and steady win the game. Life's not all gloom and despondency. Age does not protect you from love. Believe you can, then you will. If I have lost confidence in myself, I have the universe against me. Hold it high, look the world straight in the eye. Better the last smile than the first laughter. Behind the cloud is the sun still shining."
	);
	const [scriptAnalize, setScriptAnalize] = useState([]);

	useEffect(() => {
		setSoundPool(new SoundPool());
		setKeyword(new Keyword());
		setImageSearch(new ImageSearch());
	}, []);

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
							.trim()
							.split('.')
							.filter((s) => s.length > 0)
							.map((s) => s.trim() + '.');

						const apiWork = scriptList.map((s) => soundPool.loadFromTTS(s));

						setScriptAnalize([]);

						Promise.all(apiWork).then((indices) => {
							const tmpScriptAnalize = [];
							scriptList.forEach((script, i) => {
								const index = indices[i];
								tmpScriptAnalize.push({
									script,
									index,
									duration: soundPool.getDuration(index),
								});
							});
							setScriptAnalize(tmpScriptAnalize);
						});
					}}
				>
					TTS, 소리 길이 가져오기
				</Button>
				<Button
					variant="contained"
					onClick={() => {
						const tmpScriptAnalize = [...scriptAnalize];

						const apiWork = scriptAnalize.map((s) =>
							keyword.getKeywords(s.script)
						);

						Promise.all(apiWork).then((keywordsList) => {
							tmpScriptAnalize.forEach((s, i) => {
								s.keywords = keywordsList[i];
							});
							setScriptAnalize(tmpScriptAnalize);
						});
					}}
				>
					키워드 가져오기
				</Button>
				<Button
					variant="contained"
					onClick={() => {
						const tmpScriptAnalize = [...scriptAnalize];

						const apiWork = scriptAnalize.map((s) =>
							imageSearch.getImages(s.keywords[0])
						);

						Promise.all(apiWork).then((imagesList) => {
							tmpScriptAnalize.forEach((s, i) => {
								s.images = imagesList[i];
							});
							console.log(tmpScriptAnalize);
							setScriptAnalize(tmpScriptAnalize);
						});
					}}
				>
					이미지 가져오기
				</Button>
			</div>

			<TableContainer component={Paper}>
				<Table aria-label="simple table" size="small">
					<TableHead>
						<TableRow>
							<TableCell>Index</TableCell>
							<TableCell>Play</TableCell>
							<TableCell>Script</TableCell>
							<TableCell>Duration</TableCell>
							<TableCell>Keyword</TableCell>
							<TableCell>Image</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{scriptAnalize.map((row) => (
							<TableRow key={row.index}>
								<TableCell component="th" scope="row">
									{row.index}
								</TableCell>
								<TableCell component="th" scope="row">
									<IconButton
										aria-label="delete"
										onClick={() => {
											soundPool.play(row.index);
										}}
									>
										<VolumeUp />
									</IconButton>
								</TableCell>
								<TableCell>{row.script}</TableCell>
								<TableCell>{row.duration}</TableCell>
								<TableCell>{row.keywords?.join()}</TableCell>
								<TableCell>
									{row.images ? (
										<img alt="img" src={row.images[0]} width="100px"></img>
									) : null}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

export default Rendering;
