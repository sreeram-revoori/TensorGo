
'use client';
import React from 'react'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/utils/firebase'
import { useRouter } from 'next/navigation';
function page() {
    const router = useRouter()
    const googleProvider = new GoogleAuthProvider();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
        } else {
            console.log("user is signed out")
        }
    });


    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            router.push("/")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <header className="py-5">
                <nav className="flex justify-between mx-20">
                    <div className="logo flex gap-6 items-center justify-center">
                        <Link href='/'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="124" height="38" viewBox="0 0 124 38">
                                <path fill="#F45400" fill-rule="nonzero"
                                    d="M123.686 31.942h-5.124l-4.39-6.976h-.184v6.976h-4.208V9.913h4.208v14.502h.183l4.026-6.425h5.123l-4.94 6.609 5.306 7.343zm-16.65-.55c-.968.638-2.363.917-4.209.917-2.111 0-3.837-.644-5.123-2.02-1.353-1.198-2.012-2.859-2.012-4.956 0-2.287.707-4.14 2.195-5.507 1.34-1.342 3.23-2.02 5.672-2.02 1.56 0 2.744.217 3.477.735v3.488c-.895-.621-1.894-.955-2.928-.918-1.297-.037-2.27.32-2.927 1.102-.78.65-1.139 1.639-1.098 2.937-.04 1.186.303 2.147.915 2.753.76.79 1.705 1.138 2.927 1.102 1.046.036 2.09-.297 3.11-.918v3.304zm-16.102-16.89c-.815 0-1.408-.214-1.83-.734-.5-.339-.731-.865-.731-1.468 0-.662.23-1.186.732-1.653.421-.347 1.014-.55 1.83-.55.64 0 1.236.203 1.646.55.503.467.732.99.732 1.653 0 .63-.229 1.163-.732 1.652-.41.343-1.005.55-1.647.55zm1.83 17.624h-4.208V18.174h4.208v13.952zm-7.867-.184h-4.209V9.913h4.209v22.029zm-6.953-.55c-.967.638-2.363.917-4.208.917-2.112 0-3.838-.644-5.123-2.02-1.353-1.198-2.013-2.859-2.013-4.956 0-2.287.707-4.14 2.195-5.507 1.34-1.342 3.23-2.02 5.672-2.02 1.561 0 2.745.217 3.477.735v3.488c-.894-.621-1.893-.955-2.928-.918-1.296-.037-2.27.32-2.927 1.102-.78.65-1.138 1.639-1.098 2.937-.04 1.186.303 2.147.915 2.753.761.79 1.705 1.138 2.927 1.102 1.047.036 2.09-.297 3.11-.918v3.304zm-12.808-9.547a5.086 5.086 0 0 0-1.83-.367c-.876.018-1.597.36-2.195 1.102-.44.623-.7 1.553-.732 2.753v6.609h-4.208V17.99h4.208v2.57c.758-1.813 1.966-2.753 3.66-2.753.498 0 .847.054 1.097.183v3.855zm-11.71 10.097h-4.025v-2.02h-.183c-.848 1.613-2.231 2.387-4.025 2.387-1.39 0-2.453-.38-3.294-1.101-.71-.8-1.097-1.815-1.097-3.121 0-2.647 1.6-4.195 4.757-4.59l3.842-.55c-.015-1.481-.84-2.237-2.562-2.203-1.588-.034-3.167.457-4.574 1.469v-3.305c.51-.246 1.328-.516 2.379-.734 1.026-.25 1.971-.367 2.744-.367 4.052 0 6.038 1.967 6.038 5.874v8.261zm-4.208-5.69v-.919l-2.561.367c-1.322.136-2.013.761-2.013 1.836 0 .48.168.877.549 1.102.292.395.747.55 1.28.55.839 0 1.49-.276 2.013-.917.48-.464.732-1.163.732-2.02zM29.824 25.15v6.792h-4.392V12.483h6.953c4.859 0 7.319 2.067 7.319 6.242 0 1.913-.706 3.494-2.196 4.773-1.333 1.137-3.22 1.74-5.489 1.652h-2.195zm0-9.179v6.058h1.646c2.332 0 3.477-1.021 3.477-3.12 0-1.94-1.145-2.938-3.477-2.938h-1.646zM15.186 0C6.78 0 0 6.788 0 15.053c0 7.862 6.083 13.91 13.174 20.928a47.403 47.403 0 0 0 1.646 1.652l.366.367.366-.367c.515-.539 5.578-5.624 5.49-5.691v-6.976l-1.282 1.652c-1.3 1.43-2.744 2.982-4.574 4.773C9.838 26.14 4.741 20.451 4.757 14.686 4.741 8.96 9.387 4.309 15.187 4.222c3.12.087 6.036 1.555 7.867 3.855h5.489C26.003 3.262 20.863 0 15.186 0z" />
                            </svg></Link>
                    </div>
                    <div className="flex gap-2 items-center mt-2">
                        <p className="text-base font-semibold text-[#2d2d2d] mr-7">You still don't have an account?</p>
                        <Link href={'/signup'} className="text-base signupBtn font-semibold text-[#f45400] border-2 py-3 px-10 rounded-md hover:text-white hover:bg-[#f45400] transition-all duration-300 ease-in-out">Signup</Link>
                    </div>
                </nav>
            </header>
            <main className='h-[80vh] flex justify-center items-center'>
                {/* <section className="min-h-[80vh] flex flex-col justify-center items-center">
                    <div className="px-[35%] my-20 w-full">
                        <h1 className="text-2xl font-semibold text-[#2d2d2d]">Log in</h1>
                        <p className="text-[#17183566] font-medium text-xl my-5">Enter your email and password</p>
                        <form className="flex flex-col gap-6">
                            <input type="email" placeholder="Email" className="border-[1px]  py-4 px-4 rounded-md border-black" />
                            <input type="password" placeholder="Password" className="border-[1px]  py-4 px-4 rounded-md border-black" />
                            <button className="bg-[#f45400] py-3 rounded-md signupBtn text-base font-medium text-white">SEND</button>
                        </form>
                    </div>
                <div className='py-4 w-full flex justify-center' >
                    <div className='w-fit border-t-2 pt-5'>
                    <button className='text-white bg-gray-700 mx-auto px-6 py-3 rounded-md flex gap-3 '><FcGoogle className='text-2xl'/> Login in with google</button></div>
                </div>
                </section> */}
                <section className='py-4 w-full flex justify-center' >
                    <div className='w-fit border-t-2 pt-5'>
                        <button onClick={GoogleLogin} className='text-white bg-gray-700 mx-auto px-6 py-3 rounded-md flex gap-3 '><FcGoogle className='text-2xl' /> Login in with google</button></div>
                </section>
            </main>
        </>
    )
}

export default page