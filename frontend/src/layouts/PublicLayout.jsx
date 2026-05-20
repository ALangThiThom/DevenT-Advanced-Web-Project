import { Outlet } from "react-router-dom";
import NavBar from "../components/Layout/NavBar/NavBar";
import Footer from "../components/Layout/Footer/Footer";

export default function PublicLayout() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <NavBar />

            <main className="flex-grow-1">
                <Outlet />
            </main>

            <Footer />
        </div>
    )
}