//Court Positions
var courtPosition = ['RB','MB','LB','LF','MF','RF'] ;

//Set the Players on the Team
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


//Set the Skills to Track
var skillToTrack = ['Serve','Pass','Set','Attack','Block','Defense'];



//Translate results by the style
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

