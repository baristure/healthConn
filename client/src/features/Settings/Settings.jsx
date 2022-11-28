import React from 'react'
import { LanguageChanger } from '../common/LanguageChanger'



export const Settings = () => {
    return (
        <div className="w-full border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8 flex flex-1">
            <div className="w-full bg-white rounded-md p-4 flex-1">
                <div className="w-full flex justify-end ">
                    <LanguageChanger/>
                </div>
            </div>
        </div>
    )
}
