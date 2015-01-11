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

app.controller('SkillController', function($scope) {
  $scope.allSkills = [
    {"skill" : "Serve", "Good": "+", "Neutral": "/", "Poor": "-", "Error" : "E", "Termination" : "Ace"},
    {"skill" : "Pass", "Good": "3", "Neutral": "2", "Poor": "1", "Error" : "0"},
    {"skill" : "Set", "Good": "+", "Neutral": "/", "Poor": "-", "Error" : "E"},
    {"skill" : "Attack",  "Good": "+", "Neutral": "/", "Poor": "-", "Error" : "E", "Termination" : "Kill"},
    {"skill" : "Block",  "Good": "+", "Neutral": "/", "Poor": "-", "Error" : "E", "Termination" : "Block"},
    {"skill" : "Block Assist",  "Good": "+", "Neutral": "/", "Poor": "-", "Error" : "E", "Termination" : "Block Assist"},
    {"skill" : "Defense", "Good": "+", "Neutral": "/", "Poor": "-", "Error" : "E"}];
});



function translateCourtLocation(x,y,myImage) {
  padding = 0;

  xLocationInMeters = ((x - padding) / myImage.width() ) * 30; 
  yLocationInMeters = ((y - padding) / myImage.height() ) * 60; 

  if (yLocationInMeters < 30){
    LocationType = 'Opponent';
    yLocationInMeters = 30- yLocationInMeters;
    xLocationInMeters = 30- xLocationInMeters;
  }
  else {
    yLocationInMeters = yLocationInMeters - 30;
    LocationType = "Home";
  }

  pointDetail['location']['side'] = LocationType;
  pointDetail['location']['xval'] = xLocationInMeters.toFixed(2);
  pointDetail['location']['yval'] = yLocationInMeters.toFixed(2);


  //pointTracker.value = 'Player ' + pointDetail['playerNumber'] + " " + pointDetail['skill'] + " " + lookupSkillLabel[pointDetail['skill']][pointDetail['result']] + " " + pointDetail['location']['side'] + "(" + pointDetail['location']['xval'] + ', ' + pointDetail['location']['yval'] + ")";
}


$(function() {
  $("#court").click(function(e) {

    var offset = $(this).offset();
    var relativeX = (e.pageX - offset.left);
    var relativeY = (e.pageY - offset.top);

  $("#court").append(
        $('<div></div>')
            .css('position', 'absolute')
            .css('top', relativeY + 'px')
            .css('left', relativeX + 'px')
            .css('width', 8)
            .css('height', 8)
            .css('background-color', '#fff'));

    translateCourtLocation(relativeX,relativeY, $(this) );
    
  });
});

