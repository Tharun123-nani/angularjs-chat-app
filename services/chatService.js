angular.module('chatApp').service('chatService', function($firebaseDatabase) {
    const dbRef = firebase.database().ref("messages");
    
    // Method to fetch messages
    this.getMessages = function() {
      return dbRef;
    };
  
    // Method to send a message
    this.sendMessage = function(message) {
      return dbRef.push(message);
    };
  });
  