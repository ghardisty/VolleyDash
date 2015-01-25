var app = angular.module('myApp', []);

app.run(function($rootScope) {
  $rootScope.name = "VolleyDash";
});

app.controller('activityController', function($scope) {
  $scope.activityInput = {
    myInput : "Ready to track activity"
  };


  $scope.activityLog = [
      {
        'player' : 'Sabrina',
        'skill' : 'Set',
        'result' : "+"
      },      
      {
        'player' : 'Emily',
        'skill' : 'Block'
      },     
      {
        'player' : 'Maddie',
        'skill' : 'Attack',
        'result' : 'Error'
      },    
      {
        'player' : 'Athena',
        'skill' : 'Block'
      },      
      {
        'player' : 'Karenna',
        'skill' : 'Pass',
        'result' : "3"
      },     
      {
        'player' : 'MacKenzi',
        'skill' : 'Attack'
      }
  ];

  
  $scope.removeActivity = function (index) {
    var tmpList = angular.copy($scope.activityLog);
    tmpList.splice(index, 1);
    $scope.activityLog = tmpList;
  }

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

    $scope.newPlayer = {'Name' : '', 'Number' : null, 'Position' : ''};

    $scope.subPlayer = {'Mode' : false, 'Player' : {} };

    $scope.courtPositions = ["","RB","MB","LB","LF","MF","RF"];

    $scope.subThisPlayer = function(member) {      
      if ($scope.subPlayer.Mode && ($scope.subPlayer.Player == member)) {
        $scope.subPlayer.Mode = false;
      }
      else {
        $scope.subPlayer.Mode = true; 
        $scope.subPlayer.Player = member;
      }
      return true;
    };

    $scope.addNewPlayer = function() {
        $scope.teamMembers.push(
          {'playerName' : $scope.newPlayer.Name, 'playerNumber' :$scope.newPlayer.Number, "courtPosition" : 0, 
          "playerPosition" : $scope.newPlayer.Position}
        );
    };

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
    };

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
    {"skill" : "Serve", "Good": "+", "Fair": "O", "Poor": "-", "Error" : "E", "Termination" : "Ace"},
    {"skill" : "Receive", "Good": "3", "Fair": "2", "Poor": "1", "Error" : "O"},
    {"skill" : "Freeball", "Good": "3", "Fair": "2", "Poor": "1", "Error" : "O"},
    {"skill" : "Set", "Good": "+", "Fair": "O", "Poor": "-", "Error" : "E"},
    {"skill" : "Attack",  "Good": "+", "Fair": "O", "Poor": "-", "Error" : "E", "Termination" : "Kill"},
    {"skill" : "Defense", "Good": "+", "Fair": "O", "Poor": "-", "Error" : "E"}, 
    {"skill" : "Block", "Error": "E", "Termination" : "Block"},
    {"skill" : "Bl Assist", "Termination" : "Assist"}];

    $scope.newSkill = {'Name' : '', 'Number' : null, 'Position' : ''};
/*
    $scope.addNewSkill = function() {
        $scope.allSkills.push(
          {'skill' : $scope.newSkill.Name, 'Good' :$scope.newSkill.Good, "Fair" : $scope.newSkill.Fair, 
          "Poor" : $scope.newSkill.Poor, "Error" : $scope.newSkill.Error, "Termination" : $scope.newSkill.}
        );
    };
    */
});

