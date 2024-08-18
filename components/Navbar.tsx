import React from 'react'
import LanguageSwitcher from './LanguageSwitcher'

const Navbar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl text-orange-600">truyen-cua-ba</a>
            </div>
            <div className="flex-none">
                <LanguageSwitcher></LanguageSwitcher>
                {/* <ul className="menu menu-horizontal px-1">
                    <li><a>Link</a></li>
                    <li>
                        <details>
                            <summary>Parent</summary>
                            <ul className="bg-base-100 rounded-t-none p-2">
                                <li><a>Link 1</a></li>
                                <li><a>Link 2</a></li>
                            </ul>
                        </details>
                    </li>
                </ul> */}
            </div>
        </div>
    )
}

export default Navbar