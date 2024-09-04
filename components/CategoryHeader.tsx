import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";

interface CategoryHeaderProps {
    url: string;
    label: string;
}

export default function CategoryHeader({ url, label }: CategoryHeaderProps) {
    return (
        <div className="category-header">
            <Link href={url} className="flex items-center" aria-label={`View more about ${label}`}>
                <h3>{label}</h3>
                <FaAngleRight className="ml-1 mt-1 w-5 h-5" aria-hidden="true" />
            </Link>
        </div>
        
    );
}
