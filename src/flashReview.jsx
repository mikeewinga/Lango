let userInput;

function CreateReviewHTML() {
	return( <main>
		<PageHead />
		<Body />
		<Footer />
		</main>
		 );
}
 
function PageHead() {
	return (<div className="head">
			<a href="http://server162.site:50491/user/flash.html">
				<button id="add" className="addButton" title="Go to Flashcard Creation!">Add</button>
			</a>
			<p id="pageTitleID" className="pageTitle">Lango!</p>
		</div>
	       );
}


class Body extends React.Component {
	constructor() {
		super();
		this.state = {transData: "Click \"Next\" to Start Your Review!", origData: "", backText: "", cardNum: '', numSeen: '', numCorrect: ''};
		this.RetrieveCard = this.RetrieveCard.bind(this);
		this.checkInput = this.checkInput.bind(this);
		this.flip = this.flip.bind(this);
	}

	flip = () => {
	  document.querySelector(".card-container").classList.toggle("flip");
	}

	checkInput = () => {
		let word = this.state.origData;
		if(this.state.origData != userInput) {
			this.setState({backText: word, numSeen: (this.state.numSeen + 1)}, function () {
			console.log(this.state);
			UpdateCard(this.state.cardNum, this.state.numSeen, this.state.numCorrect);
			});
		}
		else {
			this.setState({numSeen: (this.state.numSeen + 1), numCorrect: (this.state.numCorrect +1)}, function () {
			console.log(this.state);
			UpdateCard(this.state.cardNum, this.state.numSeen, this.state.numCorrect);
			});
		}
		this.flip();
		console.log(this.state);
		
	}
	
	RetrieveCard() {
		if(this.state.transData == "Click \"Next\" to Start Your Review!") {
			this.flip();
		}
		let url = "http://server162.site:50491/query?getCard=next";
		let xhr = new XMLHttpRequest();
		xhr.open('GET',url, true);

		xhr.onload = () => {
			let responseStr= xhr.responseText;
			let cardObject = JSON.parse(responseStr);
			console.log(cardObject);
			let transtxt = cardObject.es;
			let origtxt = cardObject.en;
			let rowid = cardObject.rowid;
			let seen = cardObject.seen
			let corr = cardObject.correct
			this.setState({transData: transtxt, origData: origtxt, backText: "Correct!", cardNum: rowid, numSeen: seen, numCorrect: corr});
		};
		
		xhr.onerror = function() {
			alert('Error making request.');
		};
		
		xhr.send();
	}
	

	render() {
		return (<div className="body">
					<div id="cardsBox" className="cards">
						<InputBox inputText={this.checkInput} doFlip={this.flip} />
						<Card cardText={this.state} doFlip={this.flip} />
					</div>
					<SaveContainer getCard={this.RetrieveCard} doFlip={this.flip} />
				</div>);}
}

class SaveContainer extends React.Component {
	constructor(props) {
		super(props);
	}
	
	on_click = () => {
		this.props.getCard();
		this.props.doFlip();
	}

	render() { return (<div>
					<button id="save" className="saveButton" title="Next Flashcard!"
					onClick={this.on_click} >Next</button>
			</div>);
	}
}

// React component for the card (main component)
class Card extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: ''};
	}

	render() {
		return(
		  <div className='card-container'>
			<div className='card-body to-flip' onClick={this.props.doFlip}>
			  <CardBack text= {this.props.cardText.backText} />

			  <CardFront text= {this.props.cardText.transData} />
			</div>
		  </div>
		)
	}
}

class InputBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: ''};
	}

	enterPressed = (event) => {
		console.log("KEY pressed")
		if(event.key === 'Enter') {
			console.log("ENTER pressed");
			userInput = event.target.value;
			this.props.inputText();
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

// React component for the front side of the card
class CardFront extends React.Component {
  render(props) {
    return(
      <div className='card-side side-front'>
         <div className='card-side-container'>
              <h2 id='trans'>{this.props.text}</h2>
        </div>
      </div>
    )
  }
}

// React component for the back side of the card
class CardBack extends React.Component {
  render(props) {
    return(
      <div className='card-side side-back'>
         <div className='card-side-container'>
              <h2 id='congrats'>{this.props.text}</h2>
        </div>
      </div>
    )
  }
}


class OutputBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: ''};
	}

	updateOutput(event) {
    this.setState({value: event.target.value});
	}
	
	render() {
		return (<div>
					<input type="text" id="esp" className="card" readonly
					value={this.state.value}  />

					<img id="circleArrow" className="circle" 
						src="circleArrow.png" title="See the Answer!" />
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
		let addBox = document.getElementById("add");
		addBox.classList.remove("addButton");
		addBox.classList.add("addButtonMobile");
		let titleBox = document.getElementById("pageTitleID");
		titleBox.classList.remove("pageTitle");
		titleBox.classList.add("pageTitleMobile");
		let engBox = document.getElementById("eng");
		engBox.classList.remove("card");
		engBox.classList.add("cardMobile");
	}

	if(window.innerWidth > 425) {
		let box = document.getElementById("cardsBox");
		box.classList.remove("cardsMobile");
		box.classList.add("cards");
		let saveBox = document.getElementById("save");
		saveBox.classList.remove("saveButtonMobile");
		saveBox.classList.add("saveButton");
		let addBox = document.getElementById("add");
		addBox.classList.remove("addButtonMobile");
		addBox.classList.add("addButton");
		let titleBox = document.getElementById("pageTitleID");
		titleBox.classList.remove("pageTitleMobile");
		titleBox.classList.add("pageTitle");
		let engBox = document.getElementById("eng");
		engBox.classList.remove("cardMobile");
		engBox.classList.add("card");
	}
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

function RetrieveCard() {
	console.log("Getting next card...");
	let url = "http://server162.site:50491/query?getCard=next";
	let xhr = new XMLHttpRequest();
	xhr.open('GET',url, true);
	
	xhr.onload = function() {
		let responseStr= xhr.responseText;
		cardObject = JSON.parse(responseStr);
		console.log(cardObject);
	};
	
	xhr.onerror = function() {
		alert('Error making request.');
	};
	
	xhr.send();
}

function UpdateCard(id, seen, correct) {
	let retrData = JSON.stringify({num: id, sn: seen, cor: correct});
	let url = "http://server162.site:50491/query?updateCard="+retrData;
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

ReactDOM.render(<CreateReviewHTML/>, document.getElementById('root'));