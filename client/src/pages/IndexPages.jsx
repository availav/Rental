import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import App from "../App";
import axios from "axios";

export default function IndexPage() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get('/places').then((res) => {
            setPlaces(res.data);
        });
    }, []);

    return (
        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 && (places.map(place => (
                <Link to={'/place/' + place._id} key={place._id}>
                    <div className="rounded-2xl mb-2 bg-gray-300 flex">
                        {place.photos?.[0] && (
                            <img className="rounded-2xl aspect-sqaure object-cover" src={"http://localhost:4000/uploads/" + place.photos?.[0]}></img>
                        )}
                    </div>
                
                    <h2 className="font-bold">{place.address}</h2>
                    <h3 className="text-sm leading-4 text-gray-500 truncate">{place.title}</h3>
                    <div className="mt-1">
                    <span className="font-bold">₹{place.price}</span> per night
                    </div>
                </Link>
            )))}
        </div>
    );
}