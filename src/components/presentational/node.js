import React from 'react';
import radar from 'assets/icons/radar.svg'
// import dragon_ball from 'assets/icons/drgon_ball_4_stars.png'
import dragon_ball from 'assets/icons/drgon_ball_4_stars.svg'
const Node = (props) => {
	const { node } = props;
	const { rowIdx, nodeIdx, isStart, isFinish, isWall } = node;

	const className = isStart ? 'node-start' : isFinish ? 'node-finish' : isWall ? 'node-wall' :  'normal';
	
	
		return (
		<td
			id={`node-${rowIdx}-${nodeIdx}`}
			key={`node-${rowIdx}-${nodeIdx}`}
			className={`col-0 text-center node ${className}`}
			data-type={className}
			onMouseDown={(e) => props.onMouseDown(e, rowIdx, nodeIdx)}
			onMouseEnter={(e) => props.onMouseEnter(e, rowIdx, nodeIdx)}
			onMouseUp={(e) => props.onMouseUp(e, rowIdx, nodeIdx)}
		>
			{className === 'node-start' ?
				(<img className="node-start" src={radar} alt="node-start" />) : 
				className === 'node-finish' ? 
				(<img className="node-finish" src={dragon_ball} alt="node-finish" />) : ''
			}
		</td>
	);



};

export default Node;
