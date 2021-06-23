import TrackingBar from './trackingBar.js'; // Needed for dynamic import
import MemberInfo from './memberInfo.js';
import ShipperBar from './shipperBar.js';
import Order from '../models/Order.js';
import Util from '../util/util.js';

export default class OrderOverview extends HTMLElement {

	render(order) {
        this.wrapper.innerHTML ="";

        let seller = {
            name : order.seller
        };
        let buyer = {
            name : order.buyer
        };

        let trackInfo = {
            trackLink : order.trackLink,
            shipper : order.shipper,
            trackNum : order.trackNum,
            labelLink : order.labeLink,
            labelDate : order.dates.label
        };

        let seller_info = document.createElement('member-info') ;
        seller_info.setAttribute('memberDetails', JSON.stringify(seller));

        let tracking_bar = document.createElement('tracking-bar') ;
        tracking_bar.setAttribute('orderDetails', JSON.stringify(order));

        let tracking_Info = document.createElement('shipper-bar') ;
        tracking_Info.setAttribute('trackDetails', JSON.stringify(trackInfo));

        let buyer_info = document.createElement('member-info') ;
        buyer_info.setAttribute('memberDetails', JSON.stringify(buyer));

        this.wrapper.appendChild(seller_info);

        let container = document.createElement('div');
        container.setAttribute('class', 'container');
        container.appendChild(tracking_Info);
        container.appendChild(tracking_bar);

        this.wrapper.appendChild(container);
        this.wrapper.appendChild(buyer_info);
	}

	static get observedAttributes() {
		return ['orderDetails'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		// called when one of attributes listed above is modified
		let nValue = JSON.parse(newValue);
        for (let date in nValue.dates) {
			nValue.dates[date] = new Date(nValue.dates[date]);
		}
        this.render(new Order(nValue));
    }

	constructor() {
		super();

		// Create the shadow DOM
		const shadow = this.attachShadow({mode: 'open'});

		// Add styling to the shadow DOM
		const style = Util.cssLoader('src/css/orderOverview.css');
		shadow.appendChild(style);
		
		// create the wrapper to contain all the HTML elements
		const wrapper = document.createElement('div');
		wrapper.setAttribute('class', 'wrapper');

		shadow.appendChild(wrapper);
		this.wrapper = wrapper;
	}
}

customElements.define( 'order-overview', OrderOverview );