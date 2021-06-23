import Member from '../models/Member.js';
import Util from '../util/util.js';

export default class MemberInfo extends HTMLElement {

	render(member) {
        this.wrapper.innerHTML ="";
        const a = document.createElement('a');
        a.setAttribute('href',`${member.AdminLink}`);

        const memberImg = document.createElement('img');
        memberImg.setAttribute('src', 'https://picsum.photos/200');
        memberImg.setAttribute('alt', 'member-image');
        memberImg.setAttribute('class', 'circle');

        let memberTab = document.createElement('table'), row, cell;
        memberTab.setAttribute('style', 'text-align: center;');

        for (let key in member) {
            if ((key == "Activated") || (key == "AdminLink")) {
            if (member[key] == "Yes"){
            memberImg.setAttribute('style', 'border: 2px solid ForestGreen;');
            }
            continue;
            }
            // ROWS & CELLS
            row = document.createElement("tr");
            cell = document.createElement("td");
            
            cell.innerHTML = member[key];
            
            memberTab.appendChild(row);
            row.appendChild(cell);
            }

        this.wrapper.appendChild(a);
        a.appendChild(memberImg);
        this.wrapper.appendChild(memberTab);
	}

	static get observedAttributes() {
		return ['memberDetails'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		// called when one of attributes listed above is modified
		let nValue = JSON.parse(newValue);
		this.render(new Member(nValue));
    }

	constructor() {
		super();

		// Create the shadow DOM
		const shadow = this.attachShadow({mode: 'open'});

		// Add styling to the shadow DOM
		const style = Util.cssLoader('src/css/memberInfo.css');
		shadow.appendChild(style);
		
		// create the wrapper to contain all the HTML elements
		const wrapper = document.createElement('div');
		wrapper.setAttribute('class', 'wrapper');

		shadow.appendChild(wrapper);
		this.wrapper = wrapper;
	}
}

customElements.define( 'member-info', MemberInfo );