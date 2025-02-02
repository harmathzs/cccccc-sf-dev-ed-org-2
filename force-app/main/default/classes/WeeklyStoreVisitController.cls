/**
 * Created by Attila Nemeth @AttentionCRM on 23/09/05.
 */

public with sharing class WeeklyStoreVisitController {
  @AuraEnabled
  public static List<Event> getVisitsOfSelectedWeek(
    String userId,
    String dateString
  ) {
    //System.debug(dateString);
    Date startOfWeek = Date.valueOf(dateString);
    //System.debug(startOfWeek);
    return [
      SELECT
        Id,
        StartDateTime,
        Type,
        EventSubtype,
        /*Status__c,*/
        OwnerId,
        Owner.Name,
        Who.Name,
        WhatId,
        /*Meeting_Minutes_ID__c,*/
        Account.Name,
        Account.BillingCity,
        Account.BillingLongitude,
        Account.BillingLatitude,
        Account.BillingAddress,
        Account.BillingPostalCode,
        Account.ShippingCity,
        Account.ShippingLongitude,
        Account.ShippingLatitude,
        Account.ShippingAddress,
        Account.ShippingPostalCode
      FROM Event
      WHERE
        OwnerId = :userId
        /*AND Type IN ('Meeting', 'Other', '', NULL)*/
        AND StartDateTime >= :startOfWeek
        AND StartDateTime <= :startOfWeek.addDays(7)
      ORDER BY StartDateTime
    ];
    // OwnerId = :userId
    //                AND
    // AND Account.BillingCity != NULL
    // Type = 'Meeting' AND
  }

  @AuraEnabled
  public static List<User> getAvailableUsers() {
    return getUsersUnder(UserInfo.getUserRoleId());
  }

  // public with sharing class RoleHierarchy
  static Map<Id, List<UserRole>> hierarchy {
    get {
      if (hierarchy == null) {
        hierarchy = new Map<Id, List<UserRole>>();
        for (UserRole role : [SELECT ParentRoleId FROM UserRole]) {
          if (!hierarchy.containsKey(role.ParentRoleId))
            hierarchy.put(role.ParentRoleId, new List<UserRole>());
          hierarchy.get(role.ParentRoleId).add(role);
        }
      }
      return hierarchy;
    }
    private set;
  }

  public static List<UserRole> getChildren(Id userRoleId) {
    return hierarchy.containsKey(userRoleId)
      ? hierarchy.get(userRoleId)
      : new List<UserRole>();
  }

  public static Set<Id> getSubHierarchy(Id userRoleId) {
    Set<Id> roleIds = new Set<Id>{ userRoleId };
    roleIds.add(userRoleId);
    for (UserRole childRole : getChildren(userRoleId)) {
      roleIds.addAll(getSubHierarchy(childRole.Id));
    }
    return roleIds;
  }

  public static List<User> getUsersUnder(Id userRoleId) {
    return [
      SELECT Id, Name
      FROM User
      WHERE UserRoleId IN :getSubHierarchy(userRoleId)
      ORDER BY Name
    ];
  }
}