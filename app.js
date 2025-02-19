angular.module('chatApp', [])
  .controller('chatController', function($scope, chatService) {
    $scope.messages = [];
    $scope.newMessage = '';
    
    // Fetch existing messages from Firebase
    chatService.getMessages().on('child_added', function(snapshot) {
      $scope.$apply(function() {
        $scope.messages.push(snapshot.val());
      });
    });

    // Send a new message to Firebase
    $scope.sendMessage = function() {
      if ($scope.newMessage.trim() !== '') {
        let message = {
          user: "User",  // Add logic to handle different users
          text: $scope.newMessage
        };
        chatService.sendMessage(message);
        $scope.newMessage = '';  // Clear the input field
      }
    };

    // Handle Enter key for sending message
    $scope.checkEnter = function(event) {
      if (event.key === 'Enter') {
        $scope.sendMessage();
      }
    };
  })
  .run(function() {
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "your-app.firebaseapp.com",
      databaseURL: "https://chat-44ed4-default-rtdb.firebaseio.com/",
      projectId: "your-app-id",
      storageBucket: "your-app.appspot.com",
      messagingSenderId: "your-sender-id",
      appId: "your-app-id",
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  });
