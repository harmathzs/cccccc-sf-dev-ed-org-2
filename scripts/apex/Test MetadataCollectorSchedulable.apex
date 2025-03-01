// Test MetadataCollectorSchedulable

MetadataCollectorSchedulable collector = new MetadataCollectorSchedulable();

collector.execute(null);



Integer cntSMEs = [SELECT COUNT() FROM Saved_Metadata_Entry__c];
System.debug('cntSMEs: '+cntSMEs);
