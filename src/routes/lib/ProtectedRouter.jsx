import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const PrivateRouter = ({ Component, fallBackPath }) => {
	const [isAuth, setIsAuth] = useState(() => {
		return localStorage.getItem("isAuthenticated") === "true";
	});

	const navigate = useNavigate();

	useEffect(() => {
		const authStatus = localStorage.getItem("isAuthenticated") === "true";
		setIsAuth(authStatus);

		if (!authStatus) {
			navigate(fallBackPath);
		}
	}, [navigate, fallBackPath]);

	return isAuth ? <Component /> : <Navigate to={fallBackPath} replace />;
};

export default PrivateRouter;
