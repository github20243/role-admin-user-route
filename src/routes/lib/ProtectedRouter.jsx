import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const PrivateRouter = ({ Component, fallBackPath }) => {
	const [isAuth, setIsAuth] = useState(() => {
		// Инициализируем состояние, проверяя текущий статус аутентификации
		return localStorage.getItem("isAuthenticated") === "true";
	});

	const navigate = useNavigate();

	useEffect(() => {
		// Проверяем актуальное состояние аутентификации при монтировании компонента
		const authStatus = localStorage.getItem("isAuthenticated") === "true";
		setIsAuth(authStatus);

		// Если не аутентифицирован, перенаправляем на fallBackPath
		if (!authStatus) {
			navigate(fallBackPath);
		}
	}, [navigate, fallBackPath]);

	return isAuth ? <Component /> : <Navigate to={fallBackPath} replace />;
};

export default PrivateRouter;
