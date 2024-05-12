import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../fireabase/FirebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const signup = async () => {
        setLoading(true)
        if (name === "" || email === "" || password === "") {
            return toast.error("All fields are required")
        }

        try {
            const users = await createUserWithEmailAndPassword(auth, email, password);

            const user = {
                name: name,
                uid: users.user.uid,
                email: users.user.email,
                time : Timestamp.now()
            }
            const userRef = collection(fireDB, "users")
            await addDoc(userRef, user);
            toast.success("Signup Succesfully")
            setName("");
            setEmail("");
            setPassword("");
            setLoading(false)
            
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <div className='relative flex justify-center items-center h-screen'>
            {loading && <Loader/>}
            <div
                style={{ backgroundImage: 'url(https://wallpaperbat.com/img/412452-4k-gaming-wallpaper-1080p-bozhuwallpaper-2017-games.jpg)' }}
                className='absolute inset-0 bg-cover bg-center '
            ></div>
            <div className='relative z-10 bg-transparent px-10 py-10 rounded-xl text-3xl'>
                <div className="">
                    <h1 className='text-center text-white text-4xl mb-4 font-bold'>Signup</h1>
                </div>
                <div>
                    <input type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        name='name'
                        className=' bg-gray-600 bg-opacity-50 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Name'
                    />
                </div>

                <div>
                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        className=' bg-gray-600 bg-opacity-50 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className=' bg-gray-600 bg-opacity-50 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                        onClick={signup}
                        className=' bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg'>
                        Signup
                    </button>
                </div>
                <div>
                    <h4 className='text-white'>Have an account <Link className=' text-red-500 font-bold' to={'/login'}>Login</Link></h4>
                </div>
            </div>
        </div>
    )
}

export default Signup
