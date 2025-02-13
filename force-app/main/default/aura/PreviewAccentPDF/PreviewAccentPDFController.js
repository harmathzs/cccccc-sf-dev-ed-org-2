/**
 * Created by Harmath Zsolt on 2025. 02. 13..
 */


({
	generatePDF : function(component, event, helper) {
		var action = component.get("c.generatePDF");
		console.log('generatePDF action', action);
		action.setCallback(this, function(response) {
			var state = response.getState();
			if (state === "SUCCESS") {
				component.set("v.pdfUrl", response.getReturnValue());
				component.set("v.showModal", true);
			}
		});
		$A.enqueueAction(action);
	},

	createFile : function(component, event, helper) {
		console.log('createFile');
		// Implement file creation logic
	},

	downloadPDF : function(component, event, helper) {
		var pdfUrl = component.get("v.pdfUrl");
		console.log('downloadPDF pdfUrl', pdfUrl);
		window.open(pdfUrl, '_blank');
	},

	closeModal : function(component, event, helper) {
		console.log('closeModal');
		component.set("v.showModal", false);
	}


})

