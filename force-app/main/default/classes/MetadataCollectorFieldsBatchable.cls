/**
 * Created by Harmath Zsolt on 2025. 03. 01.
 */

public with sharing class MetadataCollectorFieldsBatchable implements Database.Batchable<SObject> {
	public Database.QueryLocator start(Database.BatchableContext context) {
		return Database.getQueryLocator([
			SELECT Id
				,SObject_Name__c
				,Entity_Name__c
				,Entity_Type__c
				,Picklist_Values__c
			FROM Saved_Metadata_Entry__c
		]);
	}

	public void finish(Database.BatchableContext context) {}

	public void execute(Database.BatchableContext context, List<Saved_Metadata_Entry__c> smes) {
		MetadataCollectorFieldsAsync queueable = new MetadataCollectorFieldsAsync(smes);
		String jobId = System.enqueueJob(queueable);
	}
}
