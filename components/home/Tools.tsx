"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

import BlurImage from '@/public/home/blur.webp'
import RemoveObject from '@/public/home/remove_object.webp'
import RemoveBG from '@/public/home/remove_bg.webp'
import FaceSwap from '@/public/home/faceswap.webp'
import MeteorSVG from '@/public/meteor.svg'

export default function Tools() {
    
    const [isClient, setIsClient] = useState(false);
    const [hover, setHover] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleMouseEnter = () => {
        setHover(true);
    };
    
    const handleMouseLeave = () => {
        setHover(false);
    };

    return (
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-10 mx-auto "
        >
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className="text-2xl font-bold md:text-4xl md:leading-tight light:text-black text-black">工具</h2>
            {/* <p className="mt-1 text-gray-600 light:text-gray-400">See how game-changing companies are making the most of every engagement with Preline.</p> */}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <a className="group hover:bg-gray-300  rounded-xl p-5 transition-all light:hover:bg-white/[.05]" href="/blur">
            <div className="aspect-w-16 aspect-h-10">
                <Image className="w-full object-cover rounded-xl h-64" src={BlurImage} alt="Image Description" />
            </div>
            <h3 className="mt-5 text-xl text-gray-800 light:text-gray-300 light:hover:text-white">
                模糊背景
            </h3>
            <p className="mt-3 inline-flex items-center gap-x-1 text-sm  text-gray-900 light:text-gray-200">
                模糊图片中人物的背景
                <svg className="flex-shrink-0 w-4 h-4 transition ease-in-out group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </p>
            </a>

            <a className="group hover:bg-gray-300  rounded-xl p-5 transition-all light:hover:bg-white/[.05]" href="/erase">
            <div className="aspect-w-16 aspect-h-10">
                <Image className="w-full object-cover rounded-xl h-64" src={RemoveObject}  alt="Image Description" />
            </div>
            <h3 className="mt-5 text-xl text-gray-800 light:text-gray-300 light:hover:text-white">
                橡皮擦
            </h3>
            <p className="mt-3 inline-flex items-center gap-x-1 text-sm  text-gray-800 light:text-gray-200">
                消除任意物体、人物、水印、文字等
                <svg className="flex-shrink-0 w-4 h-4 transition ease-in-out group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </p>
            </a>

            <a className="group hover:bg-gray-300  rounded-xl p-5 transition-all light:hover:bg-white/[.05]" href="/removebg">
            <div className="aspect-w-16 aspect-h-10">
                <Image className="w-full object-cover rounded-xl h-64" src={RemoveBG} alt="Image Description" />
            </div>
            <h3 className="mt-5 text-xl text-gray-800 light:text-gray-300 light:hover:text-white">
                消除背景
            </h3>
            <p className="mt-3 inline-flex items-center gap-x-1 text-sm  text-gray-900 light:text-gray-200">
                消除图片中的人物背景
                <svg className="flex-shrink-0 w-4 h-4 transition ease-in-out group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </p>
            </a>

            
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
            {/* <a className="group hover:bg-gray-100 rounded-xl p-5 transition-all light:hover:bg-white/[.05]" href="/#">
            <div className="aspect-w-16 aspect-h-10">
                <Image className="w-full object-cover rounded-xl h-64" src="https://images.unsplash.com/photo-1657299171054-e679f630a776?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" width={200} height={100} alt="Image Description" />
            </div>
            <h3 className="mt-5 text-xl text-gray-800 light:text-gray-300 light:hover:text-white">
                高清修复（即将推出）
            </h3>
            <p className="mt-3 inline-flex items-center gap-x-1 text-sm  text-gray-800 light:text-gray-200">
                扩大、修复模糊图片
                <svg className="flex-shrink-0 w-4 h-4 transition ease-in-out group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </p>
            </a> */}
            <a className="group hover:bg-gray-300  rounded-xl p-5 transition-all light:hover:bg-white/[.05]" href="/faceswap">
            <div className="aspect-w-16 aspect-h-10">
                <Image className="w-full object-cover rounded-xl h-64" src={FaceSwap} width={200} height={100} alt="Image Description" />
            </div>
            <h3 className="mt-5 text-xl text-gray-800 light:text-gray-300 light:hover:text-white">
                一键换脸
            </h3>
            <p className="mt-3 inline-flex items-center gap-x-1 text-sm  text-gray-800 light:text-gray-200">
                一键交换任意两张图片的人脸
                <svg className="flex-shrink-0 w-4 h-4 transition ease-in-out group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </p>
            </a>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
            <a className="group relative block rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-600" href="#">
            <div className="flex-shrink-0 relative w-full rounded-xl overflow-hidden h-[350px] before:absolute before:inset-x-0 before:w-full before:h-full before:bg-gradient-to-t before:from-gray-900/[.7] before:z-[1]">
                <Image className="w-full object-cover cover h-full group-hover:scale-105 duration-300" src={FaceSwap} width={200} height={100} alt="Image Description" />
            </div>

            <div className="absolute bottom-0 inset-x-0 z-10">
                <div className="flex flex-col h-full p-4 sm:p-6">
                <h3 className="text-lg sm:text-3xl font-semibold text-white group-hover:text-white/[.8]">
                    一键换脸
                </h3>
                <p className="mt-2 text-white/[.8]">
                    一键交换任意两张图片的人脸
                </p>
                </div>
            </div>
            </a>

            <a className="group relative block rounded-xl light:focus:outline-none light:focus:ring-1 light:focus:ring-gray-600" href="#">
            <div className="flex-shrink-0 relative w-full rounded-xl overflow-hidden h-[350px] before:absolute before:inset-x-0 before:w-full before:h-full before:bg-gradient-to-t before:from-gray-900/[.7] before:z-[1]">
                <Image className="w-full object-cover h-full cover group-hover:scale-105 duration-300" src={BlurImage} alt="Image Description" />
            </div>

            <div className="absolute bottom-0 inset-x-0 z-10">
                <div className="flex flex-col h-full p-4 sm:p-6">
                <h3 className="text-lg sm:text-3xl font-semibold text-white group-hover:text-white/[.8]">
                    背景模糊
                </h3>
                <p className="mt-2 text-white/[.8]">
                    模糊图片中人物的背景
                </p>
                </div>
            </div>
            </a>

            <a className="group relative block rounded-xl light:focus:outline-none light:focus:ring-1 light:focus:ring-gray-600" href="#">
            <div className="flex-shrink-0 relative w-full rounded-xl overflow-hidden h-[350px] before:absolute before:inset-x-0 before:w-full before:h-full before:bg-gradient-to-t before:from-gray-900/[.7] before:z-[1]">
                <Image className="w-full object-cover h-full cover group-hover:scale-105 duration-300" src={RemoveObject}  alt="Image Description" />
            </div>


            <div className="absolute bottom-0 inset-x-0 z-10">
                <div className="flex flex-col h-full p-4 sm:p-6">
                <h3 className="text-lg sm:text-3xl font-semibold text-white group-hover:text-white/[.8]">
                    橡皮擦
                </h3>
                <p className="mt-2 text-white/[.8]">
                    消除任意物体、人物、水印、文字等
                </p>
                </div>
            </div>
            </a>
        </div>

        </div>
    )
}