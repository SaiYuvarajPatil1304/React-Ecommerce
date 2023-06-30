import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';
import Image from 'next/image';

function Card({ category, title, image, price, description, id }) {
  const productData = { category, title, image, price, description, id };
  const context = useContext(ShoppingCartContext);

  function showProduct(productDetailData) {
    context.openProductDetail();
    context.setProductToShow(productDetailData);
  }

  function addToCart(event, productCartData) {
    event.stopPropagation();
    context.openCheckoutSideMenu();
    context.setCartProducts([...context.cartProducts, productCartData]);
  }

  function renderIcon(id) {
    const isInCart = context.cartProducts.some((product) => product.id === id);
    if (isInCart) {
      return (
        <button className="absolute top-0 right-0 flex justify-center items-center m-2 w-6 h-6">
          {}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="white" className="w-6 h-6 bg-black rounded-full">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </button>
      );
    } else {
      return (
        <button className="absolute top-0 right-0 flex justify-center items-center m-2 w-6 h-6" onClick={(event) => addToCart(event, productData)}>
          {}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6 bg-white dark:bg-black rounded-full">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      );
    }
  }
  return (
    <div role="button" tabIndex={0} className="bg-inherit cursor-pointer w-56 h-68 rounded-lg mb-6" onClick={() => showProduct(productData)} onKeyDown={() => showProduct(productData)}>
      <figure className="relative mb-2 w-full h-4/5 rounded-lg">
        {}
        <span className="absolute bottom-0 left-0 bg-zinc-300 rounded-lg text-black text-xs m-2 px-3 py-0.5">{category}</span>
        {}
        <Image className="w-full h-auto object-cover rounded-lg" src={image} alt={title} width={224} height={218} style={{ objectFit: 'cover' }} />
        {}
        {renderIcon(productData.id)}
      </figure>
      <p className="flex justify-between">
        {}
        <span className="text-sm font-light">{title}</span>
        {}
        <span className="text-lm font-bold">${price}</span>
      </p>
    </div>
  );
}

export { Card };
