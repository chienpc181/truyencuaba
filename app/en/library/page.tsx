'use client'

import { useState } from "react"

export default function LibraryPage() {

    return (
        <div className='page-container'> 
            <h1 className="text-2xl text-center font-bold">Library</h1>
            <div>
                <span className="text-lg font-bold">Category</span>
                <div className="category-panel">
                    <SelectCategoryPanel></SelectCategoryPanel>
                </div>
            </div>
            <div>
                <span className="text-lg font-bold">Result</span>
                <div className="flex flex-col gap-2">
                    <ResultItem/>
                    <ResultItem/>
                </div>
            </div>
        </div>
    )
}

function SelectCategoryPanel() {
    const [selectedCategory, setSelectCategory] = useState('');


    return (
        <div className="flex gap-2">
            <SelectCategoryItem title="Fairy Tales & Fable"/>
            <SelectCategoryItem title="Famous People"/>
            <SelectCategoryItem title="Historical Stories"/>
            <SelectCategoryItem title="Greatest Literary "/>
        </div>
    )
}

function SelectCategoryItem({title}: {title: string}) {

    return (
        <div className="flex items-center text-xl text-white font-semibold justify-between size-32 rounded-2xl bg-blue-400">
            <div className="w-full text-center">{title}</div>
            
        </div>
    )
}

function ResultItem() {

    return (
        <div className="rounded-lg border p-3">
            Result 1
        </div>
    )
}