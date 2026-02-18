import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Product from './Product';
import { Link } from '@inertiajs/react';

function OwlProducts({products, type}) {
    const { t, i18n } = useTranslation();
    const lang = localStorage.getItem('lang');
    const [forceRerender, setForceRerender] = useState(false);
    useEffect(()=>{
        setForceRerender((prev) => !prev);
    },[lang]);

    const options = {
        margin: 24,
        responsiveClass: true,
        loop: false,
        nav: false,
        dots: true,
        autoplay: false,
        smartSpeed: 3000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1.25,
            },
            400: {
                items: 2,
            },
            600: {
                items: 2.5,
            },
            700: {
                items: 3,
            },
            1000: {
                items: 4,
    
            },
            1200: {
              items: 5
            }
        },
    };

  return (
    <div className={`mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl 2xl:max-w-screen-2xl lg:px-8`}>
        {type && type!=='related' && (
          <div className='text-center mb-8'>
            <div className="text-center">
                <p className="home-section-title">
                {type==='featured' ? t('owl-products.featured') : t('owl-products.new-arrivals') }
                </p>
            </div>
            <div className="text-center mx-auto mb-8 max-w-md" dir={i18n.language==='ar'?'rtl':'ltr'}>
                <p className="home-section-description">
                {t('owl-products.subtitle')}
                </p>
            </div>
            <Link 
                href="/shop" 
                className={`${i18n.language === 'ar' ? 'font-adobe text-xl' : 'font-nanum'} mx-auto font-medium bg-brown-100 hover:bg-brown-300 text-brown-900 px-4 py-1 rounded-full mb-6 inline-block`}
            >
                {t('owl-products.shop-collection')}
            </Link>
          </div>
        )}
        <div className="">
        <OwlCarousel key={forceRerender} className='owl-theme' {...options}>
            {products.map((product) => {
                return(
                    <div key={product.id} className="item h-full mb-4">
                        <Product product={product}/>
                    </div>
                )
            })}
        </OwlCarousel>
        </div>
    </div>
  )
}

export default OwlProducts