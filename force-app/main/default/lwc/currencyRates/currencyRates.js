/**
 * Created by Harmath Zsolt on 2025. 02. 09..
 */

import {LightningElement} from 'lwc';

export default class CurrencyRates extends LightningElement {
	apiKey = '5007bbeac86574994088d4021dac9a12';
	supportedSymbols;
	symbolOptions;
	symbols;
	ratesToEUR;

	connectedCallback() {
		this.loadSupportedSymbols();
		this.loadRatesToEUR();
	}

	loadSupportedSymbols() {
		fetch('https://data.fixer.io/api/symbols?access_key='+this.apiKey)
			.then(res => res.json())
			.then(json => {
				this.supportedSymbols = json;
				console.log('loadSupportedSymbols supportedSymbols', this.supportedSymbols);
				// {
				//     "success": true,
				//     "symbols": {
				//         "AED": "United Arab Emirates Dirham",
				//         "AFN": "Afghan Afghani",

				this.symbolOptions = [];
				for (const symbolRow in this.supportedSymbols) {
					this.symbolOptions.push({
						label: '' + symbolRow + ' - ' + this.supportedSymbols[symbolRow],
						value: symbolRow
					});
				}
			})
			.catch(err => console.log(err))
			.finally(() => {});
	}

	loadRatesToEUR() {
		fetch('https://data.fixer.io/api/latest?access_key='+this.apiKey+'&base=EUR')
			.then(res => res.json())
			.then(json => {
				this.ratesToEUR = json;
				console.log('loadRatesToEUR ratesToEUR', this.ratesToEUR);
				// {
				//     "success": true,
				//     "timestamp": 1739168655,
				//     "base": "EUR",
				//     "date": "2025-02-10",
				//     "rates": {
				//         "AED": 3.788652,
				//         "AFN": 76.945387,
			})
			.catch(err => console.log(err))
			.finally(()=>{});
	}

	handleMultiselectChange(event) {

	}
}
