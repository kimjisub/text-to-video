import unirest from 'unirest';

const preset = {
	junction:
		'https://startup.kaist.ac.kr/wp-content/uploads/2019/04/8e24815d56ec4014b6eb35b5ab4e25d6.png',
};

export default class ImageSearch {
	async getImages(text) {
		return new Promise((resolve, reject) => {
			if (preset[text]) return resolve([preset[text]]);

			var req = unirest(
				'GET',
				'https://bing-image-search1.p.rapidapi.com/images/search'
			);

			req.query({
				q: text,
			});

			req.headers({
				'x-rapidapi-host': 'bing-image-search1.p.rapidapi.com',
				'x-rapidapi-key': '4138961e01msh4f4638e80f2ad91p1cd360jsnc91a35ded75e',
				useQueryString: true,
			});
			req.end(function (res) {
				if (res.error) throw new Error(res.error);
				resolve(res.body.value.map((item) => item.contentUrl));
			});
		});
	}
}
