angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
})

.controller('CollectionsCtrl', function($scope,$http) {
    
          $http({
            url: "http://83.212.109.180/omeka/api/collections/",
            dataType: "json",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
            }).success(function(response){
                $scope.collections = response;
            }).error(function(error){
                $scope.error = error;
            });
})

.controller('CollectionDetailCtrl', function($scope,$stateParams,$http) {
    
          $http({
            url: "http://83.212.109.180/omeka/api/collections/"+$stateParams.collectionId,
            dataType: "json",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
            }).success(function(response){
                
                $scope.collection_name = response.element_texts[0].text;
                 $http({
                    url: response.items.url,
                    dataType: "json",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                    }).success(function(response){

                        $scope.items = response;

                    }).error(function(error){
                        $scope.error = error;
                    });
                
                
                
            }).error(function(error){
                $scope.error = error;
            });
})








