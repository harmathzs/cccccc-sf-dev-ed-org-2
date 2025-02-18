// Test MnbSoapService

MnbSoapService.CustomBinding_MNBArfolyamServiceSoap mnb = new MnbSoapService.CustomBinding_MNBArfolyamServiceSoap();

String currenciesXml = mnb.GetCurrencies();
System.debug('currenciesXml: ');
System.debug(currenciesXml);

String ratesXml = mnb.GetCurrentExchangeRates();
System.debug('ratesXml: ');
System.debug(ratesXml);
