import Util from '../util/util.js';

export default class Order {

	constructor(data) {
		this.buyer = data.buyer;
		this.seller = data.seller;
		this.orderNumber = data.orderNumber;
		this.shipper = data.shipper;
		this.trackNum = data.trackNum;
		this.trackLink = this.trackingLink;
		this.labelLink = data.labeLink;
		this.dates = data.dates;
		this.state = {
			shipped : data.dates.shipped !== undefined,
			received : data.dates.received !== undefined,
			confirmed : data.dates.confirmed !== undefined,
		};
	}
	
	get timelineInDays() {
		return {
			dropOff : Util.timeSpan(this.dates.shipped, this.dates.ordered, 'd'),	  // Days it took to drop off item at pick up point
			shipNpick : Util.timeSpan(this.dates.received, this.dates.shipped, 'd'),  // Days it took to BOTH ship item and pick it up from drop off point (or home delivery)
			confirm : Util.timeSpan(this.dates.confirmed, this.dates.received, 'd')	  // Days it took to confirm
		};
	}
	get timelineInHours() {
		return {
			dropOff : Util.timeSpan(this.dates.shipped, this.dates.ordered, 'h'),	  // Days it took to drop off item at pick up point
			shipNpick : Util.timeSpan(this.dates.received, this.dates.shipped, 'h'),  // Days it took to BOTH ship item and pick it up from drop off point (or home delivery)
			confirm : Util.timeSpan(this.dates.confirmed, this.dates.received, 'h')	  // Days it took to confirm
		};
	}

	get latestState() {
		let m_state = "";
	    if (this.state.confirmed == true) {
			m_state = "confirmed";
		} else if (this.state.shipped == true) { 
			m_state = "shipped";
		} else if (this.state.received == true) {
			m_state = "received";
		}
		return m_state;
	}
	
	get trackingLink() {
		let m_trackLink;
		switch(this.shipper) {
		  case "PUROLATOR":
			m_trackLink = "https://www.purolator.com/en/shipping/tracker?pins=" + this.trackNum;
			break;
		  case "UPS":
			m_trackLink = "https://www.ups.com/track?loc=en_CA&tracknum="+ this.trackNum;
			break;
		  case "CANADA_POST":
			m_trackLink = "https://www.canadapost-postescanada.ca/track-reperage/en#/details/" + this.trackNum;
			break;
		  default:
			m_trackLink = undefined;
			break;
		}
		return m_trackLink;
	}
}