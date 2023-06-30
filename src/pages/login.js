import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Layout } from '@components/Layout';
import { ShoppingCartContext } from '../Context';

function Login() {
  const context = useContext(ShoppingCartContext);
  const router = useRouter();

  const [loginFailed, setLoginFailed] = useState(false);

  const [loginData, setLoginData] = useState(false);
  useEffect(() => {
    const userSavedData = JSON.parse(localStorage.getItem('user-data'));

    if (loginData) {
      const userData = {
        email: loginData.target.elements.email.value,
        password: loginData.target.elements.password.value,
      };

      const isLoggedIn = userSavedData && userSavedData.email === userData.email && userSavedData.password === userData.password;
      context.setLogged(isLoggedIn);

      if (isLoggedIn) {
        localStorage.setItem('logged', JSON.stringify(isLoggedIn));
        router.push('/');
      }
      setLoginFailed(!isLoggedIn);
    }
  }, [loginData, context, router]);

  const handleLogin = (event) => {
    event.preventDefault();
    setLoginData(event);
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Layout>
        <h1 className="font-medium text-xl">Welcome Back</h1>
        {}
        {loginFailed && <p className="font-light bg-red-200 text-md rounded-lg my-4 p-2 dark:bg-red-900">Email or Password doesn&apos;t match, check them and try again</p>}
        <form onSubmit={handleLogin} className="flex flex-col text-sm items-start border rounded-lg mt-4 border-inherit space-y-4 p-4 dark:bg-zinc-800 dark:text-white dark:border-inherit">
          <label className="font-medium" htmlFor='email'>Your Email</label>
          <input className="text-start bg-zinc-300 dark:bg-zinc-900 border border-inherit dark:border-zinc-800 rounded-lg p-2" type="text" placeholder="example@gmail.com" id='email'/>
          <label className="font-medium" htmlFor='password'>Your Password</label>
          <input className="text-start bg-zinc-300 dark:bg-zinc-900 border border-inherit dark:border-zinc-800 rounded-lg p-2" type="password" placeholder="Buy Something" id='password'/>
          <button className="p-4 font-semibold bg-black text-white w-full rounded-lg" type="submit">
            Login
          </button>
          <p className="font-light">Not having an account?</p>
          <Link
            href="/sign-up"
            className="p-4 font-semibold bg-inherit text-inherit w-full rounded-lg border border-black dark:border-inherit disabled:text-zinc-300 disabled:border-zinc-300 text-center"
          >
            Sign Up
          </Link>
        </form>
      </Layout>
    </>
  );
}

export default Login;
