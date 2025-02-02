/**
 * Created by Zsolt Harmath on 2023. 11. 17..
 */

public with sharing class SchedulableTripPlannerMeasureDistances implements Schedulable {
  public static final String CACHE_PARTITION = 'CacheForTripPlanner';
  public static final String DistancesBIGStringJSON_KEY = 'distancesBIGStringJSON';

  /*  public List<String> cacheableCities {
    get {
      List<String> cities = new List<String>{
        'Bratislava',
        */ /*'Budapest',*/ /*
        'Debrecen',
        'Győr',
        'Košice',
        'Martin',
        'Miskolc',
        'Nové Zámky',
        'Pécs',
        'Szeged',
        'Zalaegerszeg',
        'Kecskemét'
      };

      Map<String, Latogatastervezo_valtozoi__mdt> latogatastervezoValtozoiMdt = StoreVisitTripPlannerController.getLatogatastervezoValtozoiMdt();
      System.debug(
        'cacheableCities latogatastervezoValtozoiMdt: ' +
        latogatastervezoValtozoiMdt
      );
      if (
        latogatastervezoValtozoiMdt.containsKey(
          'Trip_planner_Distances_Cache_Mode_var'
        )
      ) {
        Latogatastervezo_valtozoi__mdt mdt = latogatastervezoValtozoiMdt.get(
          'Trip_planner_Distances_Cache_Mode_var'
        );
        System.debug(
          'cacheableCities Latogatastervezo_valtozoi__mdt mdt: ' + mdt
        );
        String tripPlannerDistancesCacheMode = null;
        tripPlannerDistancesCacheMode = mdt.Trip_planner_Distances_Cache_Mode__c;
        if (tripPlannerDistancesCacheMode.contains('with Budapest')) {
          cities.add('Budapest');
        }
        if (
          tripPlannerDistancesCacheMode.contains('no') && !Test.isRunningTest()
        ) {
          cities = new List<String>();
        }
      }

      return cities;
    }
  }*/

  //  public static final List<String> cacheableCities = new List<String>{
  //    'Bratislava',
  //    'Budapest',
  //    'Debrecen',
  //    'Győr',
  //    'Košice',
  //    'Martin',
  //    'Miskolc',
  //    'Nové Zámky',
  //    'Pécs',
  //    'Szeged',
  //    'Zalaegerszeg',
  //    'Kecskemét'
  //  };

  public static String formatCacheKey(String cityName) {
    // Remove whitespaces
    cityName = cityName.replaceAll('\\s', '');

    // Replace accented characters with non-accented counterparts
    cityName = replaceAccentedCharacters(cityName);

    return cityName;
  }

  private static String replaceAccentedCharacters(String input) {
    input = input.replace('á', 'a')
      .replace('é', 'e')
      .replace('í', 'i')
      .replace('ó', 'o')
      .replace('ö', 'o')
      .replace('ő', 'o')
      .replace('ú', 'u')
      .replace('ü', 'u')
      .replace('ű', 'u')
      .replace('š', 's');

    return input;
  }

  public void execute(SchedulableContext context) {
    System.debug(
      'SchedulableTripPlannerMeasureDistances execute start; date now: ' +
      Datetime.now()
    );
    measureDistances(context);
    System.debug(
      'SchedulableTripPlannerMeasureDistances after measureDistances; context:' +
      context
    );
  }
  @AuraEnabled
  public static void lwc_measureDistances() {
    SchedulableTripPlannerMeasureDistances measureDistancesInstance = new SchedulableTripPlannerMeasureDistances();
    measureDistancesInstance.execute(null);
  }
  public void measureDistances(SchedulableContext context) {
    // Get all Accounts with Address:
    Integer MaxCountOfAccounts_to_Show = StoreVisitTripPlannerController.MaxCountOfAccounts_to_Show;
    List<Account> accounts = new List<Account>();
    try {
      accounts = [
        SELECT
          Id,
          /*T_RecordType_Developer_Name__c,*/
          ShippingCity,
          ShippingLatitude,
          ShippingLongitude,
          BillingCity,
          BillingLatitude,
          BillingLongitude,
          /*Nem_kifizetodo_partner__c,*/
          CreatedDate
        FROM Account
        WHERE
          /*T_RecordType_Developer_Name__c IN ('Megrendelo', 'Lead')
          AND Nem_kifizetodo_partner__c = FALSE
          AND*/ (ShippingCity != NULL
          OR BillingCity != NULL)
          AND (ShippingLatitude != NULL
          OR BillingLatitude != NULL)
          AND (ShippingLongitude != NULL
          OR BillingLongitude != NULL)
        ORDER BY CreatedDate DESC
        LIMIT :MaxCountOfAccounts_to_Show
      ];
      System.debug('accounts size:' + accounts.size());
    } catch (Exception error) {
      System.debug('accounts query error:' + error.getMessage());
      return;
    }

    // Get Locations of BillingCities
    Map<String, Location> locationsOfCities = new Map<String, Location>();
    try {
      for (Account acc : accounts) {
        Location locationOfCity = null;
        if (
          acc.ShippingCity != null &&
          !locationsOfCities.containsKey(acc.ShippingCity)
        ) {
          locationOfCity = Location.newInstance(
            acc.ShippingLatitude,
            acc.ShippingLongitude
          );
          if (locationOfCity.latitude != null)
            locationsOfCities.put(acc.ShippingCity, locationOfCity);
        } else if (
          acc.ShippingCity == null &&
          acc.BillingCity != null &&
          !locationsOfCities.containsKey(acc.BillingCity)
        ) {
          locationOfCity = Location.newInstance(
            acc.BillingLatitude,
            acc.BillingLongitude
          );
          if (locationOfCity.latitude != null)
            locationsOfCities.put(acc.BillingCity, locationOfCity);
        }
      }
      System.debug(
        'locationsOfCities size:' + locationsOfCities.keySet().size()
      );
      System.debug('locationsOfCities:' + locationsOfCities);
    } catch (Exception error) {
      System.debug('locationsOfCities creation error:' + error.getMessage());
      return;
    }

    // Get all cities
    List<String> cities = new List<String>();
    try {
      cities.addAll(locationsOfCities.keySet());
      System.debug('cities size:' + cities.size());
      System.debug('cities: ' + cities);
    } catch (Exception error) {
      System.debug('cities creation error:' + error.getMessage());
      return;
    }

    // Measure cacheableCities to cities
    Map<String, List<DistanceBetweenTwoCities>> distancesToPivotCityMap = new Map<String, List<DistanceBetweenTwoCities>>();
    try {
      /*      for (String cacheableCity : cacheableCities) {
        List<DistanceBetweenTwoCities> distancesBetweenCities = new List<DistanceBetweenTwoCities>();
        for (String city2 : cities) {
          DistanceBetweenTwoCities distanceBetweenTwoCities = new DistanceBetweenTwoCities();
          distanceBetweenTwoCities.a = cacheableCity; // city1
          Location location1 = locationsOfCities.get(
            distanceBetweenTwoCities.a
          ); // city1
          distanceBetweenTwoCities.b = city2; // city2
          Location location2 = locationsOfCities.get(
            distanceBetweenTwoCities.b
          ); // city2
          if (location1 != null && location2 != null) {
            distanceBetweenTwoCities.d =
              Math.round(
                Location.getDistance(location1, location2, 'km') * 10
              ) / 10.0; // distance

            if (distanceBetweenTwoCities.d < 0.01)
              distanceBetweenTwoCities.d = 0.01;

            distancesBetweenCities.add(distanceBetweenTwoCities);
          }
        }
        System.debug(
          'distancesBetweenCities size:' + distancesBetweenCities.size()
        );
        distancesToPivotCityMap.put(cacheableCity, distancesBetweenCities);
      }*/
      System.debug(
        'distancesToPivotCityMap size:' + distancesToPivotCityMap.size()
      );
      System.debug('distancesToPivotCityMap:' + distancesToPivotCityMap);
    } catch (Exception error) {
      System.debug(
        'distancesToPivotCityMap creation error:' + error.getMessage()
      );
      return;
    }

    // Create JSON strings
    Map<String, String> pushablePlatformCachePairs = new Map<String, String>();
    try {
      //distancesBIGStringJSON = JSON.serialize(distancesToPivotCityMap);
      for (String pivotCity : distancesToPivotCityMap.keySet()) {
//        String PlatformCacheKey = 'PCX' + formatCacheKey(pivotCity);
//        String PlatformCacheJSON = JSON.serialize(
//          distancesToPivotCityMap.get(pivotCity)
//        );
//        pushablePlatformCachePairs.put(PlatformCacheKey, PlatformCacheJSON);
      }
      System.debug(
        'pushablePlatformCachePairs size:' + pushablePlatformCachePairs.size()
      );
    } catch (Exception error) {
      System.debug(
        'pushablePlatformCachePairs creation error:' + error.getMessage()
      );
      return;
    }

    // Store into Platform Cache
    Cache.OrgPartition orgPartition = Cache.Org.getPartition(CACHE_PARTITION);
    try {
      for (String PlatformCacheKey : pushablePlatformCachePairs.keySet()) {
//        orgPartition.put(
//          PlatformCacheKey,
//          pushablePlatformCachePairs.get(PlatformCacheKey)
//        );
      }
    } catch (Exception error) {
      System.debug(
        'pushablePlatformCachePairs storing error:' + error.getMessage()
      );
      return;
    }

    System.debug('measureDistances end; context:' + context);
  }
}