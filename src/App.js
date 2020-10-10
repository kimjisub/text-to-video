import React from 'react';
import logo from './logo.png';
import './App.css';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<div className="navigator">
					<div>
						RENDERING
						<div className="underline"></div>
					</div>
					<div>ABOUT US</div>
				</div>
			</header>
		</div>
	);
}

export default App;
