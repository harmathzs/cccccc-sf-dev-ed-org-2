/**
 * Created by Harmath Zsolt on 2025. 02. 07..
 */

import {LightningElement} from 'lwc';
import {ShowToastEvent} from "lightning/platformShowToastEvent";

export default class ScrollEnforcerWithValues extends LightningElement {
	handleAccept(event) {
		console.log('handleAccept event', event);

		const toast = new ShowToastEvent({
			title: 'Accepted',
			variant: 'success',
			mode: 'dismissable',
			message: 'Accepted'
		});
		this.dispatchEvent(toast);
	}

	handleReject(event) {
		console.log('handleReject event', event);

		const toast = new ShowToastEvent({
			title: 'Rejected',
			variant: 'warning',
			mode: 'dismissable',
			message: 'Rejected'
		});
		this.dispatchEvent(toast);
	}
}
