/**
 * Created by Harmath Zsolt on 2025. 02. 09..
 */

import {LightningElement} from 'lwc';

export default class CurrencyRates extends LightningElement {
	endpoint = 'http://data.fixer.io/api/latest';
	apiKey = '5007bbeac86574994088d4021dac9a12';
	supportedSymbols;
	base = 'EUR';
	symbols;

	connectedCallback() {
		this.loadSupportedSymbols();
	}

	loadSupportedSymbols() {
		fetch('https://data.fixer.io/api/symbols?access_key='+this.apiKey)
			.then(res => res.json())
			.then(json => this.supportedSymbols = json)
			.catch(err => console.log(err))
			.finally(() => {
				console.log('loadSupportedSymbols supportedSymbols', this.supportedSymbols);
				// {
				//     "success": true,
				//     "symbols": {
				//         "AED": "United Arab Emirates Dirham",
				//         "AFN": "Afghan Afghani",
			});
	}

	handleEndpointChange(event) {
		//console.log('handleEndpointChange event', event);
		this.endpoint = event?.detail?.value;
	}
}
