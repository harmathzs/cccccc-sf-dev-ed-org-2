/**
 * Created by Harmath Zsolt on 2025. 02. 13..
 */

public with sharing class AccentController {
	public static String base64PDF;

	@AuraEnabled
	public static String generatePDF() {
		PageReference pdfPage = Page.AccentPDF;
		Blob pdfBlob;
		if (!Test.isRunningTest()) {
			pdfBlob = pdfPage.getContentAsPDF();
			base64PDF = EncodingUtil.base64Encode(pdfBlob);
		}
		System.debug('generatePDF base64PDF: '+base64PDF);
		return 'data:application/pdf;base64,' + base64PDF;
	}

	@AuraEnabled
	public static String createFile() {
		generatePDF();

		ContentVersion cv = new ContentVersion();
		cv.VersionData = base64PDF!=null ? EncodingUtil.base64Decode(base64PDF) : Blob.valueOf('test');
		cv.Title = 'Generated Accent PDF - ' + Datetime.now().format();
		cv.PathOnClient = cv.Title + '.pdf';
		insert cv;
		return cv.Id;
	}

	@AuraEnabled
	public static String downloadPDFapex() {
		System.debug('downloadPDF');
		return null;
	}

	@AuraEnabled
	public static String closeModal() {
		System.debug('closeModal');
		return null;
	}
}
