
export default function Goods() {
    return (
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto"
            style={{
                backgroundColor: "#1F1F1F"
            }}
        >
        <div className="max-w-[85rem] px-4 sm:px-6 py-5 mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-12">
            <div>
            <div className="relative flex justify-center items-center w-12 h-12  rounded-xl bg-gradient-to-br from-blue-600 via-transparent to-violet-600">
                <svg className="flex-shrink-0 w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="10" height="14" x="3" y="8" rx="2"/><path d="M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4"/><path d="M8 18h.01"/></svg>
            </div>
            <div className="mt-5">
                <h3 className="text-lg font-semibold text-white">个性化</h3>
                <p className="mt-1 text-white light:text-gray-400 ">基于AI模型，一键处理图片</p>
            </div>
            </div>

            <div>
            <div className="relative flex justify-center items-center w-12 h-12  rounded-xl bg-gradient-to-br from-blue-600 via-transparent to-violet-600">
                <svg className="flex-shrink-0 w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>
            </div>
            <div className="mt-5">
                <h3 className="text-lg font-semibold text-white">便宜</h3>
                <p className="mt-1 text-white light:text-gray-400">提供便宜的付费计划</p>
            </div>
            </div>

            <div>
            <div className="relative flex justify-center items-center w-12 h-12  rounded-xl bg-gradient-to-br from-blue-600 via-transparent to-violet-600">
                <svg className="flex-shrink-0 w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            </div>
            <div className="mt-5">
                <h3 className="text-lg font-semibold text-white">效果好</h3>
                <p className="mt-1 text-white light:text-gray-400">集成当前最优的模型</p>
            </div>
            </div>

            <div>
            <div className="relative flex justify-center items-center w-12 h-12  rounded-xl bg-gradient-to-br from-blue-600 via-transparent to-violet-600">
                <svg className="flex-shrink-0 w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>
            </div>
            <div className="mt-5">
                <h3 className="text-lg font-semibold text-white">24/7 支持</h3>
                <p className="mt-1 text-white light:text-gray-400">7乘24小时联系我们，提供技术支持</p>
            </div>
            </div>
        </div>
        </div>
        </div>
    )
}