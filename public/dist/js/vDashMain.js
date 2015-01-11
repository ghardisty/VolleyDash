var app = angular.module('myApp', []);

app.run(function($rootScope) {
  $rootScope.name = "VolleyDash";
});

app.controller('TeamController', function($scope) {
  $scope.teamMembers = [
		{"playerName" : "Emily",    "playerNumber" : "12",    "courtPosition" : 1, "playerPosition" : "S"},
		{"playerName" : "Karenna",  "playerNumber" : "3",     "courtPosition" : 2, "playerPosition" : "Lib"},
		{"playerName" : "Marissa",  "playerNumber" : "14",    "courtPosition" : 3, "playerPosition" : "DS"},
    {"playerName" : "Sabrina",  "playerNumber" : "7",     "courtPosition" : 4, "playerPosition" : "S"},
		{"playerName" : "Maddie",   "playerNumber" : "10",    "courtPosition" : 5, "playerPosition" : "OH"},
    {"playerName" : "Athena",   "playerNumber" : "9",     "courtPosition" : 6, "playerPosition" : "MB"},
		{"playerName" : "Evie",     "playerNumber" : "2",     "courtPosition" : 0, "playerPosition" : "OH"},
		{"playerName" : "Peyton",   "playerNumber" : "14",    "courtPosition" : 0, "playerPosition" : "Opp"},
		{"playerName" : "Courtney", "playerNumber" : "1",     "courtPosition" : 0, "playerPosition" : "DS"},
		{"playerName" : "Mekenzi",  "playerNumber" : "11",    "courtPosition" : 0, "playerPosition" : "MB"}];

    $scope.isOnCourt = function(player) {
        return player.courtPosition > 0;
    };

    $scope.isOnBench = function(player) {
        return player.courtPosition < 1;
    };

    $scope.getVisualOrder = function(player) {
        if (player.courtPosition == 6){
          return 4;
        }
        if (player.courtPosition == 4){
          return 6;
        }
        return player.courtPosition;
    }

    $scope.rotate = function(j) {
    	for (i=0 ; i < $scope.teamMembers.length; i++) {
  			var player = $scope.teamMembers[i];
        player.courtPosition = (player.courtPosition != 0 ? player.courtPosition + j : player.courtPosition );
        player.courtPosition = (player.courtPosition > 6 ? player.courtPosition - 6 : player.courtPosition);
      }
    };


});



