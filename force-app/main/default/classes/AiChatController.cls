/**
 * Created by Harmath Zsolt on 2025. 02. 10..
 */

public with sharing class AiChatController {
	@AuraEnabled
	public static HttpCalloutController.OutputParams calloutToChatGPT(String requestBodyJSON) {
		HttpCalloutController.InputParams inp = new HttpCalloutController.InputParams();
		inp.method = 'GET';
		inp.endpoint = 'https://api.openai.com/v1/chat/completions';
		inp.headerKey1 = 'Content-Type';
		inp.headerValue1 = 'application/json';
		inp.headerKey2 = 'Authorization';
		inp.headerValue2 = 'Bearer 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';
		inp.inputBody = requestBodyJSON;
		HttpCalloutController.OutputParams[] results = HttpCalloutController.httpCallout(new List<HttpCalloutController.InputParams>{inp});
		if (results==null || results.isEmpty()) return null;
		return results[0];
	}
}
