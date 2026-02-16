import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KiteImg from '../assets/kgkite.png';
import MessageBox from '../Components/MessageBox';
import { API_CALL } from '../Utils/utils';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [messages, setMessages] = useState([]); // Store multiple messages
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const addMessage = (text, status) => {
        setMessages((prev) => [...prev, { text, status, id: Date.now() }]); // Add unique ID
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validation
        if (!username || !password) {
            addMessage('Please enter both username and password.', 'error');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_CALL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            // console.log(data);
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data.username)); 
                addMessage('Login successful! Redirecting...', 'success');

                setTimeout(() => {
                    navigate('/new-entry');
                }, 500);
            } else {
                addMessage(data.error || 'Invalid credentials', 'error');
            }
        } catch (error) {
            addMessage('Server error. Please try again later.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col w-full h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50'>
            <header className='w-full h-[80px] bg-white/80 backdrop-blur-sm border-b border-gray-200 flex justify-between px-10 items-center shadow-sm'>
                <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                    KG <span className='text-blue-500'>CAR</span>
                </h2>
            </header>

            <section className='h-[calc(100vh-80px)] w-full flex justify-center items-center p-4'>
                <div className='w-full max-w-5xl h-[600px] bg-white border border-gray-200 rounded-2xl flex shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300'>
                    <div className='w-[50%] h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex justify-center items-center p-10 relative overflow-hidden'>
                        <div className='absolute inset-0 bg-white/5 backdrop-blur-3xl'></div>
                        <div className='relative z-10 text-center text-white'>
                            <img src={KiteImg} alt="Login Illustration" className='w-[90%] mx-auto drop-shadow-2xl animate-float' />
                            <h3 className='text-2xl font-bold mt-6'>Welcome Back!</h3>
                            <p className='text-blue-100 mt-2'>Manage your certificates with ease</p>
                        </div>
                    </div>

                    <div className='w-[50%] h-full flex flex-col justify-center items-center p-10 bg-white'>
                        <div className='w-full max-w-md'>
                            <h2 className='mb-2 text-3xl font-bold text-gray-800'>Login</h2>
                            <p className='text-gray-500 mb-8'>Enter your credentials to continue</p>

                            {/* Display multiple MessageBoxes */}
                            <div className="fixed flex flex-col gap-2 transform -translate-x-1/2 top-24 left-1/2 z-50">
                                {messages.map((msg) => (
                                    <MessageBox key={msg.id} message={msg.text} status={msg.status} />
                                ))}
                            </div>

                            <form className='w-full space-y-6' onSubmit={handleLogin}>
                                <div className='flex flex-col gap-2'>
                                    <label className='block font-semibold text-gray-700 text-sm'>User ID</label>
                                    <input
                                        type='text'
                                        name='username'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder='Enter your username'
                                        className='w-full h-[48px] outline-none border-2 border-gray-200 rounded-xl px-4 focus:border-blue-500 transition-colors duration-200 text-gray-700'
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='block font-semibold text-gray-700 text-sm'>Password</label>
                                    <input
                                        type='password'
                                        name='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder='Enter your password'
                                        className='w-full h-[48px] outline-none border-2 border-gray-200 rounded-xl px-4 focus:border-blue-500 transition-colors duration-200 text-gray-700'
                                    />
                                </div>

                                <button
                                    type='submit'
                                    disabled={loading}
                                    className='w-full h-[48px] rounded-xl px-4 font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]'
                                >
                                    {loading ? (
                                        <span className='flex items-center justify-center gap-2'>
                                            <svg className='animate-spin h-5 w-5' viewBox='0 0 24 24'>
                                                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' fill='none'></circle>
                                                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                            </svg>
                                            Logging in...
                                        </span>
                                    ) : 'Login'}
                                </button>

                                <p className='text-center text-sm text-gray-500'>
                                    Need help? <span className='text-blue-500 cursor-pointer hover:underline font-semibold'>Contact Admin</span>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
