/**
 * Created by Harmath Zsolt on 2025. 02. 21..
 */

@IsTest
private class EmailServiceTest {
	@IsTest
	static void testEmailmessageTrigger() {
		EmailMessage email = new EmailMessage();
		insert email;
	}

	@IsTest static void testMyInboundEmailService() {
		MyInboundEmailService emailService = new MyInboundEmailService();
		emailService.handleInboundEmail(null, null);
	}
}
