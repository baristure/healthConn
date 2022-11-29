import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../Elements'

const LanguageButton = ({ languageKey, displayValue }) => {
    const { t, i18n } = useTranslation();
    const color = i18n.language === languageKey ? 'primary' : 'gray';
    const onClick = () => {
        i18n.changeLanguage(languageKey);
        localStorage.setItem('default-language', languageKey);
    }
    return <Button
        color={color}
        callback={onClick}>{t(displayValue)}</Button>
}
export const LanguageChanger = () => {
    return (
        <div className='flex gap-2 justify-center items-center w-full flex-1'>
            <LanguageButton languageKey={'ru'} displayValue="russian" />
            <LanguageButton languageKey={'en'} displayValue="english" />
            <LanguageButton languageKey={'tr'} displayValue="turkish" />
        </div>
    )
}
