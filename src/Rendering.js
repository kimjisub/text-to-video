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
	Select,
	MenuItem,
	InputLabel,
	FormControl,
} from '@material-ui/core';
import { VolumeUp, PlayArrow, Pause } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	scriptBox: {
		borderImageSource: 'linear-gradient(to right, #ff5f6d, #ffc371)',
		borderImageSlice: 1,
		borderRadius: 3,
		width: '60vw',
	},
	videoBox: {
		width: '38vw',
		display: 'inline-block',
		border: '1px solid #818181',
		marginTop: '60px',
		marginRight: '50px',
		height: '40vh',
	},
	videoImg: {
		width: '38vw',
	},
	tableBox: {
		width: '38vw',
		alignSelf: 'flex-start',
		marginTop: '40px',
	},
});

const scripts = {
	'covid-19':
		'As of the Chuseok and Hangeul Day holidays, the confirmed coronavirus 19 (COVID-19) remains in double digits. So there is a growing likelihood that the government will ease the distancing steps applied from the 12th.',
	flower:
		'You can cut all the flowers. but you can not keep spring from coming.',
};

let timeout = -1;
function Rendering() {
	const [soundPool, setSoundPool] = useState(null);
	const [keyword, setKeyword] = useState(null);
	const [imageSearch, setImageSearch] = useState(null);
	const [videoSeek, setVideoSeek] = useState(-1);
	const [step, setStep] = useState(0);

	const [scriptText, setScriptText] = useState('');
	const [scriptAnalize, setScriptAnalize] = useState([]);

	useEffect(() => {
		setSoundPool(new SoundPool());
		setKeyword(new Keyword());
		setImageSearch(new ImageSearch());
	}, []);

	useEffect(() => {
		if (soundPool) soundPool.stopAll();

		if (0 <= videoSeek && videoSeek < scriptAnalize.length) {
			const obj = scriptAnalize[videoSeek];
			soundPool.play(obj.index);
			timeout = setTimeout(() => {
				if (scriptAnalize.length - 1 <= videoSeek) setVideoSeek(-1);
				else setVideoSeek(videoSeek + 1);
			}, obj.duration * 1000);
		} else if (videoSeek === -1) {
			clearTimeout(timeout);
		} else {
			setVideoSeek(-1);
		}
	}, [videoSeek, soundPool, scriptAnalize]);

	useEffect(() => {
		console.log(scriptAnalize);
	}, [scriptAnalize]);

	const classes = useStyles();

	return (
		<div className="Rendering">
			<div className="flexible">
				<div className="flexible flex_col">
					<FormControl className={classes.formControl}>
						<InputLabel id="demo-simple-select-label">Select Preset</InputLabel>
						<Select
							onChange={(event) => {
								setScriptText(scripts[event.target.value]);
							}}
						>
							<MenuItem value="covid-19">Covid-19</MenuItem>
							<MenuItem value="flower">Flower</MenuItem>
						</Select>
					</FormControl>
					<TextField
						id="outlined-multiline-static"
						className={classes.scriptBox}
						label="SCRIPT"
						multiline
						rows={5}
						variant="outlined"
						value={scriptText}
						onChange={(event) => {
							setScriptText(event.target.value);
						}}
					/>
				</div>
				<div className="flexible flex_col">
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
										duration: soundPool.getDuration(index).toFixed(1),
									});
								});
								setScriptAnalize(tmpScriptAnalize);
								setStep(1);
							});
						}}
					>
						Bring TTS, Sound length
					</Button>
					<Button
						variant="contained"
						disabled={!(step >= 1)}
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
								setStep(2);
							});
						}}
					>
						Bring Keyword
					</Button>
					<Button
						variant="contained"
						disabled={!(step >= 2)}
						onClick={async () => {
							//const tmpScriptAnalize = [...scriptAnalize];

							// const apiWork = scriptAnalize.map((s) =>
							// 	imageSearch.getImages(s.keywords[0])
							// );

							// Promise.all(apiWork).then((imagesList) => {
							// 	tmpScriptAnalize.forEach((s, i) => {
							// 		s.images = imagesList[i];
							// 	});
							// 	console.log(tmpScriptAnalize);
							// 	setScriptAnalize(tmpScriptAnalize);
							// 	setStep(3);
							// });

							for (let i in scriptAnalize) {
								const script = scriptAnalize[i];
								script.images = await imageSearch.getImages(script.keywords[0]);
								setScriptAnalize(scriptAnalize);
							}
							setStep(3);
						}}
					>
						Bring Images
					</Button>
				</div>
			</div>
			<div className="flexible">
				<div className={classes.videoBox}>
					<img
						alt="img"
						className={classes.videoImg}
						src={
							0 <= videoSeek &&
							videoSeek < scriptAnalize.length &&
							scriptAnalize[videoSeek].images
								? scriptAnalize[videoSeek].images[0]
								: null
						}
					></img>
				</div>
				<TableContainer component={Paper} className={classes.tableBox}>
					<Table aria-label="simple table" size="small">
						<TableHead>
							<TableRow>
								<TableCell>Play</TableCell>
								<TableCell>Script</TableCell>
								<TableCell>Duration</TableCell>
								<TableCell>Keyword</TableCell>
								<TableCell>Image</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{scriptAnalize.map((row, i) => (
								<TableRow key={i} selected={i === videoSeek}>
									<TableCell component="th" scope="row">
										<IconButton
											onClick={() => {
												if (i !== videoSeek) setVideoSeek(i);
												else setVideoSeek(-1);
											}}
										>
											{i === videoSeek ? <Pause /> : <PlayArrow />}
										</IconButton>
									</TableCell>
									<TableCell
										style={{ cursor: 'pointer' }}
										onClick={() => {
											soundPool.play(row.index);
										}}
									>
										<div>{row.script}</div>
									</TableCell>
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
		</div>
	);
}

export default Rendering;
