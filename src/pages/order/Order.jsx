import React, { useContext, useEffect } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Loader from '../../components/loader/Loader';
import { Timestamp } from 'firebase/firestore';

function Order() {
  const userid = JSON.parse(localStorage.getItem('user')).user.uid;
  const context = useContext(myContext);
  const { mode, loading, order, updateOrderStatus, getOrderData } = context;

  const darkModeStyles = {
    backgroundColor: '#282c34',
    color: 'white',
  };

  const sortedOrders = order
    .filter(obj => obj.userid === userid)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

    
  return (
    <Layout>
      {loading && <Loader />}
      {sortedOrders.length > 0 ? (
        <div className="h-full pt-10 px-4">
          {sortedOrders.map(order => (
            <div
              key={order.id}
              className="bg-white dark:bg-purple-100 border border-gray-300 dark:border-gray-700 mx-auto max-w-5xl rounded-lg shadow-md p-6 mb-6"
            >
              <div className="mb-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-dark">
                  Order Status: {order.status || "Pending"}
                </h2>
                <p className="text-sm text-gray-700 dark:text-gray-400">
                  Order Date: {order.timestamp ? new Date(order.timestamp.toDate()).toLocaleDateString() : 'N/A'} {order.timestamp ? new Date(order.timestamp.toDate()).toLocaleTimeString() : ''}
                </p>
                </div>
              <div className="mt-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-black mb-2">
                  Products:
                </h3>
                {order.cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start mb-4 border-b border-gray-200 dark:border-gray-700 pb-4"
                  >
                    <img
                      src={item.imageUrl}
                      alt="product-image"
                      className="w-20 h-20 rounded-lg mr-4"
                    />
                    <div>
                      <h4 className="text-md font-bold text-gray-900 dark:text-black">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-400">
                        Price: {item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className='text-center text-2xl text-gray-900 dark:text-white'>No Orders</h2>
      )}
    </Layout>
  );
}

export default Order;
