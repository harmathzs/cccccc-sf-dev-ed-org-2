/**
 * Created by Harmath Zsolt on 2025. 02. 10..
 */

public with sharing class AiChatController {
	@AuraEnabled
	public static HttpCalloutController.OutputParams calloutToGroq(String requestBodyJSON) {
		HttpCalloutController.InputParams inp = new HttpCalloutController.InputParams();
		inp.method = 'POST';
		inp.endpoint = 'https://api.groq.com/openai/v1/chat/completions';
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
