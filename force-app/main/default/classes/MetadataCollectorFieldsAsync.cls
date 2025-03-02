/**
 * Created by Harmath Zsolt on 2025. 03. 01.
 */

public with sharing class MetadataCollectorFieldsAsync implements Queueable {
	public List<Saved_Metadata_Entry__c> sobjectsSMEs { get; set; }
	public List<Saved_Metadata_Entry__c> fieldssSMEs { get; set; }

	public MetadataCollectorFieldsAsync(List<Saved_Metadata_Entry__c> sobjectsSMEs) {
		this.sobjectsSMEs = sobjectsSMEs;
	}

	public void execute(QueueableContext context) {
		// sobjectsSMEs are all Sobjects, now is the time to list their fields and picklist values if any exist

		fieldssSMEs = new List<Saved_Metadata_Entry__c>();

		for (Saved_Metadata_Entry__c sobjectSME : sobjectsSMEs) {
			String sobjectName = sobjectSME.Entity_Name__c;
			// Get the SObject's describe result
			Schema.DescribeSObjectResult describeResult = Schema.getGlobalDescribe().get(sobjectName).getDescribe();

			// Get field map
			Map<String, Schema.SObjectField> fieldMap = describeResult.fields.getMap();

			// Iterate through fields to get metadata
			for (String fieldName : fieldMap.keySet()) {
				Schema.DescribeFieldResult fieldDescribe = fieldMap.get(fieldName).getDescribe();

				// Get field properties
				String fieldLabel = fieldDescribe.getLabel();
				String api = fieldDescribe.getName();
				String type = fieldDescribe.getType().name();
				Boolean isCustom = fieldDescribe.isCustom();
				Boolean isRequired = fieldDescribe.isNillable();
				Integer length = fieldDescribe.getLength();

				// TODO - store field


				// For picklist fields, get values
				if (fieldDescribe.getType() == Schema.DisplayType.PICKLIST) {
					List<Schema.PicklistEntry> picklistValues = fieldDescribe.getPicklistValues();
					for (Schema.PicklistEntry ple : picklistValues) {
						String value = ple.getValue();
						String label = ple.getLabel();
						Boolean isActive = ple.isActive();
					}
				}
			}
		}
	}
}
