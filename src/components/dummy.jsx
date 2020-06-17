// return (
// <Navbar collapseOnSelect={true} variant="light" className="bg-zodiacblue text-uppercase" expand="lg md">
//     <div>
//         <h2 className="h2 text-torchred font-weight-bold  mr-2">PathFinding Visualizer</h2>
//         <div className="text-right">
//             <h6 className="mr-2">
//                 <span>
//                     <i className="fab fa-github mx-1 text-white"></i>
//                 </span>
//                 <a className="text-torchred font-weight-bold" href="https://github.com/zaint10?tab=repositories"
//                     target="_blank">By Zain Tanveer</a>
//             </h6>

//         </div>
//     </div>

//     <Navbar.Toggle className="bg-sunsetorange " aria-controls="basic-navbar-nav" />
//     <Navbar.Collapse id="basic-navbar-nav justify-content-center nav-fill">
//         <Nav id="basic-navbar-nav" className="justify-content-center nav-pills w-100">
//             <Nav.Item className="navItem rounded">
//                 <NavDropdown id="basic-nav-dropdown_path_algorithms" onSelect={(eventkey, event)=>
//                     props.onSelect(eventkey, event)}
//                     title={<span className="text-white text-truncate">{dropDownTitle}</span>}
//                     >
//                     {menu_items_1}
//                     {/* <NavDropdown.Item eventKey={1}>Dijkstra</NavDropdown.Item>
//                     <NavDropdown.Item eventKey={2}>A*</NavDropdown.Item>
//                     <NavDropdown.Item eventKey={3}>BFS</NavDropdown.Item>
//                     <NavDropdown.Item eventKey={4}>DFS</NavDropdown.Item> */}
//                 </NavDropdown>
//             </Nav.Item>
//             <Nav.Item className="navItem rounded">
//                 <NavDropdown id="basic-nav-dropdown_backtrack" onSelect={(eventkey, event)=> props.onSelect(eventkey,
//                     event)}
//                     title={<span className="text-white">Backtracking</span>}
//                     >
//                     {menu_items_2}
//                     {/* <NavDropdown.Item eventKey={1}>Dijkstra</NavDropdown.Item>
//                     <NavDropdown.Item eventKey={2}>A*</NavDropdown.Item>
//                     <NavDropdown.Item eventKey={3}>BFS</NavDropdown.Item>
//                     <NavDropdown.Item eventKey={4}>DFS</NavDropdown.Item> */}
//                 </NavDropdown>
//             </Nav.Item>
//             <Nav.Item>
//                 <Button id="visualize-btn" onClick={(e)=> props.onClick(e)}
//                     className="navItem outline-torchred bg-sunsetorange"
//                     >
//                     {btnVisualizeTitle}
//                 </Button>
//             </Nav.Item>
//         </Nav>
//         <Nav id="basic-navbar-nav" className=" justify-content-end nav-pills w-100">
//             <Nav.Item>
//                 <Button id="clear-grid" onClick={(e)=> props.onClick(e)} className="navItem outline-torchred">
//                     Clear Grid
//                 </Button>
//             </Nav.Item>
//         </Nav>
//     </Navbar.Collapse>
// </Navbar>
// );