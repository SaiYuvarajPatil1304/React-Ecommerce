import { useContext } from 'react';
import { ShoppingCartContext } from '../../../Context';
import { NavbarItem } from '../NavbarItem';
import { ToggleDarkModeButton } from '../ToggleDarkModeButton';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Navbar() {
  const router = useRouter();
  const context = useContext(ShoppingCartContext);
  let email = '';

  const handleLogout = () => {
    context.setLogged(false);
    localStorage.setItem('logged', 'false');
    router.push('/login');
  };

  if (context.logged) {
    email = JSON.parse(localStorage.getItem('user-data')).email;
  }
  return (
    <nav className="hidden lg:flex lg:flex-row lg:justify-between lg:items-center fixed z-10 lg:w-screen py-4 px-8 text-sm font-light rounded-lg top-0 border-b-2 bg-white dark:text-white dark:bg-zinc-900">
      {}
      <h2 className="font-bold text-md cursor-default">React-Ecommerce</h2>
      <ul className={`lg:flex lg:items-center lg:flex-row gap-3 `}>
        {}
        <NavbarItem to="/" category={null}>
          All
        </NavbarItem>
        <NavbarItem to="/" category={'Clothes'}>
          Clothes
        </NavbarItem>
        <NavbarItem to="/" category={'Electronics'}>
          Electronics
        </NavbarItem>
        <NavbarItem to="/" category={'Furnitures'}>
          Furnitures
        </NavbarItem>
        <NavbarItem to="/" category={'Toys'}>
          Toys
        </NavbarItem>
        <NavbarItem to="/" category={'Others'}>
          Others
        </NavbarItem>
      </ul>
      <ul className={`lg:flex lg:items-center lg:flex-row gap-3 `}>
        <ToggleDarkModeButton />
        {context.logged && (
          <>
            <li className="text-black/60 dark:text-white/60">{email}</li>
            <NavbarItem to="/my-orders" category={null}>
              My Orders
            </NavbarItem>
            <NavbarItem to="/my-account" category={null}>
              My Account
            </NavbarItem>
            <NavbarItem to="/login" category={null} handleLogout={handleLogout}>
              Sign Out
            </NavbarItem>
            <li className="flex items-center">
              <button onClick={() => context.openCheckoutSideMenu()}>
                {}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </button>
              <div>{context.cartProducts.length}</div>
            </li>
          </>
        )}
        {!context.logged && (
          <li>
            {}
            <Link href="/login">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export { Navbar };
