import { matches, details } from './amazon';

onmessage = async event => {
	const msg = event.data;
	process.stdout.write(JSON.stringify(msg));
	let product = matches(msg.text);
	console.log(product);
	if (product) {
		let d = await details(product);
		if (d)
			postMessage({ msg, details: d });
	}
};