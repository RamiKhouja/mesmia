import { Link } from '@inertiajs/react';
import React from 'react'
import { useTranslation } from 'react-i18next'

function AboutSection({about}) {
    const {t, i18n} = useTranslation();
    const lang = i18n.language;
  return (
    <div>
        <div className="grid gap-16 md:grid-cols-2">
            <div className='relative p-8'>
                <img src="/pictures/global/naksha-blue.png" className='w-64 lg:w-96 opacity-20 absolute bottom-0 -left-8 -z-10' alt="" />
                <p className={`text-3xl lg:text-5xl text-gray-900 font-semibold ${lang==='ar' ? 'text-right' : 'text-left' }`}>{t('about.title')}</p>
                <p className={`text-lg font-normal text-gray-700 mt-8 ${lang==='ar' ? 'text-right' : 'text-left' }`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                    {lang === 'en' ? JSON.parse(about.short_description)?.en : lang==='fr' ? JSON.parse(about.short_description)?.fr : JSON.parse(about.short_description)?.ar}
                </p>
                <div className="mt-16 flex flex-row-reverse">
                    <Link type='button' href='/about' className='rounded-full bg-primary text-brown-800 font-semibold px-3 py-1.5 shadow hover:bg-primary hover:text-white'>{t('about.learn-more')}</Link>
                </div>
            </div>
            <div className=''>
                <img src="/pictures/global/about-tp.jpg" className='shadow-2xl rounded-xl' alt="" />
            </div>
        </div>
    </div>
  )
}

export default AboutSection