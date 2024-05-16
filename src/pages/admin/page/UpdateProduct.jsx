import React, { useContext } from 'react';
import myContext from '../../../context/data/myContext';

function UpdateProduct() {
    const context = useContext(myContext);
    const { products, setProducts, updateProduct } = context;

    return (
        <div className="relative h-screen w-screen">
            <img
                src="https://m.economictimes.com/thumb/msid-104940359,width-1600,height-900,resizemode-4,imgsize-398056/gaming-accessories.jpg"
                alt="background"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-transparent opacity-50"></div>
            <div className="relative flex justify-center items-center h-full z-10">
                <div className="w-full bg-transparant px-10 py-10 rounded-xl">
                    <div>
                        <h1 className="text-center text-white text-4xl mb-4 font-bold">Update Product</h1>
                    </div>
                    <div>
                        <input
                            type="text"
                            value={products.title}
                            onChange={(e) => setProducts({ ...products, title: e.target.value })}
                            name="title"
                            className="bg-gray-600 bg-opacity-60 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
                            placeholder="Product title"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={products.price}
                            onChange={(e) => setProducts({ ...products, price: e.target.value })}
                            name="price"
                            className="bg-gray-600 bg-opacity-60 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
                            placeholder="Product price"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={products.imageUrl}
                            onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })}
                            name="imageurl"
                            className="bg-gray-600 bg-opacity-60 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
                            placeholder="Product imageUrl"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={products.category}
                            onChange={(e) => setProducts({ ...products, category: e.target.value })}
                            name="category"
                            className="bg-gray-600 bg-opacity-60 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
                            placeholder="Product category"
                        />
                    </div>
                    {/* Add Description  */}
                    <div>
                        <textarea
                            cols="30"
                            rows="10"
                            name="description"
                            value={products.description}
                            onChange={(e) => setProducts({ ...products, description: e.target.value })}
                            className="bg-gray-600 bg-opacity-60 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
                            placeholder="Product description"
                        />
                    </div>
                    {/* Add feature  */}
                    <div>
                        <textarea
                            cols="30"
                            rows="5" // Adjust the number of rows as needed
                            name="features"
                            value={products.features}
                            onChange={(e) => setProducts({ ...products, features: e.target.value })}
                            className="bg-gray-600 bg-opacity-60 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
                            placeholder="Product features"
                        />
                    </div>
                    <div className="flex justify-center mb-3">
                        <button
                            onClick={updateProduct}
                            className="bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg"
                        >
                            Update Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProduct;
