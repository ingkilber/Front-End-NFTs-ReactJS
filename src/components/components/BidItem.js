import React from 'react'
import { useTranslation } from "react-i18next";

const currency = process.env.REACT_APP_CURRENCY

export default function BidItem(props) {
  const { t } = useTranslation();
  const { index, bid } = props

  return (
    <div className="p_list" key={index}>
      <div className="p_list_pp">
        <span>
          <img className="lazy" src={bid.avatar} alt="" />
          <i className="fa fa-check"></i>
        </span>
      </div>
      <div className="p_list_info">
        {t('action.bid')} {bid.is_author && 'accepted'} <b>{bid.value} {currency}</b>
        <span>{t('by')} <b>{bid.username}</b> {t('at')} {bid.timestamp}</span>
      </div>
    </div>
  )
}
