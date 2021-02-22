function CreateHTML() {
	return React.createElement(
		"main",
		{ id: "mainMain", className: "main1" },
		React.createElement(PageHead, null),
		React.createElement(Footer, null)
	);
}

function PageHead() {
	return React.createElement(
		"div",
		{ id: "headID", className: "head" },
		React.createElement(
			"p",
			{ id: "welcome1", className: "welcome_msg1" },
			"Welcome to ",
			React.createElement("br", null),
			"Lango!"
		),
		React.createElement(
			"p",
			{ id: "welcome2", className: "welcome_msg2" },
			" Customize your vocabulary"
		)
	);
}

function Footer() {

	return React.createElement(
		"div",
		{ className: "footer" },
		React.createElement(
			"a",
			{ href: "auth/google", className: "signIn" },
			React.createElement("img", { id: "signInWithGoogle",
				src: "signInWithGoogle.png", title: "Login with Google" })
		)
	);
}

window.onresize = function () {
	if (window.innerWidth <= 450) {

		var mainBox = document.getElementById("mainMain");
		mainBox.classList.remove("main1");
		mainBox.classList.add("mainMobile");
		var headBox = document.getElementById("headID");
		headBox.classList.remove("head");
		headBox.classList.add("headMobile");

		var welcomeBox1 = document.getElementById("welcome1");
		welcomeBox1.classList.remove("welcome_msg1");
		welcomeBox1.classList.add("welcome_msg1Mobile");
		var welcomeBox2 = document.getElementById("welcome2");
		welcomeBox2.classList.remove("welcome_msg2");
		welcomeBox2.classList.add("welcome_msg2Mobile");

		var googleBox = document.getElementById("signInWithGoogle");
		googleBox.classList.remove("signIn");
		googleBox.classList.add("signInMobile");
	}

	if (window.innerWidth <= 850 && window.innerWidth > 450) {

		var _mainBox = document.getElementById("mainMain");
		_mainBox.classList.remove("main1");
		_mainBox.classList.add("mainMobile");
		var _headBox = document.getElementById("headID");
		_headBox.classList.remove("head");
		_headBox.classList.add("headMobile");

		var _welcomeBox = document.getElementById("welcome1");
		_welcomeBox.classList.remove("welcome_msg1Mobile");
		_welcomeBox.classList.add("welcome_msg1");
		var _welcomeBox2 = document.getElementById("welcome2");
		_welcomeBox2.classList.remove("welcome_msg2Mobile");
		_welcomeBox2.classList.add("welcome_msg2");

		var _googleBox = document.getElementById("signInWithGoogle");
		_googleBox.classList.remove("signInMobile");
		_googleBox.classList.add("signIn");
	}

	if (window.innerWidth > 850) {
		var _mainBox2 = document.getElementById("mainMain");
		_mainBox2.classList.remove("mainMobile");
		_mainBox2.classList.add("main1");
		var _headBox2 = document.getElementById("headID");
		_headBox2.classList.remove("headMobile");
		_headBox2.classList.add("head");

		var _welcomeBox3 = document.getElementById("welcome1");
		_welcomeBox3.classList.remove("welcome_msg1Mobile");
		_welcomeBox3.classList.add("welcome_msg1");
		var _welcomeBox4 = document.getElementById("welcome2");
		_welcomeBox4.classList.remove("welcome_msg2Mobile");
		_welcomeBox4.classList.add("welcome_msg2");

		var _googleBox2 = document.getElementById("signInWithGoogle");
		_googleBox2.classList.remove("signInMobile");
		_googleBox2.classList.add("signIn");
	}
};

ReactDOM.render(React.createElement(CreateHTML, null), document.getElementById('root'));