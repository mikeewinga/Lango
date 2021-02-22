var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function CreateHTML() {
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
		React.createElement(RevButton, null),
		React.createElement(
			"p",
			{ id: "pageTitleID", className: "pageTitle" },
			"Lango!"
		)
	);
}

function RevButton() {
	return React.createElement(
		"a",
		{ href: "http://server162.site:50491/user/flashReview.html" },
		React.createElement(
			"button",
			{ id: "review", className: "reviewButton", title: "Review Your Flashcards!" },
			"Start Review"
		)
	);
}

function Body() {
	return React.createElement(
		"div",
		{ className: "body" },
		React.createElement(
			"div",
			{ id: "cardsBox", className: "cards" },
			React.createElement(InputBox, null),
			React.createElement(OutputBox, null)
		),
		React.createElement(SaveContainer, null)
	);
}

var SaveContainer = function (_React$Component) {
	_inherits(SaveContainer, _React$Component);

	function SaveContainer() {
		_classCallCheck(this, SaveContainer);

		return _possibleConstructorReturn(this, (SaveContainer.__proto__ || Object.getPrototypeOf(SaveContainer)).apply(this, arguments));
	}

	_createClass(SaveContainer, [{
		key: "ReturnID",
		value: function ReturnID() {
			var url = "http://server162.site:50491/query?user=currentUser";
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);

			xhr.onload = function () {
				var responseStr = xhr.responseText;
				var UserObject = JSON.parse(responseStr);
				SaveCard(UserObject.userID);
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
				null,
				React.createElement(
					"button",
					{ id: "save", className: "saveButton", title: "Save This Card!",
						onClick: this.ReturnID },
					"Save"
				)
			);
		}
	}]);

	return SaveContainer;
}(React.Component);

var InputBox = function (_React$Component2) {
	_inherits(InputBox, _React$Component2);

	function InputBox(props) {
		_classCallCheck(this, InputBox);

		var _this2 = _possibleConstructorReturn(this, (InputBox.__proto__ || Object.getPrototypeOf(InputBox)).call(this, props));

		_this2.state = { value: '' };
		return _this2;
	}

	_createClass(InputBox, [{
		key: "enterPressed",
		value: function enterPressed(event) {
			console.log("KEY pressed");
			if (event.key === 'Enter') {
				console.log("ENTER pressed");
				grab(event.target.value);
			}
		}
	}, {
		key: "updateInput",
		value: function updateInput(event) {
			this.setState({ value: event.target.value });
		}
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			return React.createElement(
				"div",
				null,
				React.createElement("input", { type: "text", id: "eng", className: "card",
					placeholder: "English",
					value: this.state.value,
					onChange: function onChange(e) {
						_this3.setState({ value: e.target.value });
					},
					onKeyPress: function onKeyPress(event) {
						return _this3.enterPressed(event);
					} })
			);
		}
	}]);

	return InputBox;
}(React.Component);

var OutputBox = function (_React$Component3) {
	_inherits(OutputBox, _React$Component3);

	function OutputBox() {
		_classCallCheck(this, OutputBox);

		var _this4 = _possibleConstructorReturn(this, (OutputBox.__proto__ || Object.getPrototypeOf(OutputBox)).call(this));

		_this4.state = { value: '' };
		return _this4;
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
				React.createElement("input", { type: "text", id: "esp", className: "card",
					placeholder: "Spanish",
					value: this.state.value,
					onChange: this.updateOutput })
			);
		}
	}]);

	return OutputBox;
}(React.Component);

var Footer = function (_React$Component4) {
	_inherits(Footer, _React$Component4);

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
		var reviewBox = document.getElementById("review");
		reviewBox.classList.remove("reviewButton");
		reviewBox.classList.add("reviewButtonMobile");
		var titleBox = document.getElementById("pageTitleID");
		titleBox.classList.remove("pageTitle");
		titleBox.classList.add("pageTitleMobile");
		var engBox = document.getElementById("eng");
		engBox.classList.remove("card");
		engBox.classList.add("cardMobile");
		var espBox = document.getElementById("esp");
		espBox.classList.remove("card");
		espBox.classList.add("cardMobile");
	}
	if (window.innerWidth > 425) {
		var box = document.getElementById("cardsBox");
		box.classList.remove("cardsMobile");
		box.classList.add("cards");
		var _saveBox = document.getElementById("save");
		_saveBox.classList.remove("saveButtonMobile");
		_saveBox.classList.add("saveButton");
		var _reviewBox = document.getElementById("review");
		_reviewBox.classList.remove("reviewButtonMobile");
		_reviewBox.classList.add("reviewButton");
		var _titleBox = document.getElementById("pageTitleID");
		_titleBox.classList.remove("pageTitleMobile");
		_titleBox.classList.add("pageTitle");
		var _engBox = document.getElementById("eng");
		_engBox.classList.remove("cardMobile");
		_engBox.classList.add("card");
		var _espBox = document.getElementById("esp");
		_espBox.classList.remove("cardMobile");
		_espBox.classList.add("card");
	}
};

function grab(txt) {
	var input = txt;
	console.log(input);
	var url = "http://server162.site:50491/query?translate=" + input;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);

	xhr.onload = function () {
		var responseStr = xhr.responseText;
		var JSobject = JSON.parse(responseStr);
		console.log(JSobject);
		place(JSobject.translate);
	};

	xhr.onerror = function () {
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
	var key = event.keyCode;
	if (key == 13) {
		grab();
	} else {
		var boxText = document.getElementById("eng").value;
		boxText = key;
	}
}

function SaveCard(userId) {
	var user = userId;
	var text = document.getElementById("eng").value;
	var transText = document.getElementById("esp").value;
	var cardData = JSON.stringify({ "user": user, "en": text, "es": transText });

	var url = "http://server162.site:50491/query?save=" + cardData;
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

ReactDOM.render(React.createElement(CreateHTML, null), document.getElementById('root'));