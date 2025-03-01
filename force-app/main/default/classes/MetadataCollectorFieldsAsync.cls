/**
 * Created by Harmath Zsolt on 2025. 03. 01.
 */

public with sharing class MetadataCollectorFieldsAsync implements Queueable {
	public List<Saved_Metadata_Entry__c> smes {get; set;}

	public MetadataCollectorFieldsAsync(List<Saved_Metadata_Entry__c> smes) {
		this.smes = smes;
	}

	public void execute(QueueableContext context) {
		// TODO - smes are all Sobjects, now is the time to list their fields and picklist values if any exist

	}
}
