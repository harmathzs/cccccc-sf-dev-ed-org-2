/**
 * Created by Attila Nemeth @AttentionCRM on 23/08/22.
 */

import {track, api, wire} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import LightningModal from 'lightning/modal';
import getEvents from '@salesforce/apex/StoreVisitTripPlannerController.getEventsOfUser';
import upsertEventsRequest from '@salesforce/apex/StoreVisitTripPlannerController.upsertEvents';
import getPickListValues from '@salesforce/apex/StoreVisitTripPlannerController.getPickListValues';
import SUBJECT_FIELD from "@salesforce/schema/Event.Subject";

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
import LightningConfirm from "lightning/confirm";
import LightningAlert from "lightning/alert";

export default class TripPlannerEventEditorPopup extends LightningModal {
    @api days;
    @api startOfSelectedWeek;

    @track dayEvents = [];
    @track visitTypeOptions = [];
//    visitTypeOptions = [
//        {label : 'Normál látogatás', value : 'normal'},
//        {label : 'Speciális látogatás', value : 'special'}
//        {label : 'Normál látogatás', value : 'normal'},
//        {label : 'Speciális látogatás', value : 'special'}
//        {label : 'Normál látogatás', value : 'normal'},
//        {label : 'Speciális látogatás', value : 'special'}
//
//    ]

    @track selectedAccountIds = [];
    selectedVisitType;

    needToastWhenCut = false;

    label2 = {
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
    };

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

    async connectedCallback() {
        this.addEventListener('action', this.handleEvent16ConfirmAction);

        this.dayEvents = JSON.parse(JSON.stringify(this.days));
        //console.log(this.dayEvents)
        for (let day of this.dayEvents) {
            for (let account of day.accounts) {
                account.specialEvent = account.Id ? false : true;
            }
        }
        this.visitTypeOptions = await getPickListValues({SObjectName: 'Event', FieldName: 'Subject'});
        if (this.visitTypeOptions.length > 0) {
            this.selectedVisitType = this.visitTypeOptions[0].value;
        }
        //console.log(this.visitTypeOptions);

        getEvents({weekStart: this.getStartOfWeek(new Date(Date.now()))})
            .then(reQueriedEvents => {
                //console.log('reQueriedEvents', reQueriedEvents);

                // load Event.Subject to account.visitType:
                for (let reQueriedEvent of reQueriedEvents) {
                    let prevVisitType = reQueriedEvent.Subject;
                    for (let day of this.dayEvents) {
                        for (let account of day.accounts) {
                            if (account.EventId != null && account.EventId == reQueriedEvent.Id) {
                                account.visitType = prevVisitType;
                            }
                        }
                    }
                }
                this.dayEvents = [...this.dayEvents];

                //console.log('TripPlannerEventEditorPopup end of connectedCallback days', JSON.parse(JSON.stringify(this.dayEvents)));
            })
            .catch(rejectedReason => {
                console.error('connectedCallback getEvents rejectedReason', rejectedReason);
            })
        ;


    }

    handleVisitTypeChange(event) {
        this.selectedVisitType = event.detail.value;
    }

    handleSetType() {
        this.changeSelectedAccountSubtypes();
    }

    handleSelect(event) {
        let checked = event.target.checked
        //console.log('handleSelect checked', checked);
        let accountRandomId = event.target.dataset.accountId;
        //console.log('handleSelect accountRandomId', accountRandomId);
        if (checked) {
            this.selectedAccountIds.push(accountRandomId)
        } else {
            var index = this.selectedAccountIds.indexOf(accountRandomId);
            if (index !== -1) {
                this.selectedAccountIds.splice(index, 1);
            }
        }
    }

    changeSelectedAccountSubtypes() {
        //console.log(this.selectedAccountIds);
        for (let randomId of this.selectedAccountIds) {
            //console.log(randomId);
            for (let day of this.dayEvents) {
                //console.log(JSON.stringify(day));
                for (let account of day.accounts) {
                    //console.log('account', account);
                    //console.log(randomId);
                    //console.log(account.randomId);
                    //console.log(account.randomId == randomId);
                    if (account.randomId == randomId) {
                        //console.log('match')
                        //ide majd a látogatás típus mező
                        try {
                            account.visitType = this.selectedVisitType;
                            account.Subject = this.selectedVisitType;
                        } catch (error) {
                            console.error(error)
                        }
                        //console.log('account with visittype', account);
                    }
                }
//                day.accounts = [...day.accounts];
            }
        }
        //console.log('asd')
        this.removeCheckboxes();
        this.dayEvents = [...this.dayEvents];
        //this.days = [...this.dayEvents];
    }

    removeCheckboxes() {
        this.selectedAccountIds = [];
        this.template.querySelectorAll('input').forEach(element => {
            if (element.type === 'checkbox') {
                element.checked = false;
            }
        });
        //console.log(this.selectedAccountIds);
    }

    setCookie(name, value) {
        const expirationDate = new Date('Thu, 01 Jan 2099 00:00:00 UTC');
        document.cookie = `;${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
        console.log('document.cookie: ', document.cookie);
    }

    async handlePlanWeek() {
        console.log('handlePlanWeek start; dayEvents: ', JSON.parse(JSON.stringify(this.dayEvents)));

        //let cutEventsCountDownto16 = false;
        let maxDailyEventsCount = 0;
        for (let day of this.dayEvents) {
            if (day.visitCount > maxDailyEventsCount) {
                maxDailyEventsCount = day.visitCount;
            }
        }
        if (maxDailyEventsCount > 16) {
            this.needToastWhenCut = true;
            /*const confirmResult = await LightningConfirm.open({
                label: '16+/nap?',
                message: 'Túl sok látogatás egy napra. Levághatjuk max. 16-ra?',
            });
            if (confirmResult===true) {*/
            for (let dayIdx in this.dayEvents) {
                this.dayEvents[dayIdx].accounts = this.dayEvents[dayIdx].accounts.slice(0, 16);
                if (this.dayEvents[dayIdx].visitCount != null && this.dayEvents[dayIdx].visitCount > 16) {
                    this.dayEvents[dayIdx].visitCount = 16;
                }
            }
            /*} else {
                // false
            }*/

            console.log('handlePlanWeek dayEvents: ', JSON.parse(JSON.stringify(this.dayEvents)));

            await LightningAlert.open({
                label: 'Figyelmeztetés',
                message: 'Túl sok látogatás egy napra, az első 16 kerül betervezésre!',
            });

            // child -> cookie -> parent -> toast after reload
            this.setCookie('cutToast', 'true');
            console.log('handlePlanWeek cookies: ', document.cookie);

            await this.upsertEvents();

            console.log('handlePlanWeek end - but after location.reload()!');
        } else {
            this.needToastWhenCut = false;

            console.log('handlePlanWeek dayEvents: ', JSON.parse(JSON.stringify(this.dayEvents)));

            await this.upsertEvents();

            console.log('handlePlanWeek end - but after location.reload()!');
        }
    }

    async handleEvent16ConfirmAction(event) {
        const action = event.detail.action;
        if (action.name === 'yes') {
            for (let dayIdx in this.dayEvents) {
                this.dayEvents[dayIdx].accounts = this.dayEvents[dayIdx].accounts.slice(0, 16);
                if (this.dayEvents[dayIdx].visitCount != null && this.dayEvents[dayIdx].visitCount > 16) {
                    this.dayEvents[dayIdx].visitCount = 16;
                }
            }
        } else {
            // no
        }

        console.log('handleEvent16ConfirmAction dayEvents: ', JSON.parse(JSON.stringify(this.dayEvents)));

        await this.upsertEvents();

        console.log('handleEvent16ConfirmAction end - but after location.reload()!');
    }

    handleBack() {
        this.close();
    }

    async upsertEvents() {
        console.log('upsertEvents dayEvents', JSON.parse(JSON.stringify(this.dayEvents)));
        let upsertedEvents = await upsertEventsRequest({
            jsonString: JSON.stringify(this.dayEvents),
            startOfSelectedWeek: this.startOfSelectedWeek
        });
        // ! DO NOT START week from Sunday!!
        console.log('upsertEvents upsertedEvents', upsertedEvents);

        //
        location.reload();
    }
}