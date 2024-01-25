"use client"
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../public/logo.png'
import Avart from '../../public/avater.png'
import DefaultIcon from "@/public/default_small.jpg"

import { userProfile, wxLoginUser } from '@/api/apis';

function Nav () {

    const [loggedIn, setLoggedIn] = useState("-1");
    const [username, setUsername] = useState('');

    useEffect(() => {
        const url = window.location.href;
        const queryParams = new URLSearchParams(window.location.search);
        const code = queryParams.get('code');
        const doWxLogin = async () => {
            if (code) {
            console.log("dddd" + code);
            const response = await wxLoginUser(code); 
            const { status, msg, username, token } = response;
            console.log(status);
            console.log(msg);
            console.log(token);
            console.log(username);
            localStorage.setItem("username", username);
            localStorage.setItem("token", token);
            }
        };
        doWxLogin();


        const username = localStorage.getItem('username');
        if (username === null) {
            const token = localStorage.getItem('token');
            if (token === null){
                setLoggedIn("0");
                setUsername('');
            } else {
                const fetchData = async () => {
                    try {
                        const response = await userProfile(token); 
                        const { status, username } = response;
                        setUsername(username);
                        setLoggedIn("1");
                        localStorage.setItem('username', username);
                        console.log(status);
                        console.log(username);
                    } catch (error) {
                        console.log(error);
                    };
                };
                fetchData();
            }
        } else {
            setUsername(username);
            setLoggedIn("1");
        };
    }, [loggedIn, username]);

    const logout = async(event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setUsername('');
        setLoggedIn("0");
        localStorage.removeItem('username');
        localStorage.removeItem('token');
    }

    return (
        <div className=" bg-white/[.6] backdrop-blur-lg border fixed z-50 flex h-14 w-full justify-between items-center">
            <div className='relative flex justify-between w-full max-w-[80rem] mx-auto px-4'>
                <div className="flex items-center justify-between">
                    <a className="flex-none text-xl font-semibold text-black" href="/" aria-label="Brand">
                    <Image
                        className="mx-auto h-5 w-auto"
                        src={Logo}
                        alt="PIXGEN"
                    />
                    </a>
                </div>
                <div className="flex items-center justify-between ">
                    <ul className="menu menu-horizontal px-1">
                    <li>
                        <details>
                        <summary className='text-black text-base'>工具</summary>
                        <ul className="p-2 bg-slate-100">
                            <li>
                                <a className="group flex gap-x-5 hover:bg-gray-200 rounded-lg p-4 light:text-gray-200 light:hover:bg-gray-900 light:focus:outline-none light:focus:ring-1 light:focus:ring-gray-600" href="/blur">
                                <svg className="flex-shrink-0 w-5 h-5 mt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="green" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 11 2-2-2-2"/><path d="M11 13h4"/><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/></svg>
                                <div className="grow w-60">
                                    <p className="font-medium text-gray-800 light:text-gray-200">背景模糊</p>
                                    <p className="w-full text-sm text-gray-500 group-hover:text-gray-800 light:group-hover:text-gray-200">模糊图片中人物的背景</p>
                                </div>
                                </a>
                            </li>
                            <li>
                                <a className="group flex gap-x-5 hover:bg-gray-200 rounded-lg p-4 light:text-gray-200 light:hover:bg-gray-900 light:focus:outline-none light:focus:ring-1 light:focus:ring-gray-600" href="/erase">
                                <svg className="flex-shrink-0 w-5 h-5 mt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="green" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 11 2-2-2-2"/><path d="M11 13h4"/><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/></svg>
                                <div className="grow w-60">
                                    <p className="font-medium text-gray-800 light:text-gray-200">橡皮擦</p>
                                    <p className="w-full text-sm text-gray-500 group-hover:text-gray-800 light:group-hover:text-gray-200">快速消除图片中的物体、人物等等</p>
                                </div>
                                </a>
                            </li>
                            <li>
                                <a className="group flex gap-x-5 hover:bg-gray-200 rounded-lg p-4 light:text-gray-200 light:hover:bg-gray-900 light:focus:outline-none light:focus:ring-1 light:focus:ring-gray-600" href="/removebg">
                                <svg className="flex-shrink-0 w-5 h-5 mt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="green" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 11 2-2-2-2"/><path d="M11 13h4"/><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/></svg>
                                <div className="grow w-60">
                                    <p className="font-medium text-gray-800 light:text-gray-200">消除背景</p>
                                    <p className="w-full text-sm text-gray-500 group-hover:text-gray-800 light:group-hover:text-gray-200">一键消除背景</p>
                                </div>
                                </a>
                            </li>
                            <li>
                                <a className="group flex gap-x-5 hover:bg-gray-200 rounded-lg p-4 light:text-gray-200 light:hover:bg-gray-900 light:focus:outline-none light:focus:ring-1 light:focus:ring-gray-600" href="/faceswap">
                                <svg className="flex-shrink-0 w-5 h-5 mt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="green" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 11 2-2-2-2"/><path d="M11 13h4"/><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/></svg>
                                <div className="grow w-60">
                                    <p className="font-medium text-gray-800 light:text-gray-200">一键换脸</p>
                                    <p className="w-full text-sm text-gray-500 group-hover:text-gray-800 light:group-hover:text-gray-200">一键交换两张图片的人脸</p>
                                </div>
                                </a>
                            </li>
                            <li>
                                <a className="group flex gap-x-5 hover:bg-gray-200 rounded-lg p-4 light:text-gray-200 light:hover:bg-gray-900 light:focus:outline-none light:focus:ring-1 light:focus:ring-gray-600" href="/upscaler">
                                <svg className="flex-shrink-0 w-5 h-5 mt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="green" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 11 2-2-2-2"/><path d="M11 13h4"/><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/></svg>
                                <div className="grow w-60">
                                    <p className="font-medium text-gray-800 light:text-gray-200">
                                    高清修复
                                    </p>
                                    <p className="w-full text-sm text-gray-500 group-hover:text-gray-800 light:group-hover:text-gray-200">一键修复低分辨率图片</p>
                                </div>
                                </a>
                            </li>
                        </ul>
                        </details>
                    </li>
                    <li><a className='text-black text-base' href="/price">定价</a></li>
                    </ul>
                </div>
                <div className='w-14 flex items-center justify-between'>
                    {
                        loggedIn === "1" &&
                        <div className="dropdown dropdown-end items-center justify-end w-10">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                <Image alt="" src={DefaultIcon} />
                                </div>
                            </div>
                            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-lg w-40">
                                <li>
                                    <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 light:text-gray-400 light:hover:bg-gray-700 light:hover:text-gray-300 light:focus:bg-gray-700" href="/profile">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                    </svg>个人资料
                                    </a>
                                </li>
                                <li>
                                    <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 light:text-gray-400 light:hover:bg-gray-700 light:hover:text-gray-300 light:focus:bg-gray-700" href="/#" onClick={logout}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z" clipRule="evenodd" />
                                    </svg>退出
                                    </a>
                                </li>
                            </ul>
                        </div>
                    }
                    {
                        loggedIn === "0" &&
                        <div className="flex items-center justify-end w-14">
                            <a className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 light:text-gray-400 light:hover:text-blue-500" href="/login">
                                <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                登录
                            </a>
                        </div>
                    }
                    {
                        loggedIn === "-1" &&
                        <div className="flex items-center justify-end w-14">
                            <a className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 light:text-gray-400 light:hover:text-blue-500" href="/#">
                            </a>
                        </div>
                    }
                </div>  
            </div>
        </div>
    )
};

export default Nav;