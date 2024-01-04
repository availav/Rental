import { useContext, useEffect, useState } from "react";
import {differenceInCalendarDays} from 'date-fns';
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContextFile";
// import { Date } from "mongoose";


export default function BookingWidget({place}) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [noOfGuest, setNoofGuest] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState(1);
    const [redirect, setRedirect] = useState('');

    const {user} = useContext(UserContext);

    useEffect(() => {
        // console.log(user.name);
        if(user != null) setName(user.name);
    }, [user]);

    let noOfNights = 0
    if(checkIn && checkOut){
        noOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function bookThisPlace(){
        const {data} = await axios.post('/bookings', {
            checkIn, checkOut, noOfGuest, name, phone,
            place : place._id, 
            price : noOfNights * place.price
        });
        const bookingId = data._id;
        setRedirect('/account/bookings/' + bookingId);
    }

    if(redirect){
        return <Navigate to={redirect} />
    }


    return (
                    <div className="bg-white shadow p-4 rounded-2xl">
                        <div className="text-2xl text-center">₹Price : {place.price} / per night</div>
                        <div className="border rounded-2xl mt-4">
                            <div className="flex">
                                <div className="px-4 py-3">
                                    <label>Check in:</label>
                                    <input value={checkIn} onChange={(ev) => setCheckIn(ev.target.value)} type="date" />
                                </div>
                                <div className="px-4 py-3 border-l">
                                    <label>Check out:</label>
                                    <input value={checkOut} onChange={(ev) => setCheckOut(ev.target.value)} type="date" />
                                </div>
                            </div>
                            <div className="px-4 py-4 border-t">
                                    <label>No of guest:</label>
                                    <input type="number" value={noOfGuest} onChange={(ev) => setNoofGuest(ev.target.value)} />
                            </div>
                            {noOfNights > 0 && (
                                <div className="px-4 py-4 border-t">
                                    <label>Your Full Name:</label>
                                    <input type="text" value={name} onChange={(ev) => setName(ev.target.value)} />
                                    
                                    <label>Phone Number:</label>
                                    <input type="tel" value={phone} onChange={(ev) => setPhone(ev.target.value)} />
                                </div>
                            )}

                        </div>
                        <button onClick={bookThisPlace} className="primary mt-4">
                        Book this place 
                        {noOfNights > 0 && (
                            <span> ₹{noOfNights * place.price}</span> 
                        )}
                        </button>
                    
                    </div>
    );
}