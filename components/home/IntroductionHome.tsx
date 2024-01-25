"use client"
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

import { getHint } from "@/api/apis"
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

export default function Introdcution() {

    const [showHint, setShowHint] = useState(false);
    const [showVideo, setShowVideo] = useState(true);
    const [hintMsg, setHintMsg] = useState("");
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const getHintFromServer = async() => {
            const respone = await getHint();
            const { show_hint, hint } = respone;
            console.log(respone)
            if (show_hint === "1") {
                setShowHint(true);
                setHintMsg(hint);
            } else {
                setShowHint(false);
            }
        };
        getHintFromServer();
    }, []);

    return (
        // bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')]
        <div className="relative overflow-hidden  bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')]">
            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">

            {
                showHint && 
                <div className="bg-gradient-to-r from-blue-700 via-purple-700 to-blue-700">
                    <div className="max-w-[85rem] px-4 py-4 sm:px-6 lg:px-8 mx-auto">
                        <div className="text-center md:text-start">
                            <p className="mt-1 text-white font-medium">{hintMsg}</p>
                        </div>
                    </div>
                </div>
            }

            <div className="max-w-2xl text-center mx-auto mt-10">
            <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl light:text-white"><span className="text-blue-600">几秒内</span>创造令人惊叹的视觉效果 </h1>
            {/* <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl light:text-white">(维护中，请稍后重试) </h1> */}
                {/* <p className="mt-3 text-lg text-gray-800 light:text-gray-400">AI + 快 + 智能</p> */}
            </div>

            <div className="mt-10 relative max-w-4xl mx-auto">
                {/* <ReactCompareSlider className='w-full h-128 rounded-xl' changePositionOnHover={true}
                    itemOne={<ReactCompareSliderImage src="https://pixgen.pro/home/erase_object_diff_2.webp" alt="Image one" />}
                    itemTwo={<ReactCompareSliderImage src="https://pixgen.pro/home/erase_object_diffd_2.webp" alt="Image two" />}
                    /> */}
                {
                    isClient && 
                    <ReactPlayer 
                        className="rounded-xl overflow-hidden"
                        url="https://pixgen.pro/home/pixgen.mp4"
                        playing={true} 
                        loop={true} 
                        controls={false}
                        width='100%'
                        height='100%'
                    />
                }
            </div>
            
            </div>

        </div>
    )
}