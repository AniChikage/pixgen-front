"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { createOrder } from "@/api/apis"

function Price() {

    const router = useRouter();
    const [price, setPrice] = useState("0");
    const [subscription, setSubscription] = useState("");

    const doCreateOrderAlipay = async() => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/login");
            }
            else {
                console.log('create order');
                const response = await createOrder(token, price);
                const { status, msg, url } = response;
                if (status === "1") {
                    window.open(url, '_blank');
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const payTrial = async() => {
        const pay_modal = document.getElementById('pay_modal')
        if (!pay_modal) return;
        setPrice("1.9");
        setSubscription("试用");
        pay_modal.showModal();
    };

    const payFlexible = async() => {
        const pay_modal = document.getElementById('pay_modal')
        if (!pay_modal) return;
        setPrice("4.9");
        setSubscription("灵活");
        pay_modal.showModal();
    };

    const payPlus = async() => {
        const pay_modal = document.getElementById('pay_modal')
        if (!pay_modal) return;
        setPrice("9.9");
        setSubscription("月付");
        pay_modal.showModal();
    };


    return (
        // bg-[url('http://127.0.0.1:3000/wave.svg')] bg-cover
        <div className="max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto ">
            
            <dialog id="pay_modal" className="modal">
            <div className="modal-box bg-white w-96">
                <div className="modal-action items-center justify-center flex pb-8">
                    <h3 className="font-bold text-lg text-black">{subscription}</h3>
                </div>
                
                <div className="flex justify-center items-center">
                    <button type="button" className="hover:scale-105 duration-100 px-3"
                      onClick={doCreateOrderAlipay}
                    >
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8489" width="69" height="69"><path d="M1024.0512 701.0304V196.864A196.9664 196.9664 0 0 0 827.136 0H196.864A196.9664 196.9664 0 0 0 0 196.864v630.272A196.9152 196.9152 0 0 0 196.864 1024h630.272a197.12 197.12 0 0 0 193.8432-162.0992c-52.224-22.6304-278.528-120.32-396.4416-176.64-89.7024 108.6976-183.7056 173.9264-325.3248 173.9264s-236.1856-87.2448-224.8192-194.048c7.4752-70.0416 55.552-184.576 264.2944-164.9664 110.08 10.3424 160.4096 30.8736 250.1632 60.5184 23.1936-42.5984 42.496-89.4464 57.1392-139.264H248.064v-39.424h196.9152V311.1424H204.8V267.776h240.128V165.632s2.1504-15.9744 19.8144-15.9744h98.4576V267.776h256v43.4176h-256V381.952h208.8448a805.9904 805.9904 0 0 1-84.8384 212.6848c60.672 22.016 336.7936 106.3936 336.7936 106.3936zM283.5456 791.6032c-149.6576 0-173.312-94.464-165.376-133.9392 7.8336-39.3216 51.2-90.624 134.4-90.624 95.5904 0 181.248 24.4736 284.0576 74.5472-72.192 94.0032-160.9216 150.016-253.0816 150.016z" fill="#009FE8" p-id="8490"></path></svg>
                    </button>
                    <button type="button" className="hover:scale-105 duration-100 px-3"
                    >
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10372" width="75" height="75"><path d="M849.92 51.2H174.08c-67.8656 0-122.88 55.0144-122.88 122.88v675.84c0 67.8656 55.0144 122.88 122.88 122.88h675.84c67.8656 0 122.88-55.0144 122.88-122.88V174.08c0-67.8656-55.0144-122.88-122.88-122.88z m-337.92 701.76768a363.2896 363.2896 0 0 1-100.27008-14.03904 30.99136 30.99136 0 0 0-9.03168-1.35168c-5.89824 0-11.25376 1.80224-16.31232 4.73088l-67.25632 38.81984c-1.87392 1.08032-3.6864 1.89952-5.9136 1.89952a10.24 10.24 0 0 1-10.24512-10.24c0-2.52928 1.01376-5.05856 1.65888-7.48032l13.84448-51.64032c0.5888-2.16064 1.0752-4.2496 1.0752-6.51776a20.48512 20.48512 0 0 0-8.59648-16.6912C246.18496 643.53792 204.8 574.11072 204.8 496.96256c0-141.38368 137.53344-256 307.2-256 103.68 0 195.30752 42.8544 250.9312 108.41088l-310.35904 138.1376a30.4896 30.4896 0 0 1-27.28448-3.1232l-65.99168-46.98112a10.24 10.24 0 0 0-16.36864 8.21248c0 1.46432 0.37376 2.9696 0.97792 4.31104l55.92576 122.71104 1.34144 2.94912a20.44928 20.44928 0 0 0 27.07968 8.2688l2.24256-1.30048 353.71008-204.21632C806.51264 413.81376 819.2 454.14912 819.2 496.96256c0 141.3888-137.53856 256.00512-307.2 256.00512z" fill="#24B340" p-id="10373"></path></svg>
                    </button>
                </div>
                <div className="modal-action items-center justify-center flex">
                <form method="dialog">
                    <button className="btn bg-white hover:bg-white border-none shadow-none hover:scale-105 duration-105">
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12184" width="30" height="30"><path d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#5090F1" p-id="12185"></path><path d="M512 455.431l169.706-169.705a8 8 0 0 1 11.313 0l45.255 45.255a8 8 0 0 1 0 11.313L568.57 512l169.705 169.706a8 8 0 0 1 0 11.313l-45.255 45.255a8 8 0 0 1-11.313 0L512 568.57 342.294 738.274a8 8 0 0 1-11.313 0l-45.255-45.255a8 8 0 0 1 0-11.313L455.43 512 285.726 342.294a8 8 0 0 1 0-11.313l45.255-45.255a8 8 0 0 1 11.313 0L512 455.43z" fill="#FFFFFF" p-id="12186"></path></svg>
                    </button>
                </form>
                </div>
            </div>
            </dialog>

            <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14 mt-10">
                <h2 className="text-2xl font-bold md:text-4xl md:leading-tight text-black light:text-black">定价</h2>
                <p className="mt-1 text-gray-600 light:text-gray-400">选择适合您的付费计划</p>
            </div>

            {/* <div className="flex justify-center items-center">
                <label className="min-w-[3.5rem] text-sm text-gray-500 me-3 light:text-gray-400">Monthly</label>

                <input type="checkbox" id="hs-basic-with-description" className="relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 light:bg-gray-800 light:border-gray-700 light:checked:bg-blue-500 light:checked:border-blue-500 light:focus:ring-offset-gray-600
                before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-white before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 light:before:bg-gray-400 light:checked:before:bg-white" checked />
                <label className="relative min-w-[3.5rem] text-sm text-gray-500 ms-3 light:text-gray-400">
                Annual
                <span className="absolute -top-10 start-auto -end-28">
                    <span className="flex items-center">
                    <svg className="w-14 h-8 -me-6" width="45" height="25" viewBox="0 0 45 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M43.2951 3.47877C43.8357 3.59191 44.3656 3.24541 44.4788 2.70484C44.5919 2.16427 44.2454 1.63433 43.7049 1.52119L43.2951 3.47877ZM4.63031 24.4936C4.90293 24.9739 5.51329 25.1423 5.99361 24.8697L13.8208 20.4272C14.3011 20.1546 14.4695 19.5443 14.1969 19.0639C13.9242 18.5836 13.3139 18.4152 12.8336 18.6879L5.87608 22.6367L1.92723 15.6792C1.65462 15.1989 1.04426 15.0305 0.563943 15.3031C0.0836291 15.5757 -0.0847477 16.1861 0.187863 16.6664L4.63031 24.4936ZM43.7049 1.52119C32.7389 -0.77401 23.9595 0.99522 17.3905 5.28788C10.8356 9.57127 6.58742 16.2977 4.53601 23.7341L6.46399 24.2659C8.41258 17.2023 12.4144 10.9287 18.4845 6.96211C24.5405 3.00476 32.7611 1.27399 43.2951 3.47877L43.7049 1.52119Z" fill="currentColor" className="fill-gray-300 light:fill-gray-700"/>
                    </svg>
                    <span className="mt-3 inline-block whitespace-nowrap text-[11px] leading-5 font-semibold tracking-wide uppercase bg-blue-600 text-white rounded-full py-1 px-2.5">Save up to 10%</span>
                    </span>
                </span>
                </label>
            </div> */}

            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:items-center">
                <div className="flex flex-col border border-gray-200 text-center rounded-xl p-8 light:border-gray-700">
                <h4 className="font-medium text-lg text-gray-800 light:text-gray-200">免费</h4>
                <span className="mt-7 font-bold text-5xl text-gray-800 light:text-gray-200">免费</span>
                <p className="mt-2 text-sm text-gray-500">永久免费</p>

                <ul className="mt-7 space-y-2.5 text-sm">
                    <li className="flex space-x-2">
                    <svg className="flex-shrink-0 mt-0.5 h-4 w-4 text-blue-600 light:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 light:text-gray-400">
                        永久
                    </span>
                    </li>
                    <li className="flex space-x-2">
                    <svg className="flex-shrink-0 mt-0.5 h-4 w-4 text-blue-600 light:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 light:text-gray-400">
                        低分辨率
                    </span>
                    </li>

                    <li className="flex space-x-2">
                    <svg className="flex-shrink-0 mt-0.5 h-4 w-4 text-blue-600 light:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 light:text-gray-400">
                        速度慢
                    </span>
                    </li>

                    <li className="flex space-x-2">
                    <svg className="flex-shrink-0 mt-0.5 h-4 w-4 text-blue-600 light:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 light:text-gray-400">
                        无支持
                    </span>
                    </li>
                </ul>

                <a className="mt-5 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-100 text-blue-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none light:hover:bg-blue-900 light:text-blue-400 light:focus:outline-none light:focus:ring-1 light:focus:ring-gray-600">
                    无 需 订 阅
                </a>
                </div>


                <div className="flex flex-col border border-gray-200 text-center rounded-xl p-8 light:border-gray-700">
                <h4 className="font-medium text-lg text-gray-800 light:text-gray-200">试用</h4>
                <span className="mt-5 font-bold text-5xl text-gray-800 light:text-gray-200">
                    {/* <span className="font-bold text-3xl -me-2">¥</span> */}
                    1.9¥
                </span>
                <p className="mt-2 text-sm text-gray-500">短期需求，试用产品</p>

                <ul className="mt-7 space-y-2.5 text-sm">
                    <li className="flex space-x-2">
                    <svg className="flex-shrink-0 mt-0.5 h-4 w-4 text-blue-600 light:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 light:text-gray-400">
                        1天
                    </span>
                    </li>
                    <li className="flex space-x-2">
                    <svg className="flex-shrink-0 mt-0.5 h-4 w-4 text-blue-600 light:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 light:text-gray-400">
                        原始分辨率
                    </span>
                    </li>

                    <li className="flex space-x-2">
                    <svg className="flex-shrink-0 mt-0.5 h-4 w-4 text-blue-600 light:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 light:text-gray-400">
                        速度快
                    </span>
                    </li>

                    <li className="flex space-x-2">
                    <svg className="flex-shrink-0 mt-0.5 h-4 w-4 text-blue-600 light:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 light:text-gray-400">
                        有支持
                    </span>
                    </li>
                </ul>

                <button className="mt-5 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none light:hover:bg-blue-900 light:text-blue-400 light:focus:outline-none light:focus:ring-1 light:focus:ring-gray-600"
                  onClick={payTrial}
                >
                    订 阅
                </button>
                </div>
                

                
                <div className="flex flex-col border-2 border-blue-600 text-center shadow-xl rounded-xl p-8 light:border-blue-700">
                <p className="mb-3"><span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs uppercase font-semibold bg-blue-100 text-blue-800 light:bg-blue-600 light:text-white">最受欢迎</span></p>
                <h4 className="font-medium text-lg text-gray-800 light:text-gray-200">灵活</h4>
                <span className="mt-5 font-bold text-5xl text-gray-800 light:text-gray-200">
                    {/* <span className="font-bold text-2xl -me-2">$</span> */}
                    4.9¥
                </span>
                <p className="mt-2 text-sm text-gray-500">按需使用</p>

                <ul className="mt-7 space-y-2.5 text-sm">
                    <li className="flex space-x-2">
                    <svg className="flex-shrink-0 mt-0.5 h-4 w-4 text-blue-600 light:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 light:text-gray-400">
                        100次
                    </span>
                    </li>
                    <li className="flex space-x-2">
                    <svg className="flex-shrink-0 mt-0.5 h-4 w-4 text-blue-600 light:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 light:text-gray-400">
                        原始分辨率
                    </span>
                    </li>

                    <li className="flex space-x-2">
                    <svg className="flex-shrink-0 mt-0.5 h-4 w-4 text-blue-600 light:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 light:text-gray-400">
                        速度快
                    </span>
                    </li>

                    <li className="flex space-x-2">
                    <svg className="flex-shrink-0 mt-0.5 h-4 w-4 text-blue-600 light:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 light:text-gray-400">
                        有支持
                    </span>
                    </li>
                </ul>

                <button className="mt-5 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none light:focus:outline-none light:focus:ring-1 light:focus:ring-gray-600"
                  onClick={payFlexible}
                >
                    订 阅
                </button>
                </div>
                
                
                <div className="flex flex-col border border-gray-200 text-center rounded-xl p-8 light:border-gray-700">
                <h4 className="font-medium text-lg text-gray-800 light:text-gray-200">月付</h4>
                <span className="mt-5 font-bold text-5xl text-gray-800 light:text-gray-200">
                    {/* <span className="font-bold text-2xl -me-2">$</span> */}
                    9.9¥
                </span>
                <p className="mt-2 text-sm text-gray-500">月会员，长期使用</p>

                <ul className="mt-7 space-y-2.5 text-sm">
                    <li className="flex space-x-2">
                    <svg className="flex-shrink-0 mt-0.5 h-4 w-4 text-blue-600 light:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 light:text-gray-400">
                        30天
                    </span>
                    </li>
                    <li className="flex space-x-2">
                    <svg className="flex-shrink-0 mt-0.5 h-4 w-4 text-blue-600 light:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 light:text-gray-400">
                        原始分辨率
                    </span>
                    </li>

                    <li className="flex space-x-2">
                    <svg className="flex-shrink-0 mt-0.5 h-4 w-4 text-blue-600 light:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 light:text-gray-400">
                        速度快
                    </span>
                    </li>

                    <li className="flex space-x-2">
                    <svg className="flex-shrink-0 mt-0.5 h-4 w-4 text-blue-600 light:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-gray-800 light:text-gray-400">
                        有支持
                    </span>
                    </li>
                </ul>

                <button className="mt-5 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none light:hover:bg-blue-900 light:text-blue-400 light:focus:outline-none light:focus:ring-1 light:focus:ring-gray-600" 
                  onClick={payPlus}
                >
                    订 阅
                </button>
                </div>
                
            </div>

        </div>
    )
}

export default Price;