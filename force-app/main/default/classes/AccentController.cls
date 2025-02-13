/**
 * Created by Harmath Zsolt on 2025. 02. 13..
 */

public with sharing class AccentController {
	public static Boolean showModal {get; set;}
	public static String pdfUrl {get; set;}

	@AuraEnabled
	public static String generatePDF() {
		PageReference pdfPage = Page.AccentPDF;
		Blob pdfBlob = pdfPage.getContentAsPDF();
		String base64PDF = EncodingUtil.base64Encode(pdfBlob);
		return 'data:application/pdf;base64,' + base64PDF;
	}

	@AuraEnabled
	public static String createFile() {
		return null;
	}

	@AuraEnabled
	public static String downloadPDF() {
		return null;
	}

	@AuraEnabled
	public static String closeModal() {
		return null;
	}
}
