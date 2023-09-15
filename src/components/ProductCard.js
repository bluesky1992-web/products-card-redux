import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';
import { useState } from 'react';

function ProductCard({ products, loading, error, fetchProducts }) {
  const [expandedDescriptions, setExpandedDescriptions] = useState(
    Array(products.length).fill(false),
  );
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return <div className="text-center text-3xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">Error: {error}</div>;
  }

  
  const toggleDescription = (index) => {
    const newExpandedDescriptions = [...expandedDescriptions];
    newExpandedDescriptions[index] = !newExpandedDescriptions[index];
    setExpandedDescriptions(newExpandedDescriptions);
  };

  return (
    <main className="flex justify-center items-center flex-wrap gap-3">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="max-w-[275px] bg-white border border-gray-200 rounded-lg shadow"
        >
          <img className="rounded-t-lg w-36 h-24" src={product.image} alt="" />

          <div className="p-5">
            <h6 className="mb-2 text-sm font-bold tracking-tight text-gray-900 ">
              {product.title}
            </h6>
            <h5 className="mb-3 font-semibold text-sm">
              {' '}
              Price: ${product.price}
            </h5>
            <p className="mb-3 text-xs text-gray-700 dark:text-gray-400 ">
              {expandedDescriptions[index]
                ? product.description
                : `${product.description.substring(0, 150)}`}
              ...
              <button
                className="text-red-500 "
                onClick={() => toggleDescription(index)}
              >
                {expandedDescriptions[index] ? 'Show Less' : 'Read more'}
              </button>
            </p>
          </div>
        </div>
      ))}
    </main>
  );
}

const mapStateToProps = (state) => ({
  products: state.product.products,
  loading: state.product.loading,
  error: state.product.error,
});

export default connect(mapStateToProps, { fetchProducts })(ProductCard);
