import React from 'react';
import Reveal from 'react-awesome-reveal';
import { keyframes } from "@emotion/react";
import { useTranslation } from "react-i18next";

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;

const Feature = ({iconStyle, title, description, background}) => (
  <div className="col-lg-4 col-md-6 mb-3">
    <div className="feature-box f-boxed style-3">
      <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
        <i className={`bg-color-2 ${iconStyle}`}></i>
      </Reveal>
      <div className="text">
        <Reveal className='onStep' keyframes={fadeInUp} delay={100} duration={600} triggerOnce>
          <h4>{title}</h4>
        </Reveal>
        <Reveal className='onStep' keyframes={fadeInUp} delay={200} duration={600} triggerOnce>
          <p>{description}</p>
        </Reveal>
      </div>
      <i className={`wm ${background}`}></i>
    </div>
  </div>
)

const FeatureBox = () => {
  const { t } = useTranslation();

  return (
    <div className='row'>
      <Feature
        iconStyle="icon_currency"
        title={t('trickCoin')}
        description={t('text.trickCoin')}
        background="icon_currency"
      />

      <Feature
        iconStyle="icon_puzzle"
        title={t('trickGame')}
        description={t('text.trickGame')}
        background="icon_puzzle"
      />

      <Feature
        iconStyle="icon_table"
        title={t('trickEvents')}
        description={t('text.trickEvents')}
        background="icon_table"
      />
    </div>
  )
}

export default FeatureBox;
