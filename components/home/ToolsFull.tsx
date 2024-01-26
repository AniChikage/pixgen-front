"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

import BlurImage from '@/public/home/blur.jpg'
import RemoveObject from '@/public/home/remove_object.webp'
// import RemoveBG from '@/public/home/remove_bg.webp'
import RemoveBG from '@/public/home/removebg.jpg'
// import FaceSwap from '@/public/home/faceswap.webp'
import FaceSwap from '@/public/home/faceswap.jpg'
import Upscaler from '@/public/home/upscaler.jpg'
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
        <div className=" px-4 py-10 sm:px-6 mx-auto "
            style={{
                backgroundColor: "#1F1F1F"
            }}
        >

        <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 lg:py-10 mx-auto ">

        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className="text-2xl font-bold md:text-4xl md:leading-tight light:text-black text-white/85">工具</h2>
            {/* <p className="mt-1 text-gray-600 light:text-gray-400">See how game-changing companies are making the most of every engagement with Preline.</p> */}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 ">
            <a className="group relative block rounded-xl h-[280px] focus:outline-none focus:ring-1 focus:ring-gray-600" href="/faceswap">
            <div className="flex-shrink-0 relative w-full rounded-xl overflow-hidden h-[280px] before:absolute before:inset-x-0 before:w-full before:h-full before:bg-gradient-to-t before:from-gray-900/[.7] before:z-[1]">
                <Image className="w-full object-cover cover h-full group-hover:scale-105 duration-300" src={FaceSwap} alt="Image Description" />
            </div>

            <div className="absolute bottom-0 inset-x-0 z-10">
                <div className="flex flex-col h-full p-4 sm:p-6">
                <h3 className="text-lg sm:text-3xl font-semibold text-white group-hover:text-white/[.8]">
                    一键换脸
                </h3>
                <p className="mt-2 text-white/[.8] ">
                    一键交换任意两张图片的人脸
                </p>
                </div>
            </div>
            </a>

            <a className="group relative block rounded-xl h-[280px] light:focus:outline-none light:focus:ring-1 light:focus:ring-gray-600" href="/blur">
            <div className="flex-shrink-0 relative w-full rounded-xl overflow-hidden h-[280px] before:absolute before:inset-x-0 before:w-full before:h-full before:bg-gradient-to-t before:from-gray-900/[.7] before:z-[1]">
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

            <a className="group relative block rounded-xl h-[280px] light:focus:outline-none light:focus:ring-1 light:focus:ring-gray-600" href="/erase">
            <div className="flex-shrink-0 relative w-full rounded-xl overflow-hidden h-[280px] before:absolute before:inset-x-0 before:w-full before:h-full before:bg-gradient-to-t before:from-gray-900/[.7] before:z-[1]">
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

        <div className="grid lg:grid-cols-3 gap-6 mt-10 ">
            <a className="group relative block rounded-xl h-[280px] focus:outline-none focus:ring-1 focus:ring-gray-600" href="/removebg">
            <div className="flex-shrink-0 relative w-full rounded-xl overflow-hidden h-[280px] before:absolute before:inset-x-0 before:w-full before:h-full before:bg-gradient-to-t before:from-gray-900/[.7] before:z-[1]">
                <Image className="w-full object-cover cover h-full group-hover:scale-105 duration-300" src={RemoveBG} alt="Image Description" />
            </div>

            <div className="absolute bottom-0 inset-x-0 z-10">
                <div className="flex flex-col h-full p-4 sm:p-6">
                <h3 className="text-lg sm:text-3xl font-semibold text-white group-hover:text-white/[.8]">
                    消除背景
                </h3>
                <p className="mt-2 text-white/[.8]">
                    消除图片中的人物背景
                </p>
                </div>
            </div>
            </a>

            <a className="group relative block rounded-xl h-[280px] focus:outline-none focus:ring-1 focus:ring-gray-600" href="/upscaler">
            <div className="flex-shrink-0 relative w-full rounded-xl overflow-hidden h-[280px] before:absolute before:inset-x-0 before:w-full before:h-full before:bg-gradient-to-t before:from-gray-900/[.7] before:z-[1]">
                <Image className="w-full object-cover cover h-full group-hover:scale-105 duration-300" src={Upscaler} alt="Image Description" />
            </div>

            <div className="absolute bottom-0 inset-x-0 z-10">
                <div className="flex flex-col h-full p-4 sm:p-6">
                <h3 className="text-lg sm:text-3xl font-semibold text-white group-hover:text-white/[.8]">
                    高清修复
                </h3>
                <p className="mt-2 text-white/[.8]">
                    高清修复图片，包括背景和人脸
                </p>
                </div>
            </div>
            </a>

        </div>

        </div>

        </div>
    )
}