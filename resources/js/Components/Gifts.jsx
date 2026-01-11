import { PlayCircleIcon } from '@heroicons/react/24/solid';
import { Link } from '@inertiajs/react'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Gifts() {
    const {t, i18n} = useTranslation();
    const lang = i18n.language;
    const [play, setPlay] = useState(false);
  return (
    <div className='my-24'>
        <div className="grid gap-16 md:grid-cols-2">
            <div className='relative p-8 text-center'>
                <Link type='button' href='/about' className={`rounded-full bg-transparent border border-primary text-primary ${lang==='ar'? 'text-2xl font-semibold font-layla-thuluth':'text-lg font-semibold'} px-4 py-1 hover:bg-primary hover:text-white`}>{t('navigation.gifts-packs')}</Link>
                <p className={`${lang==='ar' ? 'text-2xl font-normal font-layla-thuluth':'text-lg font-medium'} text-primary mt-8`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                    {t('gifts.description')}
                </p>
            </div>
            {!play ? (
            <div className="relative cursor-pointer group" onClick={() => setPlay(true)}>
                <img src="/pictures/global/gift.jpg" className='shadow-2xl rounded-xl' alt="" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircleIcon className='h-20 w-20 text-white shadow-lg group-hover:text-brown-900' />
                </div>
            </div>
            ) : (
            <div className="relative aspect-w-16 aspect-h-9">
                <video
                    src='/pictures/global/gift.mp4'
                    controls
                    autoPlay
                    className="w-full h-full rounded-xl shadow-2xl"
                />
            </div>
            )}
        </div>
    </div>
  )
}

export default Gifts