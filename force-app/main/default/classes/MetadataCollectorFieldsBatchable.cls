/**
 * Created by Harmath Zsolt on 2025. 03. 01..
 */

public with sharing class MetadataCollectorFieldsBatchable implements Database.Batchable<SObject> {
	public Database.QueryLocator start(Database.BatchableContext context) {
		return null;
	}

	public void finish(Database.BatchableContext context) {
	}

	public void execute(Database.BatchableContext context, List<SObject> records) {
	}
}
