/**
 * Created by Harmath Zsolt on 2025. 02. 13..
 */


({
	generatePDF : function(component, event, helper) {
		// If you need to generate the PDF dynamically, keep the Apex call
		// var action = component.get("c.generatePDF");
		// action.setCallback(this, function(response) {
		//     var state = response.getState();
		//     if (state === "SUCCESS") {
		//         component.set("v.pdfUrl", response.getReturnValue());
		//         component.set("v.showModal", true);
		//     }
		// });
		// $A.enqueueAction(action);

		// If you're using a static Visualforce page, you can simply do:
		component.set("v.showModal", true);
	},

	handleCreateFile  : function(component, event, helper) {
		console.log('createFile');
		// Implement file creation logic
		var action = component.get("c.createFile");
		action.setParams({
			"base64PDF": component.get("v.pdfUrl").split(',')[1]
		});
		action.setCallback(this, function(response) {
			var state = response.getState();
			if (state === "SUCCESS") {
				console.log("File created with ID: " + response.getReturnValue());
			} else {
				console.error("Error creating file: " + response.getError()[0].message);
			}
		});
		$A.enqueueAction(action);
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

