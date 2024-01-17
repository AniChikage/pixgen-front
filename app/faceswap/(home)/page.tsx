"use client"

import Introdcution from "@/components/home/IntroductionFaceswap";
import FileSelector from "@/components/fileSelect/FileSelect";
import Diff from '@/components/erase/Diff';

function Erase() {

    return (
        <div>
            <Introdcution />
            {/* <FileSelector {...{redirectTo: "/erase/editor"}} /> */}
            {/* <Diff /> */}
        </div>
    )
}

export default Erase;