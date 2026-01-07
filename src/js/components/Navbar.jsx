import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-dark">
			<div className="container">
				<Link to="/index" className=" btn link-home add-contact">Contact list</Link>
			</div>
		</nav>
	);
};