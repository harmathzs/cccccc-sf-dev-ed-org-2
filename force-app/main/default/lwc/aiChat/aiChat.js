/**
 * Created by Harmath Zsolt on 2025. 02. 10.
 */

import {LightningElement} from 'lwc';
import calloutToGroq from '@salesforce/apex/AiChatController.calloutToGroq';

export default class AiChat extends LightningElement {
	question;
	conversation = {
		model: 'deepseek-r1-distill-llama-70b',
		messages: [],
	};

	handleInputChange(event) {
		//console.log('handleInputChange event', event);
		this.question = event?.detail?.value;
		console.log('handleInputChange question', this.question);
	}

	handleSendClick(event) {
		console.log('handleSendClick event', event);

		this.conversation.messages.push({
			role: 'user',
			content: this.question,
		});
		const conversationJSON = JSON.stringify(this.conversation);

		calloutToGroq({requestBodyJSON: conversationJSON})
			.then(outputParams => {
				console.log('calloutToGroq outputParams', outputParams);
				const outputParamsObj = JSON.parse(outputParams);
				//console.log('calloutToGroq outputParamsObj', JSON.stringify(outputParamsObj));

				const statusCode = +outputParamsObj?.statusCode;
				const statusText = outputParamsObj?.statusText;
				const responseBody = outputParamsObj?.responseBody;
				const errorMessage = outputParamsObj?.errorMessage;

				console.log('calloutToGroq statusCode', statusCode);
				console.log('calloutToGroq statusText', statusText);
				console.log('calloutToGroq responseBody', responseBody);
				console.log('calloutToGroq errorMessage', errorMessage);

				const responseObj = JSON.parse(responseBody);
				console.log('calloutToGroq responseObj', JSON.stringify(responseObj));
				// TODO - merge answer into conversation
			})
			.catch(err => console.log(err))
			.finally(() => {});
	}

	handleResetClick(event) {
		console.log('handleResetClick event', event);
	}

	handleKeyPress(event) {
		//console.log('handleKeyPress event', event);
		if (event?.key == 'Enter') {
			console.log('handleKeyPress key', event?.key);
			this.handleSendClick(event);
		}
	}
}
