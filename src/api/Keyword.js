/* eslint-disable no-unreachable */
import unirest from 'unirest';
export default class Keyword {
	async getKeywords(text) {
		return new Promise((resolve, reject) => {
			var req = unirest(
				'POST',
				'https://google-text-analysis.p.rapidapi.com/AnalyzingEntities'
			);

			req.headers({
				'x-rapidapi-host': 'google-text-analysis.p.rapidapi.com',
				'x-rapidapi-key': '4138961e01msh4f4638e80f2ad91p1cd360jsnc91a35ded75e',
				'content-type': 'application/json',
				accept: 'application/json',
				useQueryString: true,
			});

			req.type('json');
			req.send({
				message: text,
			});
			req.end(function (res) {
				if (res.error) throw new Error(res.error);
				resolve(res.body.entities.map((e) => e.name));
			});
		});
	}
}
