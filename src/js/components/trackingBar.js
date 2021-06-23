import Order from '../models/order.js';
import Util from '../util/util.js';

export default class TrackingBar extends HTMLElement {

	makeIcon(num1,type1,num2,type2,num3,type3){
		const ICONS = {
			BLANK : `
				<div class="cropper">
					<span class="icon blank">
						check_box_outline_blank
					</span>
				</div>`,
			MILESTONE_PENDING : `
				<div class="cropper">
					<span class="icon outlined">
						expand_circle_down
					</span>
				</div>`,
			MILESTONE_DONE : `
				<div class="cropper">
					<span class="icon">
						check_circle
					</span>
				</div>`,
			MILESTONE_EMPTY : `
				<div class="cropper">
					<span class="icon outlined">
						circle
					</span>
				</div>`,
			PROGRESS_DONE : `
				<div class="cropper">
					<span class="icon line">
						horizontal_rule
					</span>
				</div>`,
			PROGRESS_PENDING : `
				<div class="cropper">
					<span class="icon dots">
						more_horiz
					</span>
				</div>`,
			// CANCEL : `
			// <div class="cropper">
			// 	<span class="icon outlined error">
			// 		cancel
			// 	</span>
			// </div>`,
			// INFO : `
			// <div class="cropper">
			// 	<span class="icon outlined error">
			// 		error_outline
			// 	</span>
			// </div>`
		};
		return ICONS[type1].repeat(num1) + ICONS[type2].repeat(num2) + ICONS[type3].repeat(num3);
	}

	fill(order) {
		const ICON_BUNDLE = {
			START : {
				0 : this.makeIcon(1, 'BLANK', 1, 'MILESTONE_DONE', 1, 'PROGRESS_DONE'), //MILESTONE_DONE
				1 : this.makeIcon(1, 'BLANK', 1, 'MILESTONE_PENDING', 1, 'PROGRESS_PENDING'), //MILESTONE_PENDING
				2 : this.makeIcon(1, 'BLANK', 1, 'MILESTONE_EMPTY', 1, 'PROGRESS_PENDING') //MILESTONE_EMPTY
			},
			CENTER : {
				0 : this.makeIcon(1, 'PROGRESS_DONE', 1, 'MILESTONE_DONE', 1, 'PROGRESS_DONE'),
				1 : this.makeIcon(1, 'PROGRESS_DONE', 1, 'MILESTONE_PENDING', 1, 'PROGRESS_PENDING'),
				2 : this.makeIcon(1, 'PROGRESS_PENDING', 1, 'MILESTONE_EMPTY', 1, 'PROGRESS_PENDING')
			},
			END : {
				0 : this.makeIcon(1, 'PROGRESS_DONE', 1, 'MILESTONE_DONE', 1, 'BLANK'),
				1 : this.makeIcon(1, 'PROGRESS_DONE', 1, 'MILESTONE_PENDING', 1, 'BLANK'),
				2 : this.makeIcon(1, 'PROGRESS_PENDING', 1, 'MILESTONE_EMPTY', 1, 'BLANK')
			},
			PROGRESS_DONE : this.makeIcon(0, 'BLANK', 2, 'PROGRESS_DONE', 0, 'BLANK'),
			PROGRESS_PENDING : this.makeIcon(0, 'BLANK', 2, 'PROGRESS_PENDING', 0, 'BLANK'),
			//CANCEL_REQUEST : this.makeIcon(1, 'PROGRESS_DONE', 1, 'INFO', 1, 'PROGRESS_PENDING'),
			//CANCELLED : this.makeIcon(1, 'PROGRESS_DONE',1, 'CANCEL', 1, 'PROGRESS_PENDING')
		};
		const STATUS_TEXT = {
			STAGE_1 : {
				0 : "Approved", //MILESTONE_DONE
				1 : `<span id="highlight">Waiting</span>`, //MILESTONE_PENDING
				2 : "" //MILESTONE_EMPTY
			},
			STAGE_2 : (order.timelineInHours.dropOff == 0) ? ("") : (Math.floor(order.timelineInHours.dropOff/24) + "d" + ":" + order.timelineInHours.dropOff % 24 +"h"),
			STAGE_3 : {
				0 : "Shipped",
				1 : `<span id="highlight">Waiting</span>`,
				2 : ""
			},
			STAGE_4 : (order.timelineInHours.shipNpick == 0) ? ("") : (Math.floor(order.timelineInHours.shipNpick/24) + "d" + ":" + order.timelineInHours.shipNpick % 24 +"h"),
			STAGE_5 : {
				0 : "Delivered",
				1 : `<span id="highlight">In Transit</span>`,
				2 : ""
			},
			STAGE_6 : (order.timelineInHours.confirm == 0) ? ("") : (Math.floor(order.timelineInHours.confirm/24) + "d" + ":" + order.timelineInHours.confirm % 24 +"h"),
			STAGE_7 : {
				0 : "Confirmed",
				1 : `<span id="highlight">Waiting</span>`,
				2 : ""
			},
		};
		const TIMESTAMP = {
			STAGE_1 : {
				date : (order.dates.ordered == undefined) ? ("") : (order.dates.ordered.toLocaleDateString(navigator.language)),
				time : (order.dates.ordered == undefined) ? ("") : (order.dates.ordered.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}))
			},
			STAGE_2 : {
				date : "",
				time : ""
			},
			STAGE_3 : {
				date : (order.dates.shipped == undefined) ? ("") : (order.dates.shipped.toLocaleDateString(navigator.language)),
				time : (order.dates.shipped == undefined) ? ("") : (order.dates.shipped.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}))
			},
			STAGE_4 : {
				date : "",
				time : ""
			},
			STAGE_5 : {
				date : (order.dates.received == undefined) ? ("") : (order.dates.received.toLocaleDateString(navigator.language)),
				time : (order.dates.received == undefined) ? ("") : (order.dates.received.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}))
			},
			STAGE_6 : {
				date : "",
				time : ""
			},
			STAGE_7 : {
				date : (order.dates.confirmed == undefined) ? ("") : (order.dates.confirmed.toLocaleDateString(navigator.language)),
				time : (order.dates.confirmed == undefined) ? ("") : (order.dates.confirmed.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}))
			},
		};
		return {
				1 : {
					icon : ICON_BUNDLE.START[0],
					str : STATUS_TEXT.STAGE_1[0],
					date : `<span id="datetime">${TIMESTAMP.STAGE_1.date}</span>`,
					time : `<span id="datetime">${TIMESTAMP.STAGE_1.time}</span>`
				},
				2 : {
					icon : ICON_BUNDLE.PROGRESS_DONE,
					str : `<span id="datetime">${STATUS_TEXT.STAGE_2}</span>`,
					date : `<span id="datetime">${TIMESTAMP.STAGE_2.date}</span>`,
					time : `<span id="datetime">${TIMESTAMP.STAGE_2.time}</span>`
				},
				3 : {
					icon : ICON_BUNDLE.CENTER[Number(order.state.shipped == false)],
					str : STATUS_TEXT.STAGE_3[Number(order.state.shipped == false)],
					date : `<span id="datetime">${TIMESTAMP.STAGE_3.date}</span>`,
					time :`<span id="datetime">${TIMESTAMP.STAGE_3.time}</span>`
				},
				4 : {
					icon : (order.state.shipped == true) ? (ICON_BUNDLE.PROGRESS_DONE) : (ICON_BUNDLE.PROGRESS_PENDING),
					str : `<span id="datetime">${STATUS_TEXT.STAGE_4}</span>`,
					date : `<span id="datetime">${TIMESTAMP.STAGE_4.date}</span>`,
					time : `<span id="datetime">${TIMESTAMP.STAGE_4.time}</span>`
				},
				5 : {
					icon : ICON_BUNDLE.CENTER[Number(order.state.received == false) + Number(order.state.shipped == false)],
					str : STATUS_TEXT.STAGE_5[Number(order.state.received == false) + Number(order.state.shipped == false)],
					date : `<span id="datetime">${TIMESTAMP.STAGE_5.date}</span>`,
					time : `<span id="datetime">${TIMESTAMP.STAGE_5.time}</span>`
				},
				6 : {
					icon : (order.state.received == true) ? (ICON_BUNDLE.PROGRESS_DONE) : (ICON_BUNDLE.PROGRESS_PENDING),
					str : `<span id="datetime">${STATUS_TEXT.STAGE_6}</span>`,
					date : `<span id="datetime">${TIMESTAMP.STAGE_6.date}</span>`,
					time : `<span id="datetime">${TIMESTAMP.STAGE_6.time}</span>`
				},
				7 : {
					icon : ICON_BUNDLE.END[Number(order.state.confirmed == false) + Number(order.state.received == false)],
					str : STATUS_TEXT.STAGE_7[Number(order.state.confirmed == false) + Number(order.state.received == false)],
					date : `<span id="datetime">${TIMESTAMP.STAGE_7.date}</span>`,
					time : `<span id="datetime">${TIMESTAMP.STAGE_7.time}</span>`
				}
			};
	}

	render(order) {
		this.wrapper.innerHTML = "";
		const stages = this.fill(order);
		let table = document.createElement("table");
		table.setAttribute("class","progress-tab");
		let col, ico, str, date, time;
		for (let i = 1; i < 8; i++) {
			col = document.createElement("tr");

			ico = document.createElement("th");
			ico.innerHTML = stages[i].icon;

			str = document.createElement("td");
			str.innerHTML = stages[i].str;

			date = document.createElement("td");
			date.innerHTML = stages[i].date;

			time = document.createElement("td");
			time.innerHTML = stages[i].time;

			col.appendChild(ico);
			col.appendChild(str);
			col.appendChild(date);
			col.appendChild(time);
			table.appendChild(col);
		}
		this.wrapper.appendChild(table);
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
		const style = Util.cssLoader('src/css/trackingBar.css');
		shadow.appendChild(style);
		
		// create the wrapper to contain all the HTML elements
		const wrapper = document.createElement('div');
		wrapper.setAttribute('class', 'wrapper');

		shadow.appendChild(wrapper);
		this.wrapper = wrapper;
	}
}

customElements.define( 'tracking-bar', TrackingBar );