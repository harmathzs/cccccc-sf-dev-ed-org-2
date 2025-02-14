/**
 * Created by Harmath Zsolt on 2025. 02. 14..
 */

@IsTest
private class AccentTest {
	@IsTest
	static void testBehavior() {
		AccentController.generatePDF();
		AccentController.createFile();
		AccentController.downloadPDFapex();
		AccentController.closeModal();
	}
}
