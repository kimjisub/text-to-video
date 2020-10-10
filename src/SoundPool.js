module.exports = class SoundPool {
	constructor() {
		this.context = new AudioContext();
		this.loaded = [];
	}

	load() {
		//todo
	}

	loadFromTTS(text) {
		return new Promise((resolve, reject) => {
			const URL = `https://voicerss-text-to-speech.p.rapidapi.com/?r=0&c=mp3&f=24khz_16bit_mono&hl=en-us&key=6f63530c27aa4ea788b0645e276e6013&src=${encodeURIComponent(
				text
			)}`;

			let Buffer;

			window
				.fetch(URL, {
					headers: {
						'x-rapidapi-host': 'voicerss-text-to-speech.p.rapidapi.com',
						'x-rapidapi-key':
							'4138961e01msh4f4638e80f2ad91p1cd360jsnc91a35ded75e',
					},
				})
				.then((response) => response.arrayBuffer())
				.then((arrayBuffer) => this.context.decodeAudioData(arrayBuffer))
				.then((audioBuffer) => {
					Buffer = audioBuffer;
					this.loaded.push(audioBuffer);
					resolve(this.loaded.length - 1);
				});
		});
	}

	play(id) {
		return new Promise((resolve, reject) => {
			const audioBuffer = this.loaded[id];
			const source = this.context.createBufferSource();
			source.buffer = audioBuffer;
			source.connect(this.context.destination);
			source.start();
		});
	}
};
