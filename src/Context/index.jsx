import { createContext, useState, useEffect } from 'react';
import { filterBy } from '@components/utils';
const API = 'https://api.escuelajs.co/api/v1/products';

const ShoppingCartContext = createContext();

function ShoppingCartProvider({ children }) {
  const [logged, setLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [productToShow, setProductToShow] = useState({});
  function openProductDetail() {
    setIsProductDetailOpen(true);
  }
  function closeProductDetail() {
    setIsProductDetailOpen(false);
  }
  const [cartProducts, setCartProducts] = useState([]);

  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
  function openCheckoutSideMenu() {
    setIsCheckoutSideMenuOpen(true);
  }
  function closeCheckoutSideMenu() {
    setIsCheckoutSideMenuOpen(false);
  }

  const [order, setOrder] = useState([]);

  const [products, setProducts] = useState(null);
  useEffect(() => {
    setLogged(Boolean(JSON.parse(localStorage.getItem('logged')))); 
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []); 

  const [productSearchValue, setProductSearchValue] = useState(null);

  const [productCategoryValue, setProductCategoryValue] = useState(null);

  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    if (productSearchValue && productCategoryValue) setFilteredProducts(filterBy('title_and_category', products, productSearchValue, productCategoryValue));
    if (productSearchValue && !productCategoryValue) setFilteredProducts(filterBy('by_title', products, productSearchValue, productCategoryValue));
    if (!productSearchValue && productCategoryValue) setFilteredProducts(filterBy('by_category', products, productSearchValue, productCategoryValue));
    if (!productSearchValue && !productCategoryValue) setFilteredProducts(filterBy(null, products, productSearchValue, productCategoryValue));
  }, [products, productSearchValue, productCategoryValue]);

  return (
    <ShoppingCartContext.Provider
      value={{
        openProductDetail,
        closeProductDetail,
        isProductDetailOpen,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProducts,
        isCheckoutSideMenuOpen,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        order,
        setOrder,
        products,
        setProducts,
        productSearchValue,
        setProductSearchValue,
        filteredProducts,
        productCategoryValue,
        setProductCategoryValue,
        isLoading,
        logged,
        setLogged,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export { ShoppingCartProvider, ShoppingCartContext };
