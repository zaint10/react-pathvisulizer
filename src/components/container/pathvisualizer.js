import React, { Component } from 'react';

import { Grid } from 'components/container';


class PathVisualizer extends Component {
	render() {
		// console.log('Rendering PathVisualizer');
		
		return (
			<div className="container-fluid p-5" style={{minHeight: '75%'}}>
				<Grid algo = {null} />
			</div>
		);
	}
}


export default PathVisualizer;
