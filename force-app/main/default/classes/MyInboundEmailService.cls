/**
 * Created by Harmath Zsolt on 2025. 02. 20..
 */

public with sharing class MyInboundEmailService implements Messaging.InboundEmailHandler {
	public Messaging.InboundEmailResult handleInboundEmail(Messaging.InboundEmail email, Messaging.InboundEnvelope envelope) {
		System.debug('MyInboundEmailService email: '+email);
		System.debug('MyInboundEmailService envelope: '+envelope);

		Messaging.InboundEmailResult result = new Messaging.InboundEmailresult();
		return result;
	}
}
