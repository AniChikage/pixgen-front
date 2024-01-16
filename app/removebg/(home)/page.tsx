"use client"

import Introdcution from "@/components/home/IntroductionRemoveBG";
import FileSelector from "@/components/fileSelect/FileSelect";
import Diff from '@/components/erase/Diff';

function Erase() {

    return (
        <div>
            <Introdcution />
            <FileSelector {...{redirectTo: "/removebg/editor"}} />
            {/* <Diff /> */}
        </div>
    )
}

export default Erase;