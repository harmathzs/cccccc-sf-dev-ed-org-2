// Test MetadataCollectorSchedulable

MetadataCollectorSchedulable collector = new MetadataCollectorSchedulable(2);

collector.execute(null);



Integer cntSMEs = [SELECT COUNT() FROM Saved_Metadata_Entry__c];
System.debug('cntSMEs: '+cntSMEs);
