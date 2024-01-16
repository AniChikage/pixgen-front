// components/Nav.js

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { userProfile, wxLoginUser } from '@/api/apis';

function Nav({ loggedIn, username }) {
  const logout = async (event) => {
    event.preventDefault();
    setUsername('');
    setLoggedIn("0");
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  }

  return (
    <div className=" bg-gray-100/[.6] backdrop-blur-lg fixed z-50 flex h-14 w-full justify-between items-center">
      {/* ... (略去其他部分) */}
      <div className='w-14 flex items-center justify-between'>
        {loggedIn === "1" && (
          <div className="dropdown dropdown-end items-center justify-end w-10">
            {/* ... (略去其他部分) */}
          </div>
        )}
        {loggedIn === "0" && (
          <div className="flex items-center justify-end w-14">
            <a className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 light:text-gray-400 light:hover:text-blue-500" href="/login">
              <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              登录
            </a>
          </div>
        )}
        {loggedIn === "-1" && (
          <div className="flex items-center justify-end w-14">
            <a className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 light:text-gray-400 light:hover:text-blue-500" href="/#">
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
    const url = context.req.url;
    const queryParams = new URLSearchParams(url);
    const code = queryParams.get('code');
  
    if (code) {
      const response = await wxLoginUser(code);
      const { status, msg, username, token } = response;
      localStorage.setItem("username", username);
      localStorage.setItem("token", token);
    }
  
    const storedUsername = localStorage.getItem('username');
  
    if (storedUsername === null) {
      const token = localStorage.getItem('token');
  
      if (token === null) {
        return {
          props: {
            loggedIn: "0",
            username: '',
          },
        };
      } else {
        try {
          const response = await userProfile(token);
          const { status, username } = response;
          localStorage.setItem('username', username);
  
          return {
            props: {
              loggedIn: "1",
              username,
            },
          };
        } catch (error) {
          console.log(error);
          return {
            props: {
              loggedIn: "0",
              username: '',
            },
          };
        }
      }
    } else {
      // 设置 loggedIn 和 username
      // 需要根据具体情况调用 setLoggedIn 和 setUsername
      return {
        props: {
          loggedIn: "1",
          username: storedUsername,
        },
      };
    }
  }
  

export default Nav;
