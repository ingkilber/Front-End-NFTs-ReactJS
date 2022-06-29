import React, { memo, useState } from "react";
import { useTranslation } from "react-i18next";

const ActionModal = (props) => {

	const [terms, setTerms] = useState(false)
	const { t } = useTranslation();

  const buttonActionDisabled = () => {
    return !terms || !props.isValid
  }

	return (
		<div className='checkout2'>
			<div className='maincheckout2'>
				<div className='heading'>
					<h3>Item {props.action}</h3>
					<button className='btn-close' onClick={() => props.setShow(false)}>x</button>
				</div>

				<p>Está a punto de comprar un <span className="bold">NFTs #304</span> 
          <span className="bold"> de Trick NFTs</span></p>
       		<div className='detailcheckout mt-4'>
       			<div className='listcheckout'>
				   <div className="row d-flex justify-content-center">
              <h6>
			  Introduce la cantidad. 
                <span className="color"> 5 disponibles</span>
              </h6>
              <input type="text" name="buy_now_qty" id="buy_now_qty" className="form-control"/>
       			</div>

                  </div>
       		</div>
       		
				{/* <div className='detailcheckout'>
					<div className='listcheckout'>
						<div className='thumb'>
							<img src={props.nft.preview} className="img-fluid img-rounded mb-sm-30" alt="" />
						</div>
						<div className='description'>
							<h3>{props.nft.title}</h3>
							<p>{props.nft.description}</p>
						</div>
					</div>
				</div> */}
				{props.children}
				<div className='agrement'>
					<input type="checkbox" onChange={(event) => setTerms(event.target.checked)} />
					<label>{t('agreeTerms')}</label>
				</div>
				<div className="spacer-20"></div>
				<div className="centered">
				<button className='btn-main' onClick={() => props.buttonAction()} disabled={buttonActionDisabled()}>{props.action}</button>
				</div>
			</div>
			{/* <button className='btn-close' onClick={() => props.setShow(false)}>x</button> */}
		</div>
	);
};

export default memo(ActionModal);