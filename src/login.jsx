function CreateHTML() {
	return( <main id="mainMain" className="main1">
		<PageHead />
		<Footer />
		</main>
		 );
}

function PageHead() {
	return (<div id="headID" className="head">
			<p id="welcome1" className="welcome_msg1">Welcome to <br/>Lango!</p>
			<p id="welcome2" className="welcome_msg2"> Customize your vocabulary</p>

		</div>
	       );
}


function Footer() {


	return (<div className="footer">
			<a href="auth/google" className="signIn"><img id="signInWithGoogle"  
						src="signInWithGoogle.png" title="Login with Google" /></a>
		</div>
	       );
}


window.onresize = function() {
	if(window.innerWidth <= 450) {

		let mainBox = document.getElementById("mainMain");
		mainBox.classList.remove("main1");
		mainBox.classList.add("mainMobile");
		let headBox = document.getElementById("headID");
		headBox.classList.remove("head");
		headBox.classList.add("headMobile");

		let welcomeBox1 = document.getElementById("welcome1");
		welcomeBox1.classList.remove("welcome_msg1");
		welcomeBox1.classList.add("welcome_msg1Mobile");
		let welcomeBox2 = document.getElementById("welcome2");
		welcomeBox2.classList.remove("welcome_msg2");
		welcomeBox2.classList.add("welcome_msg2Mobile");

		let googleBox = document.getElementById("signInWithGoogle");
		googleBox.classList.remove("signIn");
		googleBox.classList.add("signInMobile");

	}

	if(window.innerWidth <= 850 && window.innerWidth > 450) {
	
		let mainBox = document.getElementById("mainMain");
		mainBox.classList.remove("main1");
		mainBox.classList.add("mainMobile");
		let headBox = document.getElementById("headID");
		headBox.classList.remove("head");
		headBox.classList.add("headMobile");

		let welcomeBox1 = document.getElementById("welcome1");
		welcomeBox1.classList.remove("welcome_msg1Mobile");
		welcomeBox1.classList.add("welcome_msg1");
		let welcomeBox2 = document.getElementById("welcome2");
		welcomeBox2.classList.remove("welcome_msg2Mobile");
		welcomeBox2.classList.add("welcome_msg2");
	
		let googleBox = document.getElementById("signInWithGoogle");
		googleBox.classList.remove("signInMobile");
		googleBox.classList.add("signIn");
	}

	if(window.innerWidth > 850) {
		let mainBox = document.getElementById("mainMain");
		mainBox.classList.remove("mainMobile");
		mainBox.classList.add("main1");
		let headBox = document.getElementById("headID");
		headBox.classList.remove("headMobile");
		headBox.classList.add("head");

		let welcomeBox1 = document.getElementById("welcome1");
		welcomeBox1.classList.remove("welcome_msg1Mobile");
		welcomeBox1.classList.add("welcome_msg1");
		let welcomeBox2 = document.getElementById("welcome2");
		welcomeBox2.classList.remove("welcome_msg2Mobile");
		welcomeBox2.classList.add("welcome_msg2");
		
		let googleBox = document.getElementById("signInWithGoogle");
		googleBox.classList.remove("signInMobile");
		googleBox.classList.add("signIn");



	}
}


ReactDOM.render(<CreateHTML/>, document.getElementById('root'));