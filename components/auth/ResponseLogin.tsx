"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'

import { loginUser, wxLoginUser } from '@/api/apis';
import LoginBG from '@/public/login_bg.jpg';
import WXLogo from '@/public/wx.png';

export default function Login() {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [showHint, setShowHint] = useState(false);

    // useEffect(() => {
    //   const url = window.location.href;
    //   const queryParams = new URLSearchParams(window.location.search);
    //   const code = queryParams.get('code');
    //   const doWxLogin = async () => {
    //     if (code) {
    //       console.log("dddd" + code);
    //       const response = await wxLoginUser(code); 
    //       const { status, msg, username, token } = response;
    //       console.log(status);
    //       console.log(msg);
    //       console.log(token);
    //       console.log(username);
    //       localStorage.setItem("username", username);
    //       localStorage.setItem("token", token);
    //       router.push("/");
    //     }
    //   };
    //   doWxLogin();
    // }, []);

    const wxClick = async(event: { preventDefault: () => void; }) => {
        event.preventDefault();
        
        const wx_modal = document.getElementById('wx_modal') as HTMLDialogElement | null;
        if (wx_modal) {
          wx_modal.showModal();
        }

        // 创建 script 元素
        const script = document.createElement('script');
        script.src = 'https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js';
        script.async = true;
        script.onload = () => {
          console.log('wxLogin.js loaded');
          try {
              var obj = new WxLogin({
                self_redirect:false,
                id:"login_container", 
                appid: "wx1ac61b0c29d959ee", 
                scope: "snsapi_login", 
                redirect_uri: "http%3A%2F%2Fpixgen.pro",
                state: "",
                style: ""
              });
          } catch (e) {
            console.error(e);
          }
        }; 

        document.body.appendChild(script);

        // 在组件卸载时移除 script 元素，避免内存泄漏
        return () => {
          document.body.removeChild(script);
        };
    };

    const handleEmailChange = (event: { target: { value: any; }; }) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailRegex.test(newEmail));
    };

    const handlePasswordChange = (event: { target: { value: any; }; }) => {
        const password = event.target.value;
        setPassword(password);
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%-_*?&]{8,}$/;
        setIsValidPassword(passwordRegex.test(password));
      };

    const login = async(event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if ( email && password){
          try {
            const response = await loginUser(email, password); 
            const { status, msg, username, token } = response;
            console.log(status);
            console.log(msg);
            console.log(token);
            if (status === "1"){
                localStorage.setItem("username", username);
                localStorage.setItem("token", token);
                router.push("/");
            } else {
                setShowHint(true);
            }
          } catch (error) {
            console.log(error);
            setShowHint(true);
          };
        }
        else {
            console.log("email or password is empty");
        }
    }

    const goRegister = async(event: { preventDefault: () => void; }) => {
        event.preventDefault();
        router.push("/register");
    }

    return (
        <section className="border-red-500 bg-[url('https://preline.co/assets/svg/examples/squared-bg-element.svg')] min-h-screen flex items-center justify-center" >
            <div className="bg-gray-100 bg-opacity-50 w-128 p-5 flex rounded-2xl shadow-lg max-w-3xl ">
            <div className="md:w-full px-5">
                <h2 className="text-2xl font-bold text-[#002D74] text-center">登录PIXGEN</h2>
                <p className="text-sm mt-4 text-[#002D74]"></p>
                <form className="mt-6" action="#" method="POST">
                <div>
                    {/* <label className="block text-gray-700">邮箱</label> */}
                    <input type="email" name="email" id="email" value={email} onChange={handleEmailChange} placeholder="邮箱地址" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none text-slate-800" autoFocus required />
                </div>
        
                <div className="mt-4">
                    {
                        showHint && <label className="block text-red-600">密码错误</label>
                    }
                    {/* <label className="block text-gray-700">密码</label> */}
                    <input type="password" name="password" id="password" value={password} onChange={handlePasswordChange} placeholder="密码"  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                        focus:bg-white focus:outline-none text-slate-800"  required  />
                </div>

                <div className="text-right mt-2">
                    <a href="/#" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">忘记密码？</a>
                </div>

                <button type="submit" onClick={login} className="w-full block bg-blue-500 duration-200 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
                        px-4 py-3 mt-6">登录</button>
                </form>

                <div className="mt-2 grid grid-cols-3 items-center text-gray-500">
                <hr className="border-gray-500" />
                <p className="text-center text-sm">或</p>
                <hr className="border-gray-500" />
                </div>

                <div className="w-full rounded-xl mt-2 flex justify-center items-center">
                <button type="button" className="w-8 h-8 hover:scale-105 duration-200" data-hs-overlay="#hs-vertically-centered-modal"
                  onClick={wxClick}
                >
                  <Image src={WXLogo} alt="" width={100} height={100} />
                </button>
                </div>

                <div className="text-sm flex justify-between items-center mt-3">
                <p className="text-slate-800">还没有账号？</p>
                <button className="py-2 px-5 ml-3 bg-white border rounded-xl duration-200 hover:bg-blue-400 hover:text-white border-blue-400 text-slate-800 "
                  onClick={goRegister}
                >注册
                </button>
                </div>
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

            </div>
        </section>
    )
}