/**
 * Created by Harmath Zsolt on 2025. 03. 01.
 */

@IsTest
private class MetadataCollectorTest {
	@IsTest
	static void testBehavior() {
		MetadataCollectorSchedulable schedulable = new MetadataCollectorSchedulable();
		schedulable.execute(null);
	}
}
