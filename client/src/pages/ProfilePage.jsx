import { useContext, useState } from "react";
import { UserContext } from "../UserContextFile";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacePage from "./PlacesPages";
import AccountNav from "../AccountNav";


export default function ProfilePage() {
    const {user, ready, setUser} = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);
    // console.log(user);
    let {subpage} = useParams();
    if(subpage === undefined) subpage = 'profile';

    async function LogOut(){
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if(ready === false) {
        return "Loading...";
    }

    if(ready === true && !user && !redirect){
        return (ready && <Navigate to={'/login'}/>);
    };

    if(redirect){
        return <Navigate  to={redirect} />
    }

    return (
        <div>
        <AccountNav/>

        {subpage === 'profile' && (
            <div className="text-center mx-auto max-w-lg">
                Logged in as {user.name} ({user.email})<br/>
                <button onClick={LogOut} className="primary mt-4 max-w-sm">LogOut</button>
            </div>
        )}

        {
            subpage === 'places' && (
                <PlacePage/>
            )
        }

        </div>
    );
}

// UserContex