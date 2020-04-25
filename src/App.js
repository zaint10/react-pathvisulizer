import React from 'react';
import 'utils/styles/bootstrap.css'
import 'utils/styles/App.css';

import { PathVisualizer,Header } from 'components/container';
import { Footer} from 'components/presentational';


function App() {
	return (
	
		<div >
			<Header />
			<PathVisualizer className={' paknbrent'} />		
				<Footer />
		</div>
		
	);
}

export default App;
