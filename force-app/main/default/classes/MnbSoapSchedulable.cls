/**
 * Created by Harmath Zsolt on 2025. 02. 18..
 */

public with sharing class MnbSoapSchedulable implements Schedulable, Database.AllowsCallouts {
	public void execute(SchedulableContext context) {
		MnbSoapService.CustomBinding_MNBArfolyamServiceSoap soapService = new MnbSoapService.CustomBinding_MNBArfolyamServiceSoap();
		String currentRatesXml = soapService.GetCurrentExchangeRates();
		System.debug('MnbSoapSchedulable currentRatesXml: ');
		System.debug(currentRatesXml);

		Map<String, MNB_Currency_Rate__c> ratesToHufMap = new Map<String, MNB_Currency_Rate__c>();

		DOM.Document doc = new Dom.Document();
		doc.load(currentRatesXml);

		// Get the root element
		DOM.XmlNode root = doc.getRootElement();

		// Get the Day element
		DOM.XmlNode dayNode = root.getChildElements()[0];

		// Get all Rate elements
		List<DOM.XmlNode> rateNodes = dayNode.getChildElements();

		for(DOM.XmlNode rateNode : rateNodes) {
			MNB_Currency_Rate__c rate = new MNB_Currency_Rate__c();
			rate.Base_Currency_Name__c = rateNode.getAttribute('curr', rateNode.getNamespace());
			rate.Counter_Currency_Name__c = 'HUF';
			rate.Unit__c = Integer.valueOf(rateNode.getAttribute('unit', rateNode.getNamespace()));
			// Replace comma with dot for decimal parsing
			String rateValue = rateNode.getText().replace(',', '.');
			rate.Rate__c = Decimal.valueOf(rateValue);

			ratesToHufMap.put(rate.Base_Currency_Name__c, rate);
		}

		System.debug('ratesToHufMap: '+ratesToHufMap);
	}
}
