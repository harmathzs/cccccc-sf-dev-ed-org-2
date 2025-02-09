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

	handleEndpointChange(event) {
		console.log('handleEndpointChange event', event);
	}
}
