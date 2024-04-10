"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'

import { forgetPassword } from '@/api/apis';
import LoginBG from '@/public/login_bg.jpg';
import WXLogo from '@/public/wx.png';

export default function Forget() {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [showHint, setShowHint] = useState(false);
    const [iForgetPassword, setIForgetPassword] = useState(false);
    const [sendPassword, setSendPassword] = useState("0");
    const [sendMsg, setSendMsg] = useState("")

    const handleEmailChange = (event: { target: { value: any; }; }) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailRegex.test(newEmail));
    };

    const forget = async(event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if ( email ){
          try {
            const response = await forgetPassword(email); 
            const { status, msg } = response;
            console.log(status);
            console.log(msg);
            setSendPassword(status);
            setSendMsg(msg);
          } catch (error) {
            console.log(error);
            setShowHint(true);
          };
        }
        else {
            console.log("email or password is empty");
        }
    }

    return (
        // bg-[url('https://preline.co/assets/svg/examples/squared-bg-element.svg')]
        <section className="border-red-500  min-h-screen flex items-center justify-center" 
            style={{
              backgroundColor: "#884c80",
              backgroundImage: "linear-gradient(135deg, #884c80 0%, #9599E2 100%)"
            }}
        >
            <div className="bg-gray-100 bg-opacity-50 w-128 p-5 flex rounded-2xl shadow-lg max-w-3xl ">
            <div className="md:w-full px-5">
                <h2 className="text-2xl font-bold text-[#002D74] text-center">忘记密码</h2>
                <p className="text-sm mt-4 text-[#002D74]"></p>
                <form className="mt-6" action="#" method="POST">
                <div>
                    {/* <label className="block text-gray-700">邮箱</label> */}
                    <input type="email" name="email" id="email" value={email} onChange={handleEmailChange} placeholder="邮箱地址" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none text-slate-800" autoFocus required />
                </div>

                <button type="submit" onClick={forget} className="w-full block bg-blue-500 duration-200 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
                        px-4 py-3 mt-6">找回密码</button>
                </form>
            </div>

            <dialog id="wx_modal" className="modal">
              <div className="modal-box items-center justify-between bg-white">
                <form method="dialog"  className='flex justify-center items-center'>
                  <button className="btn border-none bg-transparent hover:bg-blue-400 hover:text-white" >账号密码登录</button>
                </form>
                <div id="login_container" className='flex justify-center items-center'>
                </div>
              </div>
            </dialog>

            {
              sendPassword == "1" && 
              <div className="toast toast-top toast-center mt-10">
                <div className="alert alert-success">
                  <span className="text-white">密码已发到您的邮箱，如果没有收到，请联系：pixgen@163.com</span>
                </div>
              </div>
            }

            {
              sendPassword == "-1" && 
              <div className="toast toast-top toast-center mt-10">
                <div className="alert alert-success">
                  <span className="text-white">{sendMsg}</span>
                </div>
              </div>
            }

            </div>
        </section>
    )
}