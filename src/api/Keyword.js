/* eslint-disable no-unreachable */
import unirest from 'unirest';
export default class Keyword {
	async getKeywords(text) {
		return new Promise((resolve, reject) => {
			var req = unirest(
				'POST',
				'https://webit-text-analytics.p.rapidapi.com/key-phrases'
			);

			req.query({
				language: 'en',
				q: text,
			});

			req.headers({
				'x-rapidapi-host': 'webit-text-analytics.p.rapidapi.com',
				'x-rapidapi-key': '4138961e01msh4f4638e80f2ad91p1cd360jsnc91a35ded75e',
				'content-type': 'application/x-www-form-urlencoded',
				useQueryString: true,
			});

			req.form({});
			req.end(function (res) {
				if (res.error) throw new Error(res.error);

				resolve(res.body.data.key_phrases);
			});
		});
	}
}
