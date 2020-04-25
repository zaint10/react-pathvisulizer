import React from 'react'

import Col from 'react-bootstrap/Col';

const Node=(props)=>  {
	const { node }=props
	const { rowIdx, nodeIdx, isStart, isFinish } = node;
	
	const className = isStart ? 'node-start' : isFinish ? 'node-finish' : ''
	if (isStart){
		console.log('1')
	}
	if (isFinish){
		console.log('d')
	}
	return(
		<div className={`node col-0 ${className} `}
		
		onClick={() =>props.callback(rowIdx, nodeIdx)}></div> 	)
	}

export default Node;
