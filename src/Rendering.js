import './Rendering.css';
import React, { useState, useEffect } from 'react';
import SoundPool from './api/SoundPool';
import Keyword from './api/Keyword';
import ImageSearch from './api/ImageSearch';
import Scripts from './data/Scripts';

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
import { PlayArrow, Pause } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import sleep from './api/Sleep';

const useStyles = makeStyles({
	formControl: {
		width: '30vw',
		marginLeft: '11.5vw',
		marginBottom: '30px',
	},
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
		height: '40vh',
	},
	tableBox: {
		width: '38vw',
		alignSelf: 'flex-start',
		marginTop: '40px',
	},
});

let timeout = -1;
function Rendering() {
	const [soundPool, setSoundPool] = useState(null);
	const [keyword, setKeyword] = useState(null);
	const [imageSearch, setImageSearch] = useState(null);
	const [videoSeek, setVideoSeek] = useState(-1);
	const [step, setStep] = useState(0);
	const [processing, setProcessing] = useState(false);

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
			<div>
				<FormControl className={classes.formControl}>
					<InputLabel id="demo-simple-select-label">Select Preset</InputLabel>
					<Select
						onChange={(event) => {
							setScriptText(Scripts[event.target.value]);
						}}
					>
						{Object.keys(Scripts).map((k) => (
							<MenuItem value={k} key={k}>
								{k === '' ? 'Custom' : k}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>
			<div className="flexible">
				<div className="flexible flex_col">
					<TextField
						id="outlined-multiline-static"
						className={classes.scriptBox}
						label="Script"
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
						disabled={!!processing}
						onClick={() => {
							if (processing) return;
							setProcessing(true);

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
										keywords: [],
										images: [],
									});
								});
								setScriptAnalize(tmpScriptAnalize);
								setStep(1);
								setProcessing(false);
							});
						}}
					>
						Bring TTS, Sound length
					</Button>
					<Button
						variant="contained"
						disabled={!(step >= 1 && !processing)}
						onClick={async () => {
							if (processing) return;
							setProcessing(true);

							for (let i in scriptAnalize) {
								const script = scriptAnalize[i];
								script.keywords = await keyword.getKeywords(script.script);
								setScriptAnalize(scriptAnalize);
								await sleep(1500);
							}
							setStep(2);
							setProcessing(false);
						}}
					>
						Bring Keyword
					</Button>
					<Button
						variant="contained"
						disabled={!(step >= 2 && !processing)}
						onClick={async () => {
							if (processing) return;
							setProcessing(true);

							for (let i in scriptAnalize) {
								const script = scriptAnalize[i];
								if (script.keywords[0])
									script.images = await imageSearch.getImages(
										script.keywords[0]
									);
								setScriptAnalize(scriptAnalize);
								await sleep(1000);
							}
							setStep(3);
							setProcessing(false);
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
										<p style={{ 'text-overflow': 'ellipsis' }}>{row.script}</p>
									</TableCell>
									<TableCell>{row.duration}</TableCell>
									<TableCell>{row.keywords[0]}</TableCell>
									<TableCell>
										{row.images[0] ? (
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
