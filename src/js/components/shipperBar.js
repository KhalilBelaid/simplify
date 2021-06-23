import TrackInfo from '../models/TrackInfo.js';
import Util from '../util/util.js';

export default class ShipperBar extends HTMLElement {

	render(trackInfo) {
        this.wrapper.innerHTML ="";
		/*
		trackInfo contains {trackLink, shipper, trackNum, labelLink, labelDate} 
		you may add any other information as placeholders and i'll add them afterwards
		*/
		// OLD CODE START
		const shipperImg = document.createElement('img');
		shipperImg.setAttribute('src', 'https://www.ups.com/assets/resources/images/UPS_logo.svg');
		shipperImg.setAttribute('alt', 'UPS_image');

		const shipperTab = document.createElement('table');

			const tr1 = document.createElement('tr');
			const td1 = document.createElement('td');
			td1.innerText = trackInfo.trackLink; // Example of how to use trackInfo object to customize the interface
			
			const tr2 = document.createElement('tr');
			const td2 = document.createElement('td');
			td2.innerText = 'Tracking Number';

		this.wrapper.appendChild(shipperImg);
		this.wrapper.appendChild(shipperTab);
		shipperTab.appendChild(tr1);
		shipperTab.appendChild(tr2);
		tr1.appendChild(td1);
		tr2.appendChild(td2);
		// OLD CODE END

	}

	static get observedAttributes() {
		return ['trackDetails'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		// called when one of attributes listed above is modified
		let nValue = JSON.parse(newValue);
		this.render(new TrackInfo(nValue));
    }

	constructor() {
		super();

		// Create the shadow DOM
		const shadow = this.attachShadow({mode: 'open'});

		// Add styling to the shadow DOM
		const style = Util.cssLoader('src/css/trackInfo.css');
		shadow.appendChild(style);
		
		// create the wrapper to contain all the HTML elements
		const wrapper = document.createElement('div');
		wrapper.setAttribute('class', 'wrapper');

		shadow.appendChild(wrapper);
		this.wrapper = wrapper;
	}
}

customElements.define( 'shipper-bar', ShipperBar );