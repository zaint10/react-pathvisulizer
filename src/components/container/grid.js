import React, { Component } from 'react';
import $ from 'jquery';
import { Node } from 'components/presentational/';

import * as CONSTS from 'assets/consts';
import { connect } from 'react-redux';
import * as ACTIONS from 'redux-store/action-types';

import { dijkstra } from 'assets/algorithms/dijkstra.js';
import { bfs_dfs } from 'assets/algorithms/bfs_dfs.js';
import { astar } from 'assets/algorithms/astar';
import { getNodesInShortestPathOrder } from 'assets/algorithms/utills';
import * as animate from 'assets/animate';
import { timeout, Promise } from 'q';

class Grid extends Component {
	constructor(props) {
		super(props);
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.handleKeyPressed = this.handleKeyPressed.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.whichKeyPressed = null;
		this.isMousePressed = false;
		this.whichNodePressed = null;
	}

	componentDidMount() {
		if (!this.props.grid.length) this.props.initGrid(true);
		document.addEventListener('keypress', this.handleKeyPressed, false);
		document.addEventListener('keyup', this.handleKeyUp, false);
	}
	componentDidUpdate() {
		$("table#grid .node").removeClass("node-visited").removeClass('node-path')
		if (this.props.initVisualizer) {
			
			this.props.visualizeAlgorithm();
		}
	}
	// async visualize(algorithm='') {
	// 	let { grid, startNode, finishNode } = this.props;
	// 	// console.log(startNode, finishNode);
	// 	startNode = grid[startNode.row][startNode.node];
	// 	finishNode = grid[finishNode.row][finishNode.node];

	// 	const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
	// 	// const visitedNodesInOrder = bfs_dfs('bfs', grid, startNode, finishNode);
	// 	// const visitedNodesInOrder = astar(grid, startNode, finishNode);
	// 	const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
	// 	console.log(visitedNodesInOrder)
	// 	// console.log(grid)
	// 	const animatee = new animate.Djsktra(10,50);
	// 	await animatee.djsktra(visitedNodesInOrder, nodesInShortestPathOrder);

	// 	return visitedNodesInOrder;
	// }
	shouldComponentUpdate(nextProps, nextState) {
		return !nextProps.isVisualized;
		// console.log(this.props === nextState)
		// console.log(this.props);
		// console.log(nextProps)
	}

	componentWillUnmount() {
		document.removeEventListener('keypress', this.handleKeyPressed, false);
		document.removeEventListener('keyup', this.handleKeyUp, false);
	}

	handleKeyPressed(e) {
		if (e.repeat) {
			return;
		}
		if (this.whichKeyPressed) return;
		e = e || window.event;
		console.log(e);

		if (e.type === 'keypress') {
			this.whichKeyPressed = e.code;
		}
	}
	handleKeyUp(e) {
		if (e.repeat) {
			return;
		}
		if (this.whichKeyPressed) this.whichKeyPressed = null;
	}

	handleMouseDown(e, rowIdx, nodeIdx) {
		const button = e.button;
		if (button !== 0) return;
		this.isMousePressed = true;
		const $selector = $(`#node-${rowIdx}-${nodeIdx}`);
		const node = $selector.attr('data-type');
		this.whichNodePressed = node;
		switch (node) {
			case 'normal': {
				this.props.startWallConstruction(rowIdx, nodeIdx, this.props.grid);
				// $selector.removeClass('normal').addClass('node-wall').attr('data-type', 'node-wall');

				break;
			}
			case 'node-start': {
				break;
			}
			case 'node-finish': {
				break;
			}
			default: {
			}
		}
	}

	handleMouseEnter(e, rowIdx, nodeIdx) {
		if (!this.isMousePressed) return;
		const $selector = $(`#node-${rowIdx}-${nodeIdx}`);
		const node = $selector.attr('data-type');

		if (node === 'node-wall') {
			return;
		}
		switch (this.whichNodePressed) {
			case 'normal': {
				setTimeout(() => {
					this.props.startWallConstruction(rowIdx, nodeIdx, this.props.grid);
				}, 15);
				// $selector.removeClass('normal').addClass('node-wall').attr('data-type', 'node-wall');
				break;
			}
			case 'node-start': {
				this.props.markGrid2(rowIdx, nodeIdx, 'node-start', this.props.grid);
				// $('.node.node-start').removeClass('node-start').html('');
				// $selector.removeClass('normal').addClass('node-start').attr('data-type', 'node-start')
				// .html(`<i class="fas fa-rocket fa-lg" style="color: #fb0246;"></i>`);

				break;
			}
			case 'node-finish': {
				// $('.node.node-finish').removeClass('node-finish').html('');
				this.props.markGrid2(rowIdx, nodeIdx, 'node-finish', this.props.grid);
				break;
			}
			default: {
			}
		}
	}

	handleMouseUp(e, rowIdx, nodeIdx) {
		const button = e.button;
		if (button !== 0) return;
		const $selector = document.getElementById(`node-${rowIdx}-${nodeIdx}`);
		const node = $selector.getAttribute('data-type');
		if (this.whichKeyPressed) {
			if (this.isMousePressed && this.whichKeyPressed === 'KeyW') {
				console.log('wall created');
			}
		} else if (node === 'normal') {
			// this.props.markGrid(rowIdx, nodeIdx);
		}
		this.isMousePressed = false;
		this.whichNodePressed = null;
	}

	render() {
		console.log('Rendering Grid');
		const { grid } = this.props;
		
		return (
			<table id='grid' className="mx-auto">
				<tbody>
					{grid.map((row, rowIdx) => {
						return (
							<tr key={rowIdx}>
								{row.map((node, nodeIdx) => {
									return (
										<Node
											key={nodeIdx}
											node={node}
											startNode={this.props.startNode}
											finishNode={this.props.finishNode}
											onMouseDown={this.handleMouseDown}
											onMouseEnter={this.handleMouseEnter}
											onMouseUp={this.handleMouseUp}
										/>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	grid: state.grid,
	startNode: state.startNode,
	finishNode: state.finishNode,
	initVisualizer: state.initVisualizer,
	algorithm: state.algorithm.selected,
	isVisualized: state.isVisualized
});

function mapDispatchToProps(dispatch, props) {
	return {
		initGrid: (DEFAULT_MARKING) => {
			dispatch({
				type: ACTIONS.SHOW_GRID,
						payload: { ROWS: CONSTS.ROWS, COLS: CONSTS.COLS, DEFAULT_MARKING: DEFAULT_MARKING }
					});
		},
		markGrid: (rowIdx, nodeIdx) => {
			dispatch({
				type: ACTIONS.MARK_GRID,
				payload: { rowIdx: rowIdx, nodeIdx: nodeIdx }
			});
		},
		markGrid2: (rowIdx, nodeIdx, node_type) => {
			dispatch({
				type: ACTIONS.MARK_GRID2,
				payload: { rowIdx: rowIdx, nodeIdx: nodeIdx, node_type: node_type }
			});
		},
		startWallConstruction: (rowIdx, nodeIdx, grid) => {
			dispatch({
				type: ACTIONS.START_WALL_CONSTRUCTION,
				payload: { rowIdx, nodeIdx, grid }
			});
		},
		visualizeAlgorithm: () => {
			
			dispatch({
				type: ACTIONS.VISUALIZE_PATH
			});
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
