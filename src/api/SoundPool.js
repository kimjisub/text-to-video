export default class SoundPool {
	constructor() {
		this.context = new AudioContext();
		this.loaded = [];
	}

	load() {
		//todo
	}

	async loadFromTTS(text) {
		return new Promise((resolve, reject) => {
			const URL = `https://voicerss-text-to-speech.p.rapidapi.com/?r=0&c=mp3&f=24khz_16bit_mono&hl=en-us&key=66d858439600442e926da880c9fa4464&src=${encodeURIComponent(
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
		});
	}

	getDuration(id) {
		const audioBuffer = this.loaded[id];
		return audioBuffer.duration;
	}
}
