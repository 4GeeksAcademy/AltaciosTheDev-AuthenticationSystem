import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/login">
						<button className="btn btn-primary me-3">Login</button>
					</Link>
					<Link to="/signup">
						<button className="btn btn-primary">Signup</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
