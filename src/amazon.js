import axios from 'axios';
import cheerio from 'cheerio';
const cache = {};
const worker = new Worker('./amazon.worker.js', { type: 'module' });

export async function details(url) {
	/*await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 10000) + 1000));
	return {
		url: "a",
		title: "ex",
		price: "$0",
		availability: "Unavailable.",
		features: ""
	};*/
	if (cache[url.asin]) return cache[url.asin];
	try {
		const res = await axios(url.url);
		const $ = cheerio.load(res.data);
		cache[url.asin] = {
			url: url.url,
			image: $('#landingImage').attr('src').trim(),
			title: $('#productTitle').text().trim(),
			price: $('#price_inside_buybox').text().trim(),
			availability: $('#availability').text().trim().replace(' - order soon.', '.').replace('Only ', ''),
			features: $('#feature-bullets>ul>li:not(#replacementPartsFitmentBullet)').map((_, el) => $(el).text().trim()).toArray().join('\n')
		};
		if(!cache[url.asin].price) {
			cache[url.asin].price = $('#priceblock_saleprice').text().trim();
		}
		if(!cache[url.asin].price) {
			cache[url.asin].price = $('#priceblock_ourprice').text().trim();
		}
		if(!cache[url.asin].price) {
			cache[url.asin].price = $('.a-color-price').text().trim();
		}
		if(!cache[url.asin].availability) {
			cache[url.asin].availability = $('#availability_feature_div').text().trim();
		}
		if(!cache[url.asin].availability) {
			cache[url.asin].availability = 'Currently Unavailable.';
		}
		return cache[url.asin];
	} catch (err) {
		console.error(err);
		return undefined;
	}
}

export function matches(url) {
	if (!url || !url.match) {
		return null;
	}
	const rgx = new RegExp('(?:www.)?ama?zo?n.(\\w{2,3}\\.?\\w{0,2})/.*/{1,3}([B|0-9][A-Z0-9]{9})(?:\\/|\\?|$)');
	const matches = url.match(rgx);
	if (!matches || !matches.length || matches.length < 3) {
		return null;
	}
	return {
		url: 'https://' + matches[0],
		asin: matches[2]
	};
}