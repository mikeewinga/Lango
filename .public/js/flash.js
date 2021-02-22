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
		React.createElement(
			"button",
			{ id: "review" },
			"Start Review"
		),
		React.createElement(
			"p",
			{ className: "pageTitle" },
			"Flashcards!"
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
		key: "SaveCard",
		value: function SaveCard() {
			var user = "1";
			var text = document.getElementById("eng").value;
			var transText = document.getElementById("esp").value;
			var cardData = JSON.stringify({ "user": user, "en": text, "es": transText });

			var url = "query?save=" + cardData;
			//console.log(url);
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);

			xhr.onload = function () {
				var responseStr = xhr.responseText;
				//console.log("SAVED");
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
					{ id: "save", className: "saveButton",
						onClick: this.SaveCard },
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
			if (event.key === 'Enter') {
				//console.log("ENTER pressed");
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
					onChange: function onChange(inTxt) {
						_this3.setState({ value: inTxt.target.value });
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

	function OutputBox(props) {
		_classCallCheck(this, OutputBox);

		var _this4 = _possibleConstructorReturn(this, (OutputBox.__proto__ || Object.getPrototypeOf(OutputBox)).call(this, props));

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
					value: this.state.value })
			);
		}
	}]);

	return OutputBox;
}(React.Component);

function Footer() {
	return React.createElement(
		"div",
		{ className: "footer" },
		React.createElement(
			"p",
			{ id: "user" },
			"UserName"
		)
	);
}

window.onresize = function () {
	if (window.innerWidth <= 425) {
		var cards = document.getElementById("cardsBox");
		cards.classList.remove("cards");
		cards.classList.add("cardsMobile");
		var saveBox = document.getElementById("save");
		saveBox.classList.remove("saveButton");
		saveBox.classList.add("saveButtonMobile");
	}
	if (window.innerWidth > 425) {
		var box = document.getElementById("cardsBox");
		box.classList.remove("cardsMobile");
		box.classList.add("cards");
		var _saveBox = document.getElementById("save");
		_saveBox.classList.remove("saveButtonMobile");
		_saveBox.classList.add("saveButton");
	}
};

function grab(txt) {
	var input = txt;
	console.log("Input Text: " + input);
	var url = "query?translate=" + input;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);

	xhr.onload = function () {
		var responseStr = xhr.responseText;
		var JSobject = JSON.parse(responseStr);
		//console.log(JSobject);
		place(JSobject.translate);
	};

	xhr.onerror = function () {
		alert('Error making request.');
	};

	xhr.send();
}

function place(text) {
	document.getElementById("esp").value = text;
}

ReactDOM.render(React.createElement(CreateHTML, null), document.getElementById('root'));