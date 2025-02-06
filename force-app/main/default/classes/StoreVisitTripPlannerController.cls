/**
 * Created by Attila Nemeth @AttentionCRM on 22/12/06.
 */

public with sharing class StoreVisitTripPlannerController {
  public static final Integer MaxCountOfAccounts_to_Show = 50000 - 3;
  private static final StoreVisitControllerResponse response = new StoreVisitControllerResponse();

  public StoreVisitTripPlannerController() {
    // Constructor
    //System.debug('StoreVisitTripPlannerController constructor called');
  }

  /*  @AuraEnabled
  public static Map<String, Latogatastervezo_valtozoi__mdt> getLatogatastervezoValtozoiMdt() {
    Map<String, Latogatastervezo_valtozoi__mdt> mapX = Latogatastervezo_valtozoi__mdt.getAll();
    return mapX;
  }*/

  @AuraEnabled(Cacheable=false)
  public static Integer getLimitQueryRows() {
    return Limits.getLimitQueryRows();
  }
  @AuraEnabled(Cacheable=false)
  public static Integer getQueryRows() {
    return Limits.getQueryRows();
  }

  @AuraEnabled
  public static StoreVisitControllerResponse getResponse(
    Boolean getAllAccounts,
    Boolean erintettVagyokE
  ) {
    response.accounts = getAllAccounts
      ? getAccounts(erintettVagyokE)
      : getAccountsOfUser(erintettVagyokE);

    Set<String> cities = new Set<String>();
    for (Account acc : response.accounts) {
      //      if (String.isNotBlank(acc.BillingCity)) {
      //        cities.add(acc.BillingCity);
      //      }
      if (String.isNotBlank(acc.ShippingCity)) {
        cities.add(acc.ShippingCity);
      } else if (String.isNotBlank(acc.BillingCity)) {
        cities.add(acc.BillingCity);
      }
    }

    List<String> sortedCities = new List<String>(cities);
    sortedCities.sort();

    Map<String, Object> option;

    response.cities = new List<Object>();

    for (String city : sortedCities) {
      option = new Map<String, Object>();
      option.put('label', city);
      option.put('value', city);
      response.cities.add(option);
    }

    // System.debug('getResponse:'+JSON.serializePretty(response)); // JSON string exceeds heap size limit
    return response;
  }

  /*  @AuraEnabled
  public static List<String> getAllRegions() {
    SObjectType objectType = Schema.getGlobalDescribe().get('Account');
    DescribeSObjectResult sObjectResult = objectType.getDescribe();
    Map<String, SObjectField> fieldMap = sObjectResult.fields.getMap();
    DescribeFieldResult fieldResult = fieldMap.get('Region__c').getDescribe();
    List<PicklistEntry> ples = fieldResult.getPicklistValues();
    Set<String> resultSet = new Set<String>();
    for (PicklistEntry ple : ples) {
      resultSet.add(ple.getLabel());
    }
    List<String> results = new List<String>();
    results.addAll(resultSet);
    results.sort();
    return results;
  }*/
  /*public static List<String> getAllRegionsLabels() {
    SObjectType objectType = Schema.getGlobalDescribe().get('Account');
    DescribeSObjectResult sObjectResult = objectType.getDescribe();
    Map<String, SObjectField> fieldMap = sObjectResult.fields.getMap();
    DescribeFieldResult fieldResult = fieldMap.get('Region__c').getDescribe();
    List<PicklistEntry> ples = fieldResult.getPicklistValues();
    Set<String> resultSet = new Set<String>();
    for (PicklistEntry ple : ples) {
      resultSet.add(ple.getLabel());
    }
    List<String> results = new List<String>();
    results.addAll(resultSet);
    //results.sort();
    return results;
  }*/
  /*public static List<String> getAllRegionsValues() {
    SObjectType objectType = Schema.getGlobalDescribe().get('Account');
    DescribeSObjectResult sObjectResult = objectType.getDescribe();
    Map<String, SObjectField> fieldMap = sObjectResult.fields.getMap();
    DescribeFieldResult fieldResult = fieldMap.get('Region__c').getDescribe();
    List<PicklistEntry> ples = fieldResult.getPicklistValues();
    Set<String> resultSet = new Set<String>();
    for (PicklistEntry ple : ples) {
      resultSet.add(ple.getValue());
    }
    List<String> results = new List<String>();
    results.addAll(resultSet);
    //results.sort();
    return results;
  }*/

  /*  @AuraEnabled
  public static List<String> getAllASCGroups() {
    SObjectType objectType = Schema.getGlobalDescribe().get('Account');
    DescribeSObjectResult sObjectResult = objectType.getDescribe();
    Map<String, SObjectField> fieldMap = sObjectResult.fields.getMap();
    DescribeFieldResult fieldResult = fieldMap.get('ASC_group__c')
      .getDescribe();
    List<PicklistEntry> ples = fieldResult.getPicklistValues();
    Set<String> resultSet = new Set<String>();
    for (PicklistEntry ple : ples) {
      resultSet.add(ple.getValue());
    }
    List<String> results = new List<String>();
    results.addAll(resultSet);
    //results.sort();
    return results;
  }*/

  @AuraEnabled
  public static List<String> getAllTypes() {
    SObjectType objectType = Schema.getGlobalDescribe().get('Account');
    DescribeSObjectResult sObjectResult = objectType.getDescribe();
    Map<String, SObjectField> fieldMap = sObjectResult.fields.getMap();
    DescribeFieldResult fieldResult = fieldMap.get('Type')
      .getDescribe();
    List<PicklistEntry> ples = fieldResult.getPicklistValues();
    Set<String> resultSet = new Set<String>();
    for (PicklistEntry ple : ples) {
      resultSet.add(ple.getValue());
    }
    List<String> results = new List<String>();
    results.addAll(resultSet);
    //results.sort();
    return results;
  }

  /*  @AuraEnabled
  public static List<String> getAllHandlingGroupNarrowestLevels() {
    List<Account> accounts = [
      SELECT Handling_Group_Narrowest_Level__c
      FROM Account
      WHERE Handling_Group_Narrowest_Level__c != NULL
    ];
    Set<String> handlingGroupNarrowestLevelsSet = new Set<String>();
    for (Account acc : accounts) {
      if (acc.Handling_Group_Narrowest_Level__c != '') {
        handlingGroupNarrowestLevelsSet.add(
          acc.Handling_Group_Narrowest_Level__c
        );
      }
    }
    List<String> results = new List<String>(handlingGroupNarrowestLevelsSet);
    results.sort();
    return results;
  }*/

  /*  @AuraEnabled
  public static List<String> getAllSalesGroupsSorted() {
    SObjectType objectType = Schema.getGlobalDescribe().get('Account');
    DescribeSObjectResult sObjectResult = objectType.getDescribe();
    Map<String, SObjectField> fieldMap = sObjectResult.fields.getMap();
    DescribeFieldResult fieldResult = fieldMap.get('Sales_Group__c')
      .getDescribe();
    List<PicklistEntry> ples = fieldResult.getPicklistValues();
    Set<String> resultSet = new Set<String>();
    for (PicklistEntry ple : ples) {
      resultSet.add(ple.getLabel());
    }
    List<String> results = new List<String>();
    results.addAll(resultSet);
    results.sort();
    return results;
  }*/
  //    private static List<String> getAllSalesGroupsLabels() {
  //        SObjectType objectType = Schema.getGlobalDescribe().get('Account');
  //        DescribeSObjectResult sObjectResult = objectType.getDescribe();
  //        Map<String, SObjectField> fieldMap = sObjectResult.fields.getMap();
  //        DescribeFieldResult fieldResult = fieldMap.get('Sales_Group__c').getDescribe();
  //        List<PicklistEntry> ples = fieldResult.getPicklistValues();
  //        Set<String> resultSet = new Set<String>();
  //        for (PicklistEntry ple : ples) {
  //            resultSet.add(ple.getLabel());
  //        }
  //        List<String> results = new List<String>();
  //        results.addAll(resultSet);
  //        //results.sort();
  //        return results;
  //    }
  //    private static List<String> getAllSalesGroupsValues() {
  //        SObjectType objectType = Schema.getGlobalDescribe().get('Account');
  //        DescribeSObjectResult sObjectResult = objectType.getDescribe();
  //        Map<String, SObjectField> fieldMap = sObjectResult.fields.getMap();
  //        DescribeFieldResult fieldResult = fieldMap.get('Sales_Group__c').getDescribe();
  //        List<PicklistEntry> ples = fieldResult.getPicklistValues();
  //        Set<String> resultSet = new Set<String>();
  //        for (PicklistEntry ple : ples) {
  //            resultSet.add(ple.getValue());
  //        }
  //        List<String> results = new List<String>();
  //        results.addAll(resultSet);
  //        //results.sort();
  //        return results;
  //    }
  /*  @AuraEnabled
  public static List<String> getAllSalesGroups() {
    List<Account> accounts = [
      SELECT Sales_Group__c
      FROM Account
      WHERE Sales_Group__c != NULL
    ];
    Set<String> salesGroupsSet = new Set<String>();
    for (Account acc : accounts) {
      if (acc.Sales_Group__c != '') {
        salesGroupsSet.add(acc.Sales_Group__c);
      }
    }
    List<String> results = new List<String>(salesGroupsSet);
    results.sort();
    return results;
  }*/

  @AuraEnabled
  public static List<Event> getEventsOfUser(
    Date weekStart,
    Boolean erintettVagyokE
  ) {
    Date weekEnd = weekStart.addDays(7);
    Id userId = UserInfo.getUserId();
    List<Event> eventsOfUser = [
      SELECT
        Id,
        Subject,
        StartDateTime,
        OwnerId,
        /*Status__c,*/
        /*Planner__c,*/
        Account.Id,
        Account.Name,
        /*Account.T_Recordtype_Name__c,*/
        /*Account.T_RecordType_Developer_Name__c,*/
        Account.OwnerId,
        Account.ShippingCity,
        Account.ShippingPostalCode,
        Account.ShippingLatitude,
        Account.ShippingLongitude,
        Account.BillingCity,
        Account.BillingPostalCode,
        Account.BillingLatitude,
        Account.BillingLongitude
      /*Account.Handling_Group_Narrowest_Level__c,*/
      /*Account.Sales_Group__c,*/
      /*Account.Latest_Meeting_Minutes_Date_Time__c,*/
      /*Account.Status__c,*/
      /*Account.Region__c,*/
      /*Account.Base_margin_performance__c,*/
      /*Account.Highest_value_of_quotes_HUF__c,*/
      /*Account.PreviousFinancialYearGrossBaseMarginHU__c,*/
      /*Account.Nyitott_Ft_potencial__c,*/
      /*Account.Ossz_Ft_potencial__c,*/
      /*Account.erintett_vagyok__c*/
      FROM Event
      WHERE
        OwnerId = :userId
        /*AND Planner__c = 'Trip planner'*/
        AND StartDateTime >= :weekStart
        AND StartDateTime < :weekEnd
      ORDER BY StartDateTime
    ];
    // AND Account.erintett_vagyok__c = :erintettVagyokE
    return eventsOfUser;
  }

  public static List<Account> getAccounts(Boolean erintettVagyokE) {
    List<Account> accounts;
    if (erintettVagyokE) {
      accounts = [
        SELECT
          Id,
          Name,
          /*T_Recordtype_Name__c,*/
          /*T_RecordType_Developer_Name__c,*/
          OwnerId,
          ShippingCity,
          ShippingPostalCode,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingPostalCode,
          BillingLatitude,
          BillingLongitude,
          /*Handling_Group_Narrowest_Level__c,*/
          /*Sales_Group__c,*/
          /*Latest_Meeting_Minutes_Date_Time__c,*/
          /*Status__c,*/
          /*Region__c,*/
          /*Base_margin_performance__c,*/
          /*Highest_value_of_quotes_HUF__c,*/
          /*PreviousFinancialYearGrossBaseMarginHU__c,*/
          /*Nyitott_Ft_potencial__c,*/
          /*Ossz_Ft_potencial__c,*/
          /*erintett_vagyok__c,*/
          /*Nem_kifizetodo_partner__c,*/
          CreatedDate
        FROM Account
        /*WHERE
          T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
          AND Nem_kifizetodo_partner__c = FALSE
          AND erintett_vagyok__c = :erintettVagyokE*/
        ORDER BY CreatedDate
        LIMIT :MaxCountOfAccounts_to_Show
      ];
    } else {
      accounts = [
        SELECT
          Id,
          Name,
          /*T_Recordtype_Name__c,*/
          /*T_RecordType_Developer_Name__c,*/
          OwnerId,
          ShippingCity,
          ShippingPostalCode,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingPostalCode,
          BillingLatitude,
          BillingLongitude,
          /*Handling_Group_Narrowest_Level__c,*/
          /*Sales_Group__c,*/
          /*Latest_Meeting_Minutes_Date_Time__c,*/
          /*Status__c,*/
          /*Region__c,*/
          /*Base_margin_performance__c,*/
          /*Highest_value_of_quotes_HUF__c,*/
          /*PreviousFinancialYearGrossBaseMarginHU__c,*/
          /*Nyitott_Ft_potencial__c,*/
          /*Ossz_Ft_potencial__c,*/
          /*erintett_vagyok__c,*/
          /*Nem_kifizetodo_partner__c,*/
          CreatedDate
        FROM Account
        /*WHERE
          T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
          AND Nem_kifizetodo_partner__c = FALSE*/
        ORDER BY CreatedDate
        LIMIT :MaxCountOfAccounts_to_Show
      ];
    }

    return accounts;
  }

  public static List<Account> getAccountsOfUser(Boolean erintettVagyokE) {
    List<Account> accountsOfUser;
    accountsOfUser = new List<Account>();
    if (erintettVagyokE) {
      accountsOfUser = [
        SELECT
          Id,
          Name,
          /*T_Recordtype_Name__c,*/
          /*T_RecordType_Developer_Name__c,*/
          OwnerId,
          ShippingCity,
          ShippingPostalCode,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingPostalCode,
          BillingLatitude,
          BillingLongitude,
          /*Handling_Group_Narrowest_Level__c,
          Sales_Group__c,
          Latest_Meeting_Minutes_Date_Time__c,
          Status__c,
          Region__c,
          Base_margin_performance__c,
          Highest_value_of_quotes_HUF__c,
          PreviousFinancialYearGrossBaseMarginHU__c,
          Nyitott_Ft_potencial__c,
          Ossz_Ft_potencial__c,
          erintett_vagyok__c,
          Nem_kifizetodo_partner__c,*/
          CreatedDate
        FROM Account
        WHERE
          /*T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
          AND Nem_kifizetodo_partner__c = FALSE
          AND*/ OwnerId = :UserInfo.getUserId()
        /*AND erintett_vagyok__c = :erintettVagyokE*/
        ORDER BY CreatedDate
        LIMIT :MaxCountOfAccounts_to_Show
      ];
      //                         AND BillingLatitude != NULL
      //                        AND BillingLongitude != NULL
      //System.debug('getAccountsOfUser accountsOfUser size: ' + accountsOfUser.size());
    } else {
      accountsOfUser = [
        SELECT
          Id,
          Name,
          /*T_Recordtype_Name__c,
           T_RecordType_Developer_Name__c,*/
          OwnerId,
          ShippingCity,
          ShippingPostalCode,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingPostalCode,
          BillingLatitude,
          BillingLongitude,
          /*Handling_Group_Narrowest_Level__c,
          Sales_Group__c,
          Latest_Meeting_Minutes_Date_Time__c,
          Status__c,
          Region__c,
          Base_margin_performance__c,
          Highest_value_of_quotes_HUF__c,
          PreviousFinancialYearGrossBaseMarginHU__c,
          Nyitott_Ft_potencial__c,
          Ossz_Ft_potencial__c,
          erintett_vagyok__c,
          Nem_kifizetodo_partner__c,*/
          CreatedDate
        FROM Account
        WHERE
          /*T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
          AND Nem_kifizetodo_partner__c = FALSE
          AND*/ OwnerId = :UserInfo.getUserId()
        ORDER BY CreatedDate
        LIMIT :MaxCountOfAccounts_to_Show
      ];
      //                         AND BillingLatitude != NULL
      //                        AND BillingLongitude != NULL
      //System.debug('getAccountsOfUser accountsOfUser size: ' + accountsOfUser.size());
    }

    return accountsOfUser;
  }

  /*  @AuraEnabled
  public static List<Account_Potential__c> getAccountPotentialsByRegion(
    String region
  ) {
    List<Account_Potential__c> results = [
      SELECT
        Id,
        ADM__c,
        Aggregate_Material_Group__c,
        Material_Group__c,
        Manufacturer_Potention_Weight__c,
        CreatedById,
        Description__c,
        Manufacturer_Potention_Amount__c,
        Potential_Amount_Amount__c,
        Potential_Quantity_Kg__c,
        Currency__c,
        RecordTypeId,
        Region__c,
        Actual_Amount_Millions_eur__c,
        Actual_Quantity_tons__c,
        Actual_Amount_Millions__c,
        LastModifiedById,
        Is_There_Manufacturer_Potential__c,
        Owner__c,
        Account__c,
        Name,
        Ugyfel_potencial_nev__c
      FROM Account_Potential__c
      WHERE Region__c = :region
    ];
    return results;
  }*/
  /*  @AuraEnabled
  public static List<Account_Potential__c> getAccountPotentialsByRegions(
    String[] regions
  ) {
    List<Account_Potential__c> results = [
      SELECT
        Id,
        ADM__c,
        Aggregate_Material_Group__c,
        Material_Group__c,
        Manufacturer_Potention_Weight__c,
        CreatedById,
        Description__c,
        Manufacturer_Potention_Amount__c,
        Potential_Amount_Amount__c,
        Potential_Quantity_Kg__c,
        Currency__c,
        RecordTypeId,
        Region__c,
        Actual_Amount_Millions_eur__c,
        Actual_Quantity_tons__c,
        Actual_Amount_Millions__c,
        LastModifiedById,
        Is_There_Manufacturer_Potential__c,
        Owner__c,
        Account__c,
        Name,
        Ugyfel_potencial_nev__c
      FROM Account_Potential__c
      WHERE Region__c IN :regions
    ];
    return results;
  }*/

  /*  @AuraEnabled
  public static List<Id> getAccountsWithOpenTask(Boolean erintettVagyokE) {
    List<Account> results1;
    if (erintettVagyokE) {
      results1 = [
        SELECT
          Id,
          Name,
          CreatedDate,
          T_Recordtype_Name__c,
          T_RecordType_Developer_Name__c,
          OwnerId,
          ShippingCity,
          ShippingPostalCode,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingPostalCode,
          BillingLatitude,
          BillingLongitude,
          Handling_Group_Narrowest_Level__c,
          Sales_Group__c,
          Latest_Meeting_Minutes_Date_Time__c,
          Status__c,
          Region__c,
          Base_margin_performance__c,
          Highest_value_of_quotes_HUF__c,
          PreviousFinancialYearGrossBaseMarginHU__c,
          Nyitott_Ft_potencial__c,
          Ossz_Ft_potencial__c,
          (SELECT Id, Status, CreatedDate FROM Tasks),
          erintett_vagyok__c
        FROM Account
        WHERE
          T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
          AND erintett_vagyok__c = :erintettVagyokE
        ORDER BY CreatedDate DESC
      ];
    } else {
      results1 = [
        SELECT
          Id,
          Name,
          CreatedDate,
          T_Recordtype_Name__c,
          T_RecordType_Developer_Name__c,
          OwnerId,
          ShippingCity,
          ShippingPostalCode,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingPostalCode,
          BillingLatitude,
          BillingLongitude,
          Handling_Group_Narrowest_Level__c,
          Sales_Group__c,
          Latest_Meeting_Minutes_Date_Time__c,
          Status__c,
          Region__c,
          Base_margin_performance__c,
          Highest_value_of_quotes_HUF__c,
          PreviousFinancialYearGrossBaseMarginHU__c,
          Nyitott_Ft_potencial__c,
          Ossz_Ft_potencial__c,
          (SELECT Id, Status, CreatedDate FROM Tasks),
          erintett_vagyok__c
        FROM Account
        WHERE T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
        ORDER BY CreatedDate DESC
      ];
    }

    Set<Id> MMaccountsWithOpenTask = new Set<Id>();
    for (Task t : [
      SELECT Id, Ugyfel__c, WhatId, Status
      FROM Task
      WHERE Ugyfel__c != NULL AND Status IN ('Open', 'Nyitott')
    ]) {
      MMaccountsWithOpenTask.add(t.Ugyfel__c);
    }

    // Open mellett az üres státuszúakat is vette, csak azok kellenek, ahol van Account.Task.Status=Open
    List<Account> results2 = new List<Account>();
    for (Account account1 : results1) {
      Boolean vanOpen = false;
      for (Task t : account1.Tasks) {
        if (
          */ /*t.CreatedDate >= Datetime.now().addDays(-28)*/ /* true &&
          (t.Status == 'Open' ||
          t.Status == 'Nyitott')
        ) {
          vanOpen = true;
          break;
        }
      }
      if (vanOpen) {
        results2.add(account1);
      } else {
        if (MMaccountsWithOpenTask.contains(account1.Id)) {
          results2.add(account1);
        }
      }
    }

    List<Id> resultSet = new List<Id>();
    for (Account acc : results2) {
      resultSet.add(acc.Id);
    }
    return resultSet;
  }*/

  /*  @AuraEnabled
  public static List<Account> getAccountsWithLastMMinutesBefore(
    Datetime beforeThisDate,
    Boolean erintettVagyokE
  ) {
    List<Account> results;
    if (erintettVagyokE) {
      results = [
        SELECT
          Id,
          Name,
          T_Recordtype_Name__c,
          T_RecordType_Developer_Name__c,
          OwnerId,
          ShippingCity,
          ShippingPostalCode,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingPostalCode,
          BillingLatitude,
          BillingLongitude,
          Handling_Group_Narrowest_Level__c,
          Sales_Group__c,
          Latest_Meeting_Minutes_Date_Time__c,
          Status__c,
          Region__c,
          Base_margin_performance__c,
          Highest_value_of_quotes_HUF__c,
          PreviousFinancialYearGrossBaseMarginHU__c,
          Nyitott_Ft_potencial__c,
          Ossz_Ft_potencial__c,
          erintett_vagyok__c
        FROM Account
        WHERE
          T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
          AND (Latest_Meeting_Minutes_Date_Time__c = NULL
          OR Latest_Meeting_Minutes_Date_Time__c <= :beforeThisDate)
          AND erintett_vagyok__c = :erintettVagyokE
      ];
    } else {
      results = [
        SELECT
          Id,
          Name,
          T_Recordtype_Name__c,
          T_RecordType_Developer_Name__c,
          OwnerId,
          ShippingCity,
          ShippingPostalCode,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingPostalCode,
          BillingLatitude,
          BillingLongitude,
          Handling_Group_Narrowest_Level__c,
          Sales_Group__c,
          Latest_Meeting_Minutes_Date_Time__c,
          Status__c,
          Region__c,
          Base_margin_performance__c,
          Highest_value_of_quotes_HUF__c,
          PreviousFinancialYearGrossBaseMarginHU__c,
          Nyitott_Ft_potencial__c,
          Ossz_Ft_potencial__c,
          erintett_vagyok__c
        FROM Account
        WHERE
          T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
          AND (Latest_Meeting_Minutes_Date_Time__c = NULL
          OR Latest_Meeting_Minutes_Date_Time__c <= :beforeThisDate)
      ];
    }

    return results;
  }*/

  /*  @AuraEnabled
  public static List<Id> getErintettAccounts() {
    List<Account> results = [
      SELECT
        Id,
        Name,
        CreatedDate,
        T_Recordtype_Name__c,
        T_RecordType_Developer_Name__c,
        OwnerId,
        ShippingCity,
        ShippingPostalCode,
        ShippingLatitude,
        ShippingLongitude,
        BillingCity,
        BillingPostalCode,
        BillingLatitude,
        BillingLongitude,
        Handling_Group_Narrowest_Level__c,
        Sales_Group__c,
        Latest_Meeting_Minutes_Date_Time__c,
        Status__c,
        Region__c,
        Base_margin_performance__c,
        Highest_value_of_quotes_HUF__c,
        PreviousFinancialYearGrossBaseMarginHU__c,
        Nyitott_Ft_potencial__c,
        Ossz_Ft_potencial__c,
        erintett_vagyok__c,
        Nem_kifizetodo_partner__c
      FROM Account
      WHERE
        T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
        AND Nem_kifizetodo_partner__c = FALSE
        AND erintett_vagyok__c = TRUE
      ORDER BY CreatedDate DESC
    ];
    List<Id> resultSet = new List<Id>();
    for (Account acc : results) {
      resultSet.add(acc.Id);
    }
    return resultSet;
  }*/

  /*  @AuraEnabled
  public static List<Id> getErintettAccountsOf(List<Id> accountIdsToFilter) {
    List<Account> results = [
      SELECT
        Id,
        Name,
        CreatedDate,
        T_Recordtype_Name__c,
        T_RecordType_Developer_Name__c,
        OwnerId,
        ShippingCity,
        ShippingPostalCode,
        ShippingLatitude,
        ShippingLongitude,
        BillingCity,
        BillingPostalCode,
        BillingLatitude,
        BillingLongitude,
        Handling_Group_Narrowest_Level__c,
        Sales_Group__c,
        Latest_Meeting_Minutes_Date_Time__c,
        Status__c,
        Region__c,
        Base_margin_performance__c,
        Highest_value_of_quotes_HUF__c,
        PreviousFinancialYearGrossBaseMarginHU__c,
        Nyitott_Ft_potencial__c,
        Ossz_Ft_potencial__c,
        erintett_vagyok__c,
        Nem_kifizetodo_partner__c
      FROM Account
      WHERE erintett_vagyok__c = TRUE AND Id IN :accountIdsToFilter
    ];
    //  AND Nem_kifizetodo_partner__c=FALSE
    // AND erintett_vagyok__c = TRUE
    // T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
    // ORDER BY CreatedDate DESC
    List<Id> resultSet = new List<Id>();
    for (Account acc : results) {
      resultSet.add(acc.Id);
    }
    return resultSet;
  }*/

  /*  @AuraEnabled
  public static List<Id> getAccountsWithLeadStatus(Boolean erintettVagyokE) {
    //System.debug('getAccountsWithLeadStatus start; erintettVagyokE='+erintettVagyokE);

    List<Account> results;
    if (erintettVagyokE) {
      results = [
        SELECT
          Id,
          Name,
          CreatedDate,
          T_Recordtype_Name__c,
          T_RecordType_Developer_Name__c,
          OwnerId,
          ShippingCity,
          ShippingPostalCode,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingPostalCode,
          BillingLatitude,
          BillingLongitude,
          Handling_Group_Narrowest_Level__c,
          Sales_Group__c,
          Latest_Meeting_Minutes_Date_Time__c,
          Status__c,
          Region__c,
          Base_margin_performance__c,
          Highest_value_of_quotes_HUF__c,
          PreviousFinancialYearGrossBaseMarginHU__c,
          Nyitott_Ft_potencial__c,
          Ossz_Ft_potencial__c,
          */ /*(SELECT Id, Status, CreatedDate FROM Tasks),*/ /*
          erintett_vagyok__c
        FROM Account
        WHERE
          (T_RecordType_Developer_Name__c = 'Lead'
          OR (T_RecordType_Developer_Name__c = 'Megrendelo'
          AND Status__c IN ('Érdeklődő', 'Interested')))
          AND erintett_vagyok__c = :erintettVagyokE
        ORDER BY CreatedDate DESC
      ];
    } else {
      results = [
        SELECT
          Id,
          Name,
          CreatedDate,
          T_Recordtype_Name__c,
          T_RecordType_Developer_Name__c,
          OwnerId,
          ShippingCity,
          ShippingPostalCode,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingPostalCode,
          BillingLatitude,
          BillingLongitude,
          Handling_Group_Narrowest_Level__c,
          Sales_Group__c,
          Latest_Meeting_Minutes_Date_Time__c,
          Status__c,
          Region__c,
          Base_margin_performance__c,
          Highest_value_of_quotes_HUF__c,
          PreviousFinancialYearGrossBaseMarginHU__c,
          Nyitott_Ft_potencial__c,
          Ossz_Ft_potencial__c,
          */ /*(SELECT Id, Status, CreatedDate FROM Tasks),*/ /*
          erintett_vagyok__c
        FROM Account
        WHERE
          T_RecordType_Developer_Name__c = 'Lead'
          OR (T_RecordType_Developer_Name__c = 'Megrendelo'
          AND Status__c IN ('Érdeklődő', 'Interested'))
        ORDER BY CreatedDate DESC
      ];
    }

    //System.debug('getAccountsWithLeadStatus results size: '+results.size());

    List<Id> resultSet = new List<Id>();
    for (Account acc : results) {
      resultSet.add(acc.Id);
    }
    return resultSet;
  }*/

    @AuraEnabled
    public static List<String> getMoneybagAccounts() {
        String[] results = new List<String>();
        for (Account[] accounts: [SELECT Id, AnnualRevenue FROM Account]) {
            for (Account acc: accounts) {
                if (acc.AnnualRevenue>100000000) {
                    results.add(acc.Id);
                }
            }
        }

        return results;
    }

    @AuraEnabled
    public static List<String> getFlagAccounts() {
        String[] results = new List<String>();
        for (Account[] accounts: [SELECT Id, Industry FROM Account]) {
            for (Account acc: accounts) {
                if (acc.Industry=='Energy') {
                    results.add(acc.Id);
                }
            }
        }
        return results;
    }

  /*  @AuraEnabled
  public static List<Id> getInactiveAccounts(Boolean erintettVagyokE) {
    List<Account> results;
    if (erintettVagyokE) {
      results = [
        SELECT
          Id,
          Name,
          CreatedDate,
          T_Recordtype_Name__c,
          T_RecordType_Developer_Name__c,
          OwnerId,
          ShippingCity,
          ShippingPostalCode,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingPostalCode,
          BillingLatitude,
          BillingLongitude,
          Handling_Group_Narrowest_Level__c,
          Sales_Group__c,
          Latest_Meeting_Minutes_Date_Time__c,
          Status__c,
          Region__c,
          Base_margin_performance__c,
          Highest_value_of_quotes_HUF__c,
          PreviousFinancialYearGrossBaseMarginHU__c,
          Nyitott_Ft_potencial__c,
          Ossz_Ft_potencial__c,
          erintett_vagyok__c
        FROM Account
        WHERE
          T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
          AND Status__c = 'Inactive'
          AND erintett_vagyok__c = :erintettVagyokE
        ORDER BY CreatedDate DESC
      ];
    } else {
      results = [
        SELECT
          Id,
          Name,
          CreatedDate,
          T_Recordtype_Name__c,
          T_RecordType_Developer_Name__c,
          OwnerId,
          ShippingCity,
          ShippingPostalCode,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingPostalCode,
          BillingLatitude,
          BillingLongitude,
          Handling_Group_Narrowest_Level__c,
          Sales_Group__c,
          Latest_Meeting_Minutes_Date_Time__c,
          Status__c,
          Region__c,
          Base_margin_performance__c,
          Highest_value_of_quotes_HUF__c,
          PreviousFinancialYearGrossBaseMarginHU__c,
          Nyitott_Ft_potencial__c,
          Ossz_Ft_potencial__c,
          erintett_vagyok__c
        FROM Account
        WHERE
          T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
          AND Status__c = 'Inactive'
        ORDER BY CreatedDate DESC
      ];
    }

    List<Id> resultSet = new List<Id>();
    for (Account acc : results) {
      resultSet.add(acc.Id);
    }
    return resultSet;
  }*/

  /*  @AuraEnabled(Cacheable=true)
  public static Map<String, String> regionValueLabelPairs() {
    List<String> labels = getAllRegionsLabels();
    List<String> values = getAllRegionsValues();
    Map<String, String> result = new Map<String, String>();
    //        System.debug('regionValueLabelPairs labels.size:'+labels.size());
    //        System.debug('regionValueLabelPairs values.size:'+values.size());
    for (Integer i = 0; i < labels.size(); i++) {
      result.put(values[i], labels[i]);
    }
    return result;
  }*/

  /*  @AuraEnabled
  public static List<Account> getAccountsByRegion(String region) {
    List<Account> results = [
      SELECT
        Id,
        Name,
        T_Recordtype_Name__c,
        T_RecordType_Developer_Name__c,
        OwnerId,
        ShippingCity,
        ShippingPostalCode,
        ShippingLatitude,
        ShippingLongitude,
        BillingCity,
        BillingPostalCode,
        BillingLatitude,
        BillingLongitude,
        Handling_Group_Narrowest_Level__c,
        Sales_Group__c,
        Latest_Meeting_Minutes_Date_Time__c,
        Status__c,
        Region__c,
        Base_margin_performance__c,
        Highest_value_of_quotes_HUF__c,
        PreviousFinancialYearGrossBaseMarginHU__c,
        Nyitott_Ft_potencial__c,
        Ossz_Ft_potencial__c,
        erintett_vagyok__c
      FROM Account
      WHERE
        T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
        AND Region__c = :region
    ];
    return results;
  }*/
  /*
  @AuraEnabled(Cacheable=false)
  public static Map<String, List<Id>> getAccountsByRegions(String[] regions) {
    //System.debug('getAccountsByRegions regions:'+regions);

    //        SObjectType objectType = Schema.getGlobalDescribe().get('Account');
    //        DescribeSObjectResult sObjectResult = objectType.getDescribe();
    //        Map<String, SObjectField> fieldMap = sObjectResult.fields.getMap();
    //        DescribeFieldResult fieldResult = fieldMap.get('Region__c').getDescribe();
    //        List<PicklistEntry> ples = fieldResult.getPicklistValues();

    Map<String, List<Id>> resultMap = new Map<String, List<Id>>();
    for (String region : getAllRegions()) {
      resultMap.put(region, new List<Id>());
    }
    //System.debug('resultMap before:' + resultMap);
    List<Account> results = [
      SELECT
        Id,
        Name,
        T_Recordtype_Name__c,
        T_RecordType_Developer_Name__c,
        OwnerId,
        ShippingCity,
        ShippingPostalCode,
        ShippingLatitude,
        ShippingLongitude,
        BillingCity,
        BillingPostalCode,
        BillingLatitude,
        BillingLongitude,
        Handling_Group_Narrowest_Level__c,
        Sales_Group__c,
        Latest_Meeting_Minutes_Date_Time__c,
        Status__c,
        toLabel(Region__c),
        Base_margin_performance__c,
        Highest_value_of_quotes_HUF__c,
        PreviousFinancialYearGrossBaseMarginHU__c,
        Nyitott_Ft_potencial__c,
        Ossz_Ft_potencial__c,
        erintett_vagyok__c
      FROM Account
      WHERE
        T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
        AND toLabel(Region__c) IN :regions
    ];
    for (Account acc : results) {
      String region = acc.Region__c;
      resultMap.get(region).add(acc.Id);
    }
    //System.debug('resultMap after:' + resultMap);
    // {Bratislava=(), Budapest=(0017Y000020yT16QAE, 0017Y00001yfoknQAA, 0017Y000020ySswQAE), Debrecen=(), Export=(0017Y000020ySxhQAE, 0017Y000020yT5wQAE), Győr=(), Gönyű=(), ...
    return resultMap;
  }
*/

  /*  @AuraEnabled
  public static List<Account> getAccountsByHandlingGroupNarrowestLevel(
    String handlingGroupNarrowestLevel,
    Boolean erintettVagyokE
  ) {
    List<Account> results;
    if (erintettVagyokE) {
      results = [
        SELECT
          Id,
          Name,
          T_Recordtype_Name__c,
          T_RecordType_Developer_Name__c,
          OwnerId,
          ShippingCity,
          ShippingPostalCode,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingPostalCode,
          BillingLatitude,
          BillingLongitude,
          Handling_Group_Narrowest_Level__c,
          Sales_Group__c,
          Latest_Meeting_Minutes_Date_Time__c,
          Status__c,
          Region__c,
          Base_margin_performance__c,
          Highest_value_of_quotes_HUF__c,
          PreviousFinancialYearGrossBaseMarginHU__c,
          Nyitott_Ft_potencial__c,
          Ossz_Ft_potencial__c,
          erintett_vagyok__c
        FROM Account
        WHERE
          T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
          AND Handling_Group_Narrowest_Level__c = :handlingGroupNarrowestLevel
          AND erintett_vagyok__c = :erintettVagyokE
      ];
    } else {
      results = [
        SELECT
          Id,
          Name,
          T_Recordtype_Name__c,
          T_RecordType_Developer_Name__c,
          OwnerId,
          ShippingCity,
          ShippingPostalCode,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingPostalCode,
          BillingLatitude,
          BillingLongitude,
          Handling_Group_Narrowest_Level__c,
          Sales_Group__c,
          Latest_Meeting_Minutes_Date_Time__c,
          Status__c,
          Region__c,
          Base_margin_performance__c,
          Highest_value_of_quotes_HUF__c,
          PreviousFinancialYearGrossBaseMarginHU__c,
          Nyitott_Ft_potencial__c,
          Ossz_Ft_potencial__c,
          erintett_vagyok__c
        FROM Account
        WHERE
          T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
          AND Handling_Group_Narrowest_Level__c = :handlingGroupNarrowestLevel
      ];
    }
    return results;
  }*/
  /*  @AuraEnabled
  public static List<Account> getAccountsByHandlingGroupNarrowestLevels(
    String[] handlingGroupNarrowestLevels,
    Boolean erintettVagyokE
  ) {
    List<Account> results;
    if (erintettVagyokE) {
      results = [
        SELECT
          Id,
          Name,
          T_Recordtype_Name__c,
          T_RecordType_Developer_Name__c,
          OwnerId,
          ShippingCity,
          ShippingPostalCode,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingPostalCode,
          BillingLatitude,
          BillingLongitude,
          Handling_Group_Narrowest_Level__c,
          Sales_Group__c,
          Latest_Meeting_Minutes_Date_Time__c,
          Status__c,
          Region__c,
          Base_margin_performance__c,
          Highest_value_of_quotes_HUF__c,
          PreviousFinancialYearGrossBaseMarginHU__c,
          Nyitott_Ft_potencial__c,
          Ossz_Ft_potencial__c,
          erintett_vagyok__c
        FROM Account
        WHERE
          T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
          AND Handling_Group_Narrowest_Level__c IN :handlingGroupNarrowestLevels
          AND erintett_vagyok__c = :erintettVagyokE
      ];
    } else {
      results = [
        SELECT
          Id,
          Name,
          T_Recordtype_Name__c,
          T_RecordType_Developer_Name__c,
          OwnerId,
          ShippingCity,
          ShippingPostalCode,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingPostalCode,
          BillingLatitude,
          BillingLongitude,
          Handling_Group_Narrowest_Level__c,
          Sales_Group__c,
          Latest_Meeting_Minutes_Date_Time__c,
          Status__c,
          Region__c,
          Base_margin_performance__c,
          Highest_value_of_quotes_HUF__c,
          PreviousFinancialYearGrossBaseMarginHU__c,
          Nyitott_Ft_potencial__c,
          Ossz_Ft_potencial__c,
          erintett_vagyok__c
        FROM Account
        WHERE
          T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
          AND Handling_Group_Narrowest_Level__c IN :handlingGroupNarrowestLevels
      ];
    }
    return results;
  }*/

  /*  @AuraEnabled
  public static List<String> getAccountIdsByHandlingGroupNarrowestLevels(
    String[] handlingGroupNarrowestLevels,
    Boolean erintettVagyokE
  ) {
    List<Account> accounts = getAccountsByHandlingGroupNarrowestLevels(
      handlingGroupNarrowestLevels,
      erintettVagyokE
    );
    List<String> resultIds = new List<String>();
    for (Account acc : accounts) {
      resultIds.add(acc.Id);
    }
    return resultIds;
  }*/

  /*  @AuraEnabled
  public static List<Account> getAccountsBySalesGroup(
    String salesGroup,
    Boolean erintettVagyokE
  ) {
    List<Account> results;
    if (erintettVagyokE) {
      results = [
        SELECT
          Id,
          Name,
          T_Recordtype_Name__c,
          T_RecordType_Developer_Name__c,
          OwnerId,
          ShippingCity,
          ShippingPostalCode,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingPostalCode,
          BillingLatitude,
          BillingLongitude,
          Handling_Group_Narrowest_Level__c,
          toLabel(Sales_Group__c),
          Latest_Meeting_Minutes_Date_Time__c,
          Status__c,
          Region__c,
          Base_margin_performance__c,
          Highest_value_of_quotes_HUF__c,
          PreviousFinancialYearGrossBaseMarginHU__c,
          Nyitott_Ft_potencial__c,
          Ossz_Ft_potencial__c,
          erintett_vagyok__c
        FROM Account
        WHERE
          T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
          AND toLabel(Sales_Group__c) = :salesGroup
          AND erintett_vagyok__c = :erintettVagyokE
      ];
    } else {
      results = [
        SELECT
          Id,
          Name,
          T_Recordtype_Name__c,
          T_RecordType_Developer_Name__c,
          OwnerId,
          ShippingCity,
          ShippingPostalCode,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingPostalCode,
          BillingLatitude,
          BillingLongitude,
          Handling_Group_Narrowest_Level__c,
          toLabel(Sales_Group__c),
          Latest_Meeting_Minutes_Date_Time__c,
          Status__c,
          Region__c,
          Base_margin_performance__c,
          Highest_value_of_quotes_HUF__c,
          PreviousFinancialYearGrossBaseMarginHU__c,
          Nyitott_Ft_potencial__c,
          Ossz_Ft_potencial__c,
          erintett_vagyok__c
        FROM Account
        WHERE
          T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
          AND toLabel(Sales_Group__c) = :salesGroup
      ];
    }

    return results;
  }*/
  /*  @AuraEnabled
  public static List<Account> getAccountsBySalesGroups(
    String[] salesGroups,
    Boolean erintettVagyokE
  ) {
    List<Account> results;
    if (erintettVagyokE) {
      results = [
        SELECT
          Id,
          Name,
          T_Recordtype_Name__c,
          T_RecordType_Developer_Name__c,
          OwnerId,
          ShippingCity,
          ShippingPostalCode,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingPostalCode,
          BillingLatitude,
          BillingLongitude,
          Handling_Group_Narrowest_Level__c,
          toLabel(Sales_Group__c),
          Latest_Meeting_Minutes_Date_Time__c,
          Status__c,
          Region__c,
          Base_margin_performance__c,
          Highest_value_of_quotes_HUF__c,
          PreviousFinancialYearGrossBaseMarginHU__c,
          Nyitott_Ft_potencial__c,
          Ossz_Ft_potencial__c,
          erintett_vagyok__c
        FROM Account
        WHERE
          T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
          AND toLabel(Sales_Group__c) IN :salesGroups
          AND erintett_vagyok__c = :erintettVagyokE
      ];
    } else {
      results = [
        SELECT
          Id,
          Name,
          T_Recordtype_Name__c,
          T_RecordType_Developer_Name__c,
          OwnerId,
          ShippingCity,
          ShippingPostalCode,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingPostalCode,
          BillingLatitude,
          BillingLongitude,
          Handling_Group_Narrowest_Level__c,
          toLabel(Sales_Group__c),
          Latest_Meeting_Minutes_Date_Time__c,
          Status__c,
          Region__c,
          Base_margin_performance__c,
          Highest_value_of_quotes_HUF__c,
          PreviousFinancialYearGrossBaseMarginHU__c,
          Nyitott_Ft_potencial__c,
          Ossz_Ft_potencial__c,
          erintett_vagyok__c
        FROM Account
        WHERE
          T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
          AND toLabel(Sales_Group__c) IN :salesGroups
      ];
    }

    return results;
  }*/

  /*  @AuraEnabled
  public static List<Account> getAccountsBySalesGroupsWithAPInames(
    String[] salesGroups,
    Boolean erintettVagyokE
  ) {
    List<Account> results;
    if (erintettVagyokE) {
      results = [
        SELECT
          Id,
          Name,
          T_Recordtype_Name__c,
          T_RecordType_Developer_Name__c,
          OwnerId,
          ShippingCity,
          ShippingPostalCode,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingPostalCode,
          BillingLatitude,
          BillingLongitude,
          Handling_Group_Narrowest_Level__c,
          Sales_Group__c,
          Latest_Meeting_Minutes_Date_Time__c,
          Status__c,
          Region__c,
          Base_margin_performance__c,
          Highest_value_of_quotes_HUF__c,
          PreviousFinancialYearGrossBaseMarginHU__c,
          Nyitott_Ft_potencial__c,
          Ossz_Ft_potencial__c,
          erintett_vagyok__c
        FROM Account
        WHERE
          T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
          AND toLabel(Sales_Group__c) IN :salesGroups
          AND erintett_vagyok__c = :erintettVagyokE
      ];
    } else {
      results = [
        SELECT
          Id,
          Name,
          T_Recordtype_Name__c,
          T_RecordType_Developer_Name__c,
          OwnerId,
          ShippingCity,
          ShippingPostalCode,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingPostalCode,
          BillingLatitude,
          BillingLongitude,
          Handling_Group_Narrowest_Level__c,
          Sales_Group__c,
          Latest_Meeting_Minutes_Date_Time__c,
          Status__c,
          Region__c,
          Base_margin_performance__c,
          Highest_value_of_quotes_HUF__c,
          PreviousFinancialYearGrossBaseMarginHU__c,
          Nyitott_Ft_potencial__c,
          Ossz_Ft_potencial__c,
          erintett_vagyok__c
        FROM Account
        WHERE
          T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
          AND toLabel(Sales_Group__c) IN :salesGroups
      ];
    }

    return results;
  }*/

  /*  @AuraEnabled
  public static List<Account> getAccountsByASCGroups(
    String[] ASCGroups,
    Boolean erintettVagyokE
  ) {
    String ASCGroupsString = String.join(ASCGroups, ';');

    List<Account> results;
    if (erintettVagyokE) {
      results = [
        SELECT
          Id,
          Name,
          T_Recordtype_Name__c,
          T_RecordType_Developer_Name__c,
          OwnerId,
          ShippingCity,
          ShippingPostalCode,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingPostalCode,
          BillingLatitude,
          BillingLongitude,
          Handling_Group_Narrowest_Level__c,
          Sales_Group__c,
          Latest_Meeting_Minutes_Date_Time__c,
          Status__c,
          Region__c,
          Base_margin_performance__c,
          Highest_value_of_quotes_HUF__c,
          PreviousFinancialYearGrossBaseMarginHU__c,
          Nyitott_Ft_potencial__c,
          Ossz_Ft_potencial__c,
          ASC_group__c,
          erintett_vagyok__c
        FROM Account
        WHERE
          T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
          AND ASC_group__c INCLUDES (:ASCGroupsString)
          AND erintett_vagyok__c = :erintettVagyokE
      ];
    } else {
      results = [
        SELECT
          Id,
          Name,
          T_Recordtype_Name__c,
          T_RecordType_Developer_Name__c,
          OwnerId,
          ShippingCity,
          ShippingPostalCode,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingPostalCode,
          BillingLatitude,
          BillingLongitude,
          Handling_Group_Narrowest_Level__c,
          Sales_Group__c,
          Latest_Meeting_Minutes_Date_Time__c,
          Status__c,
          Region__c,
          Base_margin_performance__c,
          Highest_value_of_quotes_HUF__c,
          PreviousFinancialYearGrossBaseMarginHU__c,
          Nyitott_Ft_potencial__c,
          Ossz_Ft_potencial__c,
          ASC_group__c,
          erintett_vagyok__c
        FROM Account
        WHERE
          T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
          AND ASC_group__c INCLUDES (:ASCGroupsString)
      ];
    }
    return results;
  }*/

  /*  @AuraEnabled
  public static List<Id> getVisszaesettVevok(Boolean erintettVagyokE) {
    Map<String, Latogatastervezo_valtozoi__mdt> mapX = Latogatastervezo_valtozoi__mdt.getAll();
    Decimal baseMarginPerformanceMdt = mapX.get('Base_margin_performance')
      .Hatarertek__c;
    Decimal previousFinancialYearGrossBaseMarginHu = mapX.get(
        'PreviousFinancialYearGrossBaseMarginHU'
      )
      .Hatarertek__c;

    List<Account> results;
    if (erintettVagyokE) {
      results = [
        SELECT
          Id,
          Name,
          CreatedDate,
          T_Recordtype_Name__c,
          T_RecordType_Developer_Name__c,
          OwnerId,
          ShippingCity,
          ShippingPostalCode,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingPostalCode,
          BillingLatitude,
          BillingLongitude,
          Handling_Group_Narrowest_Level__c,
          Sales_Group__c,
          Latest_Meeting_Minutes_Date_Time__c,
          Status__c,
          Region__c,
          Base_margin_performance__c,
          Highest_value_of_quotes_HUF__c,
          PreviousFinancialYearGrossBaseMarginHU__c,
          Nyitott_Ft_potencial__c,
          Ossz_Ft_potencial__c,
          erintett_vagyok__c
        FROM Account
        WHERE
          T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
          AND Base_margin_performance__c < :baseMarginPerformanceMdt
          AND PreviousFinancialYearGrossBaseMarginHU__c > :previousFinancialYearGrossBaseMarginHu
          AND erintett_vagyok__c = :erintettVagyokE
        ORDER BY Name DESC
      ];
    } else {
      results = [
        SELECT
          Id,
          Name,
          CreatedDate,
          T_Recordtype_Name__c,
          T_RecordType_Developer_Name__c,
          OwnerId,
          ShippingCity,
          ShippingPostalCode,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingPostalCode,
          BillingLatitude,
          BillingLongitude,
          Handling_Group_Narrowest_Level__c,
          Sales_Group__c,
          Latest_Meeting_Minutes_Date_Time__c,
          Status__c,
          Region__c,
          Base_margin_performance__c,
          Highest_value_of_quotes_HUF__c,
          PreviousFinancialYearGrossBaseMarginHU__c,
          Nyitott_Ft_potencial__c,
          Ossz_Ft_potencial__c,
          erintett_vagyok__c
        FROM Account
        WHERE
          T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
          AND Base_margin_performance__c < :baseMarginPerformanceMdt
          AND PreviousFinancialYearGrossBaseMarginHU__c > :previousFinancialYearGrossBaseMarginHu
        ORDER BY Name DESC
      ];
    }

    //                        AND Base_margin_performance__c < :baseMarginPerformanceMdt
    //                        AND PreviousFinancialYearGrossBaseMarginHU__c > :previousFinancialYearGrossBaseMarginHu
    // LIMIT 5
    //

    List<Id> resultSet = new List<Id>();
    for (Account acc : results) {
      resultSet.add(acc.Id);
    }
    return resultSet;
  }*/
  /*  @AuraEnabled
  public static List<Id> getNagyAjanlattalRendelkezoVevok(
    Boolean erintettVagyokE
  ) {
    Map<String, Latogatastervezo_valtozoi__mdt> mapX = Latogatastervezo_valtozoi__mdt.getAll();
    Decimal highestValueOfQuotesMdt = mapX.get('Highest_value_of_quotes_HUF')
      .Hatarertek__c;

    List<Account> results;
    //erintettVagyokE = false;
    if (erintettVagyokE) {
      results = [
        SELECT
          Id,
          Name,
          CreatedDate,
          T_Recordtype_Name__c,
          T_RecordType_Developer_Name__c,
          OwnerId,
          ShippingCity,
          ShippingPostalCode,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingPostalCode,
          BillingLatitude,
          BillingLongitude,
          Handling_Group_Narrowest_Level__c,
          Sales_Group__c,
          Latest_Meeting_Minutes_Date_Time__c,
          Status__c,
          Region__c,
          Base_margin_performance__c,
          Highest_value_of_quotes_HUF__c,
          PreviousFinancialYearGrossBaseMarginHU__c,
          Nyitott_Ft_potencial__c,
          Ossz_Ft_potencial__c,
          */ /*(SELECT Id, Status, CreatedDate FROM Tasks),*/ /*
          erintett_vagyok__c,
          (
            SELECT Id, Total_of_open_items_HUF__c, Status__c, Valid_from__c
            FROM Quote__r
            WHERE Valid_from__c = LAST_N_DAYS:28 AND Status__c != 'Lezárt'
          )
        FROM Account
        WHERE
          T_RecordType_Developer_Name__c IN (
            'Megrendelo',
            'Lead'
            */ /*AND Highest_value_of_quotes_HUF__c >= :highestValueOfQuotesMdt*/ /*
          )
          AND erintett_vagyok__c = :erintettVagyokE
        ORDER BY CreatedDate
      ];
      //      AND Highest_value_of_quotes_HUF__c >= :highestValueOfQuotesMdt
      // LIMIT 3
    } else {
      results = [
        SELECT
          Id,
          Name,
          CreatedDate,
          T_Recordtype_Name__c,
          T_RecordType_Developer_Name__c,
          OwnerId,
          ShippingCity,
          ShippingPostalCode,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingPostalCode,
          BillingLatitude,
          BillingLongitude,
          Handling_Group_Narrowest_Level__c,
          Sales_Group__c,
          Latest_Meeting_Minutes_Date_Time__c,
          Status__c,
          Region__c,
          Base_margin_performance__c,
          Highest_value_of_quotes_HUF__c,
          PreviousFinancialYearGrossBaseMarginHU__c,
          Nyitott_Ft_potencial__c,
          Ossz_Ft_potencial__c,
          */ /*(SELECT Id, Status, CreatedDate FROM Tasks),*/ /*
          erintett_vagyok__c,
          (
            SELECT Id, Total_of_open_items_HUF__c, Status__c, Valid_from__c
            FROM Quote__r
            WHERE Valid_from__c = LAST_N_DAYS:28 AND Status__c != 'Lezárt'
          )
        FROM Account
        WHERE T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
        */ /*AND Highest_value_of_quotes_HUF__c >= :highestValueOfQuotesMdt*/ /*
        ORDER BY CreatedDate
      ];
      //      AND Highest_value_of_quotes_HUF__c >= :highestValueOfQuotesMdt
      // LIMIT 3
    }

    List<Id> resultSet = new List<Id>();
    for (Account acc : results) {
      Double sumOfQuoteValues = 0.0;
      for (Quote2__c q : acc.Quote__r) {
        sumOfQuoteValues += q.Total_of_open_items_HUF__c;
      }
      if (sumOfQuoteValues >= highestValueOfQuotesMdt) {
        resultSet.add(acc.Id);
      }
    }
    return resultSet;
  }*/
  /*  @AuraEnabled
  public static List<Id> getAccountsWithNyitottPotencialMagas(
    Boolean erintettVagyokE
  ) {
    Map<String, Latogatastervezo_valtozoi__mdt> mapX = Latogatastervezo_valtozoi__mdt.getAll();
    Decimal nyitottFtPotencialMdt = mapX.get('Nyitott_Ft_potencial')
      .Hatarertek__c;
    Decimal osszFtPotencialMdt = mapX.get(
        'Nyitott_Ft_potencial_Ossz_Ft_potencial'
      )
      .Hatarertek__c;

    List<Account> results;
    if (erintettVagyokE) {
      results = [
        SELECT
          Id,
          Name,
          CreatedDate,
          T_Recordtype_Name__c,
          T_RecordType_Developer_Name__c,
          OwnerId,
          ShippingCity,
          ShippingPostalCode,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingPostalCode,
          BillingLatitude,
          BillingLongitude,
          Handling_Group_Narrowest_Level__c,
          Sales_Group__c,
          Latest_Meeting_Minutes_Date_Time__c,
          Status__c,
          Region__c,
          Base_margin_performance__c,
          Highest_value_of_quotes_HUF__c,
          PreviousFinancialYearGrossBaseMarginHU__c,
          Nyitott_Ft_potencial__c,
          Ossz_Ft_potencial__c,
          */ /*(SELECT Id, Status, CreatedDate FROM Tasks),*/ /*
          erintett_vagyok__c
        FROM Account
        WHERE
          T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
          AND Nyitott_Ft_potencial__c > :nyitottFtPotencialMdt
          AND erintett_vagyok__c = :erintettVagyokE
        ORDER BY CreatedDate DESC
      ];
      //  WHERE Status IN ('Open', 'Nyitott'))
    } else {
      results = [
        SELECT
          Id,
          Name,
          CreatedDate,
          T_Recordtype_Name__c,
          T_RecordType_Developer_Name__c,
          OwnerId,
          ShippingCity,
          ShippingPostalCode,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingPostalCode,
          BillingLatitude,
          BillingLongitude,
          Handling_Group_Narrowest_Level__c,
          Sales_Group__c,
          Latest_Meeting_Minutes_Date_Time__c,
          Status__c,
          Region__c,
          Base_margin_performance__c,
          Highest_value_of_quotes_HUF__c,
          PreviousFinancialYearGrossBaseMarginHU__c,
          Nyitott_Ft_potencial__c,
          Ossz_Ft_potencial__c,
          */ /*(SELECT Id, Status, CreatedDate FROM Tasks),*/ /*
          erintett_vagyok__c
        FROM Account
        WHERE
          T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
          AND Nyitott_Ft_potencial__c > :nyitottFtPotencialMdt
        ORDER BY CreatedDate DESC
      ];
    }

    //        AND Nyitott_Ft_potencial__c > :nyitottFtPotencialMdt
    //                                AND Nyitott_Ft_potencial__c/Ossz_Ft_potencial__c < :osszFtPotencialMdt
    // LIMIT 4

    Set<Id> MMaccountsWithOpenTask = new Set<Id>();
    for (Task t : [
      SELECT Id, Ugyfel__c, WhatId, Status
      FROM Task
      WHERE Ugyfel__c != NULL AND Status IN ('Open', 'Nyitott')
    ]) {
      MMaccountsWithOpenTask.add(t.Ugyfel__c);
    }

    List<Id> resultSet = new List<Id>();
    for (Account acc : results) {
      if (
        acc.Nyitott_Ft_potencial__c / acc.Ossz_Ft_potencial__c >
        osszFtPotencialMdt
      ) {
        */ /*&& (!acc.Tasks.isEmpty() || MMaccountsWithOpenTask.contains(acc.Id))*/ /*
        resultSet.add(acc.Id);
      }
    }
    return resultSet;
  }*/

  @AuraEnabled
  public static User getUserInfo() {
    Id userId = UserInfo.getUserId();
    return [SELECT Id, UserRole.Name, Name FROM User WHERE Id = :userId];
  }

  @AuraEnabled
  public static Map<Id, Double> getDistanceFrom(
    Id accountId,
    Boolean getAllAccounts,
    Boolean erintettVagyokE
  ) {
    //getResponse(getAllAccounts, false);
    List<Account> pivotAccNemErintettek = [
      SELECT
        Id,
        Name,
        /*T_Recordtype_Name__c,
         T_RecordType_Developer_Name__c,*/
        OwnerId,
        ShippingCity,
        ShippingPostalCode,
        ShippingLatitude,
        ShippingLongitude,
        BillingCity,
        BillingPostalCode,
        BillingLatitude,
        BillingLongitude /*,
        Handling_Group_Narrowest_Level__c,
        Sales_Group__c,
        Latest_Meeting_Minutes_Date_Time__c,
        Status__c,
        Region__c,
        Base_margin_performance__c,
        Highest_value_of_quotes_HUF__c,
        PreviousFinancialYearGrossBaseMarginHU__c,
        Nyitott_Ft_potencial__c,
        Ossz_Ft_potencial__c,
        erintett_vagyok__c*/
      FROM Account
      WHERE Id = :accountId
    ];
    //getResponse(getAllAccounts, true);
    List<Account> pivotAccErintettek = [
      SELECT
        Id,
        Name,
        /*T_Recordtype_Name__c,
         T_RecordType_Developer_Name__c,*/
        OwnerId,
        ShippingCity,
        ShippingPostalCode,
        ShippingLatitude,
        ShippingLongitude,
        BillingCity,
        BillingPostalCode,
        BillingLatitude,
        BillingLongitude /*,
        Handling_Group_Narrowest_Level__c,
        Sales_Group__c,
        Latest_Meeting_Minutes_Date_Time__c,
        Status__c,
        Region__c,
        Base_margin_performance__c,
        Highest_value_of_quotes_HUF__c,
        PreviousFinancialYearGrossBaseMarginHU__c,
        Nyitott_Ft_potencial__c,
        Ossz_Ft_potencial__c,
        erintett_vagyok__c*/
      FROM Account
      WHERE Id = :accountId
    ];
    // AND erintett_vagyok__c = :erintettVagyokE

    Account pivotAcc;
    if (pivotAccNemErintettek != null && pivotAccNemErintettek[0] != null) {
      pivotAcc = pivotAccNemErintettek[0];
    }
    if (pivotAccErintettek != null && pivotAccErintettek[0] != null) {
      pivotAcc = pivotAccErintettek[0];
    }
    System.debug('pivotAcc:' + pivotAcc);
    if (pivotAcc == null) {
      return null;
    }

    if (pivotAcc.BillingLongitude == null || pivotAcc.BillingLatitude == null) {
      return null;
    }

    Location pivotAccLocation = Location.newInstance(
      pivotAcc.BillingLatitude,
      pivotAcc.BillingLongitude
    );
    Map<Id, Decimal> distanceByAccountId = new Map<Id, Decimal>();
    //        getResponse(getAllAccounts, false);
    //        for (Account acc : response.accounts) {
    //            if (acc.BillingLatitude == null || acc.BillingLongitude == null) {
    //                //System.debug('Location is missing!');
    //                continue;
    //            }
    //
    //            Location accountsLocation = Location.newInstance(
    //                    acc.BillingLatitude,
    //                    acc.BillingLongitude
    //            );
    //            Double distanceFromPivot =
    //                    Math.round(
    //                            Location.getDistance(pivotAccLocation, accountsLocation, 'km') * 100
    //                    ) / 100.0;
    //            distanceByAccountId.put(acc.Id, distanceFromPivot);
    //        }
    //        getResponse(getAllAccounts, true);
    //        for (Account acc : response.accounts) {
    //            if (acc.BillingLatitude == null || acc.BillingLongitude == null) {
    //                //System.debug('Location is missing!');
    //                continue;
    //            }
    //
    //            Location accountsLocation = Location.newInstance(
    //                    acc.BillingLatitude,
    //                    acc.BillingLongitude
    //            );
    //            Double distanceFromPivot =
    //                    Math.round(
    //                            Location.getDistance(pivotAccLocation, accountsLocation, 'km') * 100
    //                    ) / 100.0;
    //            distanceByAccountId.put(acc.Id, distanceFromPivot);
    //        }
    getResponse(getAllAccounts, erintettVagyokE);
    System.debug(
      'getDistanceFrom response.accounts.size:' + response.accounts.size()
    );
    for (Account acc : response.accounts) {
      if (acc.BillingLatitude == null || acc.BillingLongitude == null) {
        //System.debug('Location is missing!');
        continue;
      }

      Location accountsLocation = Location.newInstance(
        acc.BillingLatitude,
        acc.BillingLongitude
      );
      Double distanceFromPivot =
        Math.round(
          Location.getDistance(pivotAccLocation, accountsLocation, 'km') * 100
        ) / 100.0;
      distanceByAccountId.put(acc.Id, distanceFromPivot);
    }

    //System.debug(distanceByAccountId);
    return distanceByAccountId;
  }

  @AuraEnabled
  public static String deleteAllEvents(Datetime startTime, Datetime endTime) {
    try {
      List<Event> eventsToDelete = [
        SELECT Id
        FROM Event
        WHERE
          StartDateTime > :startTime
          AND EndDateTime < :endTime
          AND OwnerId = :UserInfo.getUserId()
      ];
      delete eventsToDelete;
      return 'OK';
    } catch (Exception e) {
      System.debug(e.getStackTraceString());
      return e.getMessage();
    }
  }

  //    @AuraEnabled
  //    public static String createEvents(String jsonString) {
  //        try {
  //            List<DayEventData> dayEvents = (List<DayEventData>) JSON.deserialize(
  //                    jsonString,
  //                    List<DayEventData>.class
  //            );
  //            List<Event> eventsToInsert = new List<Event>();
  //            Date myDate = Date.today();
  //            //            Datetime weekStart = Date.today().toStartofWeek();
  //            Datetime weekStart = dayEvents[0].dateOfVisit.toStartOfWeek();
  //            Integer i = 0;
  //            for (DayEventData day : dayEvents) {
  //                //System.debug(day);
  //                Datetime currentDate = weekStart.addDays(i).addHours(8);
  //                for (List<String> accData : day.accounts) {
  //                    Event currentEvent = new Event();
  //                    currentEvent.OwnerId = UserInfo.getUserId();
  //                    currentEvent.DurationInMinutes = 60;
  //                    currentEvent.Type = accData[0];
  //                    currentEvent.Subject = accData[3];
  //
  //                    if (accData[1] == null) {
  //                        currentEvent.StartDateTime = weekStart.addDays(i).addHours(6);
  //                        currentEvent.DurationInMinutes = 9 * 60;
  //                        currentEvent.Subject = accData[2];
  //                    } else {
  //                        currentEvent.WhatId = accData[1];
  //                        //                        currentEvent.AccountId = accData[1];
  //                        currentEvent.StartDateTime = currentDate;
  //                        currentDate = currentDate.addHours(1);
  //                    }
  //
  //                    eventsToInsert.add(currentEvent);
  //                }
  //                i++;
  //            }
  //            insert eventsToInsert;
  //            return 'OK';
  //        } catch (Exception e) {
  //            System.debug(e.getStackTraceString());
  //            return e.getMessage();
  //        }
  //    }

  // ez nem fog kelleni valószinű vagy nagyon át kell irni
  //    @AuraEnabled
  //    public static String upsertEvents(String jsonString) {
  //        try {
  //            List<DayEventData> dayEvents = (List<DayEventData>) JSON.deserialize(jsonString, List<DayEventData>.class);
  //            List<Event> eventsToUpsert = new List<Event>();
  //            List<Event> startingEvents = getEventsOfUser(dayEvents[0].dateOfVisit.toStartOfWeek());
  //            List<Event> eventsToDelete = new List<Event>();
  //            Set<Id> eventIds = new Set<Id>();
  //            Date myDate = Date.today();
  ////            Datetime weekStart = Date.today().toStartofWeek();
  //            Datetime weekStart = dayEvents[0].dateOfVisit.toStartOfWeek();
  //            Integer i = 0;
  //
  //            List<Event> badEvents = [SELECT Id From Event WHERE Statusz__c != 'Betervezett'
  //            AND OwnerId = :UserInfo.getUserId()];
  //            Set<String> badEventIds = new Set<String>();
  //            for(Event event : badEvents){
  //                badEventIds.add(event.Id);
  //            }
  //
  //            for (DayEventData day : dayEvents) {
  //                //System.debug(day);
  //                Datetime currentDate = weekStart.addDays(i).addHours(8);
  //                for (List<String> accData : day.accounts) {
  //                    Event currentEvent = new Event();
  //                    currentEvent.OwnerId = UserInfo.getUserId();
  //                    currentEvent.DurationInMinutes = 60;
  //                    currentEvent.Statusz__c = 'Betervezett';
  //                    currentEvent.Latogatas_fotipusa__c = accData[3];
  //                    currentEvent.Type = accData[0];
  //                    currentEvent.Altipus__c = accData[4];
  //                    currentEvent.Subject = accData[3];
  //                    if(accData.size() == 6){
  //                        currentEvent.Id = accData[5];
  //                        eventIds.add(currentEvent.Id);
  //                        if(badEventIds.contains(currentEvent.Id)) continue;
  //                    }
  //
  //                    if (accData[1] == null) {
  //                        currentEvent.StartDateTime = weekStart.addDays(i).addHours(6);
  //                        currentEvent.DurationInMinutes = 9 * 60;
  //                        currentEvent.Subject = accData[2];
  //                        currentEvent.Latogatas_fotipusa__c = accData[2];
  //
  //                    } else {
  //                        currentEvent.WhatId = accData[1];
  ////                        currentEvent.AccountId = accData[1];
  //                        currentEvent.StartDateTime = currentDate;
  //                        currentDate = currentDate.addHours(1);
  //                    }
  //                    eventsToUpsert.add(currentEvent);
  //                }
  //                i++;
  //            }
  //            for(Event e : startingEvents){
  //                if(eventIds.contains(e.Id) == false) eventsToDelete.add(e);
  //            }
  //
  //            upsert eventsToUpsert;
  //            delete eventsToDelete;
  //            return 'OK';
  //        } catch (Exception e) {
  //            System.debug(e.getStackTraceString());
  //            return e.getMessage();
  //        }
  //    }

  @AuraEnabled
  public static List<Event> upsertEvents(
    String jsonString,
    Date startOfSelectedWeek
  ) {
    System.debug('upsertEvents jsonString:' + jsonString);
    Date endOfSelectedWeek = startOfSelectedWeek.addDays(5);
    String userId = UserInfo.getUserId();
    List<Event> events = [
      SELECT
        Id,
        OwnerId,
        IsAllDayEvent,
        IsReminderSet,
        IsRecurrence2,
        WhatId,
        IsPrivate,
        Subject,
        /*Status__c,
         Planner__c,*/
        Type,
        WhoId,
        Location,
        StartDateTime,
        EndDateTime
      FROM Event
      WHERE
        /*Status__c = 'Betervezett'
        AND Planner__c = 'Trip planner'
        AND*/ OwnerId = :userId
        AND StartDateTime >= :startOfSelectedWeek
        AND EndDateTime <= :endOfSelectedWeek
      ORDER BY StartDateTime
    ];
    System.debug('upsertEvents queried events: ' + events);

    //                        Id,
    //                        OwnerId,
    //                        IsAllDayEvent,
    //                        IsReminderSet,
    //                        IsRecurrence2,
    //                        WhatId,
    //                        IsPrivate,
    //                        Subject,
    //                        Type,
    //                        WhoId,
    //                        Location,
    //                        StartDateTime,
    //                        EndDateTime

    //                WHERE
    //                        StartDateTime >= TODAY

    // kéne a már létező eventId-k is
    Map<Id, Event> fullEventMap = new Map<Id, Event>();
    for (Event e : events) {
      fullEventMap.put(e.Id, e);
    }
    // fullEventMap.keySet() // :)

    //System.debug('upsertEvents jsonString:'+jsonString);
    Object mainArrayObject = JSON.deserializeUntyped(jsonString);
    List<Object> mainArrayList = (List<Object>) mainArrayObject;
    //System.debug('upsertEvents mainArrayList:' + mainArrayList);

    Set<Id> existingCalendarEventIds = new Set<Id>();
    for (Object acc : mainArrayList) {
      //System.debug('acc element:' + acc);
      // {Id=0.6017518127745272, accounts=({BillingCity=Budapest,
      Map<String, Object> accOuterMap = (Map<String, Object>) acc;
      //System.debug('accMap:' + accOuterMap);
      //{Id=0.12000662559188569, accounts=({BillingCity=Budapest,
      //{Id=0.9482119490636267, accounts=(), date=2023-08-30, dayName=Szerda, displayDate=augusztus 30., visitCount=0}

      String dayDateString = accOuterMap.get('date').toString(); // 2023-08-28
      Datetime dayDateStartMidnight = Date.valueOf(dayDateString); // 2023-08-28 00:00:00
      //System.debug('dayDate:'+dayDate);
      Datetime dayDateStart8 = dayDateStartMidnight.addHours(8 - 2); // -2 mert 8:00 helyett 10:00-t mutatna
      Datetime eventDatetimeStart = dayDateStart8;
      Datetime eventDatetimeEnd = eventDatetimeStart.addHours(1);

      Set<Id> jsonEventIdsForADay = new Set<Id>();
      List<Object> accInnerAccountsList = (List<Object>) accOuterMap.get(
        'accounts'
      );
      for (Integer i = 0; i < accInnerAccountsList.size(); i++) {
        Object accInnerAccountList = accInnerAccountsList[i];
        Map<String, Object> accInnerMap = (Map<String, Object>) accInnerAccountList;
        System.debug(
          'upsertEvents accInnerMap JSON: ' + JSON.serializePretty(accInnerMap)
        );
        if (accInnerMap.containsKey('Id')) {
          //System.debug('accInnerMap to upsert:' + accInnerMap);
          // {BillingCity=Budapest, BillingLatitude=47.484334403775460, ...
          //System.debug('accInnerMap keySet:' + accInnerMap.keySet());
          for (String key : accInnerMap.keySet()) {
            //System.debug('key:' + key);
          }
          //key:Id
          //key:Name
          //key:T_RecordType_Developer_Name__c
          //key:OwnerId
          //key:BillingCity
          //key:BillingPostalCode
          //key:BillingLatitude
          //key:BillingLongitude
          //key:Status__c
          //key:Nyitott_Ft_potencial__c
          //key:erintett_vagyok__c
          //key:categories
          //key:icons
          //key:Subject
          //key:eventType
          //key:style
          //key:color
          //key:order
          //key:randomId
          //EventId is akinek volt, van

          Event eventToChange;
          if (accInnerMap.containsKey('EventId')) {
            jsonEventIdsForADay.add((Id) accInnerMap.get('EventId'));
            existingCalendarEventIds.add((Id) accInnerMap.get('EventId'));

            // meglévő event, őt fogja upsert update-elni
            eventToChange = fullEventMap.get((Id) accInnerMap.get('EventId'));
            if (eventToChange != null) {
              eventToChange.StartDateTime = eventDatetimeStart;
              eventToChange.EndDateTime = eventDatetimeEnd;
              //              eventToChange.Status__c = 'Betervezett';
              eventToChange.OwnerId = UserInfo.getUserId();
              eventToChange.DurationInMinutes = 60;

              if (accInnerMap.containsKey('visitType')) {
                eventToChange.Subject = accInnerMap.get('visitType').toString();
              }
            }
          } else {
            // új event-et húzott rá, upsert insert-eli
            Event newEvent = new Event(
              WhatId = (Id) accInnerMap.get('Id'),
              Subject = accInnerMap.containsKey('visitType')
                ? accInnerMap.get('visitType').toString()
                : 'Visit',
              Type = 'Meeting', // Type = 'Other',
              StartDateTime = eventDatetimeStart,
              EndDateTime = eventDatetimeEnd,
              /*Status__c = 'Betervezett',
               Planner__c = 'Trip planner',*/
              OwnerId = UserInfo.getUserId(),
              DurationInMinutes = 60
            );
            //                        if (accInnerMap.containsKey('visitType')) {
            //                            newEvent.Subject = accInnerMap.get('visitType').toString();
            //                        }
            events.add(newEvent);
          }

          eventDatetimeStart = eventDatetimeStart.addHours(1);
          eventDatetimeEnd = eventDatetimeStart.addHours(1);
        } else {
          // szürke esemény!

          System.debug('accInnerMap keyset: ' + accInnerMap.keySet());

          String grayEventSubject = 'Szabadnap';
          if (accInnerMap.containsKey('displayName')) {
            grayEventSubject = accInnerMap.get('displayName').toString();
          }
          System.debug('grayEventSubject: ' + grayEventSubject);
          Event newGrayEvent = new Event(
            Subject = grayEventSubject,
            Type = 'Other',
            StartDateTime = dayDateStart8,
            EndDateTime = dayDateStart8.addHours(8),
            /*Status__c = 'Betervezett',
             Planner__c = 'Trip planner',*/
            OwnerId = UserInfo.getUserId(),
            DurationInMinutes = 60 * 8
          );
          events.add(newGrayEvent);
        }
      }
    }

    //System.debug('existingCalendarEventIds:'+existingCalendarEventIds);
    //System.debug('fullEventMap.keySet():'+fullEventMap.keySet());

    List<Event> deleteableEvents = [
      SELECT Id, /*Status__c,*/ OwnerId /*, Planner__c*/
      FROM Event
      WHERE
        OwnerId = :userId
        AND Id NOT IN :existingCalendarEventIds
        AND Id IN :fullEventMap.keySet()
      /*AND Status__c = 'Betervezett'*/
    ];
    Set<Id> deletableEventIds = new Set<Id>();
    for (Event e : deleteableEvents) {
      deletableEventIds.add(e.Id);
    }
    if (deleteableEvents != null && !deleteableEvents.isEmpty()) {
      try {
        delete deleteableEvents;
      } catch (Exception e) {
        System.debug('upsertEvents delete error: ' + e.getMessage());
        // TODO - delete error toast
      }
    } else {
      // no need to delete events
      //System.debug('no need to delete events');
    }

    // Ha napon belül korábbit töröltünk, újra kell az órákat számolni!
    List<Event> eventsToReschedule = [
      SELECT
        Id,
        OwnerId,
        IsAllDayEvent,
        IsReminderSet,
        IsRecurrence2,
        WhatId,
        IsPrivate,
        Subject,
        /*Planner__c,*/
        Type,
        WhoId,
        Location,
        StartDateTime,
        EndDateTime
      FROM Event
      WHERE
        /*Status__c = 'Betervezett'
         AND*/ OwnerId = :userId
        AND StartDateTime >= :startOfSelectedWeek
        AND EndDateTime <= :endOfSelectedWeek
      ORDER BY StartDateTime
    ];

    for (Object acc : mainArrayList) {
      //System.debug('acc element:' + acc);
      // {Id=0.6017518127745272, accounts=({BillingCity=Budapest,
      Map<String, Object> accOuterMap = (Map<String, Object>) acc;
      //System.debug('accMap:' + accOuterMap);
      //{Id=0.12000662559188569, accounts=({BillingCity=Budapest,
      //{Id=0.9482119490636267, accounts=(), date=2023-08-30, dayName=Szerda, displayDate=augusztus 30., visitCount=0}

      String dayDateString = accOuterMap.get('date').toString(); // 2023-08-28
      Datetime dayDateStartMidnight = Date.valueOf(dayDateString); // 2023-08-28 00:00:00
      //System.debug('dayDate:'+dayDate);
      Datetime dayDateStart8 = dayDateStartMidnight.addHours(8 - 2); // -2 mert 8:00 helyett 10:00-t mutatna
      Datetime eventDatetimeStart = dayDateStart8;
      Datetime eventDatetimeEnd = eventDatetimeStart.addHours(1);

      Set<Id> eventIdsForADay = new Set<Id>();
      List<Object> accInnerAccountsList = (List<Object>) accOuterMap.get(
        'accounts'
      );
      //System.debug('accInnerAccountsList:' + accInnerAccountsList);
      for (Integer i = 0; i < accInnerAccountsList.size(); i++) {
        Object accInnerAccountList = accInnerAccountsList[i];
        Map<String, Object> accInnerMap = (Map<String, Object>) accInnerAccountList;
        //System.debug('accInnerMap:' + accInnerMap);

        Id matchingEventId = (Id) accInnerMap.get('EventId');
        //System.debug('matchingEventId:' + matchingEventId);

        for (Event eventToReschedule : eventsToReschedule) {
          if (
            eventToReschedule.Id != null &&
            eventToReschedule.Id == matchingEventId
          ) {
            eventToReschedule.StartDateTime = eventDatetimeStart;
            eventToReschedule.EndDateTime = eventDatetimeEnd;
          }
        }

        eventDatetimeStart = eventDatetimeStart.addHours(1);
        eventDatetimeEnd = eventDatetimeStart.addHours(1);
      }
    }

    if (events != null && !events.isEmpty()) {
      List<Id> allEventIds = new List<Id>();
      for (Event e : events) {
        allEventIds.add(e.Id);
      }
      //System.debug('allEventIds:' + allEventIds);

      //List<Event> eventsToUpsert = [SELECT Id FROM Event WHERE Id NOT IN :deletableEventIds];
      List<Event> eventsToUpsert = new List<Event>();
      for (Event e : events) {
        if (e.Id == null) {
          eventsToUpsert.add(e);
        }
        if (e.Id != null && !deletableEventIds.contains(e.Id)) {
          eventsToUpsert.add(e);
        }
      }
      //System.debug('eventsToUpsert:' + eventsToUpsert);

      try {
        //upsert events;
        upsert eventsToUpsert;
      } catch (Exception e) {
        System.debug('upsertEvents upsert error: ' + e.getMessage());
        // TODO - upsert error toast
      }
    } else {
      // no events affected in upsert
      //System.debug('no events affected in upsert');
    }

    return events;
  }

  @AuraEnabled
  public static List<PickListWrapper> getPickListValues(
    String SObjectName,
    String FieldName
  ) {
    String strObjectName = 'Event';
    String strPicklistField = 'Subject';
    Map<String, String> mapPickListValues = new Map<String, String>();
    Schema.SObjectType objSobjectType = Schema.getGlobalDescribe()
      .get(strObjectName);
    Schema.DescribeSObjectResult objDescribeSobject = objSobjectType.getDescribe();
    Map<String, Schema.SObjectField> mapFields = objDescribeSobject.fields.getMap();
    List<Schema.PicklistEntry> lstPickListValues = mapFields.get(
        strPicklistField
      )
      .getDescribe()
      .getPicklistValues();
    List<PickListWrapper> plws = new List<PickListWrapper>();
    for (Schema.PicklistEntry objPickList : lstPickListValues) {
      PickListWrapper plw = new PickListWrapper();
      plw.label = objPickList.getLabel();
      plw.value = objPickList.getValue();
      plws.add(plw);
    }
    return plws;
  }

  public class PickListWrapper {
    @AuraEnabled
    public String label { get; set; }
    @AuraEnabled
    public String value { get; set; }
  }

  public class StoreVisitControllerResponse {
    @AuraEnabled
    public List<Account> accounts { get; set; }
    @AuraEnabled
    public List<Object> cities { get; set; }
  }
  public class DayEventData {
    public String dayName { get; set; }
    public Date dateOfVisit { get; set; }
    public List<List<String>> accounts { get; set; }
  }

  private static final String CACHE_PARTITION = 'CacheForTripPlanner';
  private static final String SELECTED_ACCOUNT_KEY = 'SelectedAccountId';

    public static String savedSelectedAccountId {get; set;}

  @AuraEnabled
  public static String saveSelectedAccountId(String accountId) {
//    Cache.OrgPartition orgPartition = Cache.Org.getPartition(CACHE_PARTITION);
//    orgPartition.put(SELECTED_ACCOUNT_KEY, accountId);

    savedSelectedAccountId = accountId;

//    return accountId;
    return savedSelectedAccountId;
  }
  @AuraEnabled
  public static String loadSelectedAccountId() {
//    Cache.OrgPartition orgPartition = Cache.Org.getPartition(CACHE_PARTITION);
    String selectedAccountId = /*(String) orgPartition.get(SELECTED_ACCOUNT_KEY)*/ savedSelectedAccountId;
//    orgPartition.put(SELECTED_ACCOUNT_KEY, '');
    return selectedAccountId;
  }

  public class IconObject {
    public String icon_name;
    public String display_name;
    public Boolean selected;
    public String style;
    public String legend;
  }
  public class FilterOptions {
    public List<String> selectedHandlingGroupNarrowestLevels;
    public List<String> selectedASCGroups;
    public String selectedOwner;
    public List<String> selectedAccTypes;
    public String lastVisitDate;
    public Date lastVisitStringConvertedToDate;
    public List<IconObject> icons;
    public Integer tooManyAccountsLimit;
    public String searchWord;
  }

  @AuraEnabled
  public static List<Account> getFilteredAccounts(String filterOptionsJSON) {
    FilterOptions filterOptionsObject = (FilterOptions) JSON.deserialize(
      filterOptionsJSON,
      FilterOptions.class
    );
    if (
      filterOptionsObject.lastVisitDate != null &&
      filterOptionsObject.lastVisitDate.length() >= 1
    ) {
      filterOptionsObject.lastVisitStringConvertedToDate = Date.valueOf(
        filterOptionsObject.lastVisitDate
      );
    }
    System.debug(
      'getFilteredAccounts filterOptionsObject after deserialize:' +
      filterOptionsObject
    );

    String queryString =
      'SELECT\n' +
      '                        Id,\n' +
      '                        Name,\n' +
      /*      '                        T_Recordtype_Name__c,\n' +
       '                        T_RecordType_Developer_Name__c,\n' +*/
      '                        OwnerId,\n' +
      '                        ShippingCity,\n' +
      '                        ShippingPostalCode,\n' +
      '                        ShippingLatitude,\n' +
      '                        ShippingLongitude,\n' +
      '                        BillingCity,\n' +
      '                        BillingPostalCode,\n' +
      '                        BillingLatitude,\n' +
      '                        BillingLongitude,\n' +
      '                        BillingState,\n' +
      /*      '                        Handling_Group_Narrowest_Level__c,\n' +
      '                        Sales_Group__c,\n' +
      '                        ASC_group__c,\n' +
      '                        Latest_Meeting_Minutes_Date_Time__c,\n' +
      '                        Status__c,\n' +
      '                        Region__c,\n' +
      '                        Base_margin_performance__c,\n' +
      '                        Highest_value_of_quotes_HUF__c,\n' +
      '                        PreviousFinancialYearGrossBaseMarginHU__c,\n' +
      '                        Nyitott_Ft_potencial__c,\n' +
      '                        Ossz_Ft_potencial__c,\n' +*/
      /*'                        (SELECT Id, Status FROM Tasks WHERE Status IN (\'Open\', \'Nyitott\')),\n' +*/
      '                        (SELECT Id, Status FROM Tasks),\n' +
      /*      '                        erintett_vagyok__c,\n' +
       '                        Nem_kifizetodo_partner__c,\n' +*/
      '                        CreatedDate\n' +
      '                FROM Account\n' +
     '                WHERE Name != NULL \n ';

    // Account Types filter:
    if (!filterOptionsObject.selectedAccTypes.isEmpty()) {
      String typesString =
        '\'' +
        String.join(
          filterOptionsObject.selectedAccTypes,
          '\',\''
        ) +
        '\'';
      queryString +=
        ' \n AND Type IN (' +
        typesString +
        ') \n ';
    }

    // Kez. csop. legszűkebb szintje
    if (!filterOptionsObject.selectedHandlingGroupNarrowestLevels.isEmpty()) {
      String handlingGroupNarrowestLevelsString =
        '\'' +
        String.join(
          filterOptionsObject.selectedHandlingGroupNarrowestLevels,
          '\',\''
        ) +
        '\'';
      queryString +=
        ' \n AND Handling_Group_Narrowest_Level__c IN (' +
        handlingGroupNarrowestLevelsString +
        ') \n ';
    }

    // ASC csoport
    if (!filterOptionsObject.selectedASCGroups.isEmpty()) {
      String ASCGroupsString =
        '\'' +
        String.join(filterOptionsObject.selectedASCGroups, '\',\'') +
        '\'';
      queryString += ' \n AND ASC_group__c IN (' + ASCGroupsString + ') \n ';
    }

    // ÉS
    // Ügyfél kategória
    // Nagy ajánlattal rendelkező
    /*if (filterOptionsObject.icons[0].selected) {
      Map<String, Latogatastervezo_valtozoi__mdt> mapX = Latogatastervezo_valtozoi__mdt.getAll();
      Decimal highestValueOfQuotesMdt = mapX.get('Highest_value_of_quotes_HUF')
        .Hatarertek__c;

      //queryString += ' \n AND Highest_value_of_quotes_HUF__c >= ' + highestValueOfQuotesMdt + ' \n ';
    }*/
    /*if (filterOptionsObject.icons[1].selected) {
        queryString += '';
    }*/

    // Visszaesett
    /*if (filterOptionsObject.icons[2].selected) {
      Map<String, Latogatastervezo_valtozoi__mdt> mapX = Latogatastervezo_valtozoi__mdt.getAll();
      Decimal baseMarginPerformanceMdt = mapX.get('Base_margin_performance')
        .Hatarertek__c;
      Decimal previousFinancialYearGrossBaseMarginHu = mapX.get(
          'PreviousFinancialYearGrossBaseMarginHU'
        )
        .Hatarertek__c;

      //            queryString += ' \n AND Base_margin_performance__c < ' + baseMarginPerformanceMdt + ' \n' +
      //                    '                            AND PreviousFinancialYearGrossBaseMarginHU__c > ' + previousFinancialYearGrossBaseMarginHu + ' \n ';
    }*/

    // Magas nyitott potenciál
    /*if (filterOptionsObject.icons[3].selected) {
      Map<String, Latogatastervezo_valtozoi__mdt> mapX = Latogatastervezo_valtozoi__mdt.getAll();
      Decimal nyitottFtPotencialMdt = mapX.get('Nyitott_Ft_potencial')
        .Hatarertek__c;
      Decimal osszFtPotencialMdt = mapX.get(
          'Nyitott_Ft_potencial_Ossz_Ft_potencial'
        )
        .Hatarertek__c;

      //queryString += ' \n AND Nyitott_Ft_potencial__c > ' + nyitottFtPotencialMdt + ' \n ';
    }*/

    // Potenciális vevő
    String T_RecordType_Developer_Name_c_StringSOQLSet = '(\'Megrendelo\', \'Lead\')';
    if (filterOptionsObject.icons[4].selected) {
      T_RecordType_Developer_Name_c_StringSOQLSet = '(\'Lead\')';
    }
    //queryString += ' \n AND T_RecordType_Developer_Name__c IN ' + T_RecordType_Developer_Name_c_StringSOQLSet + ' \n ';

    // Inaktív
    if (filterOptionsObject.icons[5].selected) {
      //queryString += ' \n AND Status__c = \'Inactive\' ';
    }

    // Felelős
    // Érintett vagyok
    if (filterOptionsObject.selectedOwner == 'own') {
      queryString += ' \n AND OwnerId=\'' + UserInfo.getUserId() + '\' \n ';
    }
    // Tulajdonos nélküli ügyfelek
    if (filterOptionsObject.selectedOwner == 'notadmin') {
      String adminId = [
        SELECT Id, Name, Profile.Name
        FROM User
        WHERE Profile.Name LIKE '%Admin%'
      ]
      .Id;
      queryString += ' \n AND OwnerId!=\'' + adminId + '\' \n ';
    }
    // Összes
    if (filterOptionsObject.selectedOwner == 'all') {
      //queryString += '';
    }

    // Utolsó látogatás
    if (filterOptionsObject.lastVisitStringConvertedToDate != null) {
//      if (filterOptionsObject.lastVisitDate.contains('Z')) {
//        queryString +=
//          ' \n AND (Latest_Meeting_Minutes_Date_Time__c = NULL OR Latest_Meeting_Minutes_Date_Time__c <= ' +
//          filterOptionsObject.lastVisitDate +
//          ') \n ';
//      } else {
//        queryString +=
//          ' \n AND (Latest_Meeting_Minutes_Date_Time__c = NULL OR Latest_Meeting_Minutes_Date_Time__c <= ' +
//          filterOptionsObject.lastVisitDate +
//          'T00:00:00Z) \n ';
//      }
    }

    // Szövegszűrő
    if (
      filterOptionsObject.searchWord != null &&
      filterOptionsObject.searchWord.length() >= 3
    ) {
      queryString +=
        ' \n AND ((Name LIKE \'%' +
        filterOptionsObject.searchWord +
        '%\') OR (BillingCity LIKE \'%' +
        filterOptionsObject.searchWord +
        '%\') OR (ShippingCity LIKE \'%' +
        filterOptionsObject.searchWord +
        '%\') OR (ShippingState LIKE \'%' +
        filterOptionsObject.searchWord +
        '%\') OR (BillingState LIKE \'%' +
        filterOptionsObject.searchWord +
        '%\')) \n ';
    }

    // queryString += ' \n ORDER BY CreatedDate DESC \n LIMIT ' + filterOptionsObject.tooManyAccountsLimit + ' \n ';
    queryString += ' \n ORDER BY CreatedDate DESC \n LIMIT 50000 \n ';
    System.debug('getFilteredAccounts queryString:' + queryString);

    List<Account> filteredAccounts = new List<Account>();
    try {
      filteredAccounts = Database.query(queryString);
    } catch (Exception error) {
      System.debug('getFilteredAccounts query error:' + error.getMessage());
    }

    // Nyitott feladattal rendelkező ügyfél
    if (filterOptionsObject.icons[1].selected) {
      // Ha OpenTask: Open mellett az üres státuszúakat is vette, csak azok kellenek, ahol van Account.Task.Status=Open
      List<Account> results2 = new List<Account>();
      for (Account account1 : filteredAccounts) {
//        Boolean vanOpen = false;
//        for (Task t : account1.Tasks) {
//          if (t.Status == 'Open' || t.Status == 'Nyitott') {
//            vanOpen = true;
//            break;
//          }
//        }
//        if (vanOpen) {
//          results2.add(account1);
//        }
      }

      //filteredAccounts = results2;
    }

    // Magas nyitott potenciál
    /*if (filterOptionsObject.icons[3].selected) {
      Map<String, Latogatastervezo_valtozoi__mdt> mapX = Latogatastervezo_valtozoi__mdt.getAll();
      Decimal nyitottFtPotencialMdt = mapX.get('Nyitott_Ft_potencial')
        .Hatarertek__c;
      Decimal osszFtPotencialMdt = mapX.get(
          'Nyitott_Ft_potencial_Ossz_Ft_potencial'
        )
        .Hatarertek__c;

      List<Account> results2 = new List<Account>();
      for (Account acc : filteredAccounts) {
        Boolean van = false;

        //                if (acc.Nyitott_Ft_potencial__c / acc.Ossz_Ft_potencial__c >
        //                        osszFtPotencialMdt) {
        //                    van = true;
        //                }

        if (van) {
          results2.add(acc);
        }
      }

      //filteredAccounts = results2;
    }*/

    return filteredAccounts;
  }

  @AuraEnabled
  public static String getCachedDistances() {
    Boolean cacheExists = false;
    Map<String, List<DistanceBetweenTwoCities>> results = new Map<String, List<DistanceBetweenTwoCities>>();
	  /*
    Cache.OrgPartition orgPartition = Cache.Org.getPartition(
      'CacheForTripPlanner'
    );
    for (String platformCacheKey : orgPartition.getKeys()) {
      if (platformCacheKey.startsWith('PCX')) {
        cacheExists = true;
        String jsonValue = (String) orgPartition.get(platformCacheKey);
        List<Object> listOfDistanceObjects = (List<Object>) JSON.deserializeUntyped(
          jsonValue
        );
        System.debug(
          'getCachedDistances listOfDistanceObjects:' + listOfDistanceObjects
        );
        String city = platformCacheKey.split('X')[1];
        results.put(city, new List<DistanceBetweenTwoCities>());
        for (Object distanceObject : listOfDistanceObjects) {
          Map<String, Object> untypedDistanceBetweenTwoCitiesMap = (Map<String, Object>) distanceObject;
          DistanceBetweenTwoCities distanceInstance = new DistanceBetweenTwoCities();
          distanceInstance.a = (String) untypedDistanceBetweenTwoCitiesMap.get(
            'a'
          ); // city1
          distanceInstance.b = (String) untypedDistanceBetweenTwoCitiesMap.get(
            'b'
          ); // city2
          distanceInstance.d = (Decimal) untypedDistanceBetweenTwoCitiesMap.get(
            'd'
          ); // distance
          results.get(city).add(distanceInstance);
        }
      }
    }

	   */
    return JSON.serialize(results);
  }

  @AuraEnabled
  public static String getNotCachedDistances(String jsonMap) {
    Map<String, Object> m = (Map<String, Object>) JSON.deserializeUntyped(
      jsonMap
    );
    System.debug('getNotCachedDistances m:' + m);
    Map<String, Object> pivotAccountObject = (Map<String, Object>) m.get(
      'pivotFilteredAccount'
    );
    System.debug('pivotAccountObject:' + pivotAccountObject);
    if (pivotAccountObject == null) {
      return '[]';
    }
    if (
      !pivotAccountObject.containsKey('BillingLatitude') &&
      !pivotAccountObject.containsKey('ShippingLatitude')
    ) {
      return '[]';
    }
    String pivotLatitudeStr = '0.01';
    if (pivotAccountObject.containsKey('ShippingLatitude')) {
      try {
        pivotLatitudeStr = (String) pivotAccountObject.get('ShippingLatitude');
      } catch (Exception pivotLatitudeError) {
        System.debug('pivotLatitudeError: ' + pivotLatitudeError.getMessage());
      }
    } else if (pivotAccountObject.containsKey('BillingLatitude')) {
      try {
        pivotLatitudeStr = (String) pivotAccountObject.get('BillingLatitude');
      } catch (Exception pivotLatitudeError) {
        System.debug('pivotLatitudeError: ' + pivotLatitudeError.getMessage());
      }
    }
    Decimal pivotLatitude = 0.01;
    try {
      pivotLatitude = Double.valueOf(pivotLatitudeStr);
    } catch (Exception pivotLatitudeError) {
      System.debug('pivotLatitudeError: ' + pivotLatitudeError.getMessage());
    }
    System.debug('getNotCachedDistances pivotLatitude:' + pivotLatitude);
    String pivotLongitudeStr = '0.01';
    if (pivotAccountObject.containsKey('ShippingLongitude')) {
      try {
        pivotLongitudeStr = (String) pivotAccountObject.get(
          'ShippingLongitude'
        );
      } catch (Exception pivotLongitudeError) {
        System.debug(
          'pivotLongitudeError: ' + pivotLongitudeError.getMessage()
        );
      }
    } else if (pivotAccountObject.containsKey('BillingLongitude')) {
      try {
        pivotLongitudeStr = (String) pivotAccountObject.get('BillingLongitude');
      } catch (Exception pivotLongitudeError) {
        System.debug(
          'pivotLongitudeError: ' + pivotLongitudeError.getMessage()
        );
      }
    }
    Decimal pivotLongitude = 0.01;
    try {
      pivotLongitude = Double.valueOf(pivotLongitudeStr);
    } catch (Exception pivotLongitudeError) {
      System.debug('pivotLongitudeError: ' + pivotLongitudeError.getMessage());
    }
    System.debug('getNotCachedDistances pivotLongitude:' + pivotLongitude);

    Location location1 = Location.newInstance(pivotLatitude, pivotLongitude);

    List<Object> filteredAccountIdsAbstract = (List<Object>) m.get(
      'filteredAccountIds'
    );
    Set<Id> filteredAccountIds = new Set<Id>();
    for (Object idObject : filteredAccountIdsAbstract) {
      filteredAccountIds.add((Id) idObject);
    }

    Map<Id, Decimal> distances = new Map<Id, Decimal>();
    for (Account acc : [
      SELECT
        Id,
        Name,
        BillingCity,
        BillingLatitude,
        BillingLongitude,
        ShippingCity,
        ShippingLatitude,
        ShippingLongitude
      FROM Account
      WHERE
        (BillingLatitude != NULL
        OR ShippingLatitude != NULL)
        AND (BillingLongitude != NULL
        OR ShippingLongitude != NULL)
        AND Id IN :filteredAccountIds
    ]) {
      Location location2;
      if (acc.ShippingLatitude != null) {
        location2 = Location.newInstance(
          acc.ShippingLatitude,
          acc.ShippingLongitude
        );
      } else if (acc.BillingLatitude != null) {
        location2 = Location.newInstance(
          acc.BillingLatitude,
          acc.BillingLongitude
        );
      }
      Double distanceFromPivot =
        Math.round(Location.getDistance(location1, location2, 'km') * 10) /
        10.0;
      distances.put(acc.Id, distanceFromPivot);
    }
    //System.debug('filteredAccounts:'+filteredAccounts);

    // daysAccountsIds
    List<Object> daysAccountIdsAbstract = (List<Object>) m.get(
      'daysAccountsIds'
    );
    Set<Id> daysAccountIds = new Set<Id>();
    for (Object idObject : daysAccountIdsAbstract) {
      daysAccountIds.add((Id) idObject);
    }

    //Map<Id, Decimal> distances = new Map<Id, Decimal>();
    for (Account acc : [
      SELECT
        Id,
        Name,
        BillingCity,
        BillingLatitude,
        BillingLongitude,
        ShippingCity,
        ShippingLatitude,
        ShippingLongitude
      FROM Account
      WHERE
        (BillingLatitude != NULL
        OR ShippingLatitude != NULL)
        AND (BillingLongitude != NULL
        OR ShippingLongitude != NULL)
        AND Id IN :daysAccountIds
    ]) {
      Location location2;
      if (acc.ShippingLatitude != null) {
        location2 = Location.newInstance(
          acc.ShippingLatitude,
          acc.ShippingLongitude
        );
      } else if (acc.BillingLatitude != null) {
        location2 = Location.newInstance(
          acc.BillingLatitude,
          acc.BillingLongitude
        );
      }
      Double distanceFromPivot =
        Math.round(Location.getDistance(location1, location2, 'km') * 10) /
        10.0;
      distances.put(acc.Id, distanceFromPivot);

      if (distanceFromPivot < 0.01) {
        System.debug('---ZERO distance?---');
        System.debug('ZERO distance? location1: ' + location1);
        System.debug('ZERO distance? pivotLatitude: ' + pivotLatitude);
        System.debug('ZERO distance? pivotLongitude: ' + pivotLongitude);
        System.debug('ZERO distance? location2: ' + location2);
        System.debug('ZERO distance? acc.Id: ' + acc.Id);
        System.debug('ZERO distance? acc.Name: ' + acc.Name);
        System.debug(
          'ZERO distance? acc.ShippingLatitude: ' + acc.ShippingLatitude
        );
        System.debug(
          'ZERO distance? acc.ShippingLongitude: ' + acc.ShippingLongitude
        );
        System.debug(
          'ZERO distance? acc.BillingLatitude: ' + acc.BillingLatitude
        );
        System.debug(
          'ZERO distance? acc.BillingLongitude: ' + acc.BillingLongitude
        );
      }
    }
    //System.debug('filteredAccounts:'+filteredAccounts);

    return JSON.serialize(distances);
  }

  @AuraEnabled
  public static String getAccountName(Id accountId) {
    return [SELECT Id, Name FROM Account WHERE Id = :accountId].Name;
  }

  @AuraEnabled
  public static Account getAccount(Id accountId) {
    return [
      SELECT
        Id,
        Name,
        BillingCity,
        BillingLatitude,
        BillingLongitude,
        ShippingCity,
        ShippingLatitude,
        ShippingLongitude
      FROM Account
      WHERE Id = :accountId
      LIMIT 1
    ];
  }

  @AuraEnabled
  public static Integer countOfAccounts(Boolean erintettVagyokE) {
    Integer count = 0;
    if (erintettVagyokE) {
      List<AggregateResult> ar = [
        SELECT COUNT(Id) accountCount
        FROM Account /*Nem_kifizetodo_partner__c = FALSE
         /*WHERE*/
        /*T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead', 'Arufogado')
         AND*/
        /*AND erintett_vagyok__c = TRUE*/
      ];
      count = (Integer) ar[0].get('accountCount');
    } else {
      List<AggregateResult> ar = [
        SELECT COUNT(Id) accountCount
        FROM Account /*Nem_kifizetodo_partner__c = FALSE*/
        /*WHERE*/
        /*T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead', 'Arufogado')
         AND*/
      ];
      count = (Integer) ar[0].get('accountCount');
    }
    return count;
  }
}
