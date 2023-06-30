import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';
import Image from 'next/image';

function ProductDetail() {
  const context = useContext(ShoppingCartContext);
  const { category, title, image, price, description } = context.productToShow;

  return (
    <aside
      className={`${
        context.isProductDetailOpen ? 'flex' : 'hidden'
      } flex flex-col fixed z-20 right-0 top-0 w-screen h-full overflow-y-auto md:top-[60px] md:w-[360px] bg-white dark:bg-inherit border border-inherit rounded-lg md:h-[calc(100vh-60px)]`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">Detail</h2>
        {}
        <button onClick={() => context.closeProductDetail()} className="cursor-pointer">
          {}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <figure className="px-6 relative">
        {}
        <Image width={1920} height={1080} style={{ objectFit: 'cover' }} src={image} alt={title || 'Nothing here...'} className="w-full h-full rounded-lg" />
        {}
        <span className="absolute bottom-0 left-0 bg-zinc-300 rounded-lg text-black text-xs ml-9 mb-3 px-3 py-0.5">{category}</span>
      </figure>
      <p className="flex flex-col p-6">
        {}
        <span className="font-medium text-2xl">${price}</span>
        {}
        <span className="font-medium text-lg my-1">{title}</span>
        {}
        <span className="font-normal text-md">{description}</span>
      </p>
    </aside>
  );
}

export { ProductDetail };
