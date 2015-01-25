/* -------------------------------------------------
Match Data
----------------------------------------------------*/

//Stores All Match Data
var match;
var pointDetail;
var setDetails;
var homeScore = 0;
var opponentScore = 0;
var rotationNumber = -1;

//Place for 6 Players on Court
var lineup = [{},{},{},{},{},{}];

//Place for players on the bench
var bench = [];

//Gets Query String Params (we need id to lookup doc in mongo)
var queries = {};

$.each(document.location.search.substr(1).split('&'), function(c,q){
		var i = q.split('=');
	queries[i[0].toString()] = i[1].toString();
});

//Get the match from mongo
$.get( "/matches/getById", { id: queries['id'] } )
	.done(function( data ) {
		match = data[0];
		$('#headerTitle').append(match.home + " vs " + match.opponent) ;
		$('#scoreBoardHomeName').text(match.home);
		$('#scoreBoardOppName').text(match.opponent);
	
		setSetDetails(match);
		setPointDetail(match);

	}, "json");

function setSetDetails(match) {
	if(match.sets.length == 0){					    
	setDetails = {
		'pointDetails' : []
	}
	match.sets.push(setDetails);
	} 
	else {
		setDetails = match.sets[match.sets.length - 1];
	}
}

function setPointDetail(match) {
	var len = setDetails['pointDetails'].length;
	if(len == 0){
	    pointDetail = {
			'homeScore' : 0,
			'opponentScore' : 0,
			'playerNumber' : '',
			'skill' : '',
			'result' : '',
			'location' : {'side' : '', 'xval' : '', 'yval' : '' },
			'homeTeam' : '',
			'opponentTeam' : '',
			'setNumber' : ''
	    }
	} 
	else {
		pointDetail = setDetails['pointDetails'].pop();
		setDetails['pointDetails'].push(CreatePointDetailSnapShot());
		
		for (var i = 0; i < len; i++) {
		    addPointToActivityStream(setDetails['pointDetails'][i])
		}
		resetPointDetail();
	}
}

function CreatePointDetailSnapShot(){
	//this works					
	var num = pointDetail['playerNumber'];
	var skill = pointDetail['skill'];
	var result = pointDetail['result'];
	var location = jQuery.extend({},pointDetail['location']);

	var snap = { 
		'homeScore' : homeScore,
		'opponentScore' : opponentScore,
		'playerNumber' : num,
		'skill' : skill,
		'result' : result,
		'location' : location
	};

	return snap;
}

function addPointToActivityStream(p){
		$("#activityStream").prepend(
			$('<div class="color: #fff">' +
				'(' + homeScore + '-' + opponentScore + ') ' + 	p['playerNumber'] + ' ' + p['skill'] + ' ' +
				//lookupSkillLabel[p['skill']][p['result']]  + ' (' + p['location']['side'] + ' ' + p['location']['xval'] + ', ' + p['location']['yval'] +	 
				'</div>'
			)
		);
}


function resetPointDetail(){
	pointDetail = {
		'playerNumber' : '',
		'skill' : '',
		'result' : '',
		'location' : {'side' : '', 'xval' : '', 'yval' : '' },
		'homeTeam' : '',
		'opponentTeam' : '',
		'setNumber' : ''
	}
}



/*-------------------------------------------------------------------
START SET STARTING LINEUP AND BENCH
This section gets the team data and sets the starting lineup/bench. 
--------------------------------------------------------------------*/
setStartingLineup();

//Pulls the 6 starters from the whole team
function setStartingLineup(){
	for (i = 0; i < team.length; i++) { 
		if (team[i].StartPos > 0)
			lineup[team[i].StartPos - 1] = team[i];
		else {
			bench.push(team[i]);
			addPlayerToBench(team[i].Player,team[i].Number,team[i].Position);
		}
	}
	updateLineupScreen();
}



//Add Lineup to the Screen
function updateLineupScreen() {
	for (i = 0; i < lineup.length; i++) { 
	var player = lineup[i];
	addPlayerToCourt(player.Player,player.Number,i,player.Position);
	}	
}

function addPlayerToCourt(playerName,playerNumber,courtPos,position) {
	$("#putPlayersOnCourt").append(
        $('<div class="col-xs-4 player myButton">' +
        	'<div onClick="OnChangePlayer(this);">' +
        		'<div class="hidden-xs">' + playerName + ' </div>' + 
        		'<div class="hidden-xs hidden-sm hidden-md"> (' + position + ') </div>' +
        		//'<div> #' + playerNumber + ' </div>' + 
        		//'<div class="hidden-xs hidden-sm hidden-md"> ' + courtPosition[courtPos] + ' </div>' + 
        		//'<div>sub options ' +  bench + '</div>' + 
        		
        	'</div>')
 );
}

function addPlayerToBench(playerName,playerNumber,position) {
	$("#putPlayersOnBench").append(
        $('<div class="col-xs-4 player myButton">' +
        	'<div onClick="OnChangePlayer(this);">' +
        		'<div class="hidden-xs">' + playerName + ' </div>' + 
        		'<div class="hidden-xs"> (' + position + ') </div>' +
        		'<div> #' + playerNumber + ' </div>' + 				            		
        	'</div>')
 );
}


/*-------------------------------------------------------------------
END SET STARTING LINEUP AND BENCH
This section gets the team data and sets the starting lineup/bench. 
--------------------------------------------------------------------*/


/*-------------------------------------
ROTATE
---------------------------------------*/
function rotate(){
	var p = lineup.pop();
	lineup.unshift(p);
	$("#putPlayersOnCourt").empty();
	updateLineupScreen();
}

function rotateRev(){
	var p = lineup.shift();
	lineup.push(p);
	$("#putPlayersOnCourt").empty();
	updateLineupScreen();
}


/*-------------------------------------
SUBSTITUTE
---------------------------------------*/



/*-------------------------------------------------------------------
START SET SKILLS
--------------------------------------------------------------------*/
setSkillResults();
//Pulls the skills and their results
function setSkillResults(){
	for (i = 0; i < skillToTrack.length; i++) { 
		showSkillToTrack(skillToTrack[i].Skill);
	}
}

function showSkillToTrack(thisSkill) {
	$("#showSkills").append(
        $('<div class="col-xs-12 skill myButton">' +
        	'<div onClick="OnChangeSkill(this);">' + thisSkill +  '</div>')
 	);
}

/*
function showResultsForSkills(thisSkill){
	for (i = 0; i < thisSkill.Results.length; i++) { 
		$("#showResults").append(
        	$('<div class="col-xs-2 skill myButton">' +
        		'<div onClick="OnChangeSkill(this);">' + thisSkill.Results[i] + '</div>')
 		);
	}

}
*/

/*-------------------------------------------------------------------
END SET SKILLS
--------------------------------------------------------------------*/









function setInfo(a,b,c) {
	pointDetail['homeTeam'] = a.value;
	pointDetail['opponentTeam'] = b.value;
	pointDetail['setNumber'] = c.value;

	$("div.headerTitle").replaceWith(
        "<div col-lg-3 btn-lg>" + a.value + " versus " + b.value + ", Set " + c.value + "</div>"
    );

}


			
function changeHomeScore(myVal) {
	homeScore = homeScore + myVal;
	$('#homeScore').text(homeScore);
	pointDetail['homeScore'] = homeScore;
}


function changeOpponentScore(myVal) {
	opponentScore = opponentScore + myVal;
	$('#opponentScore').text(opponentScore); 
	pointDetail['opponentScore'] = opponentScore;
	
}

function OnChangePlayer(playerNumber) { 				
	pointDetail['playerNumber'] = playerNumber.textContent;
	pointTracker.value = 'Player ' + pointDetail['playerNumber'];
}

function OnChangeSkill(skill) {
	pointDetail['skill'] = skill.textContent;
	pointTracker.value = 'Player ' + pointDetail['playerNumber'] + " " + pointDetail['skill'] + " " + lookupSkillLabel[pointDetail['skill']][pointDetail['result']];
}

function OnChangeResult(result) {
	pointDetail['result'] = result.textContent;
	pointTracker.value = 'Player ' + pointDetail['playerNumber'] + " " + pointDetail['skill'] + " " + lookupSkillLabel[pointDetail['skill']][pointDetail['result']];
}

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


	pointTracker.value = 'Player ' + pointDetail['playerNumber'] + " " + pointDetail['skill'] + " " + lookupSkillLabel[pointDetail['skill']][pointDetail['result']] + " " + pointDetail['location']['side'] + "(" + pointDetail['location']['xval'] + ', ' + pointDetail['location']['yval'] + ")";
}

function removeLastPointFromActivityStream(){
	$("#activityStream").children("div:first").remove();
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


$(function() {
	$("#enterStream").click(function(e) {

		setDetails['pointDetails'].push(CreatePointDetailSnapShot());

		//Push to DB
		$.post("/matches/updateById",
			  {
			    id : match._id,
			    match : JSON.stringify(match)
			  },
			  function(data,status){
			    console.log("insert point status: " + status);
		});

		addPointToActivityStream(pointDetail);
		resetPointDetail();
		pointTracker.value = '';

	});
});

$(function() {
	$("#undoLast").click(function(e) {
		setDetails['pointDetails'].pop(); 	

		//Push to DB
		$.post("/matches/updateById",
			  {
			    id : match._id,
			    match : JSON.stringify(match)
			  },
			  function(data,status){
			    console.log("removed point status: " + status);
		});

		removeLastPointFromActivityStream();

		resetPointDetail();
		pointTracker.value = '';

	});
});



*/