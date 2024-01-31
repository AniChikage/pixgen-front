import Image from "next/image"
import { use, useEffect, useState } from "react";
import { userProfile, checkPro, listOrders } from "@/api/apis"

import DefaultIcon from "@/public/default.jpg"

export default function Profile () {

    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(true);
    const [effective, setEffective] = useState("-1");
    const [username, setUsername] = useState("");
    const [effectiveTimestamp, setEffectiveTimestamp] = useState("-");
    const [effectiveCounts, setEffectiveCounts] = useState("-");
    const [orders, setOrders] = useState([]);

    useEffect(() => {
      const loadProfile = async() => {
        const token = localStorage.getItem("token");
        if (token) {
            try{
                const response = await userProfile(token);
                const { status, username, effective_timestamp, effective_counts } = response;
                if (status == "1") {
                    setUsername(username);
                    setEffectiveTimestamp(effective_timestamp);
                    setEffectiveCounts(effective_counts)
                }
            }
            catch (error) {
                console.log(error);
            };
        }
      };
      loadProfile();
    }, []);

    useEffect(() => {
        const loadPro = async() => {
          const token = localStorage.getItem("token");
          if (token) {
              try{
                  const response = await checkPro(token);
                  const { status, msg, effective } = response;
                  console.log(effective);
                  console.log(msg);
                  if (status === "1" || status === "-1") {
                      setEffective(effective);
                  }
              }
              catch (error) {
                  console.log(error);
              };
          }
        };
        loadPro();
    }, []);

    const getOrders = async() => {
        const token = localStorage.getItem("token");
        console.info(token);
        if (token) {
            try{
                const response = await listOrders(token, page);
                const { status, msg, orders, has_next } = response;
                if (status == "1") {
                    setOrders(orders);
                }
                console.log(has_next);
                if (has_next === "yes") {
                    setHasNext(true);
                } else {
                    setHasNext(false);
                }
            }
            catch (error) {
                console.log(error);
            };
        }
    };

    useEffect(() => {
        getOrders();
    }, [page]);

    const getPrevPage = async() => {
       if (page === 1) return;
       setPage(page - 1);
    };

    const getNextPage = async() => {
        if (!hasNext) return;
        setPage(page + 1);
    };

    return (
        <div className=" py-20 bg-cover bg-[url('https://pixgen.pro/home/wave2.svg')]"
            // style={{
            //     // backgroundColor: "#1F1F1F"
            //     backgroundColor: "#21D4FD",
            //     backgroundImage: "linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)"
            // }}
        >
            <div className="container mx-auto py-8 max-w-[83rem]">
                <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                    <div className="col-span-4 sm:col-span-3">
                        <div className=" shadow rounded-lg p-6"
                            style={{
                                backgroundColor: "rgba(136, 76, 128, 0.7)", // 使用 rgba() 添加透明度
                                backgroundImage: "linear-gradient(135deg, rgba(136, 76, 128, 0.7) 0%, rgba(149, 153, 226, 0.7) 100%)",
                            }}
                        >
                            <div className="flex flex-col items-center">
                                <Image src={DefaultIcon} className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" alt="" />
                                <h1 className="text-xl font-bold text-white">{username}</h1>
                                {
                                    effective === "0" && 
                                    <div className="badge badge-accent badge-outline mt-3 h-7 flex items-center">
                                        <p className="text-sm text-white">免费计划</p>
                                    </div>
                                }
                                {
                                    effective === "1" && 
                                    <div className="badge badge-accent badge-outline mt-3 h-7">
                                        <svg className="icon" fill="#00D7C0" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4277" width="15" height="15"><path d="M512 470.552381m-170.666667 0a170.666667 170.666667 0 1 0 341.333334 0 170.666667 170.666667 0 1 0-341.333334 0Z" fill="#00D7C0" p-id="4278"></path><path d="M950.369524 403.504762H73.630476c-4.388571 0-8.533333-2.438095-10.727619-6.339048s-1.950476-8.533333 0.24381-12.434285L217.478095 134.095238c2.194286-3.657143 6.095238-5.851429 10.48381-5.851428h568.32c4.144762 0 8.045714 2.194286 10.483809 5.851428l154.087619 250.88c2.438095 3.657143 2.438095 8.533333 0.24381 12.434286s-6.339048 6.095238-10.727619 6.095238z m-855.04-24.380952h833.097143l-139.215238-226.499048H234.544762l-139.215238 226.499048z" p-id="4279" fill="#00D7C0"></path><path d="M512 940.129524c-3.657143 0-7.070476-1.706667-9.508571-4.388572L64.121905 399.11619a11.946667 11.946667 0 0 1-1.462857-12.921904 12.434286 12.434286 0 0 1 10.971428-7.070476h876.739048c4.632381 0 9.020952 2.681905 10.971428 7.070476 1.950476 4.144762 1.462857 9.264762-1.462857 12.921904L521.508571 935.740952c-2.438095 2.681905-5.851429 4.388571-9.508571 4.388572zM99.230476 403.504762L512 908.678095l412.769524-505.173333H99.230476z" p-id="4280" fill="#00D7C0"></path><path d="M512 940.129524c-5.36381 0-10.24-3.657143-11.702857-9.020953l-147.748572-536.624761c-1.706667-6.582857 1.950476-13.165714 8.533334-15.116191 6.339048-1.706667 13.165714 1.950476 14.872381 8.533333l147.748571 536.624762a12.361143 12.361143 0 0 1-11.702857 15.60381z" p-id="4281" fill="#00D7C0"></path><path d="M512 940.129524a12.239238 12.239238 0 0 1-11.702857-15.60381l147.748571-536.624762c1.706667-6.582857 8.533333-10.24 14.872381-8.533333 6.582857 1.706667 10.24 8.533333 8.533334 15.116191l-147.748572 536.624761c-1.462857 5.36381-6.339048 9.020952-11.702857 9.020953zM364.251429 403.504762a11.946667 11.946667 0 0 1-10.727619-6.339048L216.990476 146.285714a12.288 12.288 0 0 1 4.876191-16.579047c5.851429-3.169524 13.409524-0.975238 16.579047 4.87619l136.533334 250.88c3.169524 5.851429 0.975238 13.409524-4.876191 16.579048-1.950476 0.975238-3.900952 1.462857-5.851428 1.462857z" p-id="4282" fill="#00D7C0"></path><path d="M364.251429 403.504762c-2.194286 0-4.144762-0.487619-6.095239-1.706667a12.092952 12.092952 0 0 1-4.388571-16.579047l147.748571-251.12381c3.413333-5.851429 10.971429-7.801905 16.579048-4.388571 5.851429 3.413333 7.801905 10.971429 4.388572 16.579047l-147.748572 250.88c-2.194286 4.388571-6.339048 6.339048-10.483809 6.339048z" p-id="4283" fill="#00D7C0"></path><path d="M659.748571 403.504762c-4.144762 0-8.289524-2.194286-10.483809-6.095238L501.51619 146.529524a12.01981 12.01981 0 0 1 4.388572-16.579048c5.851429-3.413333 13.165714-1.462857 16.579048 4.388572l147.748571 250.88c3.413333 5.851429 1.462857 13.165714-4.388571 16.579047-1.950476 1.219048-3.900952 1.706667-6.095239 1.706667z" p-id="4284" fill="#00D7C0"></path><path d="M659.748571 403.504762c-1.950476 0-3.900952-0.487619-5.851428-1.462857a12.336762 12.336762 0 0 1-4.876191-16.579048l136.533334-250.88c3.169524-5.851429 10.727619-8.045714 16.579047-4.87619 5.851429 3.169524 8.045714 10.727619 4.876191 16.579047l-136.533334 250.88a11.946667 11.946667 0 0 1-10.727619 6.339048z" p-id="4285" ></path></svg>
                                        <p className="text-sm ml-2">PRO</p>
                                    </div>
                                }
                            </div>
                            <hr className="my-6 border-t border-gray-300" />
                            <div className="flex flex-col">
                                <span className="text-white uppercase font-bold tracking-wider mb-2">付费计划</span>
                                <ul>
                                    <li className="mb-2 text-white">到期时间：{effectiveTimestamp}</li>
                                    <li className="mb-2 text-white">剩余次数：{effectiveCounts}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 sm:col-span-9">
                        <div className="max-w-[85rem] px-4 sm:px-6 mx-auto ">
                        <div className="flex flex-col">
                            <div className="-m-1.5 overflow-x-auto">
                            <div className="p-1.5 min-w-full inline-block align-middle">
                                <div className="rounded-xl shadow-sm overflow-hidden light:bg-slate-900"
                                    style={{
                                        backgroundColor: "rgba(136, 76, 128, 0.7)", // 使用 rgba() 添加透明度
                                        backgroundImage: "linear-gradient(135deg, rgba(136, 76, 128, 0.7) 0%, rgba(149, 153, 226, 0.7) 100%)",
                                    }}
                                >
                                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b divide-gray-900 ">
                                    <div>
                                    <p className="text-base font-semibold text-white ">
                                        付费记录
                                    </p>
                                    </div>
                                </div>

                                <table className="min-w-full divide-y ">
                                    <thead className="divide-y divide-purple-900 light:bg-gray-800 light:divide-gray-700">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-start border-s divide-gray-900 light:border-gray-700">
                                        <span className="text-xs font-semibold uppercase tracking-wide text-white light:text-gray-200">
                                            订单号
                                        </span>
                                        </th>

                                        <th scope="col" className="px-6 py-3 text-start">
                                        <span className="text-xs font-semibold uppercase tracking-wide text-white light:text-gray-200">
                                            金额
                                        </span>
                                        </th>

                                        <th scope="col" className="px-6 py-3 text-start">
                                        <span className="text-xs font-semibold uppercase tracking-wide text-white light:text-gray-200">
                                            订阅计划
                                        </span>
                                        </th>

                                        <th scope="col" className="px-6 py-3 text-start">
                                        <span className="text-xs font-semibold uppercase tracking-wide text-white light:text-gray-200">
                                            支付时间
                                        </span>
                                        </th>
                                    </tr>
                                    </thead>

                                    <tbody className=" light:divide-gray-700">

                                    {orders.map(order => (
                                        <tr key={order.out_trade_no}>
                                            <td className="h-px w-auto whitespace-nowrap">
                                            <div className="px-6 py-2 flex items-center gap-x-3">
                                                <a className="flex items-center gap-x-2">
                                                <span className="text-sm text-white ">{order.out_trade_no}</span>
                                                </a>
                                            </div>
                                            </td>
                                            <td className="h-px w-auto whitespace-nowrap">
                                            <div className="px-6 py-2">
                                                <span className="text-sm text-white light:text-gray-200">{order.total_amount}</span>
                                            </div>
                                            </td>
                                            <td className="h-px w-auto whitespace-nowrap">
                                            <div className="px-6 py-2">
                                                <span className="text-sm text-white light:text-gray-200">{order.subscription}</span>
                                            </div>
                                            </td>
                                            <td className="h-px w-auto whitespace-nowrap">
                                            <div className="px-6 py-2">
                                                <span className="text-sm text-white light:text-gray-200">{order.gmt_payment}</span>
                                            </div>
                                            </td>
                                        </tr>
                                    ))}

                                    </tbody>
                                </table>

                                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t divide-gray-900 light:border-gray-700">
                                    <div>
                                    <p className="text-sm text-white light:text-gray-400">
                                        <span className="font-semibold text-white light:text-gray-200"></span>
                                    </p>
                                    </div>

                                    <div>
                                    <div className="inline-flex gap-x-2">
                                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border divide-gray-900 bg-white text-black shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none light:bg-slate-900 light:border-gray-700 light:text-white light:hover:bg-gray-800 light:focus:outline-none light:focus:ring-1 light:focus:ring-gray-600"
                                          onClick={getPrevPage}
                                          disabled={page === 1}
                                        >
                                        <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                                        上一页
                                        </button>

                                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border divide-gray-900 bg-white text-black shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none light:bg-slate-900 light:border-gray-700 light:text-white light:hover:bg-gray-800 light:focus:outline-none light:focus:ring-1 light:focus:ring-gray-600"
                                          onClick={getNextPage}
                                          disabled={!hasNext}
                                        >
                                        下一页
                                        <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                                        </button>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
