import unirest from 'unirest';

export default class Keyword {
	async getKeywords(text) {
		return new Promise((resolve, reject) => {
			return resolve(['love', 'home']);
			const req = unirest(
				'POST',
				'https://textanalysis-keyword-extraction-v1.p.rapidapi.com/keyword-extractor-text'
			);

			req.headers({
				'x-rapidapi-host': 'textanalysis-keyword-extraction-v1.p.rapidapi.com',
				'x-rapidapi-key': '4138961e01msh4f4638e80f2ad91p1cd360jsnc91a35ded75e',
				'content-type': 'application/x-www-form-urlencoded',
				useQueryString: true,
			});

			req.form({
				text,
				wordnum: '5',
			});

			req.end(function (res) {
				if (res.error) throw new Error(res.error);

				resolve(res.body.keywords);
			});
		});
	}
}
