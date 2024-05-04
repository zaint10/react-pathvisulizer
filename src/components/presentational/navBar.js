import React from 'react';
import $ from 'jquery';
import { path_finding_algorithm_mapper, backtracking_algorithm_mapper } from 'assets/consts.js';
function NavBar(props) {
	const { btnVisualizeTitle, selectedDropdownItemKey } = props;
	
	const menu_items_1 = [],
	menu_items_2 = [];
	let dropdownTitle1 = 'algorithms',
	dropdownTitle2 = 'backtracking'
	for (const [ key, value ] of Object.entries(path_finding_algorithm_mapper)) {
		if(key === selectedDropdownItemKey){
			$("table .node.node-q").html('');
			$("table .node .node-start").removeClass('d-none');
			$("table .node .node-finish").removeClass('d-none');
			
			dropdownTitle1 =  value
		}
		   
		menu_items_1.push(
			<button key={key} data-key={key} className="dropdown-item">
				{value}
			</button>
		);
	}
	
	for (const [ key, value ] of Object.entries(backtracking_algorithm_mapper)) {
		if(key === selectedDropdownItemKey){
			$("table .node .node-start").addClass('d-none');
			$("table .node .node-finish").addClass('d-none');
			dropdownTitle2 =  value
		}
		menu_items_2.push(
			<button key={key} data-key={key} className="dropdown-item wrap_text" href="#">
				{value}
			</button>
		);
	}

	

	return (
		<nav className="navbar navbar-dark navbar-expand-lg bg-zodiacblue text-uppercase pl-1 py-1">
			<div className="navbar-brand p-0 text-right">
				<h2 className="h2 text-torchred font-weight-bold ">PathFinding Visualizer</h2>

				<div className="text-right">
					<h6>
						<span>
							<i className="fab fa-github mx-1 text-white" />
						</span>
						<a
							className="text-torchred font-weight-bold"
							href="https://github.com/zaint10?tab=repositories"
							target="_blank"
							rel="noreferrer"
						>
							By Zain Tanveer
						</a>
					</h6>
				</div>
			</div>
			<button
				className="navbar-toggler bg-sunsetorange"
				type="button"
				data-toggle="collapse"
				data-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				
			>
				<span className="navbar-toggler-icon" />
			</button>

			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav  mr-auto">
					<li className="nav-item dropdown">
						<button
							className="btn btn-primary dropdown-toggle dropdown-toggle text-white navItem text-capitalize"
							href="#"
							id="navbarDropdownbtnPathAlgos"
							
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
						>
							<span className="text">{dropdownTitle1}</span>
							<span className="caret"></span>
						</button>
						<div className="dropdown-menu" aria-labelledby="#navbarDropdownbtnPathAlgos" onClick={props.onSelect}>
							{menu_items_1}
						</div>
					</li>
					<li className="nav-item dropdown">
						<button
							className="btn btn-primary dropdown-toggle dropdown-toggle text-white navItem text-capitalize"
							href="#"
							id="navbarDropdownbtnBacktracking"
							
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
						>
							<span className="text">{dropdownTitle2}</span>
							<span className="caret"></span>
						</button>
						<div className="dropdown-menu" aria-labelledby="#navbarDropdownbtnBacktracking" onClick={props.onSelect}>
							{menu_items_2}
						</div>
					</li>

					<li className="nav-item">
						<button className=" btn navItem outline-torchred bg-sunsetorange" onClick={props.onClick}>
							{btnVisualizeTitle}
						</button>
					</li>
				</ul>
				<ul className="navbar-nav justify-content-end mr-auto w-100">
					<li className="nav-item">
						<button className=" btn navItem btn-primary" onClick={props.onClick}>Clear Grid</button>
					</li>
					<li className="nav-item">
						<span onClick={openSettingsNav}>
							<i className="toggle-collapse fas fa-cog fa-lg text-white" ></i>
						</span>
					</li>
				</ul>
			</div>
		</nav>
	);
}


function openSettingsNav(){
	const width = document.getElementById("settingNavBar").style.width;
	if(width === '0px'){
		document.getElementById("settingNavBar").style.width = '350px'
	}else{
		document.getElementById("settingNavBar").style.width = '0px'
	}

}
export default NavBar;
