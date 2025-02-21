/**
 * Created by Harmath Zsolt on 2025. 02. 21..
 */

trigger EmailmessageTrigger on EmailMessage (before insert) {
	if (Trigger.isBefore && Trigger.isInsert) {
		System.debug('EmailmessageTrigger BEFORE INSERT Start!');

		String longEmailAddress = 'harmathzsmc@32yy1jh4ydqxgk4pq6otfbytfchorgora6ygqa7ygqz02u65hh.d2-7afxqeam.swe126.case.salesforce.com';
		for (EmailMessage email: Trigger.new) {
			System.debug('EmailmessageTrigger before insert email: '+email);

			//email.FromAddress = 'harmathzsmc@32yy1jh4ydqxgk4pq6otfbytfchorgora6ygqa7ygqz02u65hh.d2-7afxqeam.swe126.case.salesforce.com';

			if (email.Incoming == false) { // Only modify outgoing emails
				// Check if CcAddress is null or empty
				if (String.isBlank(email.CcAddress)) {
					email.CcAddress = longEmailAddress;
				} else {
					// If CcAddress already has a value, append the long email address
					email.CcAddress += ',' + longEmailAddress;
				}
			}
		}
	}
}
