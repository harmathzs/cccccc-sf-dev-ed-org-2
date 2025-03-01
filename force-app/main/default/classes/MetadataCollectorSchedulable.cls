/**
 * Created by Harmath Zsolt on 2025. 03. 01..
 */

public with sharing class MetadataCollectorSchedulable implements Schedulable {
	public Saved_Metadata_Entry__c[] savedMetadataEntries {get; set;}

	public void execute(SchedulableContext context) {
		savedMetadataEntries = new List<Saved_Metadata_Entry__c>();

		// Collect SObjects
		Map<String, SObjectType> globalDescribe = Schema.getGlobalDescribe();
		Set<String> sobjectNames = globalDescribe.keySet();

		for (String sobjectName: sobjectNames) {
			Saved_Metadata_Entry__c savedMetadataEntry = new Saved_Metadata_Entry__c(
				Entity_Name__c = sobjectName,
				Entity_Type__c = 'SObject',
				SObject_Name__c = sobjectName
			);
			savedMetadataEntries.add(savedMetadataEntry);
		}

		// Collect Fields

		//upsert savedMetadataEntries;
	}
}
