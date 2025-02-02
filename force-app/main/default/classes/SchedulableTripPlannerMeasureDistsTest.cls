/**
 * Created by User on 2024. 05. 23..
 */

@IsTest
private class SchedulableTripPlannerMeasureDistsTest {
    @TestSetup static void testFactory() {
        Account account1 = new Account();
        account1.Name = 'Test Account1';
        account1.ShippingCity = 'Budapest';
        account1.BillingLatitude = 12;
        account1.BillingLongitude = 11;

        Account account2 = new Account();
        account2.Name = 'Test Account2';
        account2.BillingCity = 'Budapest';
        account2.ShippingLatitude = 12;
        account2.ShippingLongitude = 11;

        Account[] accounts = new List<Account>{account1, account2};
        insert accounts;
    }

    @IsTest
    static void test_lwc_measureDistances() {
        SchedulableTripPlannerMeasureDistances.lwc_measureDistances();
    }

    @IsTest static void testFormatCacheKey() {
        SchedulableTripPlannerMeasureDistances.formatCacheKey('Budapest');
    }
}