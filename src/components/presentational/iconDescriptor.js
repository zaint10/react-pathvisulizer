import React, { Component } from 'react';
import radar from 'assets/icons/radar.svg'
import dragon_ball from 'assets/icons/drgon_ball_4_stars.png'
function IconDescriptor(props) {
	return (
		<div className="d-flex p-1 justify-content-around descriptors text-white" style={{ backgroundColor: '#121212' }}>
			<span>
				<div className="node text-center border-0">
					{/* <i className="fas fa-broadcast-tower node-start" /> */}
                    <img src={radar} />
				</div>
				Start Node
			</span>
			<span>
                <div className="node text-center border-0">
                    <img src={dragon_ball} />
					{/* <i className="fas fa-atom fa-lg node-finish"></i> */}
				</div>
                Finish Node
                </span>
			<span>
                <div className="node  node-wall text-center"></div>
                Wall Node
                </span>
			<span>
                <div className="node node-visited text-center"></div>
                Visited Node
                </span>
			<span>
                <div className="node node-path text-center"></div>
                Path Node
                </span>
		</div>
	);
}

export default IconDescriptor;
