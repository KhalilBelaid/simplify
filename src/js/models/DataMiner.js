import Order from "./order.js";

export default class DataMiner {
	
	static mineData(article) {
		const date_undefined = new Date("-" + " UTC+2");

		let table = article.getElementsByClassName("pure-table pure-table-horizontal")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr");
		let shipping_data = table[7].getElementsByTagName("td")[1];
		let shipping_table = shipping_data.getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr");
		let dates = {
			ordered : table[0].getElementsByTagName("td")[1].innerText,
			label : shipping_data.getElementsByTagName("p")[3].innerText.replace("Generated At: ",""),
			shipped : table[13].getElementsByTagName("td")[1].innerText,
			received : table[16].getElementsByTagName("td")[1].innerText,
			confirmed : table[17].getElementsByTagName("td")[1].innerText,
			returned : table[14].getElementsByTagName("td")[1].innerText,
			return_received : table[15].getElementsByTagName("td")[1].innerText,
		};
		
		for (let date in dates) {
			dates[date] = new Date(dates[date] + " UTC+2");
			if (dates[date].getTime() == date_undefined.getTime()) {
				dates[date] = undefined;
			}
		}

		let order = new Order({
			orderNumber : table[1].getElementsByTagName("td")[1].innerText,
			seller : table[2].getElementsByTagName("td")[1].innerText,
			buyer : table[3].getElementsByTagName("td")[1].innerText,
			shipper : shipping_data.getElementsByTagName("p")[1].innerText.replace("Shipper: ",""),
			trackNum : shipping_table[1].getElementsByTagName("td")[1].innerText,
			labelLink : shipping_table[0].getElementsByTagName("td")[1].getElementsByTagName("a")[0].href,
			dates : dates
		}) ;
		return order;
	}
}