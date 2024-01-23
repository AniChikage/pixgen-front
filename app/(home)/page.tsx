// import Head from 'next/head'

import Introdcution from "@/components/home/IntroductionHome";
import Price from "@/components/home/Price";
import Tools from "@/components/home/ToolsFull";
import FAQ from '@/components/home/FAQ';
import Features from '@/components/home/Features';
import Goods from '@/components/home/Goods'

function Home() {
    return (
        <div>
            <Introdcution />
            <Tools />
            {/* <Features /> */}
            {/* <Price /> */}
            <Goods />
            <FAQ />
        </div>
    )
}

export default Home;