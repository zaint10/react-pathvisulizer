import React from 'react';

export default function SideNav(props) {
	return (
		<nav className="settings-navbar" id="settingNavBar" style={{width: '0px'}}>
			
			<ul className="d-flex p-2 w-100">
				
				<div className="setting-rows-cols-wrapper">
						
						<div className="wrap-input100 rs1">
							<input className="input100" type="number" name="rows" />
							<span className="label-input100">ROWS</span>
						</div>
						<div className="wrap-input100 rs2">
							<input className="input100" type="number" name="columns" />
							<span className="label-input100">COLS</span>
						</div>
						<div className="container-login100-form-btn">
							<button className="login100-form-btn">Change</button>
						</div>
					
				</div>
			</ul>

			{/* <ul className="navbar-nav side-nav">
				<li className="nav-item">
					<div className="row">
						<div className="col-6">
							<input className="input100" type="number" name="rows" placeholder="ROWS" />
							
						</div>
						<div className="col-6  ">
							<input className="input100" type="number" name="columns" placeholder="COLS" />
							
						</div>
					</div>
				</li>
			</ul> */}
		</nav>
	);
}
