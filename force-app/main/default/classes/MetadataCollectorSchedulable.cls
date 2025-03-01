/**
 * Created by Harmath Zsolt on 2025. 03. 01..
 */

public with sharing class MetadataCollectorSchedulable implements Schedulable {
	public void execute(SchedulableContext context) {
		// Collect SObjects
		Map<String, SObjectType> globalDescribe = Schema.getGlobalDescribe();
		Set<String> sobjectNames = globalDescribe.keySet();

		for (String sobjectName: sobjectNames) {
			//
		}

		// Collect Fields

	}
}
