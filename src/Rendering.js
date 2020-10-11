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
import { VolumeUp, PlayArrow, Pause } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

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

	const [scriptText, setScriptText] = useState(
		'There is no place like home. Love will find a way. ' //Slow and steady win the game. Life's not all gloom and despondency. Age does not protect you from love. Believe you can, then you will. If I have lost confidence in myself, I have the universe against me. Hold it high, look the world straight in the eye. Better the last smile than the first laughter. Behind the cloud is the sun still shining."
	);
  const [scriptAnalize, setScriptAnalize] = useState([]);

	useEffect(() => {
		setSoundPool(new SoundPool());
		setKeyword(new Keyword());
		setImageSearch(new ImageSearch());
	}, []);

	useEffect(() => {
		if (0 <= videoSeek && videoSeek < scriptAnalize.length) {
			const obj = scriptAnalize[videoSeek];
			soundPool.play(obj.index);
			timeout = setTimeout(() => {
				if (scriptAnalize.length - 1 <= videoSeek) setVideoSeek(-1);
				else setVideoSeek(videoSeek + 1);
			}, obj.duration * 1000);
		} else {
			if (soundPool) {
				clearTimeout(timeout);
				soundPool.stopAll();
			}
		}
  }, [videoSeek, soundPool, scriptAnalize]);
  
  const classes = useStyles();

	return (
		<div className="Rendering">
			<div className="flexible">
				<TextField
          id="outlined-multiline-static"
          className={classes.scriptBox}
					label="SCRIPT"
					multiline
					rows={5}
					variant="outlined"
          defaultValue={scriptText}
					onChange={(event) => {  
						setScriptText(event.target.value);
					}}
				/>
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
              });
            }}
          >
            Bring TTS, Sound length
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
            Bring Keyword
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
            Bring Images
          </Button>
        </div>
			</div>
			<div className="flexible">
        <div className={classes.videoBox}>
          <img
            alt="img"
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
									<TableCell>
										<IconButton
											onClick={() => {
												soundPool.play(row.index);
											}}
										>
											<VolumeUp />
										</IconButton>
										{row.script}
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
