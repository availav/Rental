import { useEffect, useState } from "react";
import Perks from "./Perks";
import axios from "axios";
import PhotosUploader from "../PhotosUploader";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import { data } from "autoprefixer";

export default function PlacesFormpage() {
    const {id} = useParams();
    // console.log({id});
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);


    useEffect(() => {
        if(!id) {
            return;
        }
        axios.get('/places/' + id).then(responce => {
            const {data} = responce;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price)
        });
    }, [id]);

    function inputHeader(text){
        return (<h2 className="mt-4 text-xl">{text}</h2>);
    }

    function inputDescription(text){
        return (<p className="text-gray-500 text-sm">{text}</p>);
    }

    function preInput(header, description){
        return (
            <>
                {inputHeader(header)}
                {
                    inputDescription(description)
                }
            </>
        );
    }


    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price
        }
        if(id){
            // update
            await axios.put('/places', {
                id, ...placeData
            });
            setRedirect(true);
        }
        else {
            // post new place
            await axios.post('/places', placeData);
            setRedirect(true);
        }
    }

    if(redirect){
        return (<Navigate to='/account/places'/>);
    }


    return (
        <>
                <AccountNav/>
                <div>
                    <form onSubmit={savePlace}>
                        {preInput('Title', 'Title for your place.It should be short and catchy.')}
                        <input type="text" value={title} onChange={(ev) => setTitle(ev.target.value)} placeholder="title, for example : My lovely apartment" />
                        {preInput('Address', 'Address to this place')}
                        <input value={address} onChange={(ev) => setAddress(ev.target.value)} type="text" placeholder="address" />
                        {preInput('Photos', 'The more the better.')}
                        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />


                        {preInput('Description', 'description of your place.')}
                        <textarea value={description} onChange={(ev) => setDescription(ev.target.value)} />

                        {preInput('Preks', 'Select all your preks.')}
                        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                            <Perks selected={perks} onChange={setPerks}></Perks>
                        </div>
                        {preInput('Extra Info', 'The place rules?')}
                        <textarea value={extraInfo} onChange={(ev) => setExtraInfo(ev.target.value)} />
                        {preInput('Check In & Out Times', 'Add your Check in and out Times')}
                        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
                            <div>
                                <h3 className="mt-2 -mb-1">Check in times</h3>
                                <input value={checkIn} onChange={(ev) => setCheckIn(ev.target.value)} type="text" placeholder="14:00"/>
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Check out times</h3>
                                <input value={checkOut} onChange={(ev) => setCheckOut(ev.target.value)} type="text" placeholder="16:00"/>
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Max no. of guest</h3>
                                <input value={maxGuests} onChange={(ev) => setMaxGuests(ev.target.value)} type="number"/>
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Price per night</h3>
                                <input value={price} onChange={(ev) => setPrice(ev.target.value)} type="number"/>
                            </div>
                        </div>
                        <div className="mt-4 mb-4">
                            <button className="primary">Save</button>
                        </div>
                    </form>
                </div>
        </>
    );
}