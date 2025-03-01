/**
 * Created by Harmath Zsolt on 2025. 03. 01..
 */

public with sharing class MetadataCollectorSchedulable implements Schedulable {
	public Saved_Metadata_Entry__c[] savedSobjectEntries {get; set;}

	public void execute(SchedulableContext context) {
		savedSobjectEntries = new List<Saved_Metadata_Entry__c>();

		// Collect SObjects
		Map<String, SObjectType> globalDescribe = Schema.getGlobalDescribe();
		Set<String> sobjectNames = globalDescribe.keySet();

		for (String sobjectName: sobjectNames) {
			Saved_Metadata_Entry__c savedSobjectEntry = new Saved_Metadata_Entry__c(
				Entity_Name__c = sobjectName,
				Entity_Type__c = 'SObject',
				SObject_Name__c = sobjectName
			);
			savedSobjectEntry.Unique_Key__c = savedSobjectEntry.SObject_Name__c + ' - ' + savedSobjectEntry.Entity_Name__c;
			savedSobjectEntries.add(savedSobjectEntry);
		}

		upsert savedSobjectEntries Unique_Key__c;

		// Collect Fields
		// TODO - launch batch on the above SObjects

	}
}
