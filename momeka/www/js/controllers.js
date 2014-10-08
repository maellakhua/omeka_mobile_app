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
});


angular.module('jsoncall.controllers', [])



.controller('customersController', function($scope,$http) {
    
/*    
  $http.get("http://83.212.109.180/omeka/api/elements?element_set=1")
  .success(function(response) {$scope.id = response;});
*/

        $http({
            url: "http://83.212.109.180/omeka/api/elements?element_set=1",
            dataType: "jsonp",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
            }).success(function(response){
                $scope.id = response;
            }).error(function(error){
                $scope.error = error;
            });
});
