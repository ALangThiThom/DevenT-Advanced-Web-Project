import { Outlet } from "react-router-dom";
import NavBar from "../components/Layout/NavBar/NavBar";

export default function AttendeeLayout() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <NavBar />

            <main className="flex-grow-1">
                <Outlet />
            </main>
        </div>
    );
}