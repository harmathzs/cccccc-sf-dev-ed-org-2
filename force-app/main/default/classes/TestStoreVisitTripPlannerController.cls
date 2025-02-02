/**
 * Created by Zsolt Harmath on 2023. 08. 22..
 */

@IsTest
private class TestStoreVisitTripPlannerController {
  // TestStoreVisitTripPlannerController,TestWeeklyStoreVisitController

  @TestSetup
  private static void testData() {
    //Profile prof = [SELECT Id FROM Profile WHERE Name = 'System Administrator'];
    User ownerUser = new User(
      Alias = 'Admint',
      Email = 'AdminUser@azugatask.com',
      EmailEncodingKey = 'UTF-8',
      FirstName = 'Admin',
      LastName = 'task',
      LanguageLocaleKey = 'en_US',
      LocaleSidKey = 'en_US',
      TimeZoneSidKey = 'America/Los_Angeles',
      Username = 'AdminUser@azugatask.com' /*,
      Telephely__c = 'Budapest',
      Telephely_szoveg__c = 'Budapest'*/
    );
    //insert ownerUser;
    User u;
    Account a;
    //User thisUser = [SELECT Id FROM User WHERE Id = :UserInfo.getUserId()];
    // Insert account as current user

    //Profile p = [SELECT Id FROM Profile WHERE Name = 'Standard User'];
    //Profile p = [SELECT Id FROM Profile WHERE Name = 'System Administrator'];
    //System.debug('userroles:' + [SELECT Id, Name FROM UserRole]);
    //UserRole r = [SELECT Id FROM UserRole WHERE Name = 'CEO'];
    u = new User(
      Alias = 'fsmith',
      Email = 'fsmith@acme.com',
      EmailEncodingKey = 'UTF-8',
      LastName = 'F.Smith',
      LanguageLocaleKey = 'en_US',
      LocaleSidKey = 'en_US',
      TimeZoneSidKey = 'America/Los_Angeles',
      Username = 'fsmith@acme.com'
    );
    //insert u;
    a = new Account(Name = 'Acme');
    insert a;
    Contact con1 = new Contact(LastName = 'TestContact');
    insert con1;
    Account acc1 = new Account(
      Name = 'Jane Doe',
      BillingCity = 'Budapest',
      BillingLongitude = 12,
      BillingLatitude = 34 /*,
       Sales_Group__c = 'A50'*/
    );
    insert acc1;
    Account acc2 = new Account(Name = 'John Doe');
    insert acc2;

    Account acc3 = new Account(
      Name = 'Chuck Doe',
      /*T_Recordtype_Name__c = 'Lead',
       Status__c = 'Inactive',*/
      BillingCity = 'Szeged',
      BillingLongitude = 6,
      BillingLatitude = 31
    );
    insert acc3;

    Account acc4 = new Account(
      Name = 'Steve Doe' /*,
      T_Recordtype_Name__c = 'Megrendelo',
      ASC_group__c = 'ASC Alu vágat csoport'*/
    );
    insert acc4;

    Task t1 = new Task(
      Subject = 'Test Task Subject',
      Status = 'Open',
      Priority = 'Normal',
      WhatId = acc1.Id /*,
       Ugyfel__c = acc1.Id*/
    );
    insert t1;
  }

  @IsTest
  static void testTripPlannerMethods() {
    //StoreVisitTripPlannerController.getResponse(false);
    //StoreVisitTripPlannerController.getResponse(true);

    /*    Map<String, Latogatastervezo_valtozoi__mdt> latogatastervezoValtozoiMdt = StoreVisitTripPlannerController.getLatogatastervezoValtozoiMdt();

    StoreVisitTripPlannerController.getAccountsWithOpenTask(true);
    StoreVisitTripPlannerController.getAccountsWithLastMMinutesBefore(
      Datetime.now(),
      true
    );
    StoreVisitTripPlannerController.getAccountsWithLeadStatus(true);
    StoreVisitTripPlannerController.getInactiveAccounts(true);
    StoreVisitTripPlannerController.getAccountsByHandlingGroupNarrowestLevel(
      '',
      true
    );
    StoreVisitTripPlannerController.getAccountsByHandlingGroupNarrowestLevels(
      new List<String>{},
      true
    );*/

    //    StoreVisitTripPlannerController.getAllRegions();
    //    StoreVisitTripPlannerController.regionValueLabelPairs();
    //    StoreVisitTripPlannerController.getAllHandlingGroupNarrowestLevels();
    //    StoreVisitTripPlannerController.getAllSalesGroupsSorted();
    //    StoreVisitTripPlannerController.getAllSalesGroups();
    //    StoreVisitTripPlannerController.getAllASCGroups();
    StoreVisitTripPlannerController.getPickListValues(
      'Opportunity',
      'StageName'
    );

    StoreVisitTripPlannerController.getAccounts(false);
    StoreVisitTripPlannerController.getAccounts(true);
    /*    StoreVisitTripPlannerController.getAccountPotentialsByRegion('Budapest');
    StoreVisitTripPlannerController.getAccountPotentialsByRegions(
      new List<String>{ 'Budapest', 'Kiskunfélegyháza' }
    );*/

    /*    StoreVisitTripPlannerController.getAccountsWithLastMMinutesBefore(
      Datetime.now(),
      false
    );
    StoreVisitTripPlannerController.getErintettAccounts();*/
    StoreVisitTripPlannerController.countOfAccounts(true);
    StoreVisitTripPlannerController.countOfAccounts(false);
    /*    StoreVisitTripPlannerController.getErintettAccountsOf(new List<Id>{});
    StoreVisitTripPlannerController.getAccountsWithLeadStatus(false);
    StoreVisitTripPlannerController.getInactiveAccounts(false);
    StoreVisitTripPlannerController.getAccountsByRegion('Budapest');
    StoreVisitTripPlannerController.getAccountsByRegions(
      new List<String>{ 'Budapest', 'Kiskunfélegyháza' }
    );
    StoreVisitTripPlannerController.getAccountsByHandlingGroupNarrowestLevel(
      'Budapest',
      false
    );
    StoreVisitTripPlannerController.getAccountsByHandlingGroupNarrowestLevel(
      'Budapest',
      true
    );
    StoreVisitTripPlannerController.getAccountsByHandlingGroupNarrowestLevels(
      new List<String>{ 'Budapest', 'Kiskunfélegyháza' },
      false
    );
    StoreVisitTripPlannerController.getAccountsByHandlingGroupNarrowestLevels(
      new List<String>{ 'Budapest', 'Kiskunfélegyháza' },
      true
    );
    StoreVisitTripPlannerController.getAccountIdsByHandlingGroupNarrowestLevels(
      new List<String>{ 'Budapest', 'Kiskunfélegyháza' },
      false
    );
    StoreVisitTripPlannerController.getAccountIdsByHandlingGroupNarrowestLevels(
      new List<String>{ 'Budapest', 'Kiskunfélegyháza' },
      true
    );
    StoreVisitTripPlannerController.getAccountsBySalesGroup(
      'Építőipar\n',
      false
    );
    StoreVisitTripPlannerController.getAccountsBySalesGroup(
      'Építőipar\n',
      true
    );
    StoreVisitTripPlannerController.getAccountsBySalesGroups(
      new List<String>{ 'Építőipar\n' },
      false
    );
    StoreVisitTripPlannerController.getAccountsBySalesGroups(
      new List<String>{ 'Építőipar\n' },
      true
    );
    StoreVisitTripPlannerController.getAccountsBySalesGroupsWithAPInames(
      new List<String>{ 'Építőipar\n' },
      false
    );
    StoreVisitTripPlannerController.getAccountsBySalesGroupsWithAPInames(
      new List<String>{ 'Építőipar\n' },
      true
    );
    StoreVisitTripPlannerController.getAccountsByASCGroups(
      new List<String>{ 'ASC Alu vágat csoport' },
      false
    );
    StoreVisitTripPlannerController.getAccountsByASCGroups(
      new List<String>{ 'ASC Alu vágat csoport' },
      true
    );
    StoreVisitTripPlannerController.getVisszaesettVevok(false);
    StoreVisitTripPlannerController.getVisszaesettVevok(true);
    StoreVisitTripPlannerController.getNagyAjanlattalRendelkezoVevok(false);
    StoreVisitTripPlannerController.getNagyAjanlattalRendelkezoVevok(true);
    StoreVisitTripPlannerController.getAccountsWithNyitottPotencialMagas(false);
    StoreVisitTripPlannerController.getAccountsWithNyitottPotencialMagas(true);*/

    StoreVisitTripPlannerController.getMoneybagAccounts();
    StoreVisitTripPlannerController.getFlagAccounts();

    StoreVisitTripPlannerController.getAllTypes();

    StoreVisitTripPlannerController.getUserInfo();
    List<Account> accounts = [SELECT Id FROM Account];
    Account acc1 = accounts[0];
    Account acc2 = accounts[1];
    String acc1Name = StoreVisitTripPlannerController.getAccountName(acc1.Id);
    StoreVisitTripPlannerController.getAccountsOfUser(true);
    StoreVisitTripPlannerController.getAccount(acc1.Id);
    StoreVisitTripPlannerController.getDistanceFrom(acc1.Id, true, false);
    StoreVisitTripPlannerController.getDistanceFrom(acc1.Id, false, false);
    StoreVisitTripPlannerController.getDistanceFrom(acc2.Id, true, false);
    StoreVisitTripPlannerController.getDistanceFrom(acc2.Id, false, false);
    StoreVisitTripPlannerController.deleteAllEvents(
      Datetime.now(),
      Datetime.now()
    );
    //        StoreVisitTripPlannerController.createEvents('{}');
    StoreVisitTripPlannerController.upsertEvents(
      '[{"dayName":"Hétfő","date":"2023-09-11","visitCount":3,"accounts":[{"EventId":"00U7Y000006EtzzUAC","visitDate":"2023-09-11","Id":"0017Y00001yfpDxQAI","Name":"dsfgre","BillingCity":"Budapest","BillingPostalCode":"1075","BillingLatitude":"47.498457519028340","BillingLongitude":"19.058963925315467","randomId":0.35233032095195926,"categories":{"high_value_sales":false,"fallback":false,"inactive":false,"lead":true,"high_open_potential":false,"open_task":false},"icons":[{"icon_name":"utility:priority","display_name":"Potential"}],"Subject":"Látogatás","eventType":"Store visit","style":"background-color:lightblue;cursor: grab;","color":"lightblue","order":"3"},{"EventId":"00U7Y000006Eu00UAC","visitDate":"2023-09-11","Id":"0017Y000020ySxhQAE","Name":"Fiatal Autószerelők Kft","BillingCity":"Budapest","BillingPostalCode":"1132","BillingLatitude":"47.518134528827910","BillingLongitude":"19.060409153228676","randomId":0.749741828097074,"categories":{"high_value_sales":false,"fallback":false,"inactive":false,"lead":false,"high_open_potential":false,"open_task":false},"icons":[],"Subject":"Látogatás","eventType":"Store visit","style":"background-color:lightblue;cursor: grab;","color":"lightblue","order":"3"},{"EventId":"00U7Y000006Eu01UAC","visitDate":"2023-09-11","Id":"0017Y000021YjpNQAS","Name":"erintett_vagyok__c false 1","BillingCity":"Budapest","BillingPostalCode":"1091","BillingLatitude":"47.482041176624044","BillingLongitude":"19.065576346175646","randomId":0.41951400727056853,"categories":{"high_value_sales":false,"fallback":false,"inactive":false,"lead":false,"high_open_potential":false,"open_task":false},"icons":[],"Subject":"Látogatás","eventType":"Store visit","style":"background-color:lightblue;cursor: grab;","color":"lightblue","order":"3"}],"Id":"0.6633662469962613","displayDate":"szeptember 11."},{"dayName":"Kedd","date":"2023-09-12","visitCount":1,"accounts":[{"EventId":"00U7Y000006Eu02UAC","visitDate":"2023-09-12","Id":"0017Y000021YltyQAC","Name":"teszt freight values","BillingCity":"Siófok","BillingPostalCode":"8600","BillingLatitude":"46.907918319167905","BillingLongitude":"18.061109541109044","randomId":0.13739759539620988,"categories":{"high_value_sales":false,"fallback":false,"inactive":false,"lead":true,"high_open_potential":false,"open_task":false},"icons":[{"icon_name":"utility:priority","display_name":"Potential"}],"Subject":"Látogatás","eventType":"Store visit","style":"background-color:lightblue;cursor: grab;","color":"lightblue","order":"3"}],"Id":"0.6465990430687909","displayDate":"szeptember 12."},{"dayName":"Szerda","date":"2023-09-13","visitCount":1,"accounts":[{"EventId":"00U7Y000006EvSyUAK","visitDate":"2023-09-13","Id":"0017Y000021Yjo7QAC","Name":"erintett_vagyok__c true 2","BillingCity":"Sopron","BillingPostalCode":"9400","BillingLatitude":"47.683565353619380","BillingLongitude":"16.591452899302293","randomId":0.4460644054027041,"categories":{"high_value_sales":false,"fallback":false,"inactive":false,"lead":false,"high_open_potential":false,"open_task":false},"icons":[],"Subject":"Látogatás","eventType":"Store visit","style":"background-color:lightblue;cursor: grab;","color":"lightblue","order":"3"}],"Id":"0.8386648264473993","displayDate":"szeptember 13."},{"dayName":"Csütörtök","date":"2023-09-14","visitCount":1,"accounts":[{"EventId":"00U7Y000006EvTmUAK","visitDate":"2023-09-14","Id":"0017Y00001ta0jpQAA","Name":"EUROTEX SR Bratislava, s.r.o.","BillingCity":"Topoľčany","BillingPostalCode":"955 01","randomId":0.11588643591592684,"categories":{"high_value_sales":false,"fallback":false,"inactive":false,"lead":false,"high_open_potential":false,"open_task":false},"icons":[],"Subject":"Látogatás","eventType":"Store visit","style":"background-color:lightblue;cursor: grab;","color":"lightblue","order":"3"}],"Id":"0.8006299569669952","displayDate":"szeptember 14."},{"dayName":"Péntek","date":"2023-09-15","visitCount":0,"accounts":[],"Id":"0.3314013218844172","displayDate":"szeptember 15."}]',
      Date.newInstance(2023, 9, 11)
    );
    StoreVisitTripPlannerController.upsertEvents('[{"dayName":"Monday","date":"2024-04-22","visitCount":1,"accounts":[{"EventId":"00U5J00000HkfWJUAZ","visitDate":"2024-04-22","Id":"0015J000003e5pBQAQ","Name":"GenePoint","ShippingLatitude":"37.399545000000000","ShippingLongitude":"-122.080754000000000","BillingCity":"Mountain View","type":4,"randomId":0.7964452675557754,"categories":{"high_value_sales":false,"open_task":false,"fallback":false,"high_open_potential":false,"lead":false,"inactive":false},"icons":[],"Subject":"Látogatás","eventType":"Store visit","style":"background-color:lightblue;cursor: grab;","color":"midnightblue","order":"3","specialEvent":false,"visitType":"Visit"}],"Id":"0.7705902926710966","displayDate":"April 22."},{"dayName":"Tuesday","date":"2024-04-23","visitCount":2,"accounts":[{"Id":"0015J000003e5p5QAA","Name":"Grand Hotels & Resorts Ltd","OwnerId":"0055J000000GAc8QAG","ShippingLatitude":"41.886400000000000","ShippingLongitude":"-87.622200000000000","BillingCity":"Chicago","BillingState":"IL","CreatedDate":"2020-01-10T10:01:56.000Z","categories":{"high_value_sales":false,"open_task":false,"fallback":false,"high_open_potential":false,"lead":false,"inactive":false},"icons":[],"style":"background-color:lightblue;cursor: grab;","color":"midnightblue","order":"3","randomId":0.3506280624448641,"specialEvent":false},{"EventId":"00U5J00000HkfGxUAJ","visitDate":"2024-04-23","Id":"0015J000003e5p7QAA","Name":"Express Logistics and Transport","ShippingLatitude":"45.519176000000000","ShippingLongitude":"-122.677001000000000","BillingCity":"Portland","type":4,"randomId":0.44680947163053664,"categories":{"high_value_sales":false,"open_task":false,"fallback":false,"high_open_potential":false,"lead":false,"inactive":false},"icons":[],"Subject":"Látogatás","eventType":"Store visit","style":"background-color:lightblue;cursor: grab;","color":"midnightblue","order":"3","specialEvent":false,"visitType":"Email"}],"Id":"0.9138861481270906","displayDate":"April 23."},{"dayName":"Wednesday","date":"2024-04-24","visitCount":1,"accounts":[{"EventId":"00U5J00000HkfWOUAZ","visitDate":"2024-04-24","Subject":"Free day","Name":"Free day","color":"white","order":"0","type":0,"specialEvent":true,"displayName":"Free day","style":"background-color:#f3f3f3;cursor: grab;","randomId":0.030858467677565615,"categories":{"high_value_sales":false,"open_task":false,"fallback":false,"high_open_potential":false,"lead":false,"inactive":false},"icons":[],"visitType":"Free day"}],"Id":"0.3154846988488411","displayDate":"April 24."},{"dayName":"Thursday","date":"2024-04-25","visitCount":2,"accounts":[{"EventId":"00U5J00000HkfWPUAZ","visitDate":"2024-04-25","Id":"0015J000003e5p1QAA","Name":"Edge Communications","ShippingLatitude":"30.198208000000000","ShippingLongitude":"-97.805982000000000","BillingCity":"Austin","BillingPostalCode":"32306","BillingLatitude":"30.486567000000000","BillingLongitude":"-84.253771000000000","type":4,"randomId":0.971248826207572,"categories":{"high_value_sales":false,"open_task":false,"fallback":false,"high_open_potential":false,"lead":false,"inactive":false},"icons":[],"Subject":"Látogatás","eventType":"Store visit","style":"background-color:lightblue;cursor: grab;","color":"midnightblue","order":"3","specialEvent":false,"visitType":"Visit"},{"EventId":"00U5J00000HkfWLUAZ","visitDate":"2024-04-25","Id":"0015J000003e5p5QAA","Name":"Grand Hotels & Resorts Ltd","ShippingLatitude":"41.886400000000000","ShippingLongitude":"-87.622200000000000","BillingCity":"Chicago","type":4,"randomId":0.9468803239727608,"categories":{"high_value_sales":false,"open_task":false,"fallback":false,"high_open_potential":false,"lead":false,"inactive":false},"icons":[],"Subject":"Látogatás","eventType":"Store visit","style":"background-color:lightblue;cursor: grab;","color":"midnightblue","order":"3","specialEvent":false,"visitType":"Visit"}],"Id":"0.7519861272292425","displayDate":"April 25."},{"dayName":"Friday","date":"2024-04-26","visitCount":0,"accounts":[],"Id":"0.9322798544232964","displayDate":"April 26."}]', Date.today());

    StoreVisitTripPlannerController.DayEventData ded = new StoreVisitTripPlannerController.DayEventData();
    ded.dayName = 'hétfő';
    ded.dateOfVisit = Date.today();
    ded.accounts = null;
  }
  @IsTest
  static void testTripPlannerUserProfile() {
    StoreVisitTripPlannerController.getEventsOfUser(Date.today(), false);
    //    StoreVisitTripPlannerController.getAccountsWithOpenTask(false);
  }

  @IsTest
  static void testInstance() {
    StoreVisitTripPlannerController instance = new StoreVisitTripPlannerController();
  }

  @IsTest
  static void testLimits() {
    Integer limitQueryRows = StoreVisitTripPlannerController.getLimitQueryRows();
    System.assertEquals(Limits.getLimitQueryRows(), limitQueryRows);
    Integer queryRows = StoreVisitTripPlannerController.getQueryRows();
    System.assertNotEquals(null, queryRows);
  }

  @IsTest
  static void testJSON() {
    List<Account> gotFilteredAccounts = StoreVisitTripPlannerController.getFilteredAccounts(
      '{"selectedHandlingGroupNarrowestLevels":["-","Call Center","Lemez","Megmunkálás","Telep"],"selectedASCGroups":["ASC Alu vágat csoport","ASC Szálanyag csoport"],"selectedAccTypes":["Other"],"selectedOwner":"all","lastVisitDate":"2023-11-15","icons":[{"icon_name":"utility:moneybag","display_name":"Nagy ajánlattal rendelkező","selected":true,"style":"--sds-c-icon-color-background: #0c5caa; border : solid","legend":"Nagy ajánlattal rendelkező"},{"icon_name":"utility:task","display_name":"Nyitott feladattal rendelkező ügyfél","selected":true,"style":"--sds-c-icon-color-background: #0c5caa; border : solid","legend":"Nyitott feladattal rendelkező ügyfél"},{"icon_name":"utility:jump_to_bottom","display_name":"Visszaesett","selected":true,"style":"--sds-c-icon-color-background: #0c5caa; border : solid","legend":"Visszaesett"},{"icon_name":"utility:high_velocity_sales","display_name":"Magas nyitott potenciál","selected":true,"style":"--sds-c-icon-color-background: #0c5caa; border : solid","legend":"Magas nyitott potenciál"},{"icon_name":"utility:priority","display_name":"Potenciális vevő","selected":true,"style":"--sds-c-icon-color-background: #0c5caa; border : solid","legend":"Potenciális vevő"},{"icon_name":"utility:notification_snoozed","display_name":"Inaktív","selected":true,"style":"--sds-c-icon-color-background: #0c5caa; border : solid","legend":"Inaktív"}],"tooManyAccountsLimit":1200,"searchWord":"Uni"}'
    );
  }

  @IsTest
  static void testPlatformCache() {
    String accountId = [
      SELECT Id, CreatedDate
      FROM Account
      ORDER BY CreatedDate
      LIMIT 1
    ]
    .Id;
    accountId = StoreVisitTripPlannerController.saveSelectedAccountId(
      accountId
    );
    accountId = StoreVisitTripPlannerController.loadSelectedAccountId();
    String cachedDistances = StoreVisitTripPlannerController.getCachedDistances();
    String getNotCachedDistances = StoreVisitTripPlannerController.getNotCachedDistances(
      '{"pivotFilteredAccount":{"Id":"0015J000003e5p2QAA","Name":"Burlington Textiles Corp of America","OwnerId":"0055J000000GAc8QAG","BillingCity":"Burlington","BillingPostalCode":"27215","BillingLatitude":"36.090572000000000","BillingLongitude":"-79.437349000000000","BillingState":"NC","CreatedDate":"2020-01-10T10:01:56.000Z","categories":{"high_value_sales":false,"open_task":false,"fallback":false,"high_open_potential":false,"lead":false,"inactive":false},"icons":[],"style":"background-color:lightblue;cursor: grab;filter: brightness(120%);","color":"midnightblue","order":"3","distanceFromCurrent":0.01},"filteredAccountIds":["0015J000003e5p2QAA","0015J000003e5p4QAA","0015J000003e5p1QAA","0015J000003e5p7QAA","0015J000003e5pBQAQ","0015J000003e5p5QAA","0015J000003e5p3QAA","0015J000003e5pCQAQ","0015J00000SxY5JQAV","0015J00000SxY5IQAV","0015J000003e5p6QAA","0015J000003e5pAQAQ","0015J000003e5p9QAA","0015J000003e5p8QAA"],"daysAccountsIds":["0015J000003e5p4QAA","0015J000003e5p2QAA","0015J000003e5p1QAA","0015J000003e5p7QAA"]}'
    );
  }

  //    @IsTest
  //    static void testSchedulableTripPlannerMeasureDistances() {
  //        SchedulableTripPlannerMeasureDistances measureDistancesInstance = new SchedulableTripPlannerMeasureDistances();
  //        measureDistancesInstance.measureDistances(null);
  //    }

  /*  @IsTest
  static void testSchedule() {
    Test.startTest();
    SchedulableTripPlannerMeasureDistances measureDistancesInstance = new SchedulableTripPlannerMeasureDistances();
    String chron = '0 0 23 * * ?';
    System.schedule('Test Sched', chron, measureDistancesInstance);
    Test.stopTest();
  }*/
}