/**
 * Created by Harmath Zsolt on 2025. 02. 10.
 */

import {LightningElement} from 'lwc';

export default class AiChat extends LightningElement {
	question;

	handleInputChange(event) {
		//console.log('handleInputChange event', event);
		this.question = event?.detail?.value;
		console.log('handleInputChange question', this.question);
	}

	handleSendClick(event) {
		console.log('handleSendClick event', event);
	}

	handleResetClick(event) {
		console.log('handleResetClick event', event);
	}

	handleKeyPress(event) {
		//console.log('handleKeyPress event', event);
		if (event?.key == 'Enter') {
			console.log('handleKeyPress key', event?.key);
		}
	}
}
