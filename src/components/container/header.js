import React, { Component } from 'react';
import { NavBar } from 'components/presentational';
export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			algorithm: {
				selected: null
			},
			btnVisualize: "Visualize"
		};
	}
	onHandleClick = (e) => {
		const event_name = e.target.innerHTML;
		console.log(event_name);
		const { selected } = this.state.algorithm;
	
		if (!selected) {
			this.setState({ btnVisualize:"Pick an Algorithm!"})
		}
		
	};
	onHandleSelect = (ek, e) => {
		const event_name = e.target.innerHTML;

		this.setState({ algorithm: { selected: event_name } });
		this.setState({ btnVisualize: "Visualize"})
		
	};
	render() {
		const { selected } = this.state.algorithm;
		const {btnVisualize}=this.state
	
		return (
			<NavBar
				dropDownTitle={!selected ? 'algoritms' : selected}
				btnVisualizeTitle={btnVisualize}
				onSelect={this.onHandleSelect}
				onClick={this.onHandleClick}
			/>
		);
	}
}
