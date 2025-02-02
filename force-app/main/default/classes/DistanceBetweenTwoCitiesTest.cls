/**
 * Created by User on 2024. 05. 23..
 */

@IsTest
private class DistanceBetweenTwoCitiesTest {
    @IsTest
    static void testBehavior() {
        DistanceBetweenTwoCities distanceObject = new DistanceBetweenTwoCities();
        distanceObject.a = 'Budapest';
        distanceObject.b = 'Szeged';
        distanceObject.d = 170.74;

        System.assertEquals('Budapest', distanceObject.a);
        System.assertEquals('Szeged', distanceObject.b);
        System.assert(distanceObject.d > 0);
    }
}