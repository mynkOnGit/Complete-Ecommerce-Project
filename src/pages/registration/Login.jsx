import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import myContext from '../../context/data/myContext'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../fireabase/FirebaseConfig';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';

function Login() {
    const context = useContext(myContext)
    const {loading, setLoading} = context;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    

    const login = async () => {
        setLoading(true)
        try {
            const result = await signInWithEmailAndPassword(auth,email,password);
            toast.success("Login successful", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              })
            localStorage.setItem('user', JSON.stringify(result))
            navigate('/')
            setLoading(false)
            
        } catch (error) {
            console.log(error)
            setLoading(loading)
        }

    }
   
    

    return (
        <div className='relative flex justify-center items-center h-screen'>
            {loading && <Loader/>}
            <div
                style={{ backgroundImage: 'url(https://getwallpapers.com/wallpaper/full/f/5/d/87486.jpg)' }}
                className='absolute inset-0 bg-cover bg-center opacity-90'
            ></div>
            <div className='relative z-10 bg-transparent px-10 py-10 rounded-xl text-3xl'>
                <div className="">
                    <h1 className='text-center text-white text-4xl mb-4 font-bold'>Login</h1>
                </div>
                <div>
                    <input type="email"
                    autoComplete="off"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                        name='email'
                        className=' bg-gray-600 bg-opacity-50 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        autoComplete="off"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        className=' bg-gray-600 bg-opacity-50 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                    onClick={login}
                        className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                        Login
                    </button>
                </div>
                <div>
                    <h4 className='text-blue'>Don't have an account <Link className=' text-red-500 font-bold' to={'/signup'}>Signup</Link></h4>
                </div>
            </div>
        </div>
    )
}

export default Login
