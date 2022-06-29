import React from 'react';
import emailjs from 'emailjs-com';
import { useTranslation } from 'react-i18next';

import Footer from '../components/footer';
import Subheader from '../components/Subheader';

const Contact = () => {

  const { t } = useTranslation();

  function sendEmail(e) {
    const success = document.getElementById("success");
    const button = document.getElementById("buttonsent");
    const failed = document.getElementById("failed");
    e.preventDefault();

    emailjs.sendForm('service_f6qu59h', 'template_qiz6aaw', e.target, 'user_d2X4ajfvwW7ICbDdaJvTW')
      .then((result) => {
          console.log(result.text);
          success.classList.add('show');
          button.classList.add('show');
          failed.classList.remove('show');
      }, (error) => {
          console.log(error.text);
          failed.classList.add('show');
      });
  }

  return (
    <div>
      <Subheader title="contactUs" />
      <section className='container'>
        <div className='row'>
          <div className='col-lg-8 mb-3'>
          <h3>{t('messages.question')}</h3>
            <div className="form-side">
              <form className="formcontact" onSubmit={sendEmail}>
                <input type="text" className="form-control" name="user_name" placeholder={t('form.name')} required />
                <input type="email" className="form-control" name="user_email" placeholder={t('form.email')} required />
                <input type="text" className="form-control" name="user_phone" placeholder={t('form.phone')} required />
                <textarea name="message" className="form-control" placeholder={t('form.message')} required />
                <div id='success' className='hide'>{t("messages.mailSuccess")}</div>
                <div id='failed' className='hide'>{t("messages.mailFail")}</div>
                <input type='submit' id='buttonsent' value={t('action.submit')} className="btn btn-main color-2" />
              </form>
            </div>
          </div>

          <div className='col-md-4'>
           <div className="padding40 box-rounded mb30">
              <h3>Argentina</h3>
              <address className="s1">
                <span><i className="id-color fa fa-map-marker fa-lg"></i>Alicia M. De Justo 2030, oficina 315, CABA</span>
                {/* <span><i className="id-color fa fa-phone fa-lg"></i>+54 9 11 XXXX XXXX</span> */}
                <span><i className="id-color fa fa-envelope-o fa-lg"></i><span className='btn'>info@tricknfts.com</span></span>
                
              </address>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
export default Contact;