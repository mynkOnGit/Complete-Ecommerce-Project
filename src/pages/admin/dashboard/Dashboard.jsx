import React, { useContext } from "react";
import { FaIdCard, FaBoxOpen, FaFileInvoice } from "react-icons/fa";
import myContext from "../../../context/data/myContext";
import Layout from "../../../components/layout/Layout";
import DashboardTab from "./DashboardTab";

function Dashboard() {
  const context = useContext(myContext);
  const { mode, product, order, user } = context;

  // Calculate total counts
  const totalProducts = product.length;
  const totalOrders = order.length;
  const totalUsers = user.length;

  return (
    <Layout>
      <section className="w-full text-gray-600 body-font mt-10 mb-10">
        {/* <div className="container px-5 mx-auto mb-10">
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 md:w-1/3 sm:w-1/3 w-full">
              <div className="border-2 hover:shadow-gray-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl">
                <div className="text-black-500 w-12 h-12 mb-3 inline-block">
                  <FaBoxOpen size={50} />
                </div>
                <h2 className="title-font font-medium text-3xl text-black fonts1">
                  {totalProducts}
                </h2>
                <p className="text-black-500  font-bold">Total Products</p>
              </div>
            </div>
            <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
              <div className="border-2 hover:shadow-gray-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl">
                <div className="text-black-500 w-12 h-12 mb-3 inline-block">
                  <FaFileInvoice size={50} />
                </div>
                <h2 className="title-font font-medium text-3xl text-black fonts1">
                  {totalOrders}
                </h2>
                <p className="text-black-500  font-bold">Total Orders</p>
              </div>
            </div>
            <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
              <div className="border-2 hover:shadow-gray-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-blue-100 border-gray-300    px-4 py-3 rounded-xl">
                <div className="text-black-500 w-12 h-12 mb-3 inline-block">
                  <FaIdCard size={50} />
                </div>
                <h2 className="title-font font-medium text-3xl text-black fonts1">
                  {totalUsers}
                </h2>
                <p className="text-black-500  font-bold">Total Users</p>
              </div>
            </div>
          </div>
        </div> */}
        <DashboardTab />
      </section>
    </Layout>
  );
}

export default Dashboard;
