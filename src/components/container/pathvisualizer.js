import React, { Component } from 'react';


import { Grid } from 'components/container';

class PathVisualizer extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onNodeClick = this.onhandleEvent.bind(this);
	}

	
	onhandleEvent() {
		console.log('PathFinding Handle Event');
	}
	
	render() {
		console.log('PathVisualizer->Grid Rendering');
	
		return (
			
			<div className="container-fluid " >
						<Grid callback={this.onhandleEvent} />
				</div>
				
			
			
		);
	}
}

export default PathVisualizer;
