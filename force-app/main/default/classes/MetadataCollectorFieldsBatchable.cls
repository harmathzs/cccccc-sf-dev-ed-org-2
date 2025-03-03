/**
 * Created by Harmath Zsolt on 2025. 03. 01.
 */

public with sharing class MetadataCollectorFieldsBatchable implements Database.Batchable<SObject> {
	public Integer sobjectLimit {get; set;}
	public MetadataCollectorFieldsBatchable(Integer sobjectLimit) {
		this.sobjectLimit = sobjectLimit;
	}

	public Database.QueryLocator start(Database.BatchableContext context) {
		if (Test.isRunningTest()) {
			return Database.getQueryLocator([
				SELECT Id
					, SObject_Name__c
					, Entity_Name__c
					, Entity_Type__c
					, Picklist_Values__c
				FROM Saved_Metadata_Entry__c
				WHERE Entity_Type__c = 'SObject'
				LIMIT 1
			]);
		} else return Database.getQueryLocator([SELECT Id, SObject_Name__c, Entity_Name__c, Entity_Type__c, Picklist_Values__c FROM Saved_Metadata_Entry__c	WHERE Entity_Type__c = 'SObject' ORDER BY SObject_Name__c LIMIT :sobjectLimit]);
	}

	public void finish(Database.BatchableContext context) {}

	public void execute(Database.BatchableContext context, List<Saved_Metadata_Entry__c> smes) {
		MetadataCollectorFieldsAsync queueable = new MetadataCollectorFieldsAsync(smes);
		String jobId = System.enqueueJob(queueable);
	}
}
