import React, { Component } from 'react';
import { ROWS, COLS, D_START, D_FINISH } from 'assets/consts';
import Row from 'react-bootstrap/Row';

import { Node } from 'components/presentational';

export default class Grid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			grid: [],
			startNode: {
				row: 10,
				node: 3,
				marked: true
			},
			finishNode: {
				row: 10,
				node: 13,
				marked: true
			},
			visualize:true

		};
	}
	componentDidMount() {
		const grid = initGrid();
		this.setState({ grid });
	}

	onClickNode = (rowIdx, nodeIdx) => {
		console.log(`Marking Row: ${rowIdx} - Col: ${nodeIdx}`);
		let { startNode, finishNode, grid} = this.state;
	
		if (startNode.marked && finishNode.marked) {
			grid = initGrid(false);
			grid[rowIdx][nodeIdx] = { ...grid[rowIdx][nodeIdx], isStart: true };
			this.setState({ 
				grid: grid,
				startNode: { ...startNode, marked: true},
				finishNode: { ...finishNode, marked: false },
				visualize: false
			 });
			 return
		}
		
		if (!startNode.marked) {
			grid[rowIdx][nodeIdx] = { ...grid[rowIdx][nodeIdx], isStart: true };
			this.setState({
				grid: grid,
				startNode: {
					marked: true,
					row: rowIdx,
					node: nodeIdx
				}
				
			});
		} else if (!finishNode.marked) {
			grid[rowIdx][nodeIdx] = { ...grid[rowIdx][nodeIdx], isFinish: true };
			this.setState({
				grid: grid,
				finishNode: {
					marked: true,
					row: rowIdx,
					node: nodeIdx
				},
				visualize:true
			});
		}
	};
	onMouseDownUp(rowIdx, nodeIdx) {}
	onMouseEnter() {}
	render() {
		console.log('Rendering Grid');
		const { grid } = this.state;

		return( 
			
			grid.map((row, rowIdx) => {
				return (<div className={'row'}>{
					row.map((node, nodeIdx) => {
						
						return <Node className={'center '} key={nodeIdx} node={node} 
							startNode={this.state.startNode} finishNode={this.state.finishNode} callback={this.onClickNode} />
					})}
					</div>
				
			);
			})
				)
	}
}

const initGrid = (DEFAULT = true) => {
	const nodes = [];
	for (let row = 0; row < ROWS; row++) {
		const currentRow = [];
		let currentNode = {};
		for (let col = 0; col < COLS; col++) {
			currentNode = createNode(row, col);
			currentRow.push(currentNode);
		}
		nodes.push(currentRow);
	}
	if (DEFAULT) {
		nodes[D_START.row][D_START.col] = { ...nodes[D_START.row][D_START.col], isStart: true };
		nodes[D_FINISH.row][D_FINISH.col] = { ...nodes[D_FINISH.row][D_FINISH.col], isFinish: true };
	}
	// console.log(`Grid Initialized ${DEFAULT ? 'but with default nodes' : 'and Grid is Cleared from default nodes'}`);
	return nodes;
};
const createNode = (row, col) => {
	return {
		rowIdx: row,
		nodeIdx: col,
		isStart: false,
		isFinish: false,
		isVisited: false,
		isWall: false,
		prevNode: null
	};
};

// eslint-disable-next-line
const setDefaultSettings = () => {
	const grid = initGrid(true);
	this.setState({
		grid: grid,
		start: {
			row: D_START.row,
			node: D_START.col,
			isMark: true
		},
		finish: {
			row: D_FINISH.row,
			node: D_FINISH.col,
			isMark: true
		},

	});
};
