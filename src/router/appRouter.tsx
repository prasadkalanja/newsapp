import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import { NotRouteFound } from "../components";
import HomePage from "../components/pages/HomePage/HomePage";
import PersonalizedPage from "../components/pages/PersonalizedPage/PersonlizedPage";


export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Navigate to="/home" replace={true} />
            },
            {
                path: "/home",
                element: <HomePage />
            },
            {
                path: "/personalized",
                element: <PersonalizedPage />
            },
            {
                path: "*",
                element: <NotRouteFound />
            }
        ]
    }
])