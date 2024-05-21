import React, { useContext, useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import myContext from '../../../context/data/myContext';
import Layout from '../../../components/layout/Layout';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { FaUser, FaCartPlus } from 'react-icons/fa';
import { AiFillShopping, AiFillPlusCircle, AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './Dashboard.jsx';

function DashboardTab() {
    const context = useContext(myContext);
    const { mode, product, edithandle, deleteProduct, order, user , deleteUser} = context;

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    // Calculate total counts
    const totalProducts = product.length;
    const totalOrders = order.length;
    const totalUsers = user.length;

    // Function to filter products based on search query
    const filteredProducts = product.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Function to filter products based on selected category
    const filteredProductsByCategory = selectedCategory
        ? filteredProducts.filter((item) => item.category === selectedCategory)
        : filteredProducts;
    // Function to filter users based on search query
    const filteredUsers = user.filter((item) =>
        item.uid.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <>
            <div className="container mx-auto">
                <div className="tab container mx-auto">
                    <Tabs defaultIndex={0} className=" ">
                        <TabList className="md:flex md:space-x-8 grid grid-cols-2 text-center gap-4 md:justify-center mb-10">
                            <Tab>
                                <button type="button" className="font-medium border-b-2 hover:shadow-purple-700 border-purple-500 text-purple-500 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center bg-[#605d5d12]">
                                    <div className="flex gap-2 items-center">
                                        <MdOutlineProductionQuantityLimits />Total Products - {totalProducts}
                                    </div>
                                </button>
                            </Tab>
                            <Tab>
                                <button type="button" className="font-medium border-b-2 border-pink-500 bg-[#605d5d12] text-pink-500 hover:shadow-pink-700 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center">
                                    <div className="flex gap-2 items-center">
                                        <AiFillShopping /> Order - {totalOrders}
                                    </div>
                                </button>
                            </Tab>
                            <Tab>
                                <button type="button" className="font-medium border-b-2 border-green-500 bg-[#605d5d12] text-green-500 rounded-lg text-xl hover:shadow-green-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center">
                                    <div className="flex gap-2 items-center">
                                        <FaUser /> Users - {totalUsers}
                                    </div>
                                </button>
                            </Tab>
                        </TabList>

                        {/* Product Tab */}
                        <TabPanel>
                            {/* Add search bar */}
                            <div className="flex justify-between items-center mb-4">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="focus:outline-none border-b-2 border-gray-300 px-4 py-2 rounded-lg"
                                />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="focus:outline-none border-b-2 border-gray-300 px-4 py-2 rounded-lg"
                                >
                                    <option value="">All Categories</option>
                                    {/* Add options for categories */}
                                    {Array.from(new Set(product.map(p => p.category))).map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='px-4 md:px-0 mb-16'>
                                <h1 className='text-center mb-5 text-3xl font-semibold underline' style={{ color: mode === 'dark' ? 'white' : '' }}>Product Details</h1>
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => window.location.href = '/addproduct'}
                                        type="button"
                                        className="focus:outline-none text-white bg-pink-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] border hover:bg-pink-700 outline-0 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                                        style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}
                                    >
                                        <div className="flex gap-2 items-center">
                                            Add Product <FaCartPlus size={20} />
                                        </div>
                                    </button>
                                </div>
                                <div className="relative overflow-x-auto">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs border border-gray-600 text-black uppercase bg-purple-100 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]"
                                            style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}
                                        >
                                            <tr>
                                                <th scope="col" className="px-6 py-3">S.No</th>
                                                <th scope="col" className="px-6 py-3">Image</th>
                                                <th scope="col" className="px-6 py-3">Title</th>
                                                <th scope="col" className="px-6 py-3">Price</th>
                                                <th scope="col" className="px-6 py-3">Category</th>
                                                <th scope="col" className="px-6 py-3">Date</th>
                                                <th scope="col" className="px-6 py-3">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredProductsByCategory.map((item, index) => {
                                                const { title, price, imageUrl, category, date } = item;
                                                return (
                                                    <tr key={index} className="w-100 bg-gray-100 border-b bg-blue-50 dark:border-gray-700"
                                                        style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}
                                                    >
                                                        <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>{index + 1}.</td>
                                                        <td className="px-6 py-4 font-medium text-black whitespace-nowrap"><img className='w-16' src={imageUrl} alt="img" /></td>
                                                        <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>{title}</td>
                                                        <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{price}</td>
                                                        <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>{category}</td>
                                                        <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>{date}</td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex gap-2">
                                                                <div className="flex gap-2 cursor-pointer text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                    <div onClick={() => deleteProduct(item)}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L5.84 5.79m12 0H5.16m0 0c.34-.059.68-.114 1.022-.166m12 0a48.108 48.108 0 00-3.478-.443m-12 0c.34-.059.68-.114 1.022-.166m0 0L5.84 19.673A2.25 2.25 0 008.084 21.75h7.832a2.25 2.25 0 002.244-2.077L19.228 5.79M5.75 5.25h12.5m-10.25 0V3.682a1.182 1.182 0 011.182-1.182h5.136a1.182 1.182 0 011.182 1.182V5.25m-7.5 0h7.5" />
                                                                        </svg>
                                                                    </div>
                                                                    <div onClick={() => edithandle(item)}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l2.651 2.651M18.133 2.888a1.503 1.503 0 012.122 2.122l-9.257 9.257a2.25 2.25 0 01-1.012.578l-3.281.82a.45.45 0 01-.554-.554l.82-3.281a2.25 2.25 0 01.578-1.012l9.257-9.257z" />
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 7.5l6 6m-3.5 3.5H6.75a2.25 2.25 0 01-2.25-2.25V6.75a2.25 2.25 0 012.25-2.25h7.5a2.25 2.25 0 012.25 2.25V10" />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </TabPanel>

                        {/* Orders Tab */}
                        <TabPanel>
                            <div className="px-4 md:px-0 mb-16">
                                <h1 className='text-center mb-5 text-3xl font-semibold underline' style={{ color: mode === 'dark' ? 'white' : '' }}>Orders</h1>
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-black uppercase bg-pink-200 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">S.No</th>
                                                <th scope="col" className="px-6 py-3">Name</th>
                                                <th scope="col" className="px-6 py-3">Address</th>
                                                <th scope="col" className="px-6 py-3">Order</th>
                                                <th scope="col" className="px-6 py-3">Amount</th>
                                                <th scope="col" className="px-6 py-3">Payment Mode</th>
                                                <th scope="col" className="px-6 py-3">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.map((order, index) => (
                                                <tr key={index} className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <td className="px-6 py-4">{index + 1}.</td>
                                                    <td className="px-6 py-4">{order.name}</td>
                                                    <td className="px-6 py-4">{order.address}</td>
                                                    <td className="px-6 py-4">{order.orderDetails}</td>
                                                    <td className="px-6 py-4">{order.amount}</td>
                                                    <td className="px-6 py-4">{order.paymentMode}</td>
                                                    <td className="px-6 py-4">
                                                        <button className="text-red-600 hover:text-red-900" onClick={() => deleteOrder(order)}>
                                                            <AiFillDelete size={20} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </TabPanel>

                        {/* Users Tab */}
                        <TabPanel>
                            {/* Add search bar */}
                            <div className="flex justify-between items-center mb-4">
                                <input
                                    type="text"
                                    placeholder="Search by User ID..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="focus:outline-none border-b-2 border-gray-300 px-4 py-2 rounded-lg"
                                />
                            </div>
                            <div className='px-4 md:px-0 mb-16'>
                                <h1 className='text-center mb-5 text-3xl font-semibold underline' style={{ color: mode === 'dark' ? 'white' : '' }}>User Details</h1>
                                <div className="relative overflow-x-auto">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs border border-gray-600 text-black uppercase bg-purple-100 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]"
                                            style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                                                <tr>
                                                <th scope="col" className="px-6 py-3">UID</th>
                                                <th scope="col" className="px-6 py-3">Name</th>
                                                <th scope="col" className="px-6 py-3">Email</th>
                                                <th scope="col" className="px-6 py-3">Role</th>
                                                <th scope="col" className="px-6 py-3">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {filteredUsers.map((user, index) => {
                                                const { uid, name, email, role } = user;
                                                return (
                                                    <tr key={index} className="w-100 bg-gray-100 border-b bg-blue-50 dark:border-gray-700"
                                                        style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}
                                                    >
                                                    <td className="px-6 py-4">{user.uid}</td> {/* Display UID instead of S.No */}
                                                    <td className="px-6 py-4">{user.name}</td>
                                                    <td className="px-6 py-4">{user.email}</td>
                                                    <td className="px-6 py-4">{user.role}</td>
                                                    <td className="px-6 py-4">
                                                        <button className="text-red-600 hover:text-red-900" onClick={() => deleteUser(user)}>
                                                            <AiFillDelete size={20} />
                                                        </button>
                                                    </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </>
    );
}

export default DashboardTab;
