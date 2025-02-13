/**
 * Created by Harmath Zsolt on 2025. 02. 13..
 */


({
	generatePDF : function(component, event, helper) {
		var action = component.get("c.generatePDF");
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
		// Implement file creation logic
	},

	downloadPDF : function(component, event, helper) {
		var pdfUrl = component.get("v.pdfUrl");
		window.open(pdfUrl, '_blank');
	},

	closeModal : function(component, event, helper) {
		component.set("v.showModal", false);
	}
})

