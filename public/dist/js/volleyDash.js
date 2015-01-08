

				//Stores All Match Data
				var match;
				var pointDetails;
				var setDetails;
				var homeScore = 0;
				var opponentScore = 0;
				var rotationNumber = -1;
				var courtPosition = ['RB','MB','LB','LF','MF','RF'] ;

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
     				setPointDetails(match);

 				}, "json");

  					//Player Name, PlayerNumber, Starting Position in Rotation, Position

  				//The Whole Team
  				var team = [];
	  				team.push({'Player' : 'Sabrina', 'Number' : '7', 'StartPos' : '1', 'Position' : 'S'});
	  				team.push({'Player' : 'Emily', 'Number' : '12', 'StartPos' : '2', 'Position' : 'S'});
	  				team.push({'Player' : 'Karenna', 'Number' : '3', 'StartPos' : '3', 'Position' : 'Lib'});
	  				team.push({'Player' : 'Marissa', 'Number' : '14', 'StartPos' : '4', 'Position' : 'DS'});
	  				team.push({'Player' : 'Maddie', 'Number' : '10', 'StartPos' : '5', 'Position' : 'OH'});
	  				team.push({'Player' : 'Evie', 'Number' : '2', 'StartPos' : '6', 'Position' : 'OH'});
	  				team.push({'Player' : 'Peyton', 'Number' : '14', 'StartPos' : '0', 'Position' : 'Opp'});
	  				team.push({'Player' : 'Courtney', 'Number' : '1', 'StartPos' : '0', 'Position' : 'DS'});
	  				team.push({'Player' : 'Athena', 'Number' : '9', 'StartPos' : '0', 'Position' : 'MB'});
	  				team.push({'Player' : 'Mekenzi', 'Number' : '11', 'StartPos' : '0', 'Position' : 'MB'});

	  			//Place for 6 Players on Court
	  			var lineup = [{},{},{},{},{},{}];

	  			//Bench
	  			var bench = [];
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


				function rotate(){
					var p = lineup.pop();
					lineup.unshift(p);
					$("#putPlayersOnCourt").empty();
					updateLineupScreen();
				}

  				function addPlayerToCourt(playerName,playerNumber,courtPos,position) {
	  				$("#putPlayersOnCourt").append(
				            $('<div class="col-xs-4 player myButton">' +
				            	'<div onClick="OnChangePlayer(this);">' +
				            		'<div class="hidden-xs">' + playerName + ' </div>' + 
				            		'<div class="hidden-xs hidden-sm hidden-md"> (' + position + ') </div>' +
				            		'<div> #' + playerNumber + ' </div>' + 
				            		'<div class="hidden-xs hidden-sm hidden-md"> ' + courtPosition[courtPos] + ' </div>' + 
				            		
				            	'</div>')
				     );

  				}

  				function addPlayerToBench(playerName,playerNumber,position) {
  					$("#putPlayersOnBench").append(
				            $('<div class="col-xs-4 player myButton">' +
				            	'<div onClick="OnChangePlayer(this);">' +
				            		'<div class="hidden-xs">' + playerName + ' </div>' + 
				            		'<div class="hidden-xs hidden-sm hidden-md"> (' + position + ') </div>' +
				            		'<div> #' + playerNumber + ' </div>' + 				            		
				            	'</div>')
				     );
  				}

  				function setPointDetails(match) {
  					var len = setDetails['pointDetails'].length;
  					if(len == 0){
					    pointDetails = {
							'homeScore' : 0,
							'opponentScore' : 0,
							'playerNumber' : { 'label' : '', 'val' : ''},
							'skill' : { 'label' : '', 'val' : ''},
							'result' : { 'label' : '', 'val' : ''},
							'location' : {'side' : '', 'xval' : '', 'yval' : '' },
							'homeTeam' : {'label' : '', 'val' : ''},
							'opponentTeam' : {'label' : '', 'val' : ''},
							'setNumber' : {'label' : '', 'val' : ''}
					    }
					} else{
						pointDetails = setDetails['pointDetails'].pop();
						setDetails['pointDetails'].push(CreatePointDetailsSnapShot());
						
						for (var i = 0; i < len; i++) {
						    addPointToActivityStream(setDetails['pointDetails'][i])
						}

						resetPointDetails();
					}
				}

  				function setSetDetails(match) {
  					if(match.sets.length == 0){					    
						setDetails = {
							'pointDetails' : []
						}
						match.sets.push(setDetails);
					} else {
						setDetails = match.sets[match.sets.length - 1];
					}
				}


				function setInfo(a,b,c) {
					
					pointDetails['homeTeam']['val'] = a.value;
					pointDetails['opponentTeam']['val'] = b.value;
					pointDetails['setNumber']['val'] = c.value;

					$("div.headerTitle").replaceWith(
			            "<div col-lg-3 btn-lg>" + a.value + " versus " + b.value + ", Set " + c.value + "</div>"
			        );
					//alert(pointDetails[myInfo.name]['val']);
				}

				function resetPointDetails(){
					pointDetails = {
						'playerNumber' : { 'label' : '', 'val' : ''},
						'skill' : { 'label' : '', 'val' : ''},
						'result' : { 'label' : '', 'val' : ''},
						'location' : {'side' : '', 'xval' : '', 'yval' : '' },
						'homeTeam' : {'label' : '', 'val' : ''},
						'opponentTeam' : {'label' : '', 'val' : ''},
						'setNumber' : {'label' : '', 'val' : ''}
					}
				}

				function CreatePointDetailsSnapShot(){
					
					//this works					
					var num = jQuery.extend({},pointDetails['playerNumber']);
					var skill = jQuery.extend({},pointDetails['skill']);
					var result = jQuery.extend({},pointDetails['result']);
					var location = jQuery.extend({},pointDetails['location']);

					var snap = { 
						'homeScore' : homeScore,
						'opponentScore' : opponentScore,
						'playerNumber' : num,
						'skill' : skill,
						'result' : result,
						'location' : location
					};

					//does not work
					//var copy = jQuery.extend({},true,pointDetails);
					//var snap = copy;
					

					return snap;
				}



				var lookupSkillLabel = {
					'Serve' : { 
						 '* Terminate *' : 'Ace',
						 '3 | +' : '+',
						 '2 | /' : '/', 
						 '1 | -' : '-', 
						 '0 | e' : 'err', 
						 '' : ''
					},

					'Pass' : {
						 '* Terminate *': 'N/A',
						 '3 | +' : '3',
						 '2 | /' : '2', 
						 '1 | -' : '1', 
						 '0 | e' : '0', 
						 '' : ''
					},
					
					'Set' : {
						 '* Terminate *' : 'N/A',
						 '3 | +' : '+',
						 '2 | /' : '/', 
						 '1 | -' : '-', 
						 '0 | e' : 'err', 
						 '' : ''
					},


					'Attack' :  {
						  '* Terminate *': 'Kill',
						 '3 | +' : '+',
						 '2 | /' : '/', 
						 '1 | -' : '-', 
						 '0 | e' : 'err', 
						 '' : ''
					},

					'Block' : {
						 '* Terminate *': 'Block',
						 '3 | +' : 'N/A',
						 '2 | /' : 'N/A',
						 '1 | -' : 'N/A',
						 '0 | e' : 'Error',
						 '' : ''
					},

					'Block Assist' : {
						 '* Terminate *': 'Block Assist',
						 '3 | +' : 'N/A',
						 '2 | /' : 'N/A',
						 '1 | -' : 'N/A',
						 '0 | e' : 'err',
						 '' : ''
					},

					'Defense' : { 
						 '* Terminate *': 'N/A',
						 '3 | +' : '+',
						 '2 | /' : '/', 
						 '1 | -' : '-', 
						 '0 | e' : 'err', 
						 '' : ''
					}
				};

							
				function changeHomeScore(myVal) {
					homeScore = homeScore + myVal;
					$('#homeScore').text(homeScore); 

					pointDetails['homeScore'] = homeScore;

				}


				function changeOpponentScore(myVal) {
					opponentScore = opponentScore + myVal;
					$('#opponentScore').text(opponentScore); 
					pointDetails['opponentScore'] = opponentScore;
					
				}

		        function OnChangePlayer(playerNumber) { 				
		        	pointDetails['playerNumber']['val'] = playerNumber.textContent;
		        	pointTracker.value = pointDetails['playerNumber']['label'] + pointDetails['playerNumber']['val'];
		        }

		        function OnChangeSkill(skill) {
					pointDetails['skill']['val'] = skill.textContent;
		        	pointTracker.value = pointDetails['playerNumber']['label'] + pointDetails['playerNumber']['val'] + " " + pointDetails['skill']['val'] + " " + lookupSkillLabel[pointDetails['skill']['val']][pointDetails['result']['val']];
		        }

		        function OnChangeResult(result) {
					pointDetails['result']['val'] = result.textContent;
		        	pointTracker.value = pointDetails['playerNumber']['label'] + pointDetails['playerNumber']['val'] + " " + pointDetails['skill']['val'] + " " + lookupSkillLabel[pointDetails['skill']['val']][pointDetails['result']['val']];
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

		        	pointDetails['location']['side'] = LocationType;
		        	pointDetails['location']['xval'] = xLocationInMeters.toFixed(2);
		        	pointDetails['location']['yval'] = yLocationInMeters.toFixed(2);


		        	pointTracker.value = pointDetails['playerNumber']['label'] + pointDetails['playerNumber']['val'] + " " + pointDetails['skill']['val'] + " " + lookupSkillLabel[pointDetails['skill']['val']][pointDetails['result']['val']] + " " + pointDetails['location']['side'] + "(" + pointDetails['location']['xval'] + ', ' + pointDetails['location']['yval'] + ")";
		        }

		        function removeLastPointFromActivityStream(){
		        	$("#activityStream").children("div:first").remove();
		        }

		        function addPointToActivityStream(p){
		        		$("#activityStream").prepend(
							$('<div class="color: #fff">' +
								'(' + 
								 homeScore + '-' + opponentScore + ') ' + 

								p['playerNumber']['val'] + ' ' +
								p['skill']['val'] + ' ' +

								lookupSkillLabel[p['skill']['val']][p['result']['val']]  +
								' (' +

								p['location']['side'] + ' ' + p['location']['xval'] + ', ' + p['location']['yval'] +								' )' 
							 +' </div>')
							);
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

						//$.extend({}, pointDetails
						setDetails['pointDetails'].push(CreatePointDetailsSnapShot()); 	

						//Push to DB
						$.post("/matches/updateById",
							  {
							    id : match._id,
							    match : JSON.stringify(match)
							  },
							  function(data,status){
							    console.log("insert point status: " + status);
						});

						addPointToActivityStream(pointDetails);

						resetPointDetails();
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

						resetPointDetails();
						pointTracker.value = '';

					});
				});
