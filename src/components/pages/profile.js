import { createGlobalStyle } from 'styled-components';
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { getProfile, updateProfile } from '../../core/api';

import Footer from '../components/footer';
import { toast } from 'react-toastify';
import UserImage from '../components/UserImage';
import Upload from '../components/Upload';
import ActionButton from '../components/ActionButton';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

const Profile = function () {
  const { t } = useTranslation();

  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState('')
  const [userAddress, setUserAddress] = useState('')
  const [files, setFiles] = useState([])
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    async function getDataIfUserValid() {
      const profile = await getProfile()
      setNickname(profile.username)
      setAvatar(profile.avatar)
      setEmail(profile.email)
    }
    setUserAddress(localStorage.getItem('account'))
    getDataIfUserValid()
  }, [])

  const sendProfileUpdate = async () => {
    try {
      setUpdating(true)
      const file = files[0]
      const formData = new FormData();
      formData.append('username', nickname)
      formData.append('email', email)
      if (file) {
        formData.append('file', file, file.fileName)
      }
      await updateProfile(formData)
      setUpdating(false)
    } catch (error) {
      setUpdating(false)
      if (error.code === 4001) {
        toast.info("Transaccion cancelada en la Wallet.")
      } else {
        console.log("Capturar error", error)
      }
    }
  }

  return (
    <div>
      <GlobalStyles />
      <section className='jumbotron breadcumb no-bg' style={{ backgroundImage: `url(${'./img/background/subheader.jpg'})` }}>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row m-10-hor'>
              <div className='col-12'>
                <h1 className='text-center'>{t('header.profile')}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='container'>
        <div className="text-center">
          <UserImage imgClassName="lazy" avatar={avatar} address={userAddress} size="1" />
          <h4 className="mb-5">{userAddress}</h4>
        </div>
        <div className="row">
          <div className="col-lg-6 mb-5">
            <Upload
              files={files}
              setFiles={setFiles}
              validationText="PNG, JPG, GIF or WEBP. Max 5mb."
            />
          </div>
          <div className="col-lg-6">
            <h5>{t('form.nickname')}</h5>
            <input type="text" className="form-control" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
            <div className="spacer-10"></div>

            <h5>{t('form.email')}</h5>
            <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <div className="spacer-10"></div>
          </div>
          <div className="col-lg-12">
            <ActionButton
              text={t('action.update')}
              loadingText="Updating"
              loading={updating}
              onClick={() => sendProfileUpdate()}
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Profile;