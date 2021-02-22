

function CreateHTML() {
	return( <main>
		<PageHead />
		<Body />
		<Footer />
		</main>
		 );
}

function PageHead() {
	return (<div className="head">
			<RevButton />
			<p id="pageTitleID" className="pageTitle">Lango!</p>
		</div>
	       );
}

function RevButton() {
	return(
		<a href="http://server162.site:50491/user/flashReview.html">
			<button id="review" className="reviewButton" title="Review Your Flashcards!">Start Review</button>
		</a>
	);
}

function Body() {
	return (<div className="body">
				<div id="cardsBox" className="cards">
					<InputBox />
					<OutputBox />
				</div>
				<SaveContainer />
			</div>);
}

class SaveContainer extends React.Component {
	ReturnID() {
		let url = "http://server162.site:50491/query?user=currentUser";
		let xhr = new XMLHttpRequest();
		xhr.open('GET',url, true);
		
		xhr.onload = function() {
			let responseStr= xhr.responseText;
			let UserObject = JSON.parse(responseStr);
			SaveCard(UserObject.userID);
		}
		
		xhr.onerror = function() {
			alert('Error making request.');
		};
		xhr.send();
	}


	render() { return (<div>
					<button id="save" className="saveButton" title="Save This Card!"
					onClick={this.ReturnID} >Save</button>
			</div>);
	}
}

class InputBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: ''};
	}
	
	enterPressed(event) {
		console.log("KEY pressed")
		if(event.key === 'Enter') {
			console.log("ENTER pressed");
			grab(event.target.value);
		}
	}
	
	updateInput(event) {
    this.setState({value: event.target.value});
	}
	
	render() {
		return (<div>
					<input type="text" id="eng" className="card" 
					placeholder="English" 
					value={this.state.value} 
					onChange={(e)=>{this.setState({value:e.target.value});}} 
					onKeyPress={(event) => this.enterPressed(event)}  />
				</div>
			   );
	}
}

class OutputBox extends React.Component {
	constructor() {
		super();
		this.state = {value: ''};
	}

	updateOutput(event) {
    this.setState({value: event.target.value});
	}
	
	render() {
		return (<div>
					<input type="text" id="esp" className="card" 
					placeholder="Spanish"
					value={this.state.value}
					onChange={this.updateOutput} />
				</div>
			   );
	}
}

class Footer extends React.Component {
	GetName() {
		let url = "http://server162.site:50491/query?user=currentUser";
		let xhr = new XMLHttpRequest();
		xhr.open('GET',url, true);
		
		xhr.onload = function() {
			let responseStr= xhr.responseText;
			let UserObject = JSON.parse(responseStr);
			let UserName = UserObject.firstName + " " + UserObject.lastName;
			document.getElementById("user").textContent = UserName;
		}
		
		xhr.onerror = function() {
			alert('Error making request.');
		};
		xhr.send();
	}

	render() {
		return (<div className="footer">
			<p id="user" >{this.GetName()}</p>
			<a href="../logout" id="logout">Log Out</a>
		</div>
	       );}
}


window.onresize = function() {
	if(window.innerWidth <= 425) {
		let cards = document.getElementById("cardsBox");
		cards.classList.remove("cards");
		cards.classList.add("cardsMobile");
		let saveBox = document.getElementById("save");
		saveBox.classList.remove("saveButton");
		saveBox.classList.add("saveButtonMobile");
		let reviewBox = document.getElementById("review");
		reviewBox.classList.remove("reviewButton");
		reviewBox.classList.add("reviewButtonMobile");
		let titleBox = document.getElementById("pageTitleID");
		titleBox.classList.remove("pageTitle");
		titleBox.classList.add("pageTitleMobile");
		let engBox = document.getElementById("eng");
		engBox.classList.remove("card");
		engBox.classList.add("cardMobile");
		let espBox = document.getElementById("esp");
		espBox.classList.remove("card");
		espBox.classList.add("cardMobile");



		
	}
	if(window.innerWidth > 425) {
		let box = document.getElementById("cardsBox");
		box.classList.remove("cardsMobile");
		box.classList.add("cards");
		let saveBox = document.getElementById("save");
		saveBox.classList.remove("saveButtonMobile");
		saveBox.classList.add("saveButton");
		let reviewBox = document.getElementById("review");
		reviewBox.classList.remove("reviewButtonMobile");
		reviewBox.classList.add("reviewButton");
		let titleBox = document.getElementById("pageTitleID");
		titleBox.classList.remove("pageTitleMobile");
		titleBox.classList.add("pageTitle");
		let engBox = document.getElementById("eng");
		engBox.classList.remove("cardMobile");
		engBox.classList.add("card");
		let espBox = document.getElementById("esp");
		espBox.classList.remove("cardMobile");
		espBox.classList.add("card");


	}
}

function grab(txt) {
	let input = txt;
	console.log(input);
	let url = "http://server162.site:50491/query?translate="+input;
	let xhr = new XMLHttpRequest();
	xhr.open('GET',url, true);
	
	xhr.onload = function() {
		let responseStr= xhr.responseText;
		let JSobject = JSON.parse(responseStr);
		console.log(JSobject);
		place(JSobject.translate);
	};
	
	xhr.onerror = function() {
		alert('Error making request.');
	};

	xhr.send();
}


function place(text) {
	document.getElementById("esp").value = text;
	//let temp = document.getElementById("esp").value;
	//temp =  text;
}

function enter(event) {
	let key = event.keyCode;
	if(key == 13) {
		grab();
	}
	else {
		let boxText = document.getElementById("eng").value;
		boxText = key;
	}
}

function SaveCard(userId) {
	let user = userId;
	let text = document.getElementById("eng").value;
	let transText = document.getElementById("esp").value;
	let cardData = JSON.stringify( {"user": user,"en": text,"es": transText} );

	let url = "http://server162.site:50491/query?save="+cardData;
	let xhr = new XMLHttpRequest();
	xhr.open('GET',url, true);
	
	xhr.onload = function() {
		let responseStr= xhr.responseText;
		let JSobject = JSON.parse(responseStr);
		console.log(JSobject);
	};
	
	xhr.onerror = function() {
		alert('Error making request.');
	};

	xhr.send();
}

/*
function GetUserData() {
	let url = "http://server162.site:50491/query?user=currentUser";
	let xhr = new XMLHttpRequest();
	xhr.open('GET',url, true);
	
	xhr.onload = function() {
		let responseStr= xhr.responseText;
		let UserObject = JSON.parse(responseStr);
		//console.log(UserObject);
		return(UserObject);
		//let UserName = UserObject.firstName + " " + UserObject.lastName;
		//document.getElementById("user").textContent = UserName;
	}
	
	xhr.onerror = function() {
		alert('Error making request.');
	};
	xhr.send();
}
*/

ReactDOM.render(<CreateHTML/>, document.getElementById('root'));