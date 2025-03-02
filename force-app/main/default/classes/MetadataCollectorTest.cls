/**
 * Created by Harmath Zsolt on 2025. 03. 01.
 */

@IsTest
private class MetadataCollectorTest {
	@TestSetup static void testFactory() {
		Saved_Metadata_Entry__c sobjectSME = new Saved_Metadata_Entry__c(
			SObject_Name__c = 'Account',
			Entity_Name__c = 'Account',
			Entity_Type__c = 'SObject'
		);
		sobjectSME.Unique_Key__c = sobjectSME.SObject_Name__c + ' - ' + sobjectSME.Entity_Name__c;

		Saved_Metadata_Entry__c fieldSME = new Saved_Metadata_Entry__c(
			SObject_Name__c = 'Account',
			Entity_Name__c = 'Name',
			Entity_Type__c = 'Non-picklist Field'
		);
		fieldSME.Unique_Key__c = fieldSME.SObject_Name__c + ' - ' + fieldSME.Entity_Name__c;

		Saved_Metadata_Entry__c[] smes = new List<Saved_Metadata_Entry__c>{
			sobjectSME,
			fieldSME
		};
		insert smes;
	}

	@IsTest
	static void testBehavior() {
		MetadataCollectorSchedulable schedulable = new MetadataCollectorSchedulable();
		schedulable.execute(null);
	}
}
