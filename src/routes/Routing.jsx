import { useSelector } from "react-redux";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import User from "../pages/User";
import AdminRoute from "../routes/lib/AdminRoute"; 
import ProtectedRouter from "../routes/lib/ProtectedRouter";

const Routing = () => {
	const { isAuthenticated, role } = useSelector((state) => state.auth || {});

	return (
		<Router>
			<Routes>
				<Route path="/signin" element={<SignIn />} />

				<Route
					path="/signup"
					element={
						isAuthenticated ? (
							<Navigate to={role === "admin" ? "/admin" : "/user"} />
						) : (
							<SignUp />
						)
					}
				/>

				<Route
					path="/"
					element={
						<ProtectedRouter
							Component={User}
							fallBackPath="/signup"
							isAuth={isAuthenticated}
						/>
					}
				/>

				<Route
					path="/user"
					element={
						<ProtectedRouter
							Component={User}
							fallBackPath="/signup"
							isAuth={isAuthenticated}
						/>
					}
				/>

				<Route
					path="/admin"
					element={
						<ProtectedRouter
							Component={AdminRoute}
							fallBackPath="/signup"
							isAuth={isAuthenticated && role === "admin"}
						/>
					}
				/>
			</Routes>
		</Router>
	);
};

export default Routing;
