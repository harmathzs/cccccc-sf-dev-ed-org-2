// Check limits

Integer emailInvocations = Limits.getEmailInvocations();
Integer emailLimitMax = Limits.getLimitEmailInvocations();
Integer remainingEmails = emailLimitMax - emailInvocations;

System.debug('Emails sent today: ' + emailInvocations);
System.debug('Daily email limit: ' + emailLimitMax);
System.debug('Remaining emails: ' + remainingEmails);
