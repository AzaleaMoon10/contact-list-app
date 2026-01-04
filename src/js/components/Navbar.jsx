import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-dark">
			<div className="container">
				<Link to="/">
					<p className="">Contact list</p>
				</Link>
				<div className="ml-auto">
				</div>
			</div>
		</nav>
	);
};