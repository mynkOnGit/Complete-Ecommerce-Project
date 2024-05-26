import React, { useEffect, useState } from 'react';
import MyContext from './myContext';
import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../../fireabase/FirebaseConfig';

function myState(props) {
    const [mode, setMode] = useState('light');
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState({
        title: null,
        price: null,
        imageUrl: null,
        category: null,
        description: null,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    });
    const [product, setProduct] = useState([]);
    const [order, setOrder] = useState([]);
    const [user, setUser] = useState([]);
    const [searchkey, setSearchkey] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterPrice, setFilterPrice] = useState('');

    const toggleMode = () => {
        setMode(prevMode => {
            const newMode = prevMode === 'light' ? 'dark' : 'light';
            document.body.style.backgroundColor = newMode === 'dark' ? "rgb(17, 24, 39)" : "white";
            return newMode;
        });
    };

    const addProduct = async () => {
        if (!products.title || !products.price || !products.imageUrl || !products.category || !products.description) {
            return toast.error("All fields are required");
        }

        setLoading(true);

        try {
            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, products);
            toast.success("Product added successfully");
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 800);
            getProductData();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getProductData = async () => {
        setLoading(true);

        try {
            const q = query(collection(fireDB, 'products'), orderBy('time'));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const productArray = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setProduct(productArray);
                setLoading(false);
            });

            return unsubscribe;
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductData();
    }, []);

    const edithandle = (item) => {
        setProducts(item);
    };

    const updateProduct = async () => {
        setLoading(true);

        try {
            await setDoc(doc(fireDB, 'products', products.id), products);
            toast.success("Product updated successfully");
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 800);
            getProductData();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (item) => {
        setLoading(true);

        try {
            await deleteDoc(doc(fireDB, 'products', item.id));
            toast.success('Product deleted successfully');
            getProductData();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        if (!orderId || !status) {
            console.error('Order ID and status are required to update order status');
            return;
        }

        setLoading(true);

        try {
            const orderRef = doc(fireDB, 'order', orderId);
            await updateDoc(orderRef, { status });
            toast.success('Order status updated successfully');
            getOrderData();
        } catch (error) {
            console.error('Error updating order status: ', error);
            toast.error('Failed to update order status');
        } finally {
            setLoading(false);
        }
    };

    const getOrderData = async () => {
        setLoading(true);

        try {
            const result = await getDocs(collection(fireDB, "order"));
            const ordersArray = result.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setOrder(ordersArray);
            console.log(ordersArray);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getUserData = async () => {
        setLoading(true);

        try {
            const result = await getDocs(collection(fireDB, "users"));
            const usersArray = result.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setUser(usersArray);
            console.log(usersArray);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getOrderData();
        getUserData();
    }, []);

    return (
        <MyContext.Provider value={{
            mode, toggleMode, loading, setLoading,
            products, setProducts, addProduct, product,
            edithandle, updateProduct, deleteProduct,
            updateOrderStatus, order, user,
            searchkey, setSearchkey, filterType, setFilterType,
            filterPrice, setFilterPrice
        }}>
            {props.children}
        </MyContext.Provider>
    );
}

export default myState;
