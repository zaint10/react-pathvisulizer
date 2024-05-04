import { COLS, ROWS } from 'assets/consts.js';

export class backtracking {
	constructor(optimized = false) {
		console.log('optimizes', optimized)
		let x = 2 * COLS - 1;
		this.optimized = optimized;
		this.slashCodeLookup = [];
		this.backslashCodeLookup = [];
		this.slashCode = [];
		this.rowLookup = [];
		this.backslashCode = [];
		for (let i = 0; i < x; i++) {
			this.slashCodeLookup.push(false);
			this.backslashCodeLookup.push(false);
		}

		for (let i = 0; i < ROWS; i++) {
			this.slashCode.push([]);
			this.backslashCode.push([]);
			this.rowLookup.push(false);
			for (let j = 0; j < COLS; j++) {
				this.slashCode[i].push(false);
				this.backslashCode[i].push(false);
			}
		}
	}

	backtrackingUtil(grid, col, visitedNodesInOrder) {
		/* base case: If all queens are placed 
    then return true */

		if (col >= COLS) return true;

		for (let i = 0; i < ROWS; i++) {
			// Check if the queen can be placed on board[i][col]
			if (!this.optimized) {
				if (this.isSafe(grid, i, col)) {
					// Place the queen in grid[i][col]
					grid[i][col] = { ...grid[i][col], isQueen: true };
					this.rowLookup[i] = true;
					this.slashCodeLookup[this.slashCode[i][col]] = true;
					this.backslashCodeLookup[this.backslashCode[i][col]] = true;
					visitedNodesInOrder.push(grid[i][col]);

					// recursion to place the rest of queens
					if (backtrackingUtil(grid, col + 1, visitedNodesInOrder)) {
						return true;
					}

					// If placing queen in board[i][col
					// doesn't lead to a solution, then
					// remove queen from board[i][col]

					grid[i][col] = { ...grid[i][col], isQueen: false };
					this.rowLookup[i] = false;
					this.slashCodeLookup[this.slashCode[i][col]] = false;
					this.backslashCodeLookup[this.backslashCode[i][col]] = false;
					visitedNodesInOrder.push(grid[i][col]);
					// visitedNodesInOrder.pop()
				}
			}else{
				if(this.isSafeOptimized(i, col)){
					// Place the queen in grid[i][col]
					grid[i][col] = { ...grid[i][col], isQueen: true };
					this.rowLookup[i] = true;
					this.slashCodeLookup[this.slashCode[i][col]] = true;
					this.backslashCodeLookup[this.backslashCode[i][col]] = true;
					visitedNodesInOrder.push(grid[i][col]);

					// recursion to place the rest of queens
					if (backtrackingUtil(grid, col + 1, visitedNodesInOrder)) {
						return true;
					}

					// If placing queen in board[i][col
					// doesn't lead to a solution, then
					// remove queen from board[i][col]

					grid[i][col] = { ...grid[i][col], isQueen: false };
					this.rowLookup[i] = false;
					this.slashCodeLookup[this.slashCode[i][col]] = false;
					this.backslashCodeLookup[this.backslashCode[i][col]] = false;
					visitedNodesInOrder.push(grid[i][col]);
				}

			}
		}
		// if the queen can not be placed in any row in
		// this colum col then return false
		return false;
	}

	isSafe(grid, row, col) {
		let i, j;
		try {
			// Check this row on left side
			for (i = 0; i < col; i++) {
				if (grid[row][i].isQueen) return false;
			}

			// Check upper diagonal on left side
			for (i = row, j = col; i >= 0 && j >= 0; i--, j--) {
				if (grid[i][j].isQueen) {
					return false;
				}
			}

			// Check lower diagonal on left side
			for (i = row, j = col; j >= 0 && i < ROWS; i++, j--) {
				if (grid[i][j].isQueen) {
					return false;
				}
			}

			return true;
		} catch (err) {
			console.log(i, j);
		}
	}

	isSafeOptimized(row, col) {
		if (
			this.slashCodeLookup[this.slashCode[row][col]] ||
			this.backslashCodeLookup[this.backslashCode[row][col]] ||
			this.rowLookup[row]
		) {
			return false;
		}

		return true;
	}
}

export function backtrackingUtil(grid, col, visitedNodesInOrder) {
	/* base case: If all queens are placed 
    then return true */

	if (col >= COLS) return true;
	for (let i = 0; i < ROWS; i++) {
		// Check if the queen can be placed on board[i][col]
		if (isSafe(grid, i, col)) {
			// Place the queen in grid[i][col]
			grid[i][col] = { ...grid[i][col], isQueen: true };
			visitedNodesInOrder.push(grid[i][col]);

			// recursion to place the rest of queens
			if (backtrackingUtil(grid, col + 1, visitedNodesInOrder)) {
				return true;
			}

			// If placing queen in board[i][col
			// doesn't lead to a solution, then
			// remove queen from board[i][col]

			grid[i][col] = { ...grid[i][col], isQueen: false };
			visitedNodesInOrder.push(grid[i][col]);
			// visitedNodesInOrder.pop()
		}
	}
	// if the queen can not be placed in any row in
	// this colum col then return false
	return false;
}

function isSafe(grid, row, col) {
	let i, j;
	try {
		// Check this row on left side
		for (i = 0; i < col; i++) {
			if (grid[row][i].isQueen) return false;
		}

		// Check upper diagonal on left side
		for (i = row, j = col; i >= 0 && j >= 0; i--, j--) {
			if (grid[i][j].isQueen) {
				return false;
			}
		}

		// Check lower diagonal on left side
		for (i = row, j = col; j >= 0 && i < ROWS; i++, j--) {
			if (grid[i][j].isQueen) {
				return false;
			}
		}

		return true;
	} catch (err) {
		console.log(i, j);
	}
}

// function isSafeOptimized(row, col, slashCode, backslashCode, rowLookup, slashCodeLookup, backslashCodeLookup) {
// 	if (slashCodeLookup[slashCode[row][col]] || backslashCodeLookup[backslashCode[row][col]] || rowLookup[row]) {
// 		return false;
// 	}

// 	return true;
// }

export async function animatebacktracking(visitedNodesInOrder) {
	return await new Promise((resolve, reject) => {
		visitedNodesInOrder.forEach((node, i) => {
			setTimeout(() => {
				if (node.isQueen) {
					document.getElementById(`node-${node.rowIdx}-${node.nodeIdx}`).innerHTML =
						'<i className="fas fa-chess-queen" style="color: #6a0dad"></i>';
						document.getElementById(`node-${node.rowIdx}-${node.nodeIdx}`).classList.add('node-q')
				} else {
					document.getElementById(`node-${node.rowIdx}-${node.nodeIdx}`).innerHTML = '';
				}
			}, 0.001 * i);
		});
	});
}
