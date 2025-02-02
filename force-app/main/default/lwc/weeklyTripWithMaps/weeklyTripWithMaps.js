/**
 * Created by Attila Nemeth @AttentionCRM on 23/09/05.
 */


import {LightningElement, api, track, wire} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { FlowNavigationMixin } from 'lightning/navigation';

import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {getPicklistValues} from 'lightning/uiObjectInfoApi';

import getVisitsOfSelectedWeek from '@salesforce/apex/WeeklyStoreVisitController.getVisitsOfSelectedWeek';
import getUserOptions from '@salesforce/apex/WeeklyStoreVisitController.getAvailableUsers';

// import TP_Tavolsag from '@salesforce/label/c.TP_Tavolsag';
// import TP_Tovabb from '@salesforce/label/c.TP_Tovabb';
// import TP_Kereses from '@salesforce/label/c.TP_Kereses';
// import TP_Nev_Varos from '@salesforce/label/c.TP_Nev_Varos';
// import TP_Telep from '@salesforce/label/c.TP_Telep';
// import TP_Filter from '@salesforce/label/c.TP_Filter';
// import TP_Settings from '@salesforce/label/c.TP_Settings';
//
// import TP_Previous_Week from '@salesforce/label/c.TP_Previous_Week';
// import TP_Next_Week from '@salesforce/label/c.TP_Next_Week';
//
// import TP_Hetfo from '@salesforce/label/c.TP_Hetfo';
// import TP_Kedd from '@salesforce/label/c.TP_Kedd';
// import TP_Szerda from '@salesforce/label/c.TP_Szerda';
// import TP_Csutortok from '@salesforce/label/c.TP_Csutortok';
// import TP_Pentek from '@salesforce/label/c.TP_Pentek';
//
// import TP_Nagy_ajanlattal_rendelkezo from '@salesforce/label/c.TP_Nagy_ajanlattal_rendelkezo';
//
// import TP_Nincs_latogatas_az_adott_napra from '@salesforce/label/c.TP_Nincs_latogatas_az_adott_napra';
// import TP_Felhasznalo from '@salesforce/label/c.TP_Felhasznalo';
// import TP_Het_kezdete from '@salesforce/label/c.TP_Het_kezdete';
// import TP_Vissza from '@salesforce/label/c.TP_Vissza';
// import TP_Markers from '@salesforce/label/c.TP_Markers';
// import TP_Ertekesitesi_csoport from '@salesforce/label/c.TP_Ertekesitesi_csoport';
// import TP_Info_Utolso_Latogatas_Abszolut from '@salesforce/label/c.TP_Info_Utolso_Latogatas_Abszolut';
// import TP_Info_Utolso_Latogatas_Relativ from '@salesforce/label/c.TP_Info_Utolso_Latogatas_Relativ';
// import TP_Szuresek_eltavolitasa from '@salesforce/label/c.TP_Szuresek_eltavolitasa';
// import TP_Esemenyek_szerkesztese from '@salesforce/label/c.TP_Esemenyek_szerkesztese';
// import TP_Tipus_beallitasa from '@salesforce/label/c.TP_Tipus_beallitasa';
// import TP_Het_betervezese from '@salesforce/label/c.TP_Het_betervezese';
// import TP_Cancel_and_close from '@salesforce/label/c.TP_Cancel_and_close';
// import TP_Tipus from '@salesforce/label/c.TP_Tipus';
//
// import TP_Create from '@salesforce/label/c.Create';
// import TP_View from '@salesforce/label/c.View';

export default class WeeklyTripWithMaps extends NavigationMixin(LightningElement) {
    visitTableColumns =
        [
            {label: 'Account', fieldName: 'AccountName'},
            {label: 'Type', fieldName: 'Type'},
            { label: 'Subtype', fieldName: 'EventSubtype'},
            {label: 'Representative', fieldName: 'Representative'},
            /*{label: 'Státusz', fieldName: 'Status__c'},*/
            /*{label: 'Subject', fieldName: 'Subject'},*/
            {label: 'Visit Time', fieldName: 'VisitTime'},
            /*{ label: 'Meeting Minutes', fieldName: 'MMLink', type: 'url',typeAttributes: {label: { fieldName: 'MMLinkLabel' }}},*/
        ];


    visitsOfThisWeek = [];
    visitsOfLastWeek = [];

    @track daysOfWeek = [];

    @api contact;
    @api name;

    @track records = [];
    requestId = Math.floor(Math.random() * 1000000000);
    hasMore = false;
    isLoading = false;
    @track searchParam;

    showVisits = [];

    @track ownerOptions = [{label: '*', value: null}]

    selectedOwner;
    displayTextMessage = '';

    selectedDate;
    startOfSelectedWeek;
    endOfSelectedWeek;

    columns = this.visitTableColumns;

    defaultZoomLevel = 7;
    singleZoomLevel = 15;

    mapOptions = {
        disableDefaultUI: true,
        zoomLevel: this.defaultZoomLevel,
    };


    userOptions = [];

    @api label = {
        // TP_Kereses,
        // TP_Hetfo,
        // TP_Kedd,
        // TP_Szerda,
        // TP_Csutortok,
        // TP_Pentek,
        //
        // TP_Nincs_latogatas_az_adott_napra,
        // TP_Felhasznalo,
        // TP_Het_kezdete,
        // TP_Vissza,
        // TP_Markers,
        // TP_Ertekesitesi_csoport,
        // TP_Info_Utolso_Latogatas_Abszolut,
        // TP_Info_Utolso_Latogatas_Relativ,
        // TP_Szuresek_eltavolitasa,
        // TP_Esemenyek_szerkesztese,
        // TP_Tipus_beallitasa,
        // TP_Het_betervezese,
        // TP_Cancel_and_close,
        // TP_Tipus,
        //
        // TP_Create,
        // TP_View
    };

    async connectedCallback() {
        this.initUserOptions()
    }

    async initUserOptions() {
        const data = await getUserOptions();
        if (data) {
            this.userOptions = data.map(e => {
                let aItem = {...e};
                aItem.value = e.Id;
                aItem.label = e.Name;
                return aItem;
            });
        }
        //console.log(this.userOptions);
    }

    loadData() {
        this.isLoading = true;
        //const data = await getVisitsOfSelectedWeek({userId: this.selectedOwner, dateString: this.selectedDate});
        getVisitsOfSelectedWeek({userId: this.selectedOwner, dateString: this.selectedDate})
            .then(data => {
                console.log('loadData got VisitsOfSelectedWeek data: ', JSON.parse(JSON.stringify(data)));
                if (data) {
                    this.visitsOfThisWeek = data.map(e => {
                        let aItem = {...e};
                        if (e.Account && e.Account.Name) aItem.AccountName = e.Account.Name;
                        aItem.DayOfWeek = new Date(e.StartDateTime).getDay();
                        aItem.VisitTime = new Date(e.StartDateTime).getHours() + ':' + this.padTo2Digits(new Date(e.StartDateTime).getMinutes())
                        if (e.Owner && e.Owner.Name) aItem.Representative = e.Owner.Name;
                        console.log('loadData aItem: ', aItem);

                        aItem.MMLinkLabel = (e.Meeting_Minutes_ID__c  ? 'View' : 'Create');
                        //aItem.MMLink = e.Meeting_Minutes_ID__c ? ('/lightning/r/Meeting_Minutes__c/'+e.Meeting_Minutes_ID__c+'/view') : ('/apex/MeetingMinutes?eid='+e.Id);
                        aItem.MMLink = e.Meeting_Minutes_ID__c ? ('/lightning/n/MMNavi?c__recordId='+e.Id) : ('/lightning/n/MMNavi?c__recordId='+e.Id);

                        return aItem;
                    });
                    console.log('loadData visitsOfThisWeek', this.visitsOfThisWeek);
                }
                this.showVisits = this.visitsOfThisWeek;
                if (this.showVisits.length === 0) this.displayTextMessage = 'Nem található látogatás a megadott hétre a kiválasztott felhasználóhoz!'

                this.initDaysOfWeek();
                this.isLoading = false;
            })
            .catch(getVisitsOfSelectedWeekError => {
                console.log('getVisitsOfSelectedWeekError: ', getVisitsOfSelectedWeekError)
            })
        this.isLoading = false;
    }


    padTo2Digits(num) {
        return String(num).padStart(2, '0');
    }


    initDaysOfWeek() {


        // this.daysOfWeek = [
        //     {dayName: TP_Hetfo, dayIndex: 1, hasVisits: false, visits: [], mapMarkers: [], zoomLevel: this.mapOptions.zoomLevel},
        //     {dayName: TP_Kedd, dayIndex: 2, hasVisits: false, visits: [], mapMarkers: [], zoomLevel: this.mapOptions.zoomLevel},
        //     {dayName: TP_Szerda, dayIndex: 3, hasVisits: false, visits: [], mapMarkers: [], zoomLevel: this.mapOptions.zoomLevel},
        //     {dayName: TP_Csutortok, dayIndex: 4, hasVisits: false, visits: [], mapMarkers: [], zoomLevel: this.mapOptions.zoomLevel},
        //     {dayName: TP_Pentek, dayIndex: 5, hasVisits: false, visits: [], mapMarkers: [], zoomLevel: this.mapOptions.zoomLevel},
        // ]
        this.daysOfWeek = [
            {dayName: 'Monday', dayIndex: 1, hasVisits: false, visits: [], mapMarkers: [], },
            {dayName: 'Tuesday', dayIndex: 2, hasVisits: false, visits: [], mapMarkers: [], },
            {dayName: 'Wednesday', dayIndex: 3, hasVisits: false, visits: [], mapMarkers: [], },
            {dayName: 'Thursday', dayIndex: 4, hasVisits: false, visits: [], mapMarkers: [], },
            {dayName: 'Friday', dayIndex: 5, hasVisits: false, visits: [], mapMarkers: [], },
        ]
        console.log('daysOfWeek: ', this.daysOfWeek)
        console.log('showVisits: ', this.showVisits)
        for (let index in this.showVisits) {
            let currentVisit = this.showVisits[index];
            if (currentVisit.DayOfWeek > 5) continue; //skip saturday and sunday events
            let dayOfVisit = this.daysOfWeek[(currentVisit.DayOfWeek) - 1];
            dayOfVisit.visits.push(currentVisit);

            let currentAccount = currentVisit.Account;
            if (currentAccount!=null) {
                console.log('currentAccount: ', currentAccount);
                let currentEventLocation = {
                    location: {
                        City: currentAccount.BillingAddress && currentAccount.BillingAddress.city && currentAccount.BillingAddress.city.length > 0 ? currentAccount.BillingAddress.city : null,
                        Country: currentAccount.BillingAddress && currentAccount.BillingAddress.country && currentAccount.BillingAddress.country.length > 0 ? currentAccount.BillingAddress.country : null,
                        PostalCode: currentAccount.BillingAddress && currentAccount.BillingAddress.postalcode ? currentAccount.BillingAddress.postalcode : null,
                        Street: currentAccount.BillingAddress && currentAccount.BillingAddress.street && currentAccount.BillingAddress.street.length > 0 ? currentAccount.BillingAddress.street : null,
                    },
                    title: currentAccount.Name,
                    value: currentAccount.Id
                };
                dayOfVisit.mapMarkers.push(currentEventLocation);
                dayOfVisit.hasVisits = true;
            }
        }

        this.daysOfWeek.forEach(day => {
            if (day.mapMarkers.length === 1) {
                day.zoomLevel = this.singleZoomLevel;
                day.mapMarkers[0].zoomLevel = this.singleZoomLevel; // Set a fixed zoom level of 9 for single markers
            }
        });

        console.log('daysOfWeek: ', this.daysOfWeek);

        // let cloneOfDaysOfWeek = [
        //     {dayName: TP_Hetfo, dayIndex: 1, hasVisits: false, visits: [], mapMarkers: [],},
        //     {dayName: TP_Kedd, dayIndex: 2, hasVisits: false, visits: [], mapMarkers: [],},
        //     {dayName: TP_Szerda, dayIndex: 3, hasVisits: false, visits: [], mapMarkers: [],},
        //     {dayName: TP_Csutortok, dayIndex: 4, hasVisits: false, visits: [], mapMarkers: [],},
        //     {dayName: TP_Pentek, dayIndex: 5, hasVisits: false, visits: [], mapMarkers: [],},
        // ]
        let cloneOfDaysOfWeek = [
            {dayName: 'Monday', dayIndex: 1, hasVisits: false, visits: [],},
            {dayName: 'Tuesday', dayIndex: 2, hasVisits: false, visits: [],},
            {dayName: 'Wednesday', dayIndex: 3, hasVisits: false, visits: [],},
            {dayName: 'Thursday', dayIndex: 4, hasVisits: false, visits: [],},
            {dayName: 'Friday', dayIndex: 5, hasVisits: false, visits: [],},
        ]
        console.log('cloneOfDaysOfWeek: ', cloneOfDaysOfWeek)
        //console.log(this.showVisits)
        for (let index in this.showVisits) {
            let currentVisit = this.showVisits[index];
            if (currentVisit.DayOfWeek > 5) continue; //skip saturday and sunday events
            let dayOfVisit = cloneOfDaysOfWeek[(currentVisit.DayOfWeek) - 1];
            dayOfVisit.visits.push(currentVisit);

            let currentAccount = currentVisit.Account;
            console.log('currentAccount: ', currentAccount);

            if (currentAccount) {
                let currentEventLocation = {
                    location: {
                        City: currentAccount.ShippingAddress && currentAccount.ShippingAddress.city && currentAccount.ShippingAddress.city.length > 0 ? currentAccount.ShippingAddress.city : (currentAccount.BillingAddress && currentAccount.BillingAddress.city && currentAccount.BillingAddress.city.length > 0 ? currentAccount.BillingAddress.city : null),
                        Country: currentAccount.ShippingAddress && currentAccount.ShippingAddress.country && currentAccount.ShippingAddress.country.length > 0 ? currentAccount.ShippingAddress.country : (currentAccount.BillingAddress && currentAccount.BillingAddress.country && currentAccount.BillingAddress.country.length > 0 ? currentAccount.BillingAddress.country : null),
                        PostalCode: currentAccount.ShippingAddress && currentAccount.ShippingAddress.postalcode ? currentAccount.ShippingAddress.postalcode : (currentAccount.BillingAddress && currentAccount.BillingAddress.postalcode ? currentAccount.BillingAddress.postalcode : null),
                        Street: currentAccount.ShippingAddress && currentAccount.ShippingAddress.street && currentAccount.ShippingAddress.street.length > 0 ? currentAccount.ShippingAddress.street : (currentAccount.BillingAddress && currentAccount.BillingAddress.street && currentAccount.BillingAddress.street.length > 0 ? currentAccount.BillingAddress.street : null),
                    },
                    title: currentAccount.Name,
                    value: currentAccount.Id
                };
                console.log('currentEventLocation: ', currentEventLocation);

                if (currentAccount.ShippingAddress) {
                    console.log('currentAccount.ShippingAddress', currentAccount.ShippingAddress);
                    if (!dayOfVisit.mapMarkers) dayOfVisit.mapMarkers = [];
                    dayOfVisit.mapMarkers.push(currentEventLocation);
                } else if (currentAccount.BillingAddress) {
                    console.log('currentAccount.BillingAddress', currentAccount.BillingAddress);
                    if (!dayOfVisit.mapMarkers) dayOfVisit.mapMarkers = [];
                    dayOfVisit.mapMarkers.push(currentEventLocation);
                }
                console.log('dayOfVisit.mapMarkers', dayOfVisit.mapMarkers);
                dayOfVisit.hasVisits = true;
            }
        }

        cloneOfDaysOfWeek.forEach(day => {
            if (day.mapMarkers && day.mapMarkers.length === 1) {
                day.zoomLevel = this.singleZoomLevel;
                day.mapMarkers[0].zoomLevel = this.singleZoomLevel; // Set a fixed zoom level of 9 for single markers
            }
        });

        console.log('cloneOfDaysOfWeek: ', cloneOfDaysOfWeek);

        this.daysOfWeek = [...cloneOfDaysOfWeek];
    }

    handleRowAction(event) {
        console.log('handleRowAction event.detail:', JSON.stringify(event.detail));

        const actionName = event.detail.action.name;
        const row = event.detail.row;

        switch (actionName) {
            case 'view_mm':
                if (row.Meeting_Minutes_ID__c) {
                    this.navigateToRecord(row.Meeting_Minutes_ID__c);
                } else {
                    const evt = new ShowToastEvent({
                        title: 'Figyelmeztetés',
                        message: 'Ehhez az eseményhez nem tartozik Meeting Minutes!',
                        variant: 'warning',
                    });
                    this.dispatchEvent(evt);
                }
                break;
            case 'new_mm':
                this.handleNewMM(event);
                break;
            default:
                break;
        }
    }

    navigateToRecord(recordId) {
        console.log('navigateToRecord recordId: ', recordId);

        if (recordId==undefined || recordId==null || recordId=='') {

        }
        else {
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: recordId,
                    actionName: 'view'
                }
            });
        }
    }

    handleNewMM(event) {
        // Meeting_Minutes_letrehozasa_eventrol
        console.log('handleNewMM event.detail:', JSON.stringify(event.detail));

        const inputVariables = [
            {
                name: 'recordId', // API name of the input variable in the flow
                type: 'String',
                value: event.detail.row.Id
            },

        ];
        console.log('handleNewMM inputVariables: ', inputVariables);

        const formUrl = '/apex/MeetingMinutes?eid='+event.detail.row.Id;
        //const formUrl = '/flow/Meeting_Minutes_letrehozasa_eventrol?recordId='+event.detail.row.Id;
        console.log('handleNewMM formUrl: ', formUrl);
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: formUrl
            }
        });
    }

    isButtonDisabled(row) {
        console.log('isButtonDisabled row: ', row);

        return !row.Meeting_Minutes_ID__c; // Return true if the Meeting_Minutes_ID__c is null or empty
    }


    get noVisitsForFilter() {
        return this.showVisits.length == 0;
    }

    handleOwnerChange(event) {
        this.selectedOwner = event.target.value;
        //console.log(this.selectedOwner)
    }


    async handleListItems() {
        await this.loadData();
    }

    handleDateChange(event) {
        this.changeDate(event.detail.value);
    }

    changeDate(newDate) {
        this.selectedDate = newDate;
        this.startOfSelectedWeek = this.getStartOfWeek(this.selectedDate);
        this.selectedDate = this.startOfSelectedWeek;
        //console.log(this.selectedDate);
    }

    getStartOfWeek(date) {
        for (let i = 0; i < 7; i++) {
            let dateString = new Date(date);
            let currentDate = new Date(dateString.getTime() - i * 24 * 60 * 60 * 1000);
            if (currentDate.getDay() == 1) {
                this.endOfSelectedWeek = (new Date(dateString.getTime() - (i - 6) * 24 * 60 * 60 * 1000)).toISOString().substr(0, 10)
                return currentDate.toISOString().substr(0, 10);
            }
        }
    }

    addDays(date, num) {
        let oldDate = new Date(date);
        return (new Date(oldDate.getTime() + num * 24 * 60 * 60 * 1000)).toISOString().substr(0, 10);
    }

    get isListButtonDisabled() {
        return this.selectedOwner == null || this.startOfSelectedWeek == null;
    }

// Calculate the zoom level based on the number of markers
    getZoomLevel(day) {
        // Check if there is exactly one marker
        if (day.mapMarkers && day.mapMarkers.length === 1) {
            return 9; // Set the fixed zoom level for one marker
        } else {
            // Return the default zoom level when there are more than one marker
            return this.mapOptions.zoomLevel || 9; // Use the default zoom level from mapOptions, or 9 if not provided
        }
    }
}