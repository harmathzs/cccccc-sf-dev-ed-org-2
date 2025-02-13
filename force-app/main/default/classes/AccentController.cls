/**
 * Created by Harmath Zsolt on 2025. 02. 13..
 */

public with sharing class AccentController {
	@AuraEnabled
	public static String generatePDF() {
		PageReference pdfPage = Page.AccentPDF;
		Blob pdfBlob = pdfPage.getContentAsPDF();
		String base64PDF = EncodingUtil.base64Encode(pdfBlob);
		System.debug('generatePDF base64PDF: '+base64PDF);
		return 'data:application/pdf;base64,' + base64PDF;
	}

	@AuraEnabled
	public static String createFile() {
		System.debug('createFile');
		return null;
	}

	@AuraEnabled
	public static String downloadPDF() {
		System.debug('downloadPDF');
		return null;
	}

	@AuraEnabled
	public static String closeModal() {
		System.debug('closeModal');
		return null;
	}
}
