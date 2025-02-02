/**
 * Created by Zsolt Harmath on 2023. 09. 18..
 */

@IsTest
private class TestWeeklyStoreVisitController {
  // TestStoreVisitTripPlannerController,TestWeeklyStoreVisitController

  private static UserRole parentRole;
  private static UserRole middleRole;
  private static UserRole childRole;
  private static User createUserWithRole(String userName, Id userRoleId) {
    Profile standardProfile = [
      SELECT Id
      FROM Profile
      WHERE Name = 'Standard User'
    ]; // Change the profile name as needed
    User testUser = new User(
      Alias = 'TUser',
      Email = userName + '@example.com',
      EmailEncodingKey = 'UTF-8',
      LastName = 'Last',
      LanguageLocaleKey = 'en_US',
      LocaleSidKey = 'en_US',
      TimeZoneSidKey = 'America/Los_Angeles',
      UserName = userName + '@example.com',
      UserRoleId = userRoleId,
      ProfileId = standardProfile.Id,
      IsActive = true
    );
    insert testUser;
    return testUser;
  }
  @TestSetup
  public static void testFactory() {
    // Create three roles with parent-child relationships
    parentRole = new UserRole(Name = 'Parent Role');
    middleRole = new UserRole(Name = 'Middle Role', ParentRoleId = null); // Middle role has no parent
    childRole = new UserRole(Name = 'Child Role', ParentRoleId = middleRole.Id);

    // Insert the roles
    List<UserRole> rolesToInsert = new List<UserRole>{
      parentRole,
      middleRole,
      childRole
    };
    insert rolesToInsert;

    // Create test users for each role
    //        User userWithParentRole = createUserWithRole('UserWithParentRole', parentRole.Id);
    //        User userWithMiddleRole = createUserWithRole('UserWithMiddleRole', middleRole.Id);
    //        User userWithChildRole = createUserWithRole('UserWithChildRole', childRole.Id);
  }

  @IsTest
  public static void testGetVisitsOfSelectedWeek() {
    //WeeklyStoreVisitController.getVisitsOfSelectedWeek([SELECT Id FROM User LIMIT 1].Id, '2023-09-18');
    WeeklyStoreVisitController.getVisitsOfSelectedWeek(null, '2023-09-18');
  }

  @IsTest
  public static void testGetAvailableUsers() {
    WeeklyStoreVisitController.getAvailableUsers();
  }

  @IsTest
  public static void testGetChildren() {
    // Test getChildren method
    //List<UserRole> children = WeeklyStoreVisitController.getChildren([SELECT Id FROM UserRole LIMIT 1].Id);
    WeeklyStoreVisitController.getChildren(null);
  }

  @IsTest
  public static void testGetSubHierarchy() {
    // Test getSubHierarchy method
    //Set<Id> subHierarchy = WeeklyStoreVisitController.getSubHierarchy([SELECT Id FROM UserRole LIMIT 1].Id);
    WeeklyStoreVisitController.getSubHierarchy(null);
  }

  @IsTest
  public static void testGetUsersUnder() {
    // Test getUsersUnder method
    //List<User> usersUnderMiddleRole = WeeklyStoreVisitController.getUsersUnder([SELECT Id FROM UserRole LIMIT 1].Id);
    WeeklyStoreVisitController.getUsersUnder(null);
    // Test getUsersUnder method for the parent role
    //List<User> usersUnderParentRole = WeeklyStoreVisitController.getUsersUnder([SELECT Id FROM UserRole LIMIT 1].Id);
    WeeklyStoreVisitController.getUsersUnder(null);
  }
}