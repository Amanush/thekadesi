var storeModule=angular.module('storeModule',[])
.controller('productCtrl',function($scope,menuData,DataService,$http, $window){
	$scope.user={};
  var orderDetails={};

    $scope.paymentMethod="online";

	$scope.cart=DataService.cart;
    if(menuData){
	$scope.menuItems=menuData.FoodType;
}
	$scope.addToCart=function(id,name,price,quantity,type){
	   $scope.cart.addItem(id,name,price,quantity,type);
       $scope.$emit('updateCart');
	}
	
    $scope.placeOrder=function(){
        
        orderDetails.userInfo=$scope.user;
        orderDetails.orderInfo=$scope.cart.items;
        orderDetails.paymentType=$scope.paymentMethod;
        orderDetails.totalDue=$scope.cart.getTotalPrice();
      orderDetails.creditUrl='https://www.instamojo.com/nandkumar90/thekadesikhana/?data_amount='+$scope.cart.getTotalPrice()+'&data_email='+$scope.user.email +'&data_name='+$scope.user.name+'&data_phone='+$scope.user.contact+'&data_readonly=data_amount  rel="im-checkout" data-behaviour="link" data-style="flat-dark" data-text="Checkout With Instamojo">Checkout</a>';
        console.log(JSON.stringify(orderDetails));
        $http.post('http://107.23.59.43:8787/thekadesi/weborder',orderDetails).then(function (response) {
        	
        },function(error)
        {

        })
    }


   
    
}).controller('contactCtrl',function($scope,$http){
    $scope.user={};

    $scope.contactUs=function(){
       
        console.log(JSON.stringify($scope.user));
        $http.post('http://107.23.59.43:8787/thekadesi/feedback',$scope.user).then(function (response) {
            // body...
        },function(error)
        {

        })
    }
   
    
}).controller('mainCtrl',function($scope,DataService){

    var updateCart=function(){
    $scope.itemsInCart=DataService.cart.getTotalCount();
}

    $scope.$on('updateCart',function(){
     updateCart();
    })
   
    updateCart();
})
.factory("DataService", function () {

    
    var myCart = new shoppingCart("theka");

    
    return {
       
        cart: myCart
    };
}).directive('onlyDigits', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {
        function inputValue(val) {
          if (val) {
            var digits = val.replace(/[^0-9]/g, '');

            if (digits !== val) {
              ctrl.$setViewValue(digits);
              ctrl.$render();
            }
            return parseInt(digits,10);
          }
          return undefined;
        }            
        ctrl.$parsers.push(inputValue);
      }
    };
});

