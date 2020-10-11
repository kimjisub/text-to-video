import unirest from 'unirest';

export default class ImageSearch {
	async getImages(text) {
		return new Promise((resolve, reject) => {
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
