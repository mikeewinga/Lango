/*
"req.user" returns:
{userID: #####,
 firstName: !!!!!
 lastName: !!!!!}


*/
// ~~~ DECLARATIONS ~~~
const express = require('express')
const passport = require('passport');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20');
const sql = require('sqlite3')
const port = 50491
const path = require('path');
const dbFile = "flash.db";
const db = new sql.Database(dbFile);
const googleLoginData = {
    clientID: '419983254989-jrdsnps20tlb5f1omrfa3tj9mu256kh9.apps.googleusercontent.com',
    clientSecret: 'n0ZYPBs2sMXDstXdW_qg3XCU',
    callbackURL: '/auth/redirect'
};
passport.use( new GoogleStrategy(googleLoginData, gotProfile) );




// ~~~~~~~~~~~~~~~~~~~~~
// ~~~ QUERY HANDLER ~~~
// ~~~~~~~~~~~~~~~~~~~~~
function queryHandler(req, res, next) {
	let url = req.url;
	let qObj = req.query;
	if (qObj.user != undefined) {
		res.json(req.user);
	}
	else if (qObj.getCard == "next") {
		function retrieveCard(userID) {
			let dbRetrieveCard = "SELECT rowid, * from flashcards WHERE user = ? ORDER BY score DESC";
			db.get(dbRetrieveCard, userID, retrieveCallback);
		}
		function retrieveCallback(err, retrCard) {
			if(err) {
				console.log(err);
			}
			if(retrCard != undefined) {
				res.json(retrCard);
			}	
		}
		retrieveCard(req.user.userID);
	}
	else if (qObj.updateCard != undefined) {
		let newDat = JSON.parse(qObj.updateCard)
		function update(cardNumber, cardSeen, cardCorr) {
			let cardScore = ( Math.max(1,5-cardCorr) + Math.max(1,5-cardSeen) + 5*( (cardSeen-cardCorr)/cardSeen) );
			let dbUpdate = "UPDATE flashcards SET seen =?, correct = ?, score = ? WHERE rowid = ?";
			db.run(dbUpdate, [cardSeen, cardCorr, cardScore, cardNumber], updateCallback);
		}

		function updateCallback(err) {
			console.log("Card Updated");
			if(err) {
				console.log(err);
			}
		}
		update(newDat.num, newDat.sn, newDat.cor);
	}
	else if (qObj.translate != undefined) {
		trans(res, qObj.translate);
	}
	else if (qObj.save != undefined) {
		console.log("Attempting to save...");
		let cardData = JSON.parse(qObj.save);
		insert(cardData.user, cardData.en, cardData.es);
	}
	else {
	next();
	}
}



// ~~~~~~~~~~~~~~~~
// ~~~ PIPELINE ~~~
// ~~~~~~~~~~~~~~~~
const app = express()

app.use('/', printURL);

app.use(cookieSession({
    maxAge: 6 * 60 * 60 * 1000,
    keys: ['hanger waldo mercy dance']  
}));	

app.use(passport.initialize()); 

app.use(passport.session()); 

//app.get('/*',express.static('public'));

app.get('/auth/google',
	passport.authenticate('google',{ scope: ['profile'] }) );

app.get('/auth/redirect',
	function (req, res, next) {
	    console.log("at auth/redirect");
	    next();
	},
	passport.authenticate('google'),
	function (req, res) {
		function retrieveCard(userID) {
			let dbRetrieveCard = "SELECT en from flashcards WHERE user = ?";
			db.get(dbRetrieveCard, userID, retrieveCallback);
		}
		function retrieveCallback(err, retrCard) {
			if(retrCard != undefined) {
				res.redirect('../user/flashReview.html');
			}
			else {
				res.redirect('../user/flash.html');
			}
			if(err) {
				console.log(err);
			}
		}
		retrieveCard(req.user.userID);
	});

app.get('/user/*',
	isAuthenticated, 
	express.static('.') 
       ); 

app.get('/logout', function(req, res, next){
	req.logout();
	res.redirect('/');
	next();
});

app.use(express.static('public')); 

app.get('/query', queryHandler );

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, "public/login.html"));
});

app.use( fileNotFound );

app.listen(port, function (){console.log('Listening...');} )








// ~~~~~~~~~~~~~~~~~~~~
// MIDDLEWARE FUCNTIONS
// ~~~~~~~~~~~~~~~~~~~~

let trans = function(resp, text) { 
	const APIrequest = require('request');
	const http = require('http');

	const APIkey = "AIzaSyAsiQHEMZRtCRWTyCLS3fMcuqc_0noLGfo";
	const url = "https://translation.googleapis.com/language/translate/v2?key="+APIkey;
	let requestObject = 
		{
		"source": "en",
		"target": "es",
		"q": [
			text
		]
		}
	APIrequest( { 
		url: url,
		method: "POST",
		headers: {"content-type": "application/json"},
		json: requestObject },
		APIcallback
	);
	function APIcallback(err, APIresHead, APIresBody) {
		if ((err) || (APIresHead.statusCode != 200)) {
			console.log("Got API error");
			console.log(APIresBody);
		} 
		else {
			if (APIresHead.error) {
			console.log(APIresHead.error);
			} 
			else {
			resText = APIresBody.data.translations[0].translatedText;
			resp.json( {"translate": resText } );
			console.log("English: "+text);
			console.log("Spanish: "+resText);
			}
		}
	}
}

function fileNotFound(req, res) {
    let url = req.url;
    res.type('text/plain');
    res.status(404);
    res.send('Cannot find '+url);
    }


function printURL (req, res, next) {
    console.log(req.url);
    next();
}



// --- DATABASE FUNCTIONS ---
function insert(user, text, transText) {
	let dbInsert = "INSERT into flashcards (user, en, es, seen, correct, score) VALUES (?, ?, ?, 0, 0, 15)";
	db.run(dbInsert, user, text, transText, insertCallback);
}

function insertCallback(res, err) {
	if(err) {
		console.log(err);
	}
	else {
		console.log("Card Added");
	}
}


// --- GOOGLE LOGIN FUNCTIONS ---
function isAuthenticated(req, res, next) {
	if (req.user) {
		//console.log("Req.session:",req.session);
		//console.log("Req.user:",req.user);
		next();
    } else {
		res.redirect('/login.html'); 
    }
}

function gotProfile(accessToken, refreshToken, profile, done) {
	let dbRowID;
	db.get("SELECT * from users WHERE userID = " + profile.id, dataCallback);
	function dataCallback(err, rowData) {
		if (err) { 
			console.log("ERROR: ",err); 
		}
		if (rowData == null) {
			console.log(rowData);
			function insertUser(userId, firstName, lastName) {
				let dbInsertUser = "INSERT into users (userID, firstName, lastName) VALUES (?, ?, ?)";
				db.run(dbInsertUser, userId, firstName, lastName, insertUserCallback);
				db.get("SELECT * from users WHERE userID = " + userId, dataCallback);
			}
			function insertUserCallback(err) {
				if(err) {
					console.log(err);
				}
				else {
					console.log("User Added!");
				}
			}
			insertUser(profile.id, profile.name.givenName, profile.name.familyName);
		}
		else { 
			dbRowID = rowData;
			console.log("Known User: "+ rowData.firstName +" "+ rowData.lastName + "\n");
			done(null, dbRowID);
		}
	}
}


passport.serializeUser((dbRowID, done) => {
    console.log("SerializeUser. Input is",dbRowID);
    done(null, dbRowID);
});

passport.deserializeUser((dbRowID, done) => {
    console.log("deserializeUser. Input is:", dbRowID.userID);
	let userData = dbRowID;
    done(null, userData);
});
