import React from 'react';
import { Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
function NavBar(props) {
	const { dropDownTitle, btnVisualizeTitle} = props;

	return (
		<Navbar collapseOnSelect={true} variant="light" className="bg-zodiacblue text-uppercase" expand="lg md">
			<h2 className="h2 text-torchred font-weight-bold  mr-2">PathFinding Visualizer</h2>
			<Navbar.Toggle className="bg-sunsetorange " aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav justify-content-center nav-fill">
				<Nav id="basic-navbar-nav" className="justify-content-center nav-pills w-100">
					<Nav.Item className="navItem rounded">
						<NavDropdown
							id="basic-nav-dropdown"
							onSelect={(eventkey, event) => props.onSelect(eventkey, event)}
							title={<span className="text-white">{dropDownTitle}</span>}
						>
							<NavDropdown.Item eventKey={1}>Dijkstra</NavDropdown.Item>
							<NavDropdown.Item eventKey={2}>A*</NavDropdown.Item>
						</NavDropdown>
					</Nav.Item>
					<Nav.Item>
						<Button onClick={(e) => props.onClick(e)} className="navItem outline-torchred bg-sunsetorange">
							{btnVisualizeTitle}
						</Button>
					</Nav.Item>
				</Nav>
				<Nav id="basic-navbar-nav" className=" justify-content-end nav-pills w-100">
					<Nav.Item>
						<Button onClick={(e) => props.onClick(e)} className="navItem outline-torchred">
							Clear Grid
						</Button>
					</Nav.Item>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}
export default NavBar;
