import unirest from 'unirest';

export default class SoundPool {
	async getKeyword(list) {
		return new Promise((resolve, reject) => {
			const req = unirest(
				'POST',
				'https://unfound-keywords-extraction-v1.p.rapidapi.com/extraction/keywords'
			);

			req.headers({
				'x-rapidapi-host': 'unfound-keywords-extraction-v1.p.rapidapi.com',
				'x-rapidapi-key': '4138961e01msh4f4638e80f2ad91p1cd360jsnc91a35ded75e',
				'content-type': 'application/json',
				accept: 'application/json',
				useQueryString: true,
			});

			req.type('json');
			req.send({
				input_data: list,
				input_type: 'text',
				N: 10,
			});

			req.end(function (res) {
				if (res.error) throw new Error(res.error);

				resolve(res.body.result);
			});
		});
	}
}
