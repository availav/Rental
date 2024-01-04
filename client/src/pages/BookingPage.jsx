import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingsDates from "../BookingsDates";

export default function BookingsPage() {
    const {id} = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        axios.get('/bookings').then((res) => {
            const foundBooking = res.data.find(({_id}) => _id == id);
            if(foundBooking) {
                setBooking(foundBooking);
            }
        });
    }, [id]);

    if(!booking) {
        return '';
    }

    return (
        <div className="mt-8 mb-8">
            <h1 className="text-3xl font-bold">{booking.place.title}</h1>
            <AddressLink className='my-2 block'>{booking.place.address}</AddressLink>
            <div className="bg-gray-200 my-6 p-6 rounded-2xl flex justify-between items-center">
                <div>
                    <h2 className="text-2xl mb-4">Your booking information:</h2>
                    <BookingsDates booking={booking} />
                </div>
                <div className="bg-primary py-4 px-8 text-white rounded-2xl">
                    <div>Total price</div>
                    <div className="text-3xl">₹{booking.price}</div>
                </div>
            </div>
            <PlaceGallery place={booking.place} />
        </div>
    );
}