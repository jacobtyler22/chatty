'use strict';

angular.module('chattyApp')
  .controller('MessageCtrl', function ($scope, MessageService) {
    $scope.messages = [];

    var setMessages = function(){
    	MessageService.getMessages().then(function(response){
    		$scope.messages = response.data;
    		console.log($scope.messages);
    	});
    }

    $scope.addMessage = function(message){
    	MessageService.addMessage(message).then(function(){
    		setMessages();
    	});
    	setMessages();
    	$scope.newMessage = '';
    }

    setMessages();
  });
