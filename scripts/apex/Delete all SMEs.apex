// Delete all SMEs

Saved_Metadata_Entry__c[] allSMEs = [SELECT Id FROM Saved_Metadata_Entry__c LIMIT 5000];
delete allSMEs;
