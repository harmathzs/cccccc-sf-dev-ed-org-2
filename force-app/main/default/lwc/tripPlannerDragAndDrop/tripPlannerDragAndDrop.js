/**
 * Created by Attila Nemeth @Attention CRM on 2023/08/16.
 */

import {LightningElement} from 'lwc';

import DragAndDrop from "c/dragAndDrop";
import {NavigationMixin} from 'lightning/navigation';
import {api, track} from "lwc"
import saveSelectedAccountId from '@salesforce/apex/StoreVisitTripPlannerController.saveSelectedAccountId';


export default class TripPlannerDragAndDrop extends NavigationMixin(DragAndDrop) {
    @api selectedSubtype;
    value = 'Store Visit';

    getAccountInfo(event) {
        let accountId = event.currentTarget.dataset.accountId;
        if (event.currentTarget.dataset.accountId === null) return;
        //console.log(`accountId`, accountId);

        const selectEvent = new CustomEvent("select", {
            detail: accountId
        })
        this.dispatchEvent(selectEvent);
    }

    goToAccount(event) {
        //console.log(event.currentTarget.dataset.accountId);
        if (event.currentTarget.dataset.accountId === null) {
            return;
        }
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__recordPage',
            attributes: {
                "recordId": event.currentTarget.dataset.accountId,
                "actionName": "view"
            },
        }).then((url) => {
            console.log('goToAccount url: ', url);
            window.open(url, "_blank");
        });

        // this[NavigationMixin.Navigate]({
        //     type: 'standard__recordPage',
        //     attributes: {
        //         "recordId": event.currentTarget.dataset.accountId,
        //         "actionName": "view"
        //     },
        // });
    }

    handleNameClick(event) {
        //console.log('click on eventName!');
    }


    get styleOfContainer() {
        if (this.mainpanel === true) return '"max-height : 50%;"'
        return '"max-height : 50%;"'
    }

    async handleItemClick(event) {
        console.log('handleItemClick event: ', event);

        if (event.currentTarget && event.currentTarget.dataset) {
            console.log('handleItemClick event.currentTarget.dataset: ', JSON.stringify(event.currentTarget.dataset));
            let accountId = event.currentTarget.dataset.accountId;
            if (event.currentTarget.dataset.accountId == null) return;
            console.log(`handleItemClick accountId`, accountId);

            accountId = await saveSelectedAccountId({accountId: accountId});
            console.log('handleItemClick accountId after saveSelectedAccountId: ', accountId);

            let selectEvent = new CustomEvent("selectaccount", {
                detail: {accountId: accountId}
            });
            this.dispatchEvent(selectEvent);
        }
    }
}