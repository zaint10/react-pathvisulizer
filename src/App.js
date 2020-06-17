import React from 'react';
import 'utils/styles/bootstrap.css';
import 'utils/styles/App.css';

import { PathVisualizer, Header, Settings } from 'components/container';
import { Footer, IconDescriptor } from 'components/presentational';

import { Provider } from 'react-redux';
import { store } from 'redux-store';

function App() {
	return (
		<Provider key={'root'} store={store}>
			
			<div className="wrapper">
				<Header />
				
				<Settings />
			
				<IconDescriptor />
				<PathVisualizer />
				<Footer />
			</div>
			
		</Provider>
	);
}

export default App;
