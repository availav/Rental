import { Outlet } from "react-router-dom";
import Header from "./Heading";

export default function LayOut() {
    return (
        <div className="py-4 px-8 flex flex-col min-h-screen">
            <Header/>
            <Outlet />
        </div>
    );
}