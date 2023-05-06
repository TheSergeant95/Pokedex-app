import React from 'react';

import MainPage from './pages/MainPage';

const App: React.FC = () => {
	return (
		<div className="App">
			<header className="App__header">
				<h1>Pokédex</h1>
			</header>
			<main className="App__content">
				<MainPage />
			</main>
		</div>
	);
};

export default App;
