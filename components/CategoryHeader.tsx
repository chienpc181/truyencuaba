import Link from "next/link"
import { FaAngleRight } from "react-icons/fa6";


interface CategoryHeaderProps {
    header: {
        label: string,
        url: string
    }
    
}
export default function CategoryHeader({header}: CategoryHeaderProps) {

    return (
        <Link href={header.url} className="flex items-center">
            <h3 className="text-lg font-bold flex">{header.label}</h3>
            <FaAngleRight className="pt-1 w-6 h-6"/>
        </Link>
    )
}