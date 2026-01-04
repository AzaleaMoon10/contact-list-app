import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-dark">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 fs-1">Contact list</span>
				</Link>
				<div className="ml-auto">
				</div>
			</div>
		</nav>
	);
};