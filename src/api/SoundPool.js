export default class SoundPool {
	constructor() {
		this.context = new AudioContext();
		this.loaded = [];
		this.playing = {};
	}

	load() {
		//todo
	}

	async loadFromTTS(text) {
		return new Promise((resolve, reject) => {
			const URL = `https://voicerss-text-to-speech.p.rapidapi.com/?r=0&c=mp3&f=24khz_16bit_mono&hl=en-us&key=fe99df4d607c4036b1746ce7e4bc3a77&src=${encodeURIComponent(
				text
			)}`;

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
					this.loaded.push(audioBuffer);
					resolve(this.loaded.length - 1);
				});
		});
	}

	async play(id) {
		return new Promise((resolve, reject) => {
			const audioBuffer = this.loaded[id];
			const source = this.context.createBufferSource();
			source.buffer = audioBuffer;
			source.connect(this.context.destination);
			source.start();
			this.playing[id] = source;
			setTimeout(() => {
				delete this.playing[id];
			}, this.getDuration(id) * 1000);
		});
	}

	stopAll() {
		for (let i in this.playing) {
			const source = this.playing[i];
			source.stop();
		}
		this.playing = {};
	}

	getDuration(id) {
		const audioBuffer = this.loaded[id];
		return audioBuffer.duration;
	}
}
