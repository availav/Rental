import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {

    const [name, setName]  = useState('');
    const [email, setEmail] = useState('');
    const [password, setpass]  = useState('');

    async function registerUser(ev){
        ev.preventDefault();
        try{
            await axios.post('/register', {
                name,
                email,
                password,
            });
            alert('Registration Successfull! You can now log in.');
        }
        catch (e){
            alert('Registration falied! Please try again later');
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="mx-auto max-w-md" onSubmit={registerUser}>
                    <input type="text" 
                        placeholder="Keshav Chib"
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                    />
                    <input type="email" 
                        placeholder="Your@email.com" 
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                    />
                    <input type="password" 
                        placeholder="Your Password"
                        value={password}
                        onChange={ev => setpass(ev.target.value)}                        
                    />
                    <button className="primary" >Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member?  <Link className="underline text-black" to={'/login'}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}