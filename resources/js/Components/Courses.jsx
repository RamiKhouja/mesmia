import { PlayCircleIcon } from '@heroicons/react/24/solid';
import { Link } from '@inertiajs/react'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Courses() {
    const {t, i18n} = useTranslation();
    const lang = i18n.language;
    const [play, setPlay] = useState(false);
  return (
    <div className='my-24'>
        <div className="grid gap-16 md:grid-cols-2">
            {!play ? (
            <div className="relative cursor-pointer group" onClick={() => setPlay(true)}>
                <img src="/pictures/global/chef.jpg" className='shadow-2xl rounded-xl' alt="" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircleIcon className='h-20 w-20 text-white shadow-inner group-hover:text-brown-900' />
                </div>
            </div>
            ) : (
            <div className="relative aspect-w-16 aspect-h-9">
                <video
                    src='/pictures/global/tutorial.mp4'
                    controls
                    autoPlay
                    className="w-full h-full rounded-xl shadow-2xl"
                />
            </div>
            )}
            <div className='relative p-8 text-center'>
                <Link type='button' href='/about' className={`rounded-full bg-transparent border border-primary text-primary ${lang==='ar'? 'text-2xl font-semibold font-layla-thuluth':'text-lg font-semibold'} px-4 py-1 hover:bg-primary hover:text-white`}>{t('courses.our-courses')}</Link>
                <p className={`${lang==='ar' ? 'text-2xl font-medium font-layla-thuluth':'text-lg font-medium'} text-primary mt-8`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                    {t('courses.description')}
                </p>
            </div>
        </div>
    </div>
  )
}

export default Courses