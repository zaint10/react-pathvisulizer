import React, { Component } from 'react';

export default function SideNav(props) {
	return (
		<nav className="settings-navbar" id="settingNavBar" style={{width: '0px'}}>
			
			<ul class="d-flex p-2 w-100">
				
				<div class="setting-rows-cols-wrapper">
						
						<div class="wrap-input100 rs1">
							<input class="input100" type="number" name="rows" />
							<span class="label-input100">ROWS</span>
						</div>
						<div class="wrap-input100 rs2">
							<input class="input100" type="number" name="columns" />
							<span class="label-input100">COLS</span>
						</div>
						<div class="container-login100-form-btn">
							<button class="login100-form-btn">Change</button>
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
