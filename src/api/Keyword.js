import unirest from 'unirest';

function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}
export default class Keyword {
	async getKeywords(text) {
		return new Promise((resolve, reject) => {
			return resolve(shuffleArray(['love', 'home', 'cat', 'dog']));
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
