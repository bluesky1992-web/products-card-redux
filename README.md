# Product Card Component Documentation

## Introduction

The Product Card Component is a React component designed to display a list of products fetched from an API source. It provides a responsive layout with options to expand and collapse product descriptions. The component is integrated with Redux for state management.

## Features

- Fetches product data from an API source.
- Displays product information in a card format.
- Responsive design for various screen sizes.
- Expand and collapse product descriptions with a "Read more" button.
- Consistent card layout and styling.
- Integrated with Redux for state management.

## Tools Used

- React
- Redux
- Tailwind CSS

# Usage

## Props

The ProductCard component does not require any props for basic functionality. Product data is fetched and managed internally. However, you can customize its appearance and behavior using the following optional props:

- `products`: An array An array of product objects containing `title`, `price`, `description`, and `image` properties. (Array)

- `loading`: Indicates if data is being fetched. (Boolean)
- `error`: Contains an error message if data fetching fails. (String)

# Redux Integration

The `ProductCard` component is integrated with Redux for state management. It relies on the following Redux store structure, actions, and reducers:

```
{
 product: {
   products: [],    // An array of product objects
   loading: false,  // Indicates if data is being fetched
   error: null       // Contains an error message if data fetching fails
 }
}

```

## Redux Actions

`fetchProducts`: This action is dispatched to fetch product data from an API source.

## Redux Reducers

- `productReducer`: Handles actions related to product data. It updates the store's `products`, `loading`, and `error` fields based on the action.

# steps of connecting redux to the component



    1. Set up Redux in the application, including the store, actions, and reducers.

    2. Imported the ProductCard component into the component file.

    3. Connected the ProductCard component to the Redux store using the connect function.

    4.Dispatched the fetchProducts action to fetch product data.

    5.Access product data, loading state, and error state from the Redux store and pass them as props to the `ProductCard` component.


    
```
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


```

## Styling
The component utilizes the Tailwind CSS framework for styling.
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
