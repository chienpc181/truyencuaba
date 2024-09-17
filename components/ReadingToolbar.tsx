import { WiDayLightWind } from "react-icons/wi"; 
import { MdOutlineNightlight } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { BiFontSize } from "react-icons/bi";
import { MdOutlineVolumeUp } from "react-icons/md";
import { MdOutlineShare } from "react-icons/md";

export default function ReadingToolbar () {
    return (
        <>
            {/* <ReadingButton icon={<BiFontSize size={16}/>}></ReadingButton> */}
            <ReadingButton icon={<BiFontSize size={20}/>}></ReadingButton>
            <ReadingButton icon={<MdOutlineLightMode size={20}/>}></ReadingButton>
            <ReadingButton icon={<MdOutlineNightlight size={20}/>}></ReadingButton>
            <ReadingButton icon={<MdOutlineVolumeUp size={20}/>}></ReadingButton>
            <ReadingButton icon={<MdOutlineShare size={20}/>}></ReadingButton>
        </>
    )
}

function ReadingButton({icon}: {icon: JSX.Element}) {

    return (
        <button className="rounded-full p-1 outline-1 border mx-1">
            {icon}
        </button>
    )
}