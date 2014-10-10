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
                
                $scope.items_in_collection=response.items.count;
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

.controller('SearchItemsCtrl', function($scope,$http) {
    $scope.onchange = function(){
          $http({
            url: "http://83.212.109.180/omeka/api/items/",
            dataType: "json",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
            }).success(function(response){
                
                var jsonsearcharray = [];
                $scope.length=response.length;
                //var name=$scope.item_name;
                var y=$scope.item_name;
                                console.log(y);

                for (var i=0; i<response.length; i++){
                    var x=response[i].element_texts[0].text;
                    //console.log(x);

                    if(x==y){

                    jsonsearcharray.push(response[i]);
                        
                    }
                    
                }
                 
                $scope.foundItems = angular.fromJson(jsonsearcharray);
                
                
                //$scope.collections = response;
            }).error(function(error){
                $scope.error = error;
            });
    }
})



.controller('ItemDetailCtrl', function($scope,$stateParams,$http) {
    
    
    $http({
            url: "http://83.212.109.180/omeka/api/items/"+$stateParams.itemId,
            dataType: "json",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
            }).success(function(response){
                
                var jsonarray = [];
                $scope.length=response.element_texts.length;
                for (var i=0; i<response.element_texts.length; i++){
                    var jsonObj=new Object;
                    var x = response.element_texts[i].element.name;
                    var y=response.element_texts[i].text;
                     jsonObj[x]=y;
                    jsonarray.push(jsonObj);
                }
                 
                $scope.items = angular.fromJson(jsonarray);
                $scope.item_title = response.element_texts[0].text;

                $scope.pic_url=response.files.url;
                
                console.log($scope.pic_url);

//$scope.pic_url
$http({
            url: $scope.pic_url,
            dataType: "json",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
            }).success(function(response){
                
                var jsonarraypic = [];
                $scope.lengthpic=response.length;
                for (var i=0; i<response.length; i++){
                    var jsonObj2=new Object;
                    var x = response[i].file_urls.square_thumbnail;
                    var y=response[i].file_urls.original;
                     jsonObj2[x]=y;
                    jsonarraypic.push(jsonObj2);
                }
                 
                $scope.pics = angular.fromJson(jsonarraypic);
                
                
                
                $scope.pic_thumbnail_url=response[0].file_urls.square_thumbnail;               
                $scope.pic_original_url=response[0].file_urls.original;
                
            }).error(function(error){
                $scope.error = error;
            });
               
                
                
                
            }).error(function(error){
                $scope.error = error;
            });
});

