import Util from './util/util.js';
import DataMiner from './models/DataMiner.js';
import OrderOverview from './components/orderOverview.js'; // Needed for dynamic import

export function main() {

	Util.fontLoader('Material+Icons');
	Util.fontLoader('Material+Icons+Outlined');
	Util.fontLoader('Roboto');
	Util.fontLoader('Roboto+Mono:ital,wght@1,100');
	
	let article = document.body.getElementsByTagName("article")[0];
	let order = DataMiner.mineData(article);		// Ask DataMiner to create an Order object from data extracted from article
	console.dir(order);

	if (order.trackLink !== undefined) {	// Swap trackNum with trackLink
		let str = `<a style ="vertical-align: sub ;margin: 10px;float: right;display: flex; flex-direction: row-reverse;" target="_blank" href="${order.trackLink}">${order.trackNum}</a>`;
		let Obj = article.getElementsByTagName("table")[1].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[1]; // SUGGESTION document.body.getElementsByTagName("tbody")[1].getElementsByTagName("tr")[1].getElementsByTagName("td")[1]
		Util.elementSwap(str, Obj);
	}

	const limit = {		// Declare PROCESS constants
		"dropOff" : 5,	// Maximum days to ship package (Seller)
		"transit" : 14,	// Maximum shipping time (Shipper)
		"pickUp" : 15, 	// Maximum time to pick up package (Buyer) [Changes with shipper]
		"confirm" : 4  	// Maximum time to confirm package (Buyer)
	};
	if (order.shipper == "PUROLATOR") { limit.pickUp = 5; }

	let order_overview = document.createElement('order-overview') ;
	document.body.insertBefore(order_overview, document.body.firstChild);
	order_overview.setAttribute('orderDetails', JSON.stringify(order));
}
