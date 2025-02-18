// Test SOAP MNB callout

HttpCalloutController.InputParams inp = new HttpCalloutController.InputParams();
inp.method = 'POST';
inp.endpoint = 'http://www.mnb.hu/arfolyamok.asmx';
inp.headerKey1 = 'Content-Type';
inp.headerValue1 = 'text/xml';
inp.headerKey2 = 'Accept';
inp.headerValue2 = 'application/xml';
inp.headerKey3 = 'SOAPAction';
inp.headerValue3 = '/webservices/MNBArfolyamServiceSoap/GetCurrentExchangeRates';
inp.inputBody = '<?xml version="1.0" encoding="utf-8" ?>\n' +
        '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.mnb.hu/webservices/">\n' +
        '  <soapenv:Header/>\n' +
        '  <soapenv:Body>\n' +
        '    <web:GetCurrentExchangeRates/>\n' +
        '  </soapenv:Body>\n' +
        '</soapenv:Envelope>';

HttpCalloutController.OutputParams[] results = HttpCalloutController.httpCallout(new List<HttpCalloutController.InputParams>{inp});

System.debug('results: ');
System.debug(results);
