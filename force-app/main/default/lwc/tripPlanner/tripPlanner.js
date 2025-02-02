/**
 * Created by Attila Nemeth @AttentionCRM on 23/08/15.
 */

import {LightningElement, track} from 'lwc';
//import LightningConfirm from 'lightning/confirm';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
//import FORM_FACTOR from '@salesforce/client/formFactor';
//import {NavigationMixin, CurrentPageReference} from "lightning/navigation";
import TripPlannerEventEditorPopup from 'c/tripPlannerEventEditorPopup';

import measureDistances from '@salesforce/apex/SchedulableTripPlannerMeasureDistances.lwc_measureDistances';
import getFilteredAccounts from '@salesforce/apex/StoreVisitTripPlannerController.getFilteredAccounts';

//import getLimitQueryRows from '@salesforce/apex/StoreVisitTripPlannerController.getLimitQueryRows';
//import getQueryRows from '@salesforce/apex/StoreVisitTripPlannerController.getQueryRows';
// import getLatogatastervezoValtozoiMdt
//     from '@salesforce/apex/StoreVisitTripPlannerController.getLatogatastervezoValtozoiMdt';
// import getNagyAjanlattalRendelkezoVevok
//     from '@salesforce/apex/StoreVisitTripPlannerController.getNagyAjanlattalRendelkezoVevok';
// import getAccountsWithOpenTask from '@salesforce/apex/StoreVisitTripPlannerController.getAccountsWithOpenTask';
// import getInactiveAccounts from '@salesforce/apex/StoreVisitTripPlannerController.getInactiveAccounts';
import getAllTypes from '@salesforce/apex/StoreVisitTripPlannerController.getAllTypes';
import getMoneybagAccounts from '@salesforce/apex/StoreVisitTripPlannerController.getMoneybagAccounts';
import getFlagAccounts from '@salesforce/apex/StoreVisitTripPlannerController.getFlagAccounts';
// import getVisszaesettVevok from '@salesforce/apex/StoreVisitTripPlannerController.getVisszaesettVevok';
// import getAccountsWithLeadStatus from '@salesforce/apex/StoreVisitTripPlannerController.getAccountsWithLeadStatus';
// import getAccountsWithNyitottPotencialMagas
//     from '@salesforce/apex/StoreVisitTripPlannerController.getAccountsWithNyitottPotencialMagas';
// import getAllHandlingGroupNarrowestLevels
//     from '@salesforce/apex/StoreVisitTripPlannerController.getAllHandlingGroupNarrowestLevels';
// import getAccountsByHandlingGroupNarrowestLevels
//     from '@salesforce/apex/StoreVisitTripPlannerController.getAccountsByHandlingGroupNarrowestLevels';
// import getAccountIdsByHandlingGroupNarrowestLevels
//     from '@salesforce/apex/StoreVisitTripPlannerController.getAccountIdsByHandlingGroupNarrowestLevels';
// import getAllSalesGroupsSorted from '@salesforce/apex/StoreVisitTripPlannerController.getAllSalesGroupsSorted';
// import getAllASCGroups from '@salesforce/apex/StoreVisitTripPlannerController.getAllASCGroups';
// import getAccountsBySalesGroups from '@salesforce/apex/StoreVisitTripPlannerController.getAccountsBySalesGroups';
// import getAccountsBySalesGroupsWithAPInames
//     from '@salesforce/apex/StoreVisitTripPlannerController.getAccountsBySalesGroupsWithAPInames';
// import getAccountsByASCGroups from '@salesforce/apex/StoreVisitTripPlannerController.getAccountsByASCGroups';
// import regionValueLabelPairs from '@salesforce/apex/StoreVisitTripPlannerController.regionValueLabelPairs';
// import getAccountsByRegions from '@salesforce/apex/StoreVisitTripPlannerController.getAccountsByRegions';
// import getAccountsWithLastMMinutesBefore
//     from '@salesforce/apex/StoreVisitTripPlannerController.getAccountsWithLastMMinutesBefore';
import getAccount from '@salesforce/apex/StoreVisitTripPlannerController.getAccount';
// import getErintettAccounts from '@salesforce/apex/StoreVisitTripPlannerController.getErintettAccounts';
// import getErintettAccountsOf from '@salesforce/apex/StoreVisitTripPlannerController.getErintettAccountsOf';
import countOfAccounts from '@salesforce/apex/StoreVisitTripPlannerController.countOfAccounts';
import getAccountName from '@salesforce/apex/StoreVisitTripPlannerController.getAccountName';
import getResponse from '@salesforce/apex/StoreVisitTripPlannerController.getResponse';
//import getUserInfo from '@salesforce/apex/StoreVisitTripPlannerController.getUserInfo';
import loadSelectedAccountId from '@salesforce/apex/StoreVisitTripPlannerController.loadSelectedAccountId';
import getCachedDistances from '@salesforce/apex/StoreVisitTripPlannerController.getCachedDistances';
import getNotCachedDistances from '@salesforce/apex/StoreVisitTripPlannerController.getNotCachedDistances';
//import createEventsRequest from '@salesforce/apex/StoreVisitTripPlannerController.createEvents';
import upsertEventsRequest from '@salesforce/apex/StoreVisitTripPlannerController.upsertEvents';
import deleteAllEvents from '@salesforce/apex/StoreVisitTripPlannerController.deleteAllEvents';
//import getDistanceFrom from '@salesforce/apex/StoreVisitTripPlannerController.getDistanceFrom';
import getEvents from '@salesforce/apex/StoreVisitTripPlannerController.getEventsOfUser';
import {log} from "lightning/logger";
// import getAllRegions from '@salesforce/apex/StoreVisitTripPlannerController.getAllRegions'

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

// import TP_Bratislava from '@salesforce/label/c.TP_Bratislava';
// import TP_Budapest from '@salesforce/label/c.TP_Budapest';
// import TP_Debrecen from '@salesforce/label/c.TP_Debrecen';
// import TP_Export from '@salesforce/label/c.TP_Export';
// import TP_Gyor from '@salesforce/label/c.TP_Gyor';
// import TP_Gonyu from '@salesforce/label/c.TP_Gonyu';
// import TP_Kosice from '@salesforce/label/c.TP_Kosice';
// import TP_Martin from '@salesforce/label/c.TP_Martin';
// import TP_Miskolc from '@salesforce/label/c.TP_Miskolc';
// import TP_Nove_Zamky from '@salesforce/label/c.TP_Nove_Zamky';
// import TP_Pecs from '@salesforce/label/c.TP_Pecs';
// import TP_Szeged from '@salesforce/label/c.TP_Szeged';
// import TP_Zalaegerszeg from '@salesforce/label/c.TP_Zalaegerszeg';
// import TP_Utolso_latogatas_korabbi_mint from '@salesforce/label/c.TP_Utolso_latogatas_korabbi_mint';
// import TP_Utolso from '@salesforce/label/c.TP_Utolso';
//
// import TP_Nap from '@salesforce/label/c.TP_Nap';
// import TP_Het from '@salesforce/label/c.TP_Het';
// import TP_Honap from '@salesforce/label/c.TP_Honap';
// import TP_Ev from '@salesforce/label/c.TP_Ev';
//
// import TP_Ugyfel_kategoria from '@salesforce/label/c.TP_Ugyfel_kategoria';
// import TP_visszaesett from '@salesforce/label/c.TP_visszaesett';
// import TP_Inaktiv from '@salesforce/label/c.TP_Inaktiv';
// import TP_Magas_Nyitott_Potencial from '@salesforce/label/c.TP_Magas_Nyitott_Potencial';
// import TP_Nyitott_feladattal_rendelkezo_ugyfel from '@salesforce/label/c.TP_Nyitott_feladattal_rendelkezo_ugyfel';
// import TP_Potencialis_vevo from '@salesforce/label/c.TP_Potencialis_vevo';
// import TP_Felelos from '@salesforce/label/c.TP_Felelos';
// import TP_Sajat from '@salesforce/label/c.TP_Sajat';
// import TP_Osszes from '@salesforce/label/c.TP_Osszes';
// import TP_Datum from '@salesforce/label/c.TP_Datum';
// import TP_Szoveg from '@salesforce/label/c.TP_Szoveg';
//
// import TP_Tul_sok_ugyfel from '@salesforce/label/c.TP_Tul_sok_ugyfel';
//
// import TP_No_geolocation_available from '@salesforce/label/c.TP_No_geolocation_available';
//
// import MM_Button_Close from '@salesforce/label/c.MM_Button_Close';
//import {log} from "lightning/logger";


const dayNames = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
];
//
const eventTypes = {
    'Other': 0,
    'Past': 1,
    'Current': 2,
    'Future': 3,
    'Meeting': 4,
};

const {userAgent} = navigator;

export default class TripPlanner2 extends LightningElement {
    @track globalSpinner = false;
    @track filteredSpinner = false;

    latogatastervezoValtozoi;

    get formattedHighestValueOfQuotesFt() {
        if (this.latogatastervezoValtozoi.Highest_value_of_quotes_HUF && this.latogatastervezoValtozoi.Highest_value_of_quotes_HUF.Hatarertek__c) {
            return this.latogatastervezoValtozoi.Highest_value_of_quotes_HUF.Hatarertek__c.toLocaleString('hu-HU', {
                style: 'currency',
                currency: 'HUF'
            });
        }
        return null;
    }

    get formattedPreviousFinancialYearGrossBaseMarginHU() {
        if (this.latogatastervezoValtozoi.PreviousFinancialYearGrossBaseMarginHU && this.latogatastervezoValtozoi.PreviousFinancialYearGrossBaseMarginHU.Hatarertek__c) {
            return this.latogatastervezoValtozoi.PreviousFinancialYearGrossBaseMarginHU.Hatarertek__c.toLocaleString('hu-HU', {
                style: 'currency',
                currency: 'HUF'
            });
        }
        return null;
    }

    get formattedNyitottFtPotencial() {
        if (this.latogatastervezoValtozoi.Nyitott_Ft_potencial && this.latogatastervezoValtozoi.Nyitott_Ft_potencial.Hatarertek__c) {
            return this.latogatastervezoValtozoi.Nyitott_Ft_potencial.Hatarertek__c.toLocaleString('hu-HU', {
                style: 'currency',
                currency: 'HUF'
            });
        }
        return null;
    }

    get formattedNyitottFtPotencialPerOsszFtPotencialX100From100() {
        if (this.latogatastervezoValtozoi.Nyitott_Ft_potencial_Ossz_Ft_potencial && this.latogatastervezoValtozoi.Nyitott_Ft_potencial_Ossz_Ft_potencial.Hatarertek__c) {
            return 100 - (this.latogatastervezoValtozoi.Nyitott_Ft_potencial_Ossz_Ft_potencial.Hatarertek__c * 100);
        }
        return null;
    }

    get cachedDistanceMeasureMdt() {
/*        if (this.latogatastervezoValtozoi.Trip_planner_Distances_Cache_Mode_var && this.latogatastervezoValtozoi.Trip_planner_Distances_Cache_Mode_var.Trip_planner_Distances_Cache_Mode__c) {
            return this.latogatastervezoValtozoi.Trip_planner_Distances_Cache_Mode_var.Trip_planner_Distances_Cache_Mode__c;
        }*/

        return 'no cache';
        //return null;
    }

    // @wire(regionValueLabelPairs) regionValueLabelPairs;
    regionValueLabelPairs = null;

    @track typesOptions = [];
    selectedAccType;

    @track cityFilterOptions = [];
    @track regionOptions = [];
    @track handlingGroupNarrowestLevelOptions = [];
    @track salesGroupOptions = [];
    @track ASCGroupOptions = [];
    //allAccounts = [];
    @track filteredAccounts;
    pivotSelectedAccount;

    sliderMin = 10;
    sliderStep = 4;
    sliderMax = 40;
    tooManyAccountsLimit = this.sliderMax;

    //visibleAccountsLimit = 1200;

    get areTooManyAccounts() {
        return this.filteredAccounts && this.filteredAccounts != null && this.filteredAccounts.length > this.tooManyAccountsLimit;
    }

    @track filteredAccountsRealLength = 1;

    get filteredAccountsLength() {
        if (!this.filteredAccounts) {
            return 0;
        }
        if (this.filteredAccounts == null) {
            return 0;
        }

        return +this.filteredAccounts.length;
    }

    countOfAllAccounts = 0;
    countOfOwnAccounts = 0;

    get countOfAllRelatedAccounts() {
        if (this.selectedOwner === 'own') {
            return /*+3*/ +this.countOfOwnAccounts; // +3 nincs mert nem kell a szürkéket számolni
        }
        return /*+3*/ +this.countOfAllAccounts; // +3 nincs mert nem kell a szürkéket számolni
    }

    //account category id arrays
    moneybagAccountIds = [];
    flagAccountIds = [];
    fallbackAccountIds = [];          //visszaesett vevők
    openTaskAccountIds = [];
    inactiveAccountIds = [];
    hugeProposalAccountIds = [];     //nagy ajánlattal rendelkező
    highOpenPotentialAccountIds = []; //nyitott potentciál magas
    leadStatusAccountIds = [];

    //telepre szűrt id map
    regionsToAccountIdsMap = null;

    selectedAccountId;
    @track selectedAccountName;

    @track days = [];
    @track mapMarkers;
    @track userLocation;

    data;
    showMapModal = false;
    showDeleteAllDialog = false;
    showCreateEventsDialog = false;
    sortByDistance = false;
    distancesJSON = null;
    distancesCached = null;

    @track showIconInfoModal = false;

    showAllAccounts = true;
    //currentUser;
    //currentApp;
    selectedCity;
    searchWord = '';


    dayAccounts = [];
    @track weekEvents = [];

    selectedDate;
    @track selectedRegions = [];
    @track selectedHandlingGroupNarrowestLevels = [];
    allSalesGroups = [];
    allASCGroups = [];
    @track selectedSalesGroups = [];
    @track selectedASCGroups = [];
    selectedOwner = 'own';
    startOfSelectedWeek;
    endOfSelectedWeek;
    oldDate;
    scrollMode = true;
    device;

    @track isLoading = false;

    legendVisible = false;
    isFilterBarOpen = false;
    isFooterLegendOpen = false;
    showLastVisitText = false;

    lastVisitDate = '';

    @track selectedSubType = 'Normál látogatás';

    @track selectedAccTypes = [];

    // custom labelek felsorolt objektuma
    label = {
/*        TP_Tavolsag
        , TP_Tovabb
        , TP_Kereses
        , TP_Nev_Varos
        , TP_Hetfo
        , TP_Nagy_ajanlattal_rendelkezo
        , TP_Kedd
        , TP_Szerda
        , TP_Csutortok
        , TP_Telep
        , TP_Pentek
        , TP_Filter
        , TP_Settings
        , TP_Previous_Week
        , TP_Next_Week

        , TP_Utolso_latogatas_korabbi_mint
        , TP_Utolso
        , TP_Nap
        , TP_Het
        , TP_Honap
        , TP_Ev
        , TP_Ugyfel_kategoria
        , TP_visszaesett
        , TP_Inaktiv
        , TP_Magas_Nyitott_Potencial
        , TP_Nyitott_feladattal_rendelkezo_ugyfel
        , TP_Potencialis_vevo
        , TP_Felelos
        , TP_Sajat
        , TP_Osszes
        , TP_Datum
        , TP_Szoveg,
        MM_Button_Close,

        TP_Nincs_latogatas_az_adott_napra,
        TP_Felhasznalo,
        TP_Het_kezdete,
        TP_Vissza,
        TP_Markers,
        TP_Ertekesitesi_csoport,
        TP_Info_Utolso_Latogatas_Abszolut,
        TP_Info_Utolso_Latogatas_Relativ,
        TP_Szuresek_eltavolitasa,
        TP_Esemenyek_szerkesztese,
        TP_Tipus_beallitasa,
        TP_Het_betervezese,
        TP_Cancel_and_close,
        TP_Tipus,

        TP_Tul_sok_ugyfel,*/
    };

    get typeOptions() {
        return [
            {label: 'Type1', value: 'type1'},
            {label: 'Type ez egy hosszu gyász', value: 'typelong'},
            {label: 'Type3', value: 'type3'},
        ];
    }

    get ownerOptions() {
        return [
            {label: 'Own accounts', value: 'own'},
            {label: 'All without admin`s', value: 'notadmin'},
            {label: 'All accounts including others', value: 'all'},
        ];
    }

    enteredTimeNumber = 0;
    selectedMeasure = 'day';

    get timeMeasureOptions() {
        return [
/*            {label: TP_Nap, value: 'day'},
            {label: TP_Het, value: 'week'},
            {label: TP_Honap, value: 'month'},
            {label: TP_Ev, value: 'year'},*/
        ];
    }

    otherEventTypesByLabel = {
        // homeOffice: {name: 'Otthoni munkavégzés', value: 'Home Office', active: true},
        // office: {name: 'Iroda', value: 'Office', active: true},
        // dayOff: {name: 'Szabadság', value: 'Day off', active: true},
        freeDay: {name: 'Free day', value: 'Free day', active: true},
        // opening: {name: 'Megnyitó', value: 'Opening', active: true},
        // sickLeave: {name: 'Betegszabadság', value: 'Sick Leave', active: true},
        // service: {name: 'Szerviz', value: 'Service', active: true},
    };

    @track icons = [
        {
            icon_name: 'utility:moneybag',
            display_name: 'Moneybag',
            /*display_name: TP_Nagy_ajanlattal_rendelkezo,*/
            selected: false,
            style: "border : solid;",
            legend: 'Moneybag',
        },
        {
            icon_name: 'utility:task',
            display_name: 'Open Task',
            /*display_name: TP_Nyitott_feladattal_rendelkezo_ugyfel,*/
            selected: false,
            style: "border : solid;",
            legend: 'Open Task',
        },
        {
            icon_name: 'utility:jump_to_bottom',
            display_name: 'Fallback',
            /*display_name: TP_visszaesett,*/
            selected: false,
            style: "border : solid;",
            legend: 'Fallback',
        },
        {
            icon_name: 'utility:high_velocity_sales',
            display_name: 'High potential sales',
            /*display_name: TP_Magas_Nyitott_Potencial,*/
            selected: false,
            style: "border : solid;",
            legend: 'High potential sales',
        },
        {
            icon_name: 'utility:priority',
            display_name: 'Potential priority',
            /*display_name: TP_Potencialis_vevo,*/
            selected: false,
            style: "border : solid;",
            legend: 'Potential priority',
        },
        {
            icon_name: 'utility:notification_snoozed',
            display_name: 'Inactive',
            /*display_name: TP_Inaktiv,*/
            selected: false,
            style: "border : solid;",
            legend: 'Inactive',
        },
    ];

    // async logLimitsOfThisSFTransaction(jsfuncname) {
    //     let limitQueryRows = await getLimitQueryRows();
    //     let queryRows = await getQueryRows();
    //     let logString = '' + queryRows + '/' + limitQueryRows;
    //     console.log('JS function name: ' + jsfuncname + '; SOQL Query rows USED/LIMIT in this transaction: ', logString);
    // }

    // Set a cookie with the specified name and value
    setCookie(name, value) {
        const expirationDate = new Date('Thu, 01 Jan 2099 00:00:00 UTC');
        document.cookie = `;${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
        console.log('document.cookie: ', document.cookie);
    }

    async connectedCallback() {
        this.globalSpinner = true;
        this.device = this.getDevice();
        if (this.device === 'Windows') {
            this.scrollMode = false;
        }
        //console.log('connectedCallback device', this.device);

        // Add an event listener to listen for the "selectaccount" event
        this.addEventListener("selectaccount", function (event) {
            const accountId = event.detail;
            console.log("Received selectaccount event. Account ID:", accountId);
            this.selectedAccountId = accountId;
            console.log('selectaccount selectedAccountId: ', this.selectedAccountId);
        });

        // this.loadPlatformCacheDistances(); // TODO - uncomment if cached distances would be needed

        //set starting date to the current day
        this.selectedDate = new Date().toISOString();

        // let regions = await getAllRegions();
        // this.regionOptions = this.initRegionOptions(regions);
        // console.log('connectedCallback regionOptions', JSON.stringify(this.regionOptions)

        let types = await getAllTypes();
        this.typesOptions = this.initTypesOptions(types);
        console.log('connectedCallback typesOptions', JSON.stringify(this.typesOptions));
        this.selectedAccTypes = [];

        // let handlingGroupNarrowestLevels = await getAllHandlingGroupNarrowestLevels();
        // ["Budapest","Call Center","Lemez","Megmunkálás","Miskolc","Pécs","Telep","Zalaegerszeg","Építőipar"]
        // this.handlingGroupNarrowestLevelOptions = this.initHandlingGroupNarrowestLevelOptions(handlingGroupNarrowestLevels);
        // console.log('connectedCallback handlingGroupNarrowestLevelOptions', JSON.stringify(this.handlingGroupNarrowestLevelOptions));
        //
        // this.allSalesGroups = await getAllSalesGroupsSorted();
        // this.salesGroupOptions = this.initSalesGroupOptions(this.allSalesGroups);
        //
        // this.allASCGroups = await getAllASCGroups();
        // this.ASCGroupOptions = this.initASCGroupOptions(this.allASCGroups);

        // let allAccountsByHandlingGroupNarrowestLevels = await getAccountsByHandlingGroupNarrowestLevels({handlingGroupNarrowestLevels: handlingGroupNarrowestLevels});

        //let allAccountsBySalesGroups = await getAccountsBySalesGroups({salesGroups: this.allSalesGroups});

        // this.regionValueLabelPairs = await regionValueLabelPairs();
        // console.log('connectedCallback regionValueLabelPairs', this.regionValueLabelPairs);

        this.countOfAllAccounts = await countOfAccounts({erintettVagyokE: false});
        this.countOfOwnAccounts = await countOfAccounts({erintettVagyokE: true});

        this.sliderMax = Math.round((((this.countOfAllAccounts) / 100)+1)) * 100;
        this.sliderStep = Math.round((this.sliderMax - this.sliderMin)/10);
        this.tooManyAccountsLimit = this.sliderMax;

        //load filters from apex
        await this.loadFilteredRecords();

        //get the starting date of the selected week
        this.startOfSelectedWeek = this.getStartOfWeek(this.selectedDate);
        this.oldDate = this.startOfSelectedWeek;
        //console.log('connectedCallback selectedDate', this.selectedDate);
        //console.log('connectedCallback startOfSelectedWeek', this.startOfSelectedWeek);

        //load accounts from salesforce
        //await this.loadResponse();
        this.weekEvents = await getEvents({
            weekStart: this.startOfSelectedWeek,
            erintettVagyokE: this.selectedOwner === 'own'
        });
        //console.log('connectedCallback weekEvents', JSON.parse(JSON.stringify(this.weekEvents)));
        await this.initDays();

        //await this.logLimitsOfThisSFTransaction('connectedCallback');

        this.filterAccountsNow(null);

        this.globalSpinner = false;

        // toast if got dayEvents cut
        console.log('parent connectedCallback cookies: ', document.cookie);
        if (document.cookie!=null) {
            let cutToast = false;
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Check if the cookie name matches
                if (cookie.startsWith('cutToast=')) {
                    // Extract the cookie value
                    const cookieValue = cookie.substring('cutToast='.length);
                    console.log('cutToast cookie Value:', cookieValue);
                    if (cookieValue==='true') {
                        cutToast = true;
                    }
                }
            }
            if (cutToast===true) {
                this.setCookie('cutToast', 'false');
                /*this.dispatchEvent(new ShowToastEvent({
                    variant: 'warning',
                    title: 'Figyelmeztetés',
                    message: 'Túl sok látogatás egy napra, az első 16 kerül betervezésre!',
                }));*/
            }
        }
    }

    loadPlatformCacheDistances() {
        // get platform cached distances
        // this.distancesJSON = await getCachedDistances();
        getCachedDistances()
            .then(distancesJSONouter => {
                this.distancesJSON = distancesJSONouter;
                console.log('loadPlatformCacheDistances outer distancesJSON: ', this.distancesJSON);
                if (!this.distancesJSON || (this.distancesJSON && this.distancesJSON == null) || (this.distancesJSON && this.distancesJSON === '{}')) {
                    //await measureDistances();
                    measureDistances()
                        .then(() => {
                            //this.distancesJSON = await getCachedDistances();
                            getCachedDistances()
                                .then(distancesJSONinner => {
                                    this.distancesJSON = distancesJSONinner;
                                    try {
                                        this.distancesCached = JSON.parse(this.distancesJSON);
                                    } catch (e_inner) {
                                        console.log('loadPlatformCacheDistances inner distancesCached error: ', e_inner);
                                    }
                                    console.log('loadPlatformCacheDistances inner distancesCached: ', this.distancesCached);
                                })
                                .catch(error => {
                                    console.log('loadPlatformCacheDistances inner getCachedDistances error: ', error);
                                });
                        })
                        .catch(error => {
                            console.log('loadPlatformCacheDistances measureDistances error: ', error);
                        });
                } else {
                    try {
                        this.distancesCached = JSON.parse(this.distancesJSON);
                    } catch (e_outer) {
                        console.log('loadPlatformCacheDistances outer distancesCached error: ', e_outer);
                    }
                    console.log('loadPlatformCacheDistances outer distancesCached: ', this.distancesCached);
                }
            })
            .catch(error => {
                console.log('loadPlatformCacheDistances outer getCachedDistances error: ', error);
            });
    }

    async loadFilteredRecords() {
        //this.globalSpinner = true;

        this.moneybagAccountIds = await getMoneybagAccounts();
        console.log('moneybagAccountIds: ', this.moneybagAccountIds);

        this.flagAccountIds = await getFlagAccounts();
        console.log('flagAccountIds: ', this.flagAccountIds);

        //this.hugeProposalAccountIds = await getNagyAjanlattalRendelkezoVevok({erintettVagyokE: this.selectedOwner === 'own'});
        // this.hugeProposalAccountIds = await getNagyAjanlattalRendelkezoVevok({erintettVagyokE: false});
        // console.log('hugeProposalAccountIds', this.hugeProposalAccountIds);

        //this.openTaskAccountIds = await getAccountsWithOpenTask({erintettVagyokE: this.selectedOwner === 'own'});
        // this.openTaskAccountIds = await getAccountsWithOpenTask({erintettVagyokE: false});
        // console.log('openTaskAccountIds', this.openTaskAccountIds);

        //this.fallbackAccountIds = await getVisszaesettVevok({erintettVagyokE: this.selectedOwner === 'own'});
        // this.fallbackAccountIds = await getVisszaesettVevok({erintettVagyokE: false});
        // console.log('fallbackAccountIds', this.fallbackAccountIds); // OK

        //this.highOpenPotentialAccountIds = await getAccountsWithNyitottPotencialMagas({erintettVagyokE: this.selectedOwner === 'own'});
        // this.highOpenPotentialAccountIds = await getAccountsWithNyitottPotencialMagas({erintettVagyokE: false});
        // console.log('highOpenPotentialAccountIds', this.highOpenPotentialAccountIds);

        //this.leadStatusAccountIds = await getAccountsWithLeadStatus({erintettVagyokE: this.selectedOwner === 'own'});
        // this.leadStatusAccountIds = await getAccountsWithLeadStatus({erintettVagyokE: false});
        // console.log('leadStatusAccountIds', this.leadStatusAccountIds);

        //this.inactiveAccountIds = await getInactiveAccounts({erintettVagyokE: this.selectedOwner === 'own'});
        // this.inactiveAccountIds = await getInactiveAccounts({erintettVagyokE: false});
        // console.log('inactiveAccountIds', this.inactiveAccountIds);

        // this.latogatastervezoValtozoi = await getLatogatastervezoValtozoiMdt();
        // console.log('latogatastervezoValtozoi: ', this.latogatastervezoValtozoi);

        //await this.logLimitsOfThisSFTransaction('loadFilteredRecords');

        //this.globalSpinner = false;
    }

    renderedCallback() {
        this.filterSidebar = this.template.querySelector("filterSidebar");
        this.plannerInner = this.template.querySelector("plannerInner");
    }

//    displayDistances(event) {
//        this.data.accounts.forEach(account => {
//            account.style = account.style.replace('filter: brightness(120%);', '');
//        })
//
//        const accountId = event.detail;
//        let pivotAccount = this.data.accounts.find(element => element.Id == accountId);
//        pivotAccount.style += "filter: brightness(120%);";
//        pivotAccount.distanceFromCurrent = 0;
//
//        getDistanceFrom({accountId: accountId, getAllAccounts: this.showAllAccounts}).then(data => {
//
//            for (let key in data) {
//                this.data.accounts.forEach(account => {
//                    if (account.Id == key) {
//                        account.distanceFromCurrent = data[key];
//                    }
//                })
//            }
//
//            this.filteredAccounts = [...this.filteredAccounts];
//            this.days.forEach(day => day.accounts = [...day.accounts]);
//            this.sortByDistance = true;
//            this.sortAccounts();
//        });
//    }

    //get event subtype options for visits
    get subTypeOptions() {
        return [
            {label: 'Normál látogatás', value: 'Normál látogatás'},
            {label: 'Akvizíció-Integráció', value: 'Akvizíció-Integráció'},
            {label: 'Refit-Refresh', value: 'Refit-Refresh'},
        ];
    }

    initRegionOptions(regions) {
        let regionOptionsToReturn = [];
        for (let region of regions) {
            let currentRegion = {label: region, value: region};
            regionOptionsToReturn.push(currentRegion);
        }
        return regionOptionsToReturn;
    }

    initHandlingGroupNarrowestLevelOptions(handlingGroupNarrowestLevels) {
        let handlingGroupNarrowestLevelOptionsToReturn = [];
        for (let handlingGroupNarrowestLevel of handlingGroupNarrowestLevels) {
            let currentHandlingGroupNarrowestLevel = {
                label: handlingGroupNarrowestLevel,
                value: handlingGroupNarrowestLevel
            };
            handlingGroupNarrowestLevelOptionsToReturn.push(currentHandlingGroupNarrowestLevel);
        }
        return handlingGroupNarrowestLevelOptionsToReturn;
    }

    initTypesOptions(types) {
        let typesOptionsToReturn = [];
        for (let type of types) {
            let currentType = {
                label: type,
                value: type
            };
            typesOptionsToReturn.push(currentType);
        }
        return typesOptionsToReturn;
    }

    initSalesGroupOptions(salesGroups) {
        let salesGroupOptionsToReturn = [];
        for (let salesGroup of salesGroups) {
            let currentSalesGroup = {
                label: salesGroup,
                value: salesGroup
            };
            salesGroupOptionsToReturn.push(currentSalesGroup);
        }
        return salesGroupOptionsToReturn;
    }

    initASCGroupOptions(ASCGroups) {
        let ASCGroupOptionsToReturn = [];
        for (let ASCGroup of ASCGroups) {
            let currentASCGroup = {
                label: ASCGroup,
                value: ASCGroup
            };
            ASCGroupOptionsToReturn.push(currentASCGroup);
        }
        return ASCGroupOptionsToReturn;
    }

    //init the day object records
    async initDays() {
        this.days = [];
        for (let i = 0; i < 5; i++) {
            let date = this.addDays(this.startOfSelectedWeek, i);
            //console.log('initDays date', date);
            let day = {
                dayName: dayNames[i],
                date: date,
                visitCount: 0,
                accounts: [],
                Id: Math.random() + '',
            };
            day.displayDate = this.calculateDisplayDate(date);
            await this.initDayEvents(day);
            this.days.push(day);
        }
        console.log('initDays days', JSON.parse(JSON.stringify(this.days)));
    }

    async initDayEvents(day) {
        //console.log('initDayEvents');
        for (let currentEvent of this.weekEvents) {
            let account = {};
            account.EventId = currentEvent.Id;
            account.visitDate = currentEvent.StartDateTime.substr(0, 10);
            //console.log('initDayEvents currentEvent', JSON.parse(JSON.stringify(currentEvent)));
            //if the event has an account (so it's a visit and not a special type event)
            if (currentEvent.Account) {
                account.Id = currentEvent.Account.Id;
                account.Name = currentEvent.Account.Name;
                account.ShippingCity = currentEvent.Account.ShippingCity;
                account.ShippingPostalCode = currentEvent.Account.ShippingPostalCode;
                account.ShippingLatitude = currentEvent.Account.ShippingLatitude;
                account.ShippingLongitude = currentEvent.Account.ShippingLongitude;
                account.BillingCity = currentEvent.Account.BillingCity;
                account.BillingPostalCode = currentEvent.Account.BillingPostalCode;
                account.BillingLatitude = currentEvent.Account.BillingLatitude;
                account.BillingLongitude = currentEvent.Account.BillingLongitude;
                account.type = eventTypes.Meeting;
                //if the event doesn't have an account (it's a special type event)
            } else {
                account.Subject = currentEvent.Subject;
                account.Name = currentEvent.Subject;

                account.color = 'white';
                account.order = '0';
                account.type = eventTypes.Other;
                account.specialEvent = true;
                account.displayName = currentEvent.Subject;
                account.style = 'background-color:#f3f3f3';
            }

            //random unique id so we can access the individual records in html
            account.randomId = Math.random();
            this.initAccountFields(account);
            if (currentEvent.AccountId) {
                this.initColors(account, 'midnightblue');
                // this.initColors(account, 'white');
            } else {
                this.initColors(account, 'white');
            }
            //console.log(account.visitDate + ' ' + day.date);
            if (account.visitDate === day.date) {
                day.accounts.push(account);
            }
        }
        day.visitCount = day.accounts.length;
        //console.log('initDayEvents day', day);
    }

    getDevice() {
        if (userAgent.match(/iPhone|iPad|iPod/i) != null) {
            return 'IOS';
        }
        if (userAgent.match(/Android/i) != null) {
            return 'Android';
        }
        return 'Windows';
    }

    async loadResponse(needToSort) {
        // this.globalSpinner = true;

        this.data = await getResponse({
            getAllAccounts: this.selectedOwner === 'all',
            erintettVagyokE: this.selectedOwner === 'own'
        });
        console.log('loadResponse data', this.data);
        if (this.data.length === 0) {
            return;
        }

        this.data.accounts.forEach(account => {
            this.initAccountFields(account);
        });

        for (let i = 0; i < this.data.accounts.length; i++) {
            let currentAccount = this.data.accounts[i];
            this.initColors(currentAccount, 'midnightblue')
        }

        this.initFilterOptions();
        await this.applyFilters(); // szürkéket ez alapból kivenné!
        if (needToSort === true) {
            console.log('loadResponse filteredAccounts before sortAccounts', JSON.parse(JSON.stringify(this.filteredAccounts)));
            this.sortAccounts();
            console.log('loadResponse filteredAccounts after sortAccounts', JSON.parse(JSON.stringify(this.filteredAccounts)));
        }

        if (this.selectedOwner === 'own') {
            //this.filteredAccounts = this.filteredAccounts.slice(0, this.visibleAccountsLimit);
            //console.log('loadResponse after own slice: ', JSON.parse(JSON.stringify(this.filteredAccounts)));
        }

        //await this.logLimitsOfThisSFTransaction('loadResponse');

        // this.globalSpinner = false;
    }

    initAccountFields(account) {
        this.initAccountIcons(account);
        if (account.specialEvent === true) {
            return;
        }
        account.Subject = 'Látogatás';
        account.eventType = 'Store visit';
    }

    initAccountIcons(account) {
        let iconsOfAccount = [];

        //choose icon depending on the type of the account (currently it random  icons to every account)
//         for(let icon of this.icons){
//             let randomNumber = Math.floor(Math.random()*3);
//             if(randomNumber % 3 === 0){
//                 let newIcon = {};
//                 newIcon.icon_name = icon.icon_name;
//                 newIcon.display_name = icon.display_name;
//                 iconsOfAccount.push(newIcon);
//             }
//         }

        account.categories = {
            high_value_sales: false, // = moneybag
            open_task: false,
            fallback: false,
            high_open_potential: false,
            lead: false,
            inactive: false,
        };

        //account.categories.fallback = false;
        if (this.moneybagAccountIds.includes(account.Id)) {
            account.categories.high_value_sales = true;
            let newIcon = {};
            newIcon.icon_name = 'utility:moneybag';
            newIcon.display_name = 'High Value';
            iconsOfAccount.push(newIcon);
        }
        // if (this.moneybagAccountIds.includes(account.Id)) {
        //     account.categories.moneybag = true;
        //     let newIcon = {};
        //     newIcon.icon_name = 'utility:moneybag';
        //     newIcon.display_name = 'High Value Quote';
        //     iconsOfAccount.push(newIcon);
        // }
        if (this.openTaskAccountIds.includes(account.Id)) {
            account.categories.open_task = true;
            let newIcon = {};
            newIcon.icon_name = 'utility:task';
            newIcon.display_name = 'Open Task';
            iconsOfAccount.push(newIcon);
        }
        if (this.fallbackAccountIds.includes(account.Id)) {
            account.categories.fallback = true;
            let newIcon = {};
            newIcon.icon_name = 'utility:jump_to_bottom';
            newIcon.display_name = 'Fallback';
            iconsOfAccount.push(newIcon);
        }
        if (this.highOpenPotentialAccountIds.includes(account.Id)) {
            account.categories.high_open_potential = true;
            let newIcon = {};
            newIcon.icon_name = 'utility:high_velocity_sales';
            newIcon.display_name = 'High Open Potential';
            iconsOfAccount.push(newIcon);
        }
        if (this.flagAccountIds.includes(account.Id)) {
            account.categories.lead = true;
            let newIcon = {};
            newIcon.icon_name = 'utility:priority';
            newIcon.display_name = 'Potential';
            iconsOfAccount.push(newIcon);
        }
        if (this.inactiveAccountIds.includes(account.Id)) {
            account.categories.inactive = true;
            let newIcon = {};
            newIcon.icon_name = 'utility:notification_snoozed';
            newIcon.display_name = 'Inactive';
            iconsOfAccount.push(newIcon);
        }

        // többi szűrő ikonja

        account.icons = iconsOfAccount;
    }

    initColors(currentAccount, color) {
//        if(currentAccount.specialEvent === true) return;
        switch (color) {
            case 'green':
                currentAccount.style = 'background-color:#70D41F;'; //green
                currentAccount.color = 'green';
                currentAccount.order = '3';
                break;
            case 'red':
                currentAccount.style = 'background-color:#E99191;'; //red
                currentAccount.color = 'red';
                currentAccount.order = '1';
                break;
            case 'white':
                currentAccount.style = 'background-color:#f3f3f3;'; //white (greyish)
                currentAccount.color = 'white';
                currentAccount.order = '0';
                break;
            case 'blue':
                currentAccount.style = 'background-color:#364FFF;'; //blue
                currentAccount.color = 'blue';
                currentAccount.order = '4';
                break;
            case 'yellow':
                currentAccount.style = 'background-color:#FCE500;'; //yellow
                currentAccount.color = 'yellow';
                currentAccount.order = '2';
                break;
            case 'midnightblue':
                // currentAccount.style = 'background-color:#ADD8E6;'; //midnightblue
                currentAccount.style = 'background-color:lightblue;';
                currentAccount.color = 'midnightblue';
                currentAccount.order = '3';
                break;
            default:
                break;
        }
//        currentAccount.type = eventTypes.Future;
        if (currentAccount.style) {
            currentAccount.style += 'cursor: grab;'
        }
    }


    initFilterOptions() {
        this.cityFilterOptions = [{}, ...this.data.cities];

        this.filteredAccounts = this.data.accounts;
        this.generateOtherTypeEvents();
    }

    getDayAccounts() {
        let usedAccounts = [];
        this.days.forEach(day => {
//                day.accounts.forEach(account => usedAccounts.push(account.Id));
                day.visitCount = day.accounts.length;
            }
        );
        //console.log('getDayAccounts days', JSON.parse(JSON.stringify(this.days)));
        return usedAccounts.flat();
    }

    generateOtherTypeEvents() {
        //this.globalSpinner = true;

        this.filteredAccounts = this.filteredAccounts.filter(item => item.type !== eventTypes.Other);
        for (const key in this.otherEventTypesByLabel) {
            let account = {};
            account.Name = this.otherEventTypesByLabel[key].name;
            account.displayName = this.otherEventTypesByLabel[key].name;
            account.type = eventTypes.Other;
            account.eventType = this.otherEventTypesByLabel[key].value;
            this.initColors(account, 'white');
            this.filteredAccounts.push(account);
        }
        console.log('generateOtherTypeEvents filteredAccounts before sortAccounts: ', JSON.parse(JSON.stringify(this.filteredAccounts)));
        this.sortAccounts();
        console.log('generateOtherTypeEvents filteredAccounts after sortAccounts: ', JSON.parse(JSON.stringify(this.filteredAccounts)));

        //this.globalSpinner = false;
    }

    sortAccounts() {
        //console.log('sortAccounts start; filteredAccounts: ', JSON.parse(JSON.stringify(this.filteredAccounts)));

        //if (this.filteredAccounts.length > this.tooManyAccountsLimit) return;

        if (this.sortByDistance) {
            //console.log('sort by distance');
            this.filteredAccounts.sort(function (a, b) {
//                if (a.order === '0') {
//                    if (b.order === '0') return a.Name.localeCompare(b.Name);
//                    return a.order > b.order ? 1 : -1;
//                }
//                if (a.Name === b.Name) {
//                    if (!a.distanceFromCurrent == null && !b.distanceFromCurrent == null) {
//                        return a.order > b.order ? 1 : -1;
//                    } else if (a.distanceFromCurrent == null) {
//                        return 1;
//                    } else if (!b.distanceFromCurrent == null) {
//                        return -1;
//                    }
//
//                    return a.distanceFromCurrent - b.distanceFromCurrent;
//                }
//                return a.Name.localeCompare(b.Name);

                // if (a.order === '0') {
                //     console.log(a);
                //     if (b.order === '0' && a.Name && a.Name != null && b.Name && b.Name != null) return a.Name.localeCompare(b.Name);
                //     return a.order > b.order ? 1 : -1;
                // }
                // if (b.order === '0') {
                //     return a.order > b.order ? 1 : -1;
                // }

                if ((a.order === '0' && b.order !== '0') || (a.type && a.type === eventTypes.Other && b.type && b.type !== eventTypes.Other)) {
                    return -1;
                }
                if ((a.order !== '0' && b.order === '0') || (a.type && a.type !== eventTypes.Other && b.type && b.type === eventTypes.Other)) {
                    return +1;
                }

                //console.log(a.distanceFromCurrent + '-' + b.distanceFromCurrent);
                if (!(a.distanceFromCurrent == null || a.distanceFromCurrent < 0.01) && !(b.distanceFromCurrent == null || b.distanceFromCurrent < 0.01)) {
                    //console.log('jej');
                    //console.log(a.distanceFromCurrent - b.distanceFromCurrent);
                    return a.distanceFromCurrent - b.distanceFromCurrent;
                }
                if (b.distanceFromCurrent == null || b.distanceFromCurrent < 0.01) {
                    return 0 - a.distanceFromCurrent;
                    //return a.distanceFromCurrent - 0;
                    //return +1;
                }
                if (a.distanceFromCurrent == null || a.distanceFromCurrent < 0.01) {
                    return b.distanceFromCurrent - 0;
                    //return 0 - b.distanceFromCurrent;
                }
                if (a.Name && a.Name != null && b.Name && b.Name != null) {
                    return a.Name.localeCompare(b.Name);
                }

                return 0;
            })
        } else {
            // if (this.filteredAccounts.length > this.tooManyAccountsLimit) {
            //     return;
            // }

            this.filteredAccounts.sort(function (a, b) {
                if (a.order === '0' && b.order !== '0') {
                    return -1;
                }
                if (a.order !== '0' && b.order === '0') {
                    return +1;
                }

                // sort by count of categories:
                // let a_count_of_categories = 0;
                // if (a.categories && a.categories != null) {
                //     if (a.categories.high_value_sales != null && a.categories.high_value_sales === true) {
                //         a_count_of_categories++;
                //     }
                //     if (a.categories.open_task != null && a.categories.open_task === true) {
                //         a_count_of_categories++;
                //     }
                //     if (a.categories.fallback != null && a.categories.fallback === true) {
                //         a_count_of_categories++;
                //     }
                //     if (a.categories.high_open_potential != null && a.categories.high_open_potential === true) {
                //         a_count_of_categories++;
                //     }
                //     if (a.categories.lead != null && a.categories.lead === true) {
                //         a_count_of_categories++;
                //     }
                //     if (a.categories.inactive != null && a.categories.inactive === true) {
                //         a_count_of_categories++;
                //     }
                // }
                // let b_count_of_categories = 0;
                // if (b.categories && b.categories != null) {
                //     if (b.categories.high_value_sales != null && b.categories.high_value_sales === true) {
                //         b_count_of_categories++;
                //     }
                //     if (b.categories.open_task != null && b.categories.open_task === true) {
                //         b_count_of_categories++;
                //     }
                //     if (b.categories.fallback != null && b.categories.fallback === true) {
                //         b_count_of_categories++;
                //     }
                //     if (b.categories.high_open_potential != null && b.categories.high_open_potential === true) {
                //         b_count_of_categories++;
                //     }
                //     if (b.categories.lead != null && b.categories.lead === true) {
                //         b_count_of_categories++;
                //     }
                //     if (b.categories.inactive != null && b.categories.inactive === true) {
                //         b_count_of_categories++;
                //     }
                // }

                // TODO - befejezetlen rendezés, mert mégsem kell, elég az ábécé; ha mégis kérik, Enci Evo

                if (a.Name === b.Name) {
                    if (a.ShippingCity === b.ShippingCity) {
                        return a.order > b.order ? 1 : -1;
                    }
                    if (a.ShippingCity && a.ShippingCity != null && b.ShippingCity && b.ShippingCity != null) {
                        return a.ShippingCity.localeCompare(b.ShippingCity);
                    }
                }
                if (a.Name && a.Name != null && b.Name && b.Name != null) {
                    return a.Name.localeCompare(b.Name);
                }

                return 0;
            })
        }

        //console.log('sortAccounts end; filteredAccounts: ', JSON.parse(JSON.stringify(this.filteredAccounts)));
    }

    handleAccountsChange(event) {
        try {
            let dayId = event.currentTarget.dataset.dayId;
            if (dayId == null) {
                this.sortAccounts();
                let existingOtherTypeDisplayNames = this.filteredAccounts.filter(account => account.type === eventTypes.Other).map(account => account.displayName);
                //console.log('handleAccountsChange existingOtherTypeDisplayNames', existingOtherTypeDisplayNames);
                //console.log('handleAccountsChange existingOtherTypeDisplayNames length', existingOtherTypeDisplayNames.length);
                //console.log(Object.keys(existingOtherTypeDisplayNames));
                if (Object.keys(existingOtherTypeDisplayNames).every(label => !existingOtherTypeDisplayNames.includes(label) || existingOtherTypeDisplayNames.length !== 5)) {
                    this.generateOtherTypeEvents();
                }
            } else {
                //console.log(JSON.parse(JSON.stringify(this.days.find(day => day.Id === dayId).accounts)));
                //console.log(JSON.parse(JSON.stringify(event.detail.items)));
                let newItems = event.detail.items;
                for (let item of newItems) {
                    if (!item.randomId) {
                        item.randomId = Math.random();
//                        item.Altipus__c = this.selectedSubType;
                    }
                    //console.log(JSON.parse(JSON.stringify(item)));
                }
                this.days.find(day => day.Id === dayId).accounts = newItems;
                //let currentDaysAccounts = this.days.find(day => day.Id === dayId).accounts;
                this.days.find(day => day.Id === dayId).visitCount = this.days.find(day => day.Id === dayId).accounts.length;
                //console.log('handleAccountsChange currentDaysAccounts', currentDaysAccounts);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async handleCityFilterChange(event) {
        //let lastSelectedCity = this.selectedCity;
        this.selectedCity = event.detail.value;
        await this.applyFilters();
    }

    async applyFilters() {
        //console.log('applyFilters start; filteredAccounts: ', JSON.parse(JSON.stringify(this.filteredAccounts)));
        if (this.selectedCity) {
            this.getDayAccounts();
            this.filteredAccounts = this.data.accounts.filter(element => (element.ShippingCity === this.selectedCity || element.BillingCity === this.selectedCity) && !this.dayAccounts.includes(element.Id))
                .filter(account => selectedColors.includes(account.color))
        } else {


            this.getDayAccounts();
            this.initFilterOptions();
            //console.log('applyFilters selectedSalesGroups', JSON.stringify(this.selectedSalesGroups));
            let selectedSalesGroupsAPInames = [];
/*            let gotAccounts = await getAccountsBySalesGroupsWithAPInames({
                salesGroups: this.selectedSalesGroups,
                erintettVagyokE: this.selectedOwner === 'own'
            });
            //console.log('getAccountsBySalesGroupsWithAPInames gotAccounts', JSON.stringify(gotAccounts));
            if (gotAccounts) {
                for (let gotAccount of gotAccounts) {
                    selectedSalesGroupsAPInames.push(gotAccount.Sales_Group__c);
                }
            }*/

            //console.log('applyFilters selectedSalesGroupsAPInames', selectedSalesGroupsAPInames);
            //console.log('applyFilters filteredAccounts', JSON.parse(JSON.stringify(this.filteredAccounts))); // || account.type == eventTypes.Other

            //console.log('applyFilters before big filter; icons: ', JSON.stringify(this.icons));

            this.filteredAccounts = this.filteredAccounts.filter(account => !this.getDayAccounts().includes(account.Id) || (account.type === eventTypes.Other))
                .filter(account => this.searchWord == null ||
                    this.searchWord === '' || (this.searchWord &&
                        (account.Name.toLowerCase().includes(this.searchWord.toLowerCase())
                            || account.ShippingCity?.toLowerCase().includes(this.searchWord.toLowerCase())
                            || account.ShippingPostalCode?.toLowerCase().includes(this.searchWord.toLowerCase())
                            || account.ShippingCounty?.toLowerCase().includes(this.searchWord.toLowerCase())
                            || account.BillingCity?.toLowerCase().includes(this.searchWord.toLowerCase())
                            || account.BillingPostalCode?.toLowerCase().includes(this.searchWord.toLowerCase())
                            || account.BillingCounty?.toLowerCase().includes(this.searchWord.toLowerCase())
                        )))

                // .filter(account => (this.selectedOwner=='own' && account.type === eventTypes.Other) || (account.categories && (
                //     (!this.icons[0].selected && !this.icons[1].selected && !this.icons[2].selected && !this.icons[3].selected && !this.icons[4].selected && !this.icons[5].selected)
                //     || (this.icons[0].selected && account.categories.high_value_sales)
                //     || (this.icons[1].selected && account.categories.fallback)
                //     || (this.icons[2].selected && account.categories.inactive)
                //     || (this.icons[3].selected && account.categories.lead)
                //     || (this.icons[4].selected && account.categories.high_open_potential)
                //     || (this.icons[5].selected && account.categories.open_task))))

                .filter(account => {
                    // this.icons[3].selected &&
                    if (account.categories && account.categories.lead) {
                        //console.log('zászlós: ', account.Name);
                    }
                    if (account.categories) {
                        //console.log('hang vagy kiíratni account.categories-t level 18651: ', JSON.stringify(account.categories));
                    }

                    // this.selectedOwner == 'own' &&
                    return (account.type === eventTypes.Other) || (account.categories && (
                        (!this.icons[0].selected && !this.icons[1].selected && !this.icons[2].selected && !this.icons[3].selected && !this.icons[4].selected && !this.icons[5].selected)
                        || (this.icons[0].selected && account.categories.high_value_sales)
                        || (this.icons[1].selected && account.categories.open_task)
                        || (this.icons[2].selected && account.categories.fallback)
                        || (this.icons[3].selected && account.categories.high_open_potential)
                        || (this.icons[4].selected && account.categories.lead)
                        || (this.icons[5].selected && account.categories.inactive)))
                })

                //                .filter(account => account.type == eventTypes.Other || (account.categories && (!this.icons[0].selected || (this.icons[0].selected && account.categories.high_value_sales))))
                //                .filter(account => account.type == eventTypes.Other || (account.categories && (!this.icons[1].selected || (this.icons[1].selected && account.categories.fallback))))
                //                .filter(account => account.type == eventTypes.Other || (account.categories && (!this.icons[2].selected || (this.icons[2].selected && account.categories.inactive))))
                //                .filter(account => account.type == eventTypes.Other || (account.categories && (!this.icons[3].selected || (this.icons[3].selected && account.categories.lead))))
                //                .filter(account => account.type == eventTypes.Other || (account.categories && (!this.icons[4].selected || (this.icons[4].selected && account.categories.high_open_potential))))
                //                .filter(account => account.type == eventTypes.Other || (account.categories && (!this.icons[5].selected || (this.icons[5].selected && account.categories.open_task))))
                //            .filter(account => (this.icons[3].selected && account.categories.fallback))

                // .filter(account => !(
                //     account.Handling_Group_Narrowest_Level__c &&
                //     account.Handling_Group_Narrowest_Level__c!=null &&
                //     this.selectedHandlingGroupNarrowestLevels.indexOf(account.Handling_Group_Narrowest_Level__c)>=0
                //     )

                // .filter(account => {
                //         console.log('applyFilters Sales Group filter, account.Sales_Group__c', account.Sales_Group__c);
                //         return account.type === eventTypes.Other || (selectedSalesGroupsAPInames.length === 0 ||
                //             (account.Sales_Group__c &&
                //                 account.Sales_Group__c != null &&
                //                 selectedSalesGroupsAPInames.indexOf(account.Sales_Group__c) >= 0)
                //         )
                //     }
                // )

            ; //||  (!this.icons[3].selected && !account.categories.fallback)

            //console.log('applyFilters after big filtering; filteredAccounts: ', JSON.parse(JSON.stringify(this.filteredAccounts)));
        }


        if (this.selectedOwner === 'own') {
            let accIdsToFilter = [];
            for (let acc of this.filteredAccounts) {
                if (acc.Id && acc.Id != null) {
                    accIdsToFilter.push(acc.Id);
                }
            }
            //console.log('accIdsToFilter', accIdsToFilter); // még itt van mindenki
            // let erintettAccounts = await getErintettAccountsOf({accountIdsToFilter: accIdsToFilter});
            // let erintettAccounts = await getErintettAccounts();
            //console.log('own erintettAccounts', erintettAccounts); // pedig benne van több mint 2000 Account.Id
            //this.filteredAccounts = this.filteredAccounts.filter(account => erintettAccounts.includes(account.Id) || account.type === 0);
            //console.log('filteredAccounts before filtering with selectedOwner own: ', JSON.parse(JSON.stringify(this.filteredAccounts)));
/*            this.filteredAccounts = this.filteredAccounts.filter(account => {
                if (account.type === 0) {
                    return true;
                }

                //console.log('Érintett vagyok szűrés; account: ', JSON.parse(JSON.stringify(account)));
                //console.log('erintettAccounts-ban benne van-e account.Id? ', erintettAccounts.includes(account.Id));
                return erintettAccounts.includes(account.Id);
            });*/
            //console.log('filteredAccounts after filtering with selectedOwner own: ', JSON.parse(JSON.stringify(this.filteredAccounts)));
        }

        this.cityFilterOptions.sort();
        //this.sortAccounts();

        //console.log('applyFilters end; filteredAccounts: ', JSON.parse(JSON.stringify(this.filteredAccounts)));

        //await this.logLimitsOfThisSFTransaction('applyFilters');
    }

    mapModalSingleZoom = false;
    mapModalSingleZoomLevel = 15;

    handleMapModalButtonClick(event) {
        let dayId = event.currentTarget.dataset.dayId;
        console.log('handleMapModalButtonClick dayId', dayId);
        let accountsToShow = this.days.find(day => day.Id === dayId).accounts;
        console.log('handleMapModalButtonClick accountsToShow', JSON.stringify(accountsToShow));
        this.initMapMarkers(accountsToShow.filter(elem => !Object.keys(this.otherEventTypesByLabel).includes(elem.displayName) && ((elem.ShippingLongitude != null && elem.ShippingLatitude != null)||(elem.BillingLongitude != null && elem.BillingLatitude != null))));
        console.log('handleMapModalButtonClick populated mapMarkers', JSON.stringify(this.mapMarkers));
        if (this.mapMarkers.length === 0) {
            return;
        }
        if (this.mapMarkers.length === 1) {
            this.mapModalSingleZoom = true;
        }
        this.showMapModal = true;
    }

    handleCloseMapModal() {
        this.showMapModal = false;
    }

    initMapMarkers(accounts) {
        this.mapMarkers = [];
        for (let index in accounts) {
            let account = accounts[index];
            if (account) {
                let currentEventLocation = {
                    location: {
                        Latitude: account.ShippingLatitude ? account.ShippingLatitude : account.BillingLatitude,
                        Longitude: account.ShippingLongitude ? account.ShippingLongitude : account.BillingLongitude,
                    },
                    title: account.Name
                };
                this.mapMarkers.push(currentEventLocation);
            }
        }
    }

//
    createEvents() {
        const title = 'Események létrehozása';
        let message, variant;

        this.isLoading = true;
        let dayData = [];
        this.days.forEach((elem) => {
            let currentDay = {
                dayName: elem.dayName,
                dateOfVisit: elem.date,
                accounts: elem.accounts.map(acc => [acc.eventType, acc.Id, acc.Name, acc.Subject, acc.Altipus__c, acc.EventId])
            };
            //console.log('createEvents currentDay', JSON.stringify(currentDay))
            dayData.push(currentDay);
        });

        //console.log('daydata');
        //console.log(dayData);
        //console.log(JSON.stringify(dayData));


        console.log('for controller test class: jsonString:', JSON.stringify(dayData));

        upsertEventsRequest({jsonString: JSON.stringify(dayData)}).then(
            async (result) => {
                // if (result === 'OK') {
                //     message = 'Az események sikeresen létrejöttek!';
                //     variant = 'success';
                // } else {
                //     message = 'Hiba az események létrehozása során:' + result;
                //     variant = 'error';
                // }


                const evt = new ShowToastEvent({
                    title: title,
                    message: message,
                    variant: variant,
                });

                this.dispatchEvent(evt);

                await this.loadResponse(true);
                this.weekEvents = await getEvents({
                    weekStart: this.startOfSelectedWeek,
                    erintettVagyokE: this.selectedOwner === 'own'
                });
                await this.initDays();

                this.isLoading = false;

                //await this.logLimitsOfThisSFTransaction('createEvents upsertEventsRequest');
            }
        );

    }

    async deleteAll() {
        //let curr = new Date; // get current date
        //let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        //let last = first + 6; // last day is the first day + 6

        let firstDay = this.startOfSelectedWeek;
        let lastDay = this.addDays(this.startOfSelectedWeek, 6);

        const title = 'Összes heti esemény törlése';
        let message, variant;

        deleteAllEvents({startTime: firstDay, endTime: lastDay}).then((result) => {
            if (result === 'OK') {
                message = 'Az eheti események sikeresen törölve lettek';
                variant = 'success';
            } else {
                message = 'Hiba az események törlése során:' + result;
                variant = 'error';
            }

            const evt = new ShowToastEvent({
                title: title,
                message: message,
                variant: variant,
            });

            this.dispatchEvent(evt);

        });

        this.loadResponse(true).then(() => {
            //console.log('deleteAll loadResponse value', value)
        }).catch(reason => {
            console.error('deleteAll loadResponse reason', reason)
        });
        this.weekEvents = await getEvents({
            weekStart: this.startOfSelectedWeek,
            erintettVagyokE: this.selectedOwner === 'own'
        });
        await this.initDays();
        //await this.logLimitsOfThisSFTransaction('deleteAll');
    }

    async handleClick(event) {
        if (event.target.name === 'deleteAllButton') {
            this.showDeleteAllDialog = true;
        } else if (event.target.name === 'createEventsButton') {
            this.showCreateEventsDialog = true;
        } else if (event.target.name === 'deleteAllModal') {
            if (event.detail !== 1) {
                //let displayMessage = 'Status: ' + event.detail.status + '. Event detail: ' + JSON.stringify(event.detail.originalMessage) + '.';
                if (event.detail.status === 'confirm') {
                    await this.deleteAll();
                }
            }
            this.showDeleteAllDialog = false;
        } else if (event.target.name === 'createEventsModal') {
            if (event.detail !== 1) {
                //let displayMessage = 'Status: ' + event.detail.status + '. Event detail: ' + JSON.stringify(event.detail.originalMessage) + '.';
                if (event.detail.status === 'confirm') {
                    try {
                        this.createEvents();
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
            this.showCreateEventsDialog = false;
        }
    }

    handleSubTypeChange(event) {
        this.selectedSubType = event.detail.value;
    }

    handleToggleChange(event) {
        //this.showAllAccounts = event.target.checked;
        this.showLastVisitText = event.target.checked;
        /*this.loadResponse().then(value => {
            //console.log('handleToggleChange loadResponse value', value)
        }).catch(reason => {
            console.error('handleToggleChange loadResponse reason', reason)
        });*/
        //console.log('handleToggleChange showAllAccounts', this.showAllAccounts);

        //console.log('handleToggleChange event.target.checked (asd)');
        //console.log(event.target.checked);

        //console.log('handleToggleChange showLastVisitText', this.showLastVisitText);

    }

    handleScrollMode(event) {
        this.scrollMode = event.target.checked;
    }


    handleAllAccountsButton() {
        this.showAllAccounts = !this.showAllAccounts;
        this.loadResponse(true).then(() => {
            //console.log('handleAllAccountsButton loadResponse value', value)
            //await this.logLimitsOfThisSFTransaction('handleAllAccountsButton');
        }).catch(reason => {
            console.error('handleAllAccountsButton loadResponse reason', reason);
        });
    }

    async handleWordSearch(event) {
        this.searchWord = event.detail.value;
        //console.log('handleWordSearch searchWord:', this.searchWord);

        if (this.searchWord !== '' && this.searchWord.length < 3) {
            return;
        }

        /*await this.applyFilters();
        this.sortAccounts();
        //await this.logLimitsOfThisSFTransaction('handleWordSearch');*/

        this.filterAccountsNow(event);
    }


    get buttonColor() {
        return this.showAllAccounts ? "background-color : #3C56AE" : "background-color : white";
    }

    get buttonVariant() {
        return this.showAllAccounts ? "brand" : "neutral";
    }

    async handleDateChange(event) {
//        if(this.checkIfDayAccountsIsEmpty() == false){
//            const result = await LightningConfirm.open({
//                        message: 'Új hét választása előtt mentse el a jelenleg kiválasztott hétre betervezett eseményeket.',
//                        label: 'Események mentése',
//            });
//            if(result == false){
//                this.selectedDate = this.oldDate;
//                return;
//            }else{
//                this.createEvents();
//            }
//        }
        await this.changeDate(event.detail.value);
        this.weekEvents = await getEvents({
            weekStart: this.startOfSelectedWeek,
            erintettVagyokE: this.selectedOwner === 'own'
        });
        await this.initDays();
        //await this.logLimitsOfThisSFTransaction('handleDateChange');
    }

//
    async changeDate(newDate) {
        this.selectedDate = newDate;
        this.oldDate = newDate;
        this.startOfSelectedWeek = this.getStartOfWeek(this.selectedDate);
        await this.initDays();
        this.loadResponse(true).then(() => {
            //console.log('changeDate loadResponse value', value)
            //await this.logLimitsOfThisSFTransaction('changeDate');
        }).catch(reason => {
            console.error('changeDate loadResponse reason', reason)
        });
        //console.log('changeDate selectedDate', this.selectedDate);
        //console.log('changeDate startOfSelectedWeek', this.startOfSelectedWeek);
    }

    getStartOfWeek(date) {
        for (let i = 0; i < 7; i++) {
            let dateString = new Date(date);
            let currentDate = new Date(dateString.getTime() - i * 24 * 60 * 60 * 1000);
            if (currentDate.getDay() === 1) {
                this.endOfSelectedWeek = (new Date(dateString.getTime() - (i - 6) * 24 * 60 * 60 * 1000)).toISOString().substr(0, 10);
                return currentDate.toISOString().substr(0, 10);
            }
        }
        return null;
    }

    addDays(date, num) {
        let oldDate = new Date(date);
        return (new Date(oldDate.getTime() + num * 24 * 60 * 60 * 1000)).toISOString().substr(0, 10);
    }

    checkIfDayAccountsIsEmpty() {
        for (let day of this.days) {
            if (day.accounts.length !== 0) {
                return false;
            }
        }
        return true;
    }

    get showScrollButton() {
        return (this.device === 'IOS' || this.device === 'Android');
    }

    async handleIconClick(event) {
        // if (this.selectedOwner === 'all') {
        //     this.filteredSpinner = true;
        // }
        await this.applyIconFilters(event.currentTarget.dataset.index);
        // this.filteredSpinner = false;
    }

    async applyIconFilters(iconIndex) {
        //console.log('applyIconFilters start; filteredAccounts: ', JSON.parse(JSON.stringify(this.filteredAccounts)));
        let icon = this.icons[iconIndex];

        if (icon.selected === true) {
            icon.selected = false;
            icon.style = "border : solid;";

            //apply filters
        } else {
            icon.selected = true;
//            icon.style = "--sds-c-icon-color-background: lightblue; border : solid";
            icon.style = "--slds-c-icon-color-background: #2A6375; --slds-c-icon-color-foreground-default: white; border : solid; border-color: #2A6375;";

            //apply filters
        }

        //console.log('applyIconFilters icon', JSON.stringify(this.icons[iconIndex]));

        // ha kijelöli az összes ügyfél kategóriát, akkor kerüljenek vissza a szürke események is:
        let anyIconsSelected = false;
        for (let i of this.icons) {
            if (i.selected === true) {
                anyIconsSelected = true;
            }
        }
        // if (anyIconsSelected === true) {
        //     this.applyFilters();
        //     this.sortAccounts();
        // } else {
        //     await this.loadResponse();
        // }
        //console.log('applyIconFilters before applyFilters; filteredAccounts: ', JSON.parse(JSON.stringify(this.filteredAccounts)));
        //await this.applyFilters();
        //console.log('applyIconFilters after applyFilters; filteredAccounts: ', JSON.parse(JSON.stringify(this.filteredAccounts)));
        //this.sortAccounts();

        //console.log('applyIconFilters end; filteredAccounts: ', JSON.parse(JSON.stringify(this.filteredAccounts)));
        //await this.logLimitsOfThisSFTransaction('applyIconFilters');

        this.filterAccountsNow(null);
    }

    handleTypeChange(event) {
        this.selectedType = event.detail.value;
    }

    async handleNextWeek() {
        this.startOfSelectedWeek = this.addDays(this.startOfSelectedWeek, 7);
        this.endOfSelectedWeek = this.addDays(this.endOfSelectedWeek, 7);
        this.weekEvents = await getEvents({
            weekStart: this.startOfSelectedWeek,
            erintettVagyokE: this.selectedOwner === 'own'
        });
        await this.initDays();
        //await this.logLimitsOfThisSFTransaction('handleNextWeek');
    }

    async handlePreviousWeek() {
        this.startOfSelectedWeek = this.addDays(this.startOfSelectedWeek, -7);
        this.endOfSelectedWeek = this.addDays(this.endOfSelectedWeek, -7);
        this.weekEvents = await getEvents({
            weekStart: this.startOfSelectedWeek,
            erintettVagyokE: this.selectedOwner === 'own'
        });
        await this.initDays();
        //await this.logLimitsOfThisSFTransaction('handlePreviousWeek');
    }


    calculateDisplayDate(date) {
        //console.log('calculateDisplayDate date', date);
        let splitDate = date.split('-');
        let month = this.monthNames[splitDate[1]];
        return month + ' ' + splitDate[2] + '.';
    }

    monthNames = {
        '01': /*'január'*/ 'January',
        '02': /*'február'*/ 'February',
        '03': /*'március'*/ 'March',
        '04': /*'április'*/ 'April',
        '05': /*'május'*/ 'May',
        '06': /*'június'*/ 'June',
        '07': /*'július'*/ 'July',
        '08': /*'augusztus'*/ 'August',
        '09': /*'szeptember'*/ 'September',
        '10': /*'október'*/ 'October',
        '11': /*'november'*/ 'November',
        '12': /*'december'*/ 'December'
    };

    handleFilterIconClick() {
        if (this.isFilterBarOpen === true) {
            this.closeFilterSidebar();
        } else {
            this.openFilterSidebar(this.template);
        }
    }

    async handleDistanceClick() {
        if (!this.selectedAccountId) {
            this.selectedAccountId = await loadSelectedAccountId();
        }
        console.log('handleDistanceClick start, selectedAccountId: ', this.selectedAccountId);
        if (this.selectedAccountId && this.selectedAccountId != null && this.selectedAccountId.length >= 1) {
            //this.globalSpinner = true;
            await this.calculateDistance();
            // this.sortByDistance = true;
            // await this.applyFilters();
            // this.sortAccounts();
            // this.globalSpinner = false;
        } else {
            const event = new ShowToastEvent({
                title: 'Warning',
                message: 'Előbb húzz be egy elemet a tervezőbe jobbra és kattints rá, ahhoz képest fog távolságot mérni!',
                variant: 'warning',
                mode: 'dismissable' // You can change this to 'sticky' for a persistent toast
            });
            this.dispatchEvent(event);
        }
    }

    async calculateDistance() {
        console.log('calculateDistance start; cachedDistanceMeasureMdt: ', this.cachedDistanceMeasureMdt);

        if (this.selectedOwner === 'all') {
            const event = new ShowToastEvent({
                title: 'Warning',
                message: 'Mivel Felelős: Összes van kiválasztva, a kért művelet feldolgozása a szokásosnál kicsit több ideig tarthat!',
                variant: 'warning',
                mode: 'dismissable'
            });
            //this.dispatchEvent(event);
        }

        // find city to id
        let pivotFilteredAccount = null;
        for (let acc of this.filteredAccounts) {
            if (acc.Id === this.selectedAccountId) {
                pivotFilteredAccount = acc;
            }
        }
        if (pivotFilteredAccount == null) {
            for (let day of this.days) {
                for (let acc of day.accounts) {
                    if (acc.Id === this.selectedAccountId) {
                        pivotFilteredAccount = acc;
                    }
                }
            }
        }
        if (pivotFilteredAccount == null) {
            pivotFilteredAccount = await getAccount({accountId: this.selectedAccountId});
        }
        console.log('calculateDistance pivotFilteredAccount:', JSON.stringify(pivotFilteredAccount));


        let cityNameTransformed = null;
        if (pivotFilteredAccount != null && pivotFilteredAccount.ShippingCity && pivotFilteredAccount.ShippingCity != null) {
            cityNameTransformed = pivotFilteredAccount.ShippingCity.replace(/\s/g, '')
                .replace(/á/g, 'a')
                .replace(/é/g, 'e')
                .replace(/í/g, 'i')
                .replace(/ó/g, 'o')
                .replace(/ö/g, 'o')
                .replace(/ő/g, 'o')
                .replace(/ú/g, 'u')
                .replace(/ü/g, 'u')
                .replace(/ű/g, 'u')
                .replace(/š/g, 's');
        }
        if (cityNameTransformed==null && pivotFilteredAccount != null && pivotFilteredAccount.BillingCity && pivotFilteredAccount.BillingCity != null) {
            cityNameTransformed = pivotFilteredAccount.BillingCity.replace(/\s/g, '')
                .replace(/á/g, 'a')
                .replace(/é/g, 'e')
                .replace(/í/g, 'i')
                .replace(/ó/g, 'o')
                .replace(/ö/g, 'o')
                .replace(/ő/g, 'o')
                .replace(/ú/g, 'u')
                .replace(/ü/g, 'u')
                .replace(/ű/g, 'u')
                .replace(/š/g, 's');
        }
        console.log('calculateDistance cityNameTransformed: ', cityNameTransformed);

        // find pivot city in distancesCached
        let distancesFromPivotcity = [];
        if (this.distancesCached && cityNameTransformed != null && this.distancesCached[cityNameTransformed]) {
            distancesFromPivotcity = this.distancesCached[cityNameTransformed];
        }
        // for (let distanceObject of this.distancesCached) {
        //     if (distanceObject.city1 === pivotFilteredAccount.BillingCity) {
        //         distancesFromPivotcity[distanceObject.city2] = distanceObject.distance;
        //     }
        // }
        console.log('calculateDistance distancesFromPivotcity: ', distancesFromPivotcity);

        if (this.cachedDistanceMeasureMdt!=='no cache' && distancesFromPivotcity.length >= 1) {
            // Pivot Cached!
            for (let i = 0; i < this.filteredAccounts.length; i++) {
                if (this.filteredAccounts[i].ShippingCity) {
                    for (const distanceObject of distancesFromPivotcity) {
                        if (distanceObject.b === this.filteredAccounts[i].ShippingCity) {
                            this.filteredAccounts[i].distanceFromCurrent = +distanceObject.d;
                            console.log('cached distance set filteredAccounts[' + i + '].distanceFromCurrent: ', this.filteredAccounts[i].distanceFromCurrent);
                        }
                    }
                    //this.filteredAccounts[i].distanceFromCurrent = distancesFromPivotcity[this.filteredAccounts[i].BillingCity];
                }
                if (!this.filteredAccounts[i].ShippingCity && this.filteredAccounts[i].BillingCity) {
                    for (const distanceObject of distancesFromPivotcity) {
                        if (distanceObject.b === this.filteredAccounts[i].BillingCity) {
                            this.filteredAccounts[i].distanceFromCurrent = +distanceObject.d;
                            console.log('cached distance set filteredAccounts[' + i + '].distanceFromCurrent: ', this.filteredAccounts[i].distanceFromCurrent);
                        }
                    }
                    //this.filteredAccounts[i].distanceFromCurrent = distancesFromPivotcity[this.filteredAccounts[i].BillingCity];
                }

                if (this.filteredAccounts[i].Id && this.filteredAccounts[i].Id === pivotFilteredAccount.Id) {
                    this.filteredAccounts[i].distanceFromCurrent = 0.01;
                }
            }
            for (let day of this.days) {
                for (let j in day.accounts) {
                    if (day.accounts[j].ShippingCity) {
                        for (const distanceObject of distancesFromPivotcity) {
                            if (distanceObject.b === day.accounts[j].ShippingCity) {
                                day.accounts[j].distanceFromCurrent = +distanceObject.d;
                                console.log('cached distance set days.accounts[' + j + '].distanceFromCurrent: ', day.accounts[j].distanceFromCurrent);
                            }
                        }
                    }
                    if (!day.accounts[j].ShippingCity && day.accounts[j].BillingCity) {
                        for (const distanceObject of distancesFromPivotcity) {
                            if (distanceObject.b === day.accounts[j].BillingCity) {
                                day.accounts[j].distanceFromCurrent = +distanceObject.d;
                                console.log('cached distance set days.accounts[' + j + '].distanceFromCurrent: ', day.accounts[j].distanceFromCurrent);
                            }
                        }
                    }

                    if (day.accounts[j].Id && day.accounts[j].Id === pivotFilteredAccount.Id) {
                        day.accounts[j].distanceFromCurrent = 0.01;
                    }
                }
            }

            for (let day of this.days) {
                day.accounts = [...day.accounts];
            }
            this.days = [...this.days];
            console.log('days after cached measure: ', JSON.parse(JSON.stringify(this.days)));
            this.filteredAccounts = [...this.filteredAccounts];
            this.sortByDistance = true;
            this.sortAccounts();
        } else {
            // Pivot Not Cached, need user to wait for it.

            // no need to calculate if no accounts in filteredAccounts:
            if (this.filteredAccounts && this.filteredAccounts.length <= 1) {
                console.log('no need to calculate if no accounts in filteredAccounts; length: ', this.filteredAccounts.length);
                //return;
            }

            console.log('filteredAccounts before Not cached távolságmérés: ', JSON.parse(JSON.stringify(this.filteredAccounts)));
            // filteredAccounts id-jai:
            let filteredAccountIds = [];
            for (const account of this.filteredAccounts) {
                if (account.Id) {
                    filteredAccountIds.push(account.Id);
                }
            }
            console.log('filteredAccountIds: ', filteredAccountIds);
            // days.accounts id-jai:
            const daysAccountsIds = [];
            for (let day of this.days) {
                for (let acc of day.accounts) {
                    if (acc.Id) {
                        daysAccountsIds.push(acc.Id);
                    }
                }
            }
            console.log('daysAccountsIds: ', daysAccountsIds);

            const jsonMap = JSON.stringify({
                pivotFilteredAccount: pivotFilteredAccount,
                filteredAccountIds: filteredAccountIds,
                daysAccountsIds: daysAccountsIds
            });
            console.log('jsonMap: ', jsonMap);

            const jsonNotCachedDistances = await getNotCachedDistances({jsonMap: jsonMap});
            console.log('jsonNotCachedDistances: ', jsonNotCachedDistances);

            let notCachedDistances = JSON.parse(jsonNotCachedDistances);
            console.log('notCachedDistances: ', notCachedDistances);

            for (let i = 0; i < this.filteredAccounts.length; i++) {
                if (this.filteredAccounts[i].Id && notCachedDistances[this.filteredAccounts[i].Id]==0) this.filteredAccounts[i].distanceFromCurrent = 0.01;
                else if (this.filteredAccounts[i].Id && notCachedDistances[this.filteredAccounts[i].Id]) {
                    this.filteredAccounts[i].distanceFromCurrent = +notCachedDistances[this.filteredAccounts[i].Id];
                } else {
                    // if (this.filteredAccounts[i].Id && this.filteredAccounts[i].Id!==pivotFilteredAccount.Id) this.filteredAccounts[i].distanceFromCurrent = TP_No_geolocation_available;
                }
            }
            for (let day of this.days) {
                for (let j in day.accounts) {
                    if (day.accounts[j].Id && notCachedDistances[day.accounts[j].Id]==0) day.accounts[j].distanceFromCurrent = 0.01;
                    else if (day.accounts[j].Id && notCachedDistances[day.accounts[j].Id]) {
                        day.accounts[j].distanceFromCurrent = +notCachedDistances[day.accounts[j].Id];
                    } else {
                        // if (day.accounts[j].Id && day.accounts[j].Id!==pivotFilteredAccount.Id) day.accounts[j].distanceFromCurrent = TP_No_geolocation_available;
                    }
                }
            }

            // re-render and sort by distances:
            for (let day of this.days) {
                day.accounts = [...day.accounts];
            }
            this.days = [...this.days];
            console.log('days after notcached measure: ', JSON.parse(JSON.stringify(this.days)));
            this.filteredAccounts = [...this.filteredAccounts];
            this.sortByDistance = true;
            this.sortAccounts();
        }


    }

    handleSaveClick() {
        // TODO - handleSaveClick
    }

    handleRemoveFiltersButton() {
        //this.globalSpinner = true;
        this.enteredTimeNumber = null;
        this.selectedMeasure = 'day';
        this.lastVisitDate = null;
        this.selectedOwner = 'own';
        this.selectedHandlingGroupNarrowestLevels = [];
        this.selectedSalesGroups = [];
        this.selectedASCGroups = [];
        this.selectedAccTypes = [];
        this.searchWord = '';
        this.tooManyAccountsLimit = this.sliderMax;
        this.resetCategoryButtons();
        this.resetInputFields();
        //await this.loadResponse();
        //await this.logLimitsOfThisSFTransaction('handleRemoveFiltersButton');
        //this.globalSpinner = false;
        this.filterAccountsNow(null);
    }

    resetInputFields() {
        this.template.querySelectorAll('lightning-input').forEach(element => {
            if (element.type === 'checkbox' || element.type === 'checkbox-button') {
                element.checked = false;
            } else {
                element.value = null;
            }
        });
    }

    resetCategoryButtons() {
        for (let icon of this.icons) {
            icon.selected = false;
            icon.style = "border : solid;";
        }
    }

    async handleFilterButtonClick() {
        this.globalSpinner = true;
        //console.log('Start of handleFilterButtonClick');


        this.cityFilterOptions = [];
        this.regionOptions = [];

        //account category id arrays
        this.fallbackAccountIds = [];          //visszaesett vevők
        this.openTaskAccountIds = [];
        this.inactiveAccountIds = [];
        this.hugeProposalAccountIds = [];     //nagy ajánlattal rendelkező
        this.highOpenPotentialAccountIds = []; //nyitott potentciál magas
        this.leadStatusAccountIds = [];

        //telepre szűrt id map
        this.regionsToAccountIdsMap = null;

        this.days = [];

        this.showMapModal = false;
        this.showDeleteAllDialog = false;
        this.showCreateEventsDialog = false;
        this.sortByDistance = false;


        this.showAllAccounts = true;
        this.showAllAccounts = false;

        this.dayAccounts = [];
        this.weekEvents = [];

        this.selectedRegions = [];
        this.selectedHandlingGroupNarrowestLevels = [];
        this.selectedSalesGroups = [];
        this.selectedASCGroups = [];
        this.selectedOwner = 'own';

        this.scrollMode = true;

        this.isLoading = false;

        this.legendVisible = false;
        this.isFilterBarOpen = false;
        this.isFooterLegendOpen = false;
        this.showLastVisitText = false;

        this.selectedSubType = 'Normál látogatás';

        for (let i of this.icons) {
            i.selected = false;
            i.style = 'border : solid;';
        }

        this.device = this.getDevice();
        if (this.device === 'Windows') {
            this.scrollMode = false;
        }
        //console.log('handleFilterButtonClick device', this.device);

        //set starting date to the current day
        this.selectedDate = new Date().toISOString();

        // let regions = await getAllRegions();
        // this.regionOptions = this.initRegionOptions(regions);
        //console.log('handleFilterButtonClick regionOptions', JSON.stringify(this.regionOptions));

        // this.regionValueLabelPairs = await regionValueLabelPairs();
        //console.log('handleFilterButtonClick regionValueLabelPairs', this.regionValueLabelPairs);

        // let handlingGroupNarrowestLevels = await getAllHandlingGroupNarrowestLevels();
        // ["Budapest","Call Center","Lemez","Megmunkálás","Miskolc","Pécs","Telep","Zalaegerszeg","Építőipar"]
        // this.handlingGroupNarrowestLevelOptions = this.initHandlingGroupNarrowestLevelOptions(handlingGroupNarrowestLevels);
        //
        // let salesGroups = await getAllSalesGroupsSorted();
        // this.salesGroupOptions = this.initSalesGroupOptions(salesGroups);
        //
        // let ASCGroups = await getAllASCGroups();
        // this.ASCGroupOptions = this.initASCGroupOptions(ASCGroups);

        //load filters from apex
        await this.loadFilteredRecords();

        //get the starting date of the selected week
        this.startOfSelectedWeek = this.getStartOfWeek(this.selectedDate);
        this.oldDate = this.startOfSelectedWeek;
        //console.log('handleFilterButtonClick selectedDate', this.selectedDate);
        //console.log('handleFilterButtonClick startOfSelectedWeek', this.startOfSelectedWeek);

        //load accounts from salesforce
        await this.loadResponse(true);
        this.weekEvents = await getEvents({
            weekStart: this.startOfSelectedWeek,
            erintettVagyokE: this.selectedOwner === 'own'
        });
        //console.log('handleFilterButtonClick weekEvents', JSON.stringify(this.weekEvents));
        await this.initDays();

        //await this.logLimitsOfThisSFTransaction('handleFilterButtonClick');

        //console.log('End of handleFilterButtonClick');
        this.globalSpinner = false;
    }

    openFilterSidebar(template) {
        console.log('openFilterSidebar start');
        template.querySelector(".filter-sidebar").style.width = "250px";
        console.log('openFilterSidebar after width');
        template.querySelector(".filter-sidebar").style.minWidth = "250px";
        template.querySelector(".filter-sidebar").style.border = "1px solid black";
        template.querySelector(".filter-sidebar").style.borderLeft = "0px";
        console.log('openFilterSidebar before isFilterBarOpen');
        this.isFilterBarOpen = true;
        console.log('openFilterSidebar end');
    }

    closeFilterSidebar() {
        this.template.querySelector(".filter-sidebar").style.width = "0";
        this.template.querySelector(".filter-sidebar").style.minWidth = "0";
        this.template.querySelector(".filter-sidebar").style.border = "0";
        this.isFilterBarOpen = false;
    }

    handleFooterIconClock() {
        if (this.isFooterLegendOpen === true) {
            this.closeFooterLegend();
        } else {
            this.openFooterLegend();
        }
    }

    openFooterLegend() {
        this.template.querySelector(".footer-legend").style.height = "25px";
        this.template.querySelector(".footer-legend").style.minHeight = "25px";
        this.template.querySelector(".icon-container-footer").style.display = "flex";
        this.isFooterLegendOpen = true;
    }

    closeFooterLegend() {
        this.template.querySelector(".footer-legend").style.height = "0";
        this.template.querySelector(".footer-legend").style.minHeight = "0";
        this.template.querySelector(".icon-container-footer").style.display = "none";
        this.isFooterLegendOpen = false;
    }

    // getRegionValueLabelPairs() promise bugos?
    // async getRegionValueLabelPairs() {
    //     let regionValueLabelPairs = await regionValueLabelPairs();
    //     console.log('getRegionValueLabelPairs regionValueLabelPairs', regionValueLabelPairs);
    //     return regionValueLabelPairs;
    // }

    async handleRegionChange(event) {
        this.globalSpinner = true;
        // let regionValueLabelPairs = this.getRegionValueLabelPairs();
        //console.log('handleRegionChange regionValueLabelPairs', this.regionValueLabelPairs);

        this.selectedRegions = event.detail.value;
        //console.log('handleRegionChange selectedRegions', JSON.stringify(this.selectedRegions));

        // handleRegionChange selectedRegions ["Budapest"]
        // handleRegionChange selectedRegions ["Budapest","Export"]
        // this.loadResponse().then(value => {
        //     console.log('handleRegionChange loadResponse value', value)
        // }).catch(reason => {
        //     console.error('handleRegionChange loadResponse reason', reason)
        // });
        if (this.selectedRegions.length <= 0) {
            await this.loadResponse(true);
        } else if (this.selectedRegions.length >= 1) {
/*            getAccountsByRegions({regions: this.selectedRegions})
                .then(async value => {
                    // console.log('handleRegionChange getAccountsByRegions value', value);
                    // {Bratislava: Array(0), Budapest: Array(3), Debrecen: Array(0), Export: Array(2), Győr: Array(0), ... }
                    this.regionsToAccountIdsMap = value;
                    // console.log('handleRegionChange regionsToAccountIdsMap', this.regionsToAccountIdsMap);
                    // console.log('handleRegionChange filteredAccounts before', JSON.stringify(this.filteredAccounts));

                    this.filteredAccounts = this.filteredAccounts.filter(account => {
                        // console.log('handleRegionChange filter account', JSON.stringify(account));
                        //let accountId = account.Id;
                        // console.log('handleRegionChange filter account.Id', account.Id);
                        //let accountRegionValue = account.Region__c;
                        //console.log('handleRegionChange filter accountRegionValue', accountRegionValue);
                        let accountRegionLabel = this.regionValueLabelPairs[account.Region__c];
                        //console.log('handleRegionChange filter accountRegionLabel', accountRegionLabel);

                        return this.selectedRegions.indexOf(accountRegionLabel) < 0;
                    });
                    //console.log('handleRegionChange filteredAccounts after', JSON.stringify(this.filteredAccounts));
                    //await this.logLimitsOfThisSFTransaction('handleRegionChange getAccountsByRegions');
                    this.globalSpinner = false;
                })
                .catch(reason => {
                    console.error('handleRegionChange getAccountsByRegions reason', reason);
                    this.globalSpinner = false;
                });*/
        }
        //this.globalSpinner = false;
    }

    handleAccTypeChange(event) {
        this.selectedAccTypes = event.detail.value;
        this.filterAccountsNow(event);
    }

    async handleHandlingGroupNarrowestLevelChange(event) {
        //let oldLength = this.selectedHandlingGroupNarrowestLevels.length;
        this.selectedHandlingGroupNarrowestLevels = event.detail.value;
        //let newLength = this.selectedHandlingGroupNarrowestLevels.length;
        console.log('handleHandlingGroupNarrowestLevelChange selectedHandlingGroupNarrowestLevels', JSON.stringify(this.selectedHandlingGroupNarrowestLevels));
        // ["Lemez","Miskolc"]

        // this.loadResponse().then(value => {
        //     //console.log('handleHandlingGroupNarrowestLevelChange loadResponse value', value)
        //     if (this.selectedHandlingGroupNarrowestLevels.length <= 0) {
        //         console.log('handleHandlingGroupNarrowestLevelChange selectedHandlingGroupNarrowestLevels is empty!');
        //     } else if (this.selectedHandlingGroupNarrowestLevels.length >= 1) {
        //         getAccountsByHandlingGroupNarrowestLevels({handlingGroupNarrowestLevels: this.selectedHandlingGroupNarrowestLevels})
        //             .then(value => {
        //                 console.log('handleHandlingGroupNarrowestLevelChange getAccountsByHandlingGroupNarrowestLevels value', value); // OK
        //                 this.filteredAccounts = this.filteredAccounts.filter(account => {
        //                     let accountId = account.Id;
        //                     if (accountId && accountId != null) {
        //                         for (let found of value) {
        //                             if (found.Id == accountId) {
        //                                 return true;
        //                             }
        //                         }
        //                     } else {
        //                         return true;
        //                     }
        //                     return false;
        //                 });
        //             })
        //             .catch(reason => {
        //                 console.error('handleHandlingGroupNarrowestLevelChange getAccountsByHandlingGroupNarrowestLevels reason', reason);
        //             });
        //     }
        // }).catch(reason => {
        //     console.error('handleHandlingGroupNarrowestLevelChange loadResponse reason', reason)
        // });

        // if (this.selectedHandlingGroupNarrowestLevels.length <= 0 || newLength < oldLength) {
        //     console.log('handleHandlingGroupNarrowestLevelChange before loadResponse');
        //     await this.loadResponse();
        //     console.log('handleHandlingGroupNarrowestLevelChange after loadResponse');
        // }
        console.log('handleHandlingGroupNarrowestLevelChange filteredSpinner before filteredSpinner = true', this.filteredSpinner);
        //this.filteredSpinner = true;
        console.log('handleHandlingGroupNarrowestLevelChange filteredSpinner after filteredSpinner = true', this.filteredSpinner);
        //await this.loadResponse();
        console.log('handleHandlingGroupNarrowestLevelChange after loadResponse');
        /*        if (this.selectedHandlingGroupNarrowestLevels.length >= 1) {
                    console.log('handleHandlingGroupNarrowestLevelChange before calling getAccountsByHandlingGroupNarrowestLevels');
                    getAccountIdsByHandlingGroupNarrowestLevels({
                        handlingGroupNarrowestLevels: this.selectedHandlingGroupNarrowestLevels,
                        erintettVagyokE: this.selectedOwner === 'own'
                    })
                        .then(async value => {
                            console.log('handleHandlingGroupNarrowestLevelChange getAccountsByHandlingGroupNarrowestLevels value', value); // OK
                            this.filteredAccounts = this.filteredAccounts.filter(account => {
                                if (account.type === eventTypes.Other) {
                                    return true;
                                }
                                if (value.includes(account.Id)) {
                                    //console.log('value.includes account.Id; account: ', JSON.stringify(account));
                                    return true;
                                } else {
                                    return false;
                                }
                            });

                            console.log('handleHandlingGroupNarrowestLevelChange filteredSpinner before filteredSpinner = false', this.filteredSpinner);
                            //this.template.querySelector('.filter-sidebar').style.backgroundColor='red';
                            //await this.logLimitsOfThisSFTransaction('handleHandlingGroupNarrowestLevelChange getAccountIdsByHandlingGroupNarrowestLevels');
                            this.filteredSpinner = false;
                            console.log('handleHandlingGroupNarrowestLevelChange filteredSpinner after filteredSpinner = false', this.filteredSpinner);
                        })
                        .catch(reason => {
                            console.error('handleHandlingGroupNarrowestLevelChange getAccountsByHandlingGroupNarrowestLevels reason', reason);
                            this.filteredSpinner = false;
                        });
                } else {
                    this.filteredSpinner = false;
                }*/

        // if (this.selectedOwner === 'all') {
        //     this.filteredSpinner = true;
        // }
        this.filterAccountsNow(event);
        // this.filteredSpinner = false;

        //this.globalSpinner = false;
    }

    async handleASCGroupChange(event) {
        this.selectedASCGroups = event.detail.value;
        //console.log('handleASCGroupChange selectedASCGroups: ', JSON.stringify(this.selectedASCGroups));
        // for (let i = 0; i < this.selectedSalesGroups.length; i++) {
        //     this.selectedSalesGroups[i] = this.selectedSalesGroups[i].trim();
        // }

        /*        if (this.selectedASCGroups.length <= 0) {
                    //this.globalSpinner=true;
                    await this.loadResponse();
                    //this.globalSpinner=false;
                } else {
                    getAccountsByASCGroups({ASCGroups: this.selectedASCGroups, erintettVagyokE: this.selectedOwner === 'own'})
                        .then(async accounts => {
                            //console.log('handleASCGroupChange getAccountsByASCGroups accounts', accounts);
                            //console.log('handleASCGroupChange filteredAccounts before filter', JSON.parse(JSON.stringify(this.filteredAccounts)));
                            this.filteredAccounts = this.filteredAccounts.filter(account => {
                                let accountId = account.Id;
                                if (accountId && accountId != null) {
                                    for (let found of accounts) {
                                        if (found.Id === accountId) {
                                            return true;
                                        }
                                    }
                                } else {
                                    return true;
                                }
                                return false;
                            });
                            //console.log('handleASCGroupChange filteredAccounts after filter', JSON.parse(JSON.stringify(this.filteredAccounts)));
                            //await this.logLimitsOfThisSFTransaction('handleASCGroupChange getAccountsByASCGroups');
                        })
                        .catch(rejectedReason => {
                            console.error('handleASCGroupChange getAccountsByASCGroups rejectedReason', rejectedReason);
                        });
                }*/
        // if (this.selectedOwner === 'all') {
        //     this.filteredSpinner = true;
        // }
        this.filterAccountsNow(event);
        // this.filteredSpinner = false;
    }

    handleOwnerChange(event) {
        this.selectedOwner = event.detail.value;
    }

    handleTimeNumberChange(event) {
        console.log('handleTimeNumberChange start; event: ', event);
        if (event.detail) {
            this.enteredTimeNumber = +event.detail.value;
            console.log('handleTimeNumberChange enteredTimeNumber: ', this.enteredTimeNumber);
            this.lastVisitDate = null;
        }
    }

    handleTimeNumberDefocused() {
        console.log('handleTimeNumberDefocused start');
        /*        this.filteredSpinner = true;
                // if (event.detail) {
                //     this.enteredTimeNumber = +event.detail.value;
                if (this.enteredTimeNumber != null && this.enteredTimeNumber > 0) {
                    await this.handleLastVisitTextChange();
                } else {
                    await this.loadResponse();
                }
                // }
                //await this.logLimitsOfThisSFTransaction('handleTimeNumberDefocused');
                this.filteredSpinner = false;*/

        //this.lastVisitDate = null;
        // if (this.selectedOwner === 'all') {
        //     this.filteredSpinner = true;
        // }
        if (this.enteredTimeNumber != null && this.enteredTimeNumber > 0) {
            this.handleLastVisitTextChange();
        }
        //this.filterAccountsNow(null);
        // this.filteredSpinner = false;
    }

    async handleTimeMeasureChange(event) {
        //this.filteredSpinner = true;
        this.selectedMeasure = event.detail.value;
        if (this.enteredTimeNumber != null && this.enteredTimeNumber > 0) {
            this.handleLastVisitTextChange();
        } /*else {
            await this.loadResponse();
        }*/
        //await this.logLimitsOfThisSFTransaction('handleTimeMeasureChange');
        //this.filteredSpinner = false;
        // if (this.selectedOwner === 'all') {
        //     this.filteredSpinner = true;
        // }
        //this.filterAccountsNow(event);
        // this.filteredSpinner = false;
    }

    handleLastVisitTextChange() {
        // console.log('handleLastVisitTextChange enteredTimeNumber', this.enteredTimeNumber);
        // console.log('handleLastVisitTextChange selectedMeasure', this.selectedMeasure); // week
        let today = new Date(Date.now());
        let targetDate = new Date();
        switch (this.selectedMeasure) {
            case "day": {
                targetDate.setDate(today.getDate() - (+this.enteredTimeNumber));
                break;
            }
            case "week": {
                targetDate.setDate(today.getDate() - (+this.enteredTimeNumber * 7));
                break;
            }
            case "month": {
                targetDate.setMonth(today.getMonth() - (+this.enteredTimeNumber));
                break;
            }
            case "year": {
                targetDate.setFullYear(today.getFullYear() - (+this.enteredTimeNumber));
                break;
            }
            default:
                break;
        }

        console.log('handleLastVisitTextChange targetDate', targetDate);

        /*        let accountsWithLastMMinutesBefore = await getAccountsWithLastMMinutesBefore({
                    beforeThisDate: targetDate,
                    erintettVagyokE: this.selectedOwner === 'own'
                });
                // console.log('handleLastVisitTextChange accountsWithLastMMinutesBefore', accountsWithLastMMinutesBefore);
                let accountIdsWithLastMMinutesBefore = new Set();
                for (let acc of accountsWithLastMMinutesBefore) {
                    accountIdsWithLastMMinutesBefore.add(acc.Id);
                }
                await this.loadResponse();
                this.filteredAccounts = this.filteredAccounts.filter(account => accountIdsWithLastMMinutesBefore.has(account.Id));*/
        //await this.logLimitsOfThisSFTransaction('handleLastVisitTextChange');

        this.lastVisitDate = targetDate;
        // if (this.selectedOwner === 'all') {
        //     this.filteredSpinner = true;
        // }
        this.filterAccountsNow(null);
        // this.filteredSpinner = false;
    }

    async handleNextButtonClick() {
        const result = await TripPlannerEventEditorPopup.open({
            size: 'large',
            description: 'Accessible description of modal\'s purpose',
            content: 'Passed into content api',
            days: this.days,
            startOfSelectedWeek: this.startOfSelectedWeek
        });


    }

    async handleLastVisitDateChange(event) {
        //this.filteredSpinner = true;
        this.lastVisitDate = event.detail.value;
        /*await this.loadResponse();
        if (this.lastVisitDate) {
            //this.globalSpinner = true;
            //console.log('handleLastVisitDateChange chosenDate', chosenDate);
            // "2023-08-24"
            let accountsWithLastMMinutesBefore = await getAccountsWithLastMMinutesBefore({
                beforeThisDate: this.lastVisitDate,
                erintettVagyokE: this.selectedOwner === 'own'
            });
            // console.log('handleLastVisitDateChange accountsWithLastMMinutesBefore', accountsWithLastMMinutesBefore);
            let accountIdsWithLastMMinutesBefore = new Set();
            for (let acc of accountsWithLastMMinutesBefore) {
                accountIdsWithLastMMinutesBefore.add(acc.Id);
            }
            this.filteredAccounts = this.filteredAccounts.filter(account => accountIdsWithLastMMinutesBefore.has(account.Id));
            //this.globalSpinner = false;
        } else {
            //console.log('handleLastVisitDateChange - user cleared date field.')
        }
        //await this.logLimitsOfThisSFTransaction('handleLastVisitDateChange');
        this.filteredSpinner = false;*/

        this.enteredTimeNumber = null;
        // if (this.selectedOwner === 'all') {
        //     this.filteredSpinner = true;
        // }
        this.filterAccountsNow(event);
        // this.filteredSpinner = false;
    }

    async handleOwnerRadioButtonSelectedChange(event) {
        //console.log('handleOwnerRadioButtonSelectedChange start; filteredAccounts: ', JSON.parse(JSON.stringify(this.filteredAccounts)));

        // this.globalSpinner = true; // újratöltené az oldalt!
        console.log('handleOwnerRadioButtonSelectedChange filteredSpinner before filteredSpinner = true', this.filteredSpinner);
        //this.filteredSpinner = true;
        console.log('handleOwnerRadioButtonSelectedChange filteredSpinner after filteredSpinner = true', this.filteredSpinner);

        this.selectedOwner = event.detail.value;

        /*await this.loadFilteredRecords();

        this.data = await getResponse({
            getAllAccounts: this.showAllAccounts,
            erintettVagyokE: this.selectedOwner === 'own'
        });
        console.log('loadResponse data', this.data);
        if (this.data.length === 0) {
            console.log('handleOwnerRadioButtonSelectedChange filteredSpinner before filteredSpinner = false', this.filteredSpinner);
            this.filteredSpinner = false;
            console.log('handleOwnerRadioButtonSelectedChange filteredSpinner after filteredSpinner = false', this.filteredSpinner);
            return;
        }

        this.data.accounts.forEach(account => {
            this.initAccountFields(account);
        });

        for (let i = 0; i < this.data.accounts.length; i++) {
            let currentAccount = this.data.accounts[i];
            this.initColors(currentAccount, 'midnightblue')
        }

        this.initFilterOptions();
        //console.log('handleOwnerRadioButtonSelectedChange before applyFilters; filteredAccounts: ', JSON.parse(JSON.stringify(this.filteredAccounts)));
        await this.applyFilters();
        //console.log('handleOwnerRadioButtonSelectedChange after applyFilters; filteredAccounts: ', JSON.parse(JSON.stringify(this.filteredAccounts)));

        switch (this.selectedOwner) {
            case "own": {
                let accIdsToFilter = [];
                for (let acc of this.filteredAccounts) {
                    if (acc.Id && acc.Id != null) {
                        accIdsToFilter.push(acc.Id);
                    }
                }
                //console.log('accIdsToFilter', accIdsToFilter);
                let erintettAccounts = await getErintettAccountsOf({accountIdsToFilter: accIdsToFilter});
                //console.log('own erintettAccounts', erintettAccounts); // pedig benne van több mint 2000 Account.Id
                //this.filteredAccounts = this.filteredAccounts.filter(account => erintettAccounts.includes(account.Id) || account.type === 0);
                this.filteredAccounts = this.filteredAccounts.filter(account => {
                    if (account.type === 0) {
                        return true;
                    }

                    //console.log('Érintett vagyok szűrés; account: ', JSON.parse(JSON.stringify(account)));
                    //console.log('erintettAccounts-ban benne van-e account.Id? ', erintettAccounts.includes(account.Id));
                    return erintettAccounts.includes(account.Id);
                });
                break;
            }
            case "all": {
                break;
            }
            default:
                break;
        }

        this.weekEvents = await getEvents({
            weekStart: this.startOfSelectedWeek,
            erintettVagyokE: this.selectedOwner === 'own'
        });
        //console.log('handleOwnerRadioButtonSelectedChange weekEvents', JSON.parse(JSON.stringify(this.weekEvents)));
        await this.initDays();
        //console.log('handleOwnerRadioButtonSelectedChange filteredAccounts before sorting: ', JSON.parse(JSON.stringify(this.filteredAccounts)));
        this.sortAccounts();
        //console.log('handleOwnerRadioButtonSelectedChange filteredAccounts before slicing: ', JSON.parse(JSON.stringify(this.filteredAccounts)));
        if (this.selectedOwner === 'own') {
            this.filteredAccounts = this.filteredAccounts.slice(0, this.visibleAccountsLimit);
            //console.log('handleOwnerRadioButtonSelectedChange sliced filteredAccounts: ', JSON.parse(JSON.stringify(this.filteredAccounts)));
        }

        //console.log('handleOwnerRadioButtonSelectedChange end; filteredAccounts: ', JSON.parse(JSON.stringify(this.filteredAccounts)));

        console.log('handleOwnerRadioButtonSelectedChange filteredSpinner before filteredSpinner = false', this.filteredSpinner);
        //await this.logLimitsOfThisSFTransaction('handleOwnerRadioButtonSelectedChange');
        this.filteredSpinner = false;
        console.log('handleOwnerRadioButtonSelectedChange filteredSpinner after filteredSpinner = false', this.filteredSpinner);
        this.globalSpinner = false;*/
        // if (this.selectedOwner === 'all') {
        //     this.filteredSpinner = true;
        // }
        this.filterAccountsNow(event);
        // this.filteredSpinner = false;
    }

    async handleAccountSelectSlow(event) {
        console.log('handleAccountSelectSlow start; event.detail: ', JSON.stringify(event.detail));

        this.globalSpinner = true;

        await this.loadResponse(false);
        //console.log(event.detail);
        this.selectedAccountId = event.detail.accountId;
        console.log('handleAccountSelectSlow selectedAccountId: ', this.selectedAccountId);
        console.log('handleAccountSelectSlow data: ', this.data);
        this.data.accounts.forEach(account => {
           account.style = account.style.replace('filter: brightness(120%);', '');
//             account.style = account.style.replace('background-color : white;', 'background-color : #ADD8E6;');
        });
        console.log('handleAccountSelectSlow forEach ran');
        console.log('handleAccountSelectSlow data.accounts: ', this.data.accounts);
        let pivotAccount = this.data.accounts.find(element => element.Id === this.selectedAccountId);
        console.log('handleAccountSelectSlow pivotAccount before nested for: ', pivotAccount);
        for (let day of this.days) {
            for (let account of day.accounts) {
                // account.style = account.style.replace('background-color : white;', 'background-color : #ADD8E6;');
                //console.log('account', account);
                if (account.Id === this.selectedAccountId) {
//                    account.style += "filter: brightness(120%);";
                    account.style.replace('background-color : #ADD8E6;', 'background-color : white;')
                }
            }
        }
//        pivotAccount.style += "filter: brightness(120%);";
        pivotAccount.style.replace('background-color : #ADD8E6;', 'background-color : white;');
        console.log('handleAccountSelectSlow pivotAccount after nested for: ', pivotAccount);
        console.log('handleAccountSelectSlow pivotAccount.style: ', pivotAccount.style);

        this.filteredAccounts = [...this.filteredAccounts];
        this.days.forEach(day => day.accounts = [...day.accounts]);
        this.days = [...this.days];

        this.globalSpinner = false;

        this.filterAccountsNow(null);

        const toastEvent = new ShowToastEvent({
            title: 'Info',
            message: 'Kiválasztásra került elem: ' + this.selectedAccountId + '. Kattintson a Távolság gombra a szűrt elemek tőle mért távolságainak meghatározásához!',
            variant: 'info',
            mode: 'dismissable'
        });
        this.dispatchEvent(toastEvent);
    }

    async handleAccountSelect(event) {
        this.selectedAccountId = event.detail.accountId;
        console.log('handleAccountSelect selectedAccountId: ', this.selectedAccountId);

        for (let day of this.days) {
            for (let account of day.accounts) {
                if (!account.style) {
                    account.style = '';
                }
                account.style = account.style.replace('background-color:white;', 'background-color:#ADD8E6;');
                if (account.Id === this.selectedAccountId) {
                   account.style += "filter: brightness(120%);";
                    console.log('handleAccountSelect account.style before whitening: ', account.style);
                    // account.style = account.style.replace('background-color:#ADD8E6;', 'background-color:white;');
                    console.log('handleAccountSelect account.style after whitening: ', account.style);
                } else {
                    account.style = account.style.replace('filter: brightness(120%);', '');
                }
            }
        }

        //this.filterAccountsNow(null);

        for (let i = 0; i < this.filteredAccounts.length; i++) {
            this.filteredAccounts[i].distanceFromCurrent=null;

            if (!this.filteredAccounts[i].style) {
                this.filteredAccounts[i].style = '';
            }
            // this.filteredAccounts[i].style = this.filteredAccounts[i].style.replace('background-color : white;', 'background-color : #ADD8E6;');
            if (this.filteredAccounts[i].Id === this.selectedAccountId) {
               this.filteredAccounts[i].style += "filter: brightness(120%);";
                // this.filteredAccounts[i].style.replace('background-color : #ADD8E6;', 'background-color : white;')
            } else {
                this.filteredAccounts[i].style = this.filteredAccounts[i].style.replace('filter: brightness(120%);', '');
            }
        }


        this.pivotSelectedAccount = this.filteredAccounts.find(element => element.Id && element.Id === this.selectedAccountId);

        if (!this.pivotSelectedAccount) {
            this.pivotSelectedAccount = await getAccount({accountId: this.selectedAccountId});
        }

        this.pivotSelectedAccount.distanceFromCurrent = 0.01;
        for (let i in this.filteredAccounts) {
            if (this.filteredAccounts[i].Id === this.selectedAccountId) {
                this.filteredAccounts[i].distanceFromCurrent = 0.01;
            }
        }
        for (let day of this.days) {
            for (let j in day.accounts) {
                day.accounts[j].distanceFromCurrent = null;
                if (day.accounts[j].Id === this.selectedAccountId) {
                    day.accounts[j].distanceFromCurrent = 0.01;
                }
            }
        }

        console.log('handleAccountSelect pivotSelectedAccount: ', JSON.stringify(this.pivotSelectedAccount));

        if (this.pivotSelectedAccount && this.pivotSelectedAccount.style) {
            // this.pivotSelectedAccount.style = this.pivotSelectedAccount.style.replace('background-color : white;', '') + 'background-color : white;';
        }
        if (this.pivotSelectedAccount && !(this.pivotSelectedAccount.ShippingCity || this.pivotSelectedAccount.BillingCity)) {
            const toastEvent = new ShowToastEvent({
                title: 'Warning',
                message: 'A kiválasztásra került elem: ' + this.selectedAccountName + ' pontos címadatai nincsenek kitöltve, így tőle távolság nem mérhető!',
                variant: 'info',
                mode: 'dismissable'
            });
            this.dispatchEvent(toastEvent);
        }

        this.filteredAccounts = [...this.filteredAccounts];
        console.log('filteredAccounts after recolouring: ', JSON.parse(JSON.stringify(this.filteredAccounts)));

        this.days.forEach(day => day.accounts = [...day.accounts]);
        this.days = [...this.days];

        console.log('handleAccountSelect days:', JSON.parse(JSON.stringify(this.days))); // NINCS this.data DE VAN this.days

        this.selectedAccountName = await getAccountName({accountId: this.selectedAccountId});
        const toastEvent = new ShowToastEvent({
            title: 'Info',
            message: 'Kiválasztásra került elem: ' + this.selectedAccountName + '. Kattintson a Távolság gombra a szűrt elemek tőle mért távolságainak meghatározásához!',
            variant: 'info',
            mode: 'dismissable'
        });
        //this.dispatchEvent(toastEvent);
    }

    get isDistanceButtonDisabled() {
        //return this.selectedAccountId == null;
        return false;
    }

/*    get lastVisitHelptext() {
        return this.showLastVisitText ? TP_Info_Utolso_Latogatas_Relativ : TP_Info_Utolso_Latogatas_Abszolut;
    }*/

    handleLimitSliderChange(event) {
        //console.log('handleLimitSliderChange event.detail', JSON.stringify(event.detail));
        this.tooManyAccountsLimit = +event.detail.value;
        //console.log('handleLimitSliderChange new tooManyAccountsLimit', this.tooManyAccountsLimit);
        //this.sortAccounts();
    }

    handleIconInfoButtonClick(event) {
        console.log('handleIconInfoButtonClick event: ', event);
        this.showIconInfoModal = true;
    }

    handleIconInfoModalOKClick(event) {
        console.log('handleIconInfoModalOKClick event before openFilterSidebar: ', event);
        this.openFilterSidebar(this.template);
        console.log('handleIconInfoModalOKClick event before showIconInfoModal: ', event);
        this.showIconInfoModal = false;
        console.log('handleIconInfoModalOKClick event after showIconInfoModal: ', event);
    }

    filterAccountsNow(event) {
        this.filteredSpinner = true;

        let filterOptionsObject = {
            selectedHandlingGroupNarrowestLevels: this.selectedHandlingGroupNarrowestLevels,
            selectedASCGroups: this.selectedASCGroups,
            selectedOwner: this.selectedOwner,
            selectedAccTypes: this.selectedAccTypes,
            lastVisitDate: this.lastVisitDate,
            icons: this.icons,
            tooManyAccountsLimit: this.tooManyAccountsLimit,
            searchWord: this.searchWord,
        };

        let filterOptionsJSON = JSON.stringify(filterOptionsObject);
        console.log('filterAccountsNow filterOptionsJSON: ', JSON.parse(filterOptionsJSON));
        getFilteredAccounts({filterOptionsJSON: filterOptionsJSON})
            .then(async gotFilteredAccounts => {

                // VAGY
                for (let i = 0; i < gotFilteredAccounts.length; i++) {
                    this.initAccountIcons(gotFilteredAccounts[i]);
                }
                console.log('filterAccountsNow getFilteredAccounts gotFilteredAccounts before icon OR filter: ', gotFilteredAccounts);
                let iconFilteredAccounts = [];
                if (this.icons && this.icons.length) {
                    iconFilteredAccounts = gotFilteredAccounts.filter(account => account.categories == null || (account.categories && (
                        (!this.icons[0].selected && !this.icons[1].selected && !this.icons[2].selected && !this.icons[3].selected && !this.icons[4].selected && !this.icons[5].selected)
                        || (this.icons[0].selected && account.categories.high_value_sales)
                        || (this.icons[1].selected && account.categories.open_task)
                        || (this.icons[2].selected && account.categories.fallback)
                        || (this.icons[3].selected && account.categories.high_open_potential)
                        || (this.icons[4].selected && account.categories.lead)
                        || (this.icons[5].selected && account.categories.inactive)
                    )));
                } else {
                    iconFilteredAccounts = [...gotFilteredAccounts];
                }
                console.log('filterAccountsNow getFilteredAccounts iconFilteredAccounts after icon OR filter: ', iconFilteredAccounts);

                this.filteredAccountsRealLength = iconFilteredAccounts.length;
                let slicedFilteredAccounts = iconFilteredAccounts.slice(0, this.tooManyAccountsLimit);

                this.filteredAccounts = [];
                for (const key in this.otherEventTypesByLabel) {
                    let account = {};
                    account.Name = this.otherEventTypesByLabel[key].name;
                    account.displayName = this.otherEventTypesByLabel[key].name;
                    account.type = eventTypes.Other;
                    account.eventType = this.otherEventTypesByLabel[key].value;
                    this.initColors(account, 'white');
                    this.filteredAccounts.push(account);
                }
                //this.filteredAccounts.push(...gotFilteredAccounts);
                this.filteredAccounts.push(...slicedFilteredAccounts);

                for (let i = 1; i < this.filteredAccounts.length; i++) {
                    let currentAccount = this.filteredAccounts[i];
                    this.initColors(currentAccount, 'midnightblue');
                    this.initAccountIcons(currentAccount);
                }

                //await this.initDays();
                console.log('filterAccountsNow filteredAccounts before sortAccounts: ', JSON.parse(JSON.stringify(this.filteredAccounts)));
                this.sortAccounts();
                console.log('filterAccountsNow filteredAccounts after sortAccounts: ', JSON.parse(JSON.stringify(this.filteredAccounts)));

                this.filteredSpinner = false;
            })
            .catch(getFilteredAccountsError => {
                console.log('filterAccountsNow getFilteredAccounts getFilteredAccountsError: ', getFilteredAccountsError);

                this.filteredSpinner = false;
            });
    }
}