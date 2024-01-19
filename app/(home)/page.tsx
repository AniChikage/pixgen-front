// import Head from 'next/head'

import Introdcution from "@/components/home/IntroductionHome";
import Price from "@/components/home/Price";
import Tools from "@/components/home/Tools";
import FAQ from '@/components/home/FAQ';
import Features from '@/components/home/Features';

function Home() {
    return (
        <div>
            <Introdcution />
            <Tools />
            {/* <Features /> */}
            <Price />
            <FAQ />
        </div>
    )
}

export default Home;