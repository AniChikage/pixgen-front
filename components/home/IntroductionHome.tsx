import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

export default function Introdcution() {
    return (
        <div className="relative overflow-hidden"
        >
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-2xl text-center mx-auto mt-10">
                <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl light:text-white"><span className="text-blue-600">几秒内</span>创造令人惊叹的视觉效果 </h1>
                {/* <p className="mt-3 text-lg text-gray-800 light:text-gray-400">AI + 快 + 智能</p> */}
            </div>

            <div className="mt-10 relative max-w-5xl mx-auto">
            <ReactCompareSlider className='w-full h-128 rounded-xl' changePositionOnHover={true}
                itemOne={<ReactCompareSliderImage src="http://pixgen.pro:8010/images/remove_object_diff_1.jpg" alt="Image one" />}
                itemTwo={<ReactCompareSliderImage src="http://pixgen.pro:8010/images/remove_object_diffd_1.jpg" alt="Image two" />}
                />
            </div>
        </div>
        </div>
    )
}