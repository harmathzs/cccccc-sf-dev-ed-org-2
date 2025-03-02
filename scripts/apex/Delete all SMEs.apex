// Delete all SMEs

Saved_Metadata_Entry__c[] allSMEs = [SELECT Id FROM Saved_Metadata_Entry__c LIMIT 9800];
delete allSMEs;
