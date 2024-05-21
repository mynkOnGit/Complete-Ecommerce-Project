// CategoryFilterBar.jsx

import React, { useContext } from 'react';
import myContext from '../../../context/data/myContext';

function CategoryFilterBar() {
  const context = useContext(myContext);
  const { mode, product, setFilterType } = context;

  // Extract unique categories
  const uniqueCategories = [...new Set(product.map(item => item.category))];

  return (
    <select
      value={context.filterType}
      onChange={(e) => setFilterType(e.target.value)}
      className="px-4 py-3 w-full rounded-md bg-gray-50 border-transparent outline-0 focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
      style={{ backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '', color: mode === 'dark' ? 'white' : '', }}>
      <option value="">All Categories</option>
      {uniqueCategories.map((category, index) => (
        <option key={index} value={category}>{category}</option>
      ))}
    </select>
  );
}

export default CategoryFilterBar;
