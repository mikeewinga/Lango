var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var userInput = void 0;

function CreateReviewHTML() {
	return React.createElement(
		"main",
		null,
		React.createElement(PageHead, null),
		React.createElement(Body, null),
		React.createElement(Footer, null)
	);
}

function PageHead() {
	return React.createElement(
		"div",
		{ className: "head" },
		React.createElement(
			"a",
			{ href: "http://server162.site:50491/user/flash.html" },
			React.createElement(
				"button",
				{ id: "add", className: "addButton", title: "Go to Flashcard Creation!" },
				"Add"
			)
		),
		React.createElement(
			"p",
			{ id: "pageTitleID", className: "pageTitle" },
			"Lango!"
		)
	);
}

var Body = function (_React$Component) {
	_inherits(Body, _React$Component);

	function Body() {
		_classCallCheck(this, Body);

		var _this = _possibleConstructorReturn(this, (Body.__proto__ || Object.getPrototypeOf(Body)).call(this));

		_this.flip = function () {
			document.querySelector(".card-container").classList.toggle("flip");
		};

		_this.checkInput = function () {
			var word = _this.state.origData;
			if (_this.state.origData != userInput) {
				_this.setState({ backText: word, numSeen: _this.state.numSeen + 1 }, function () {
					console.log(this.state);
					UpdateCard(this.state.cardNum, this.state.numSeen, this.state.numCorrect);
				});
			} else {
				_this.setState({ numSeen: _this.state.numSeen + 1, numCorrect: _this.state.numCorrect + 1 }, function () {
					console.log(this.state);
					UpdateCard(this.state.cardNum, this.state.numSeen, this.state.numCorrect);
				});
			}
			_this.flip();
			console.log(_this.state);
		};

		_this.state = { transData: "Click \"Next\" to Start Your Review!", origData: "", backText: "", cardNum: '', numSeen: '', numCorrect: '' };
		_this.RetrieveCard = _this.RetrieveCard.bind(_this);
		_this.checkInput = _this.checkInput.bind(_this);
		_this.flip = _this.flip.bind(_this);
		return _this;
	}

	_createClass(Body, [{
		key: "RetrieveCard",
		value: function RetrieveCard() {
			var _this2 = this;

			if (this.state.transData == "Click \"Next\" to Start Your Review!") {
				this.flip();
			}
			var url = "http://server162.site:50491/query?getCard=next";
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);

			xhr.onload = function () {
				var responseStr = xhr.responseText;
				var cardObject = JSON.parse(responseStr);
				console.log(cardObject);
				var transtxt = cardObject.es;
				var origtxt = cardObject.en;
				var rowid = cardObject.rowid;
				var seen = cardObject.seen;
				var corr = cardObject.correct;
				_this2.setState({ transData: transtxt, origData: origtxt, backText: "Correct!", cardNum: rowid, numSeen: seen, numCorrect: corr });
			};

			xhr.onerror = function () {
				alert('Error making request.');
			};

			xhr.send();
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "body" },
				React.createElement(
					"div",
					{ id: "cardsBox", className: "cards" },
					React.createElement(InputBox, { inputText: this.checkInput, doFlip: this.flip }),
					React.createElement(Card, { cardText: this.state, doFlip: this.flip })
				),
				React.createElement(SaveContainer, { getCard: this.RetrieveCard, doFlip: this.flip })
			);
		}
	}]);

	return Body;
}(React.Component);

var SaveContainer = function (_React$Component2) {
	_inherits(SaveContainer, _React$Component2);

	function SaveContainer(props) {
		_classCallCheck(this, SaveContainer);

		var _this3 = _possibleConstructorReturn(this, (SaveContainer.__proto__ || Object.getPrototypeOf(SaveContainer)).call(this, props));

		_this3.on_click = function () {
			_this3.props.getCard();
			_this3.props.doFlip();
		};

		return _this3;
	}

	_createClass(SaveContainer, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"button",
					{ id: "save", className: "saveButton", title: "Next Flashcard!",
						onClick: this.on_click },
					"Next"
				)
			);
		}
	}]);

	return SaveContainer;
}(React.Component);

// React component for the card (main component)


var Card = function (_React$Component3) {
	_inherits(Card, _React$Component3);

	function Card(props) {
		_classCallCheck(this, Card);

		var _this4 = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props));

		_this4.state = { value: '' };
		return _this4;
	}

	_createClass(Card, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "card-container" },
				React.createElement(
					"div",
					{ className: "card-body to-flip", onClick: this.props.doFlip },
					React.createElement(CardBack, { text: this.props.cardText.backText }),
					React.createElement(CardFront, { text: this.props.cardText.transData })
				)
			);
		}
	}]);

	return Card;
}(React.Component);

var InputBox = function (_React$Component4) {
	_inherits(InputBox, _React$Component4);

	function InputBox(props) {
		_classCallCheck(this, InputBox);

		var _this5 = _possibleConstructorReturn(this, (InputBox.__proto__ || Object.getPrototypeOf(InputBox)).call(this, props));

		_this5.enterPressed = function (event) {
			console.log("KEY pressed");
			if (event.key === 'Enter') {
				console.log("ENTER pressed");
				userInput = event.target.value;
				_this5.props.inputText();
			}
		};

		_this5.state = { value: '' };
		return _this5;
	}

	_createClass(InputBox, [{
		key: "updateInput",
		value: function updateInput(event) {
			this.setState({ value: event.target.value });
		}
	}, {
		key: "render",
		value: function render() {
			var _this6 = this;

			return React.createElement(
				"div",
				null,
				React.createElement("input", { type: "text", id: "eng", className: "card",
					placeholder: "English",
					value: this.state.value,
					onChange: function onChange(e) {
						_this6.setState({ value: e.target.value });
					},
					onKeyPress: function onKeyPress(event) {
						return _this6.enterPressed(event);
					} })
			);
		}
	}]);

	return InputBox;
}(React.Component);

// React component for the front side of the card


var CardFront = function (_React$Component5) {
	_inherits(CardFront, _React$Component5);

	function CardFront() {
		_classCallCheck(this, CardFront);

		return _possibleConstructorReturn(this, (CardFront.__proto__ || Object.getPrototypeOf(CardFront)).apply(this, arguments));
	}

	_createClass(CardFront, [{
		key: "render",
		value: function render(props) {
			return React.createElement(
				"div",
				{ className: "card-side side-front" },
				React.createElement(
					"div",
					{ className: "card-side-container" },
					React.createElement(
						"h2",
						{ id: "trans" },
						this.props.text
					)
				)
			);
		}
	}]);

	return CardFront;
}(React.Component);

// React component for the back side of the card


var CardBack = function (_React$Component6) {
	_inherits(CardBack, _React$Component6);

	function CardBack() {
		_classCallCheck(this, CardBack);

		return _possibleConstructorReturn(this, (CardBack.__proto__ || Object.getPrototypeOf(CardBack)).apply(this, arguments));
	}

	_createClass(CardBack, [{
		key: "render",
		value: function render(props) {
			return React.createElement(
				"div",
				{ className: "card-side side-back" },
				React.createElement(
					"div",
					{ className: "card-side-container" },
					React.createElement(
						"h2",
						{ id: "congrats" },
						this.props.text
					)
				)
			);
		}
	}]);

	return CardBack;
}(React.Component);

var OutputBox = function (_React$Component7) {
	_inherits(OutputBox, _React$Component7);

	function OutputBox(props) {
		_classCallCheck(this, OutputBox);

		var _this9 = _possibleConstructorReturn(this, (OutputBox.__proto__ || Object.getPrototypeOf(OutputBox)).call(this, props));

		_this9.state = { value: '' };
		return _this9;
	}

	_createClass(OutputBox, [{
		key: "updateOutput",
		value: function updateOutput(event) {
			this.setState({ value: event.target.value });
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement("input", { type: "text", id: "esp", className: "card", readonly: true,
					value: this.state.value }),
				React.createElement("img", { id: "circleArrow", className: "circle",
					src: "circleArrow.png", title: "See the Answer!" })
			);
		}
	}]);

	return OutputBox;
}(React.Component);

var Footer = function (_React$Component8) {
	_inherits(Footer, _React$Component8);

	function Footer() {
		_classCallCheck(this, Footer);

		return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
	}

	_createClass(Footer, [{
		key: "GetName",
		value: function GetName() {
			var url = "http://server162.site:50491/query?user=currentUser";
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);

			xhr.onload = function () {
				var responseStr = xhr.responseText;
				var UserObject = JSON.parse(responseStr);
				var UserName = UserObject.firstName + " " + UserObject.lastName;
				document.getElementById("user").textContent = UserName;
			};

			xhr.onerror = function () {
				alert('Error making request.');
			};
			xhr.send();
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "footer" },
				React.createElement(
					"p",
					{ id: "user" },
					this.GetName()
				),
				React.createElement(
					"a",
					{ href: "../logout", id: "logout" },
					"Log Out"
				)
			);
		}
	}]);

	return Footer;
}(React.Component);

window.onresize = function () {
	if (window.innerWidth <= 425) {
		var cards = document.getElementById("cardsBox");
		cards.classList.remove("cards");
		cards.classList.add("cardsMobile");
		var saveBox = document.getElementById("save");
		saveBox.classList.remove("saveButton");
		saveBox.classList.add("saveButtonMobile");
		var addBox = document.getElementById("add");
		addBox.classList.remove("addButton");
		addBox.classList.add("addButtonMobile");
		var titleBox = document.getElementById("pageTitleID");
		titleBox.classList.remove("pageTitle");
		titleBox.classList.add("pageTitleMobile");
		var engBox = document.getElementById("eng");
		engBox.classList.remove("card");
		engBox.classList.add("cardMobile");
	}

	if (window.innerWidth > 425) {
		var box = document.getElementById("cardsBox");
		box.classList.remove("cardsMobile");
		box.classList.add("cards");
		var _saveBox = document.getElementById("save");
		_saveBox.classList.remove("saveButtonMobile");
		_saveBox.classList.add("saveButton");
		var _addBox = document.getElementById("add");
		_addBox.classList.remove("addButtonMobile");
		_addBox.classList.add("addButton");
		var _titleBox = document.getElementById("pageTitleID");
		_titleBox.classList.remove("pageTitleMobile");
		_titleBox.classList.add("pageTitle");
		var _engBox = document.getElementById("eng");
		_engBox.classList.remove("cardMobile");
		_engBox.classList.add("card");
	}
};

function place(text) {
	document.getElementById("esp").value = text;
	//let temp = document.getElementById("esp").value;
	//temp =  text;
}

function enter(event) {
	var key = event.keyCode;
	if (key == 13) {
		grab();
	} else {
		var boxText = document.getElementById("eng").value;
		boxText = key;
	}
}

function RetrieveCard() {
	console.log("Getting next card...");
	var url = "http://server162.site:50491/query?getCard=next";
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);

	xhr.onload = function () {
		var responseStr = xhr.responseText;
		cardObject = JSON.parse(responseStr);
		console.log(cardObject);
	};

	xhr.onerror = function () {
		alert('Error making request.');
	};

	xhr.send();
}

function UpdateCard(id, seen, correct) {
	var retrData = JSON.stringify({ num: id, sn: seen, cor: correct });
	var url = "http://server162.site:50491/query?updateCard=" + retrData;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);

	xhr.onload = function () {
		var responseStr = xhr.responseText;
		var JSobject = JSON.parse(responseStr);
		console.log(JSobject);
	};

	xhr.onerror = function () {
		alert('Error making request.');
	};

	xhr.send();
}

ReactDOM.render(React.createElement(CreateReviewHTML, null), document.getElementById('root'));