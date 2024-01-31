"use client"

import Introdcution from "@/components/home/IntroductionColorBG";
import FileSelector from "@/components/fileSelect/FileSelect";
import Diff from '@/components/erase/Diff';

function Erase() {

    return (
        <div>
            <Introdcution />
            <FileSelector {...{redirectTo: "/colorbg/editor"}} />
            {/* <Diff /> */}
        </div>
    )
}

export default Erase;