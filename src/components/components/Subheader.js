import React from 'react'
import { useTranslation } from 'react-i18next';

export default function Subheader({title, action = null, subtitle = null, imageUrl = "/img/background/news1.png"}) {
  const { t } = useTranslation();
  return (
    <section className='jumbotron breadcumb no-bg' style={{backgroundImage: `url(${imageUrl})`}}>
      <div className='mainbreadcumb'>
        <div className='container'>
          <div className='row m-10-hor'>
            <div className='col-12 text-center'>
              <h1>{t(title)} {t(action)}</h1>
              {subtitle &&
                <>
                  <span className="spacer-10"></span>
                  <h4>{t(subtitle)}</h4>
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
