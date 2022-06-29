import React from 'react'
import { useTranslation } from "react-i18next";

import ActionButton from './ActionButton'
import OptionButton from './OptionButton';

const ExtraBuy = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="nft__black">
      <div className="centered">
        <section className='container caja'>
          <div className='row'>
            <div className="col-md-6">
              <div className="bloglist item">
                <div className="centered">
                  <h4><span>Relatos de D10S</span></h4>
                </div>
                <div className="spacer-single"></div>

                <p>Es una GTA Max que Diego compró en 1991 y todavía conserva el brillo de aquellos años. Esa unidad ahora será sorteada por una empresa argentina, y puede ser tuya. </p>
                <p>Diego, Diegote, Pelusa, D10S… no importa cómo le digas, sus miles de apodos son reconocibles en todo el mundo. El mejor jugador de todos los tiempos es un ícono 
                  para todos los que aman el fútbol y un personaje que condensa la esencia de lo argentino </p>

                <p>Corría 1991 cuando Maradona compró una Renault Fuego GTA Max cero kilómetro. Era la versión tope de gama del clásico modelo. La usó poco y en 1992 el auto se vendió.
                  Hoy tiene poco más de 60.000 kilómetros recorridos. </p>

                <p>La GTA Max tenía un motor 2.2 de 123 caballos de fuerza. La caja era manual de cinco marchas y la velocidad máxima de 198 km/h. </p>       
              </div>
            </div>
            <div className="col-lg-6 ">
              <div className="bloglist item mb0">
                <div className="post-content">
                  <div className="post-image">
                    <div className="col-md-8 col-sm-8 col-xs-1 centrar-imagen" >
                      <img src="https://static.tricknfts.com/assets/autofuego.png" className="lazy img-fluid" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="centered">
            <ActionButton text={t('action.buy')} onClick={()=> window.open("/ticket", "_self")} />
          </div>
        </section>
        </div>
      </div>

      <div className="centered">
      <img src="https://static.tricknfts.com/assets/Recurso1.png" className="lazy img-fluid" alt="" />
      </div>
                    
      <div className="nft__black">
        <section className='container caja'>
          <div className="row">
            <div className="col-lg-6 ">
              <div className="bloglist item mb10">
                <div className="post-content">
                  <div className="post-image">
                    <div className="col-md-8 col-sm-8 col-xs-1">
                      <img src="https://static.tricknfts.com/assets/tituloautofuego.png" className="lazy img-fluid" alt="" />
                      <span/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 ">
              <div className="bloglist item">
                <div className="post-content">
                  <div className="post-text">
                    <div className="centered">
                      <h4><span>¿Por qué CONCURSO? </span></h4>
                    </div>
                    <div className="spacer-single"></div>
                    <p>Se tomó la decisión de hacer un sorteo del automóvil en lugar de subastarlo ya que de este modo, cualquier persona que adquiera un nft con un número por el valor de un café, 
                      puede llegar a ser propietario de este auto con valor millonario.</p>

                    <p> En cambio con la modalidad de subasta, solo tiene la posibilidad de tenerlo quien más dinero oferte, como sucede con la camiseta que usó contra Inglaterra, por citar un ejemplo.
                      Consideramos que Diego hubiera preferido esta modalidad y es por ese motivo que el auto será expuesto en el barrio 31, en Villa Fiorito, el Obelisco, en Argentinos Juniors, en
                      Boca Juniors, en Gimnasia y Esgrima de la Plata, entre otros lugares. </p>

                    <p>La venta de los ticket NFT consta de cuatro etapas, con amplios beneficios para quienes lo hagan de manera anticipada: a intervalos de 15 días, la primera etapa (Bronce) consta de 200.000 ticket NFT a un valor de 250 pesos (80% de descuento); la siguiente (Plata) tiene 100.000 ticket NFT disponibles a un costo de 500 pesos (60% de descuento); la tercera (Oro) otros 100.000 ticket NFT a un valor de 750 pesos (40% de descuento) y la cuarta (Platino) dispone de otros 100.000 ticket NFT al costo final de 1.250 pesos.
                      Cada NFT, además de participar del sorteo, quedará como un activo Digital para cada uno de los participantes, pudiendo con los mismos acceder a infinidad de Beneficios </p>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="centered">
            <ActionButton text={t('action.buy')} onClick={()=> window.open("/ticket", "_self")} />
          </div>
        </section>
      </div>

      <div className="centered">
      <img src="https://static.tricknfts.com/assets/Recurso2.gif" className="lazy img-fluid" alt="" />
      </div>
      
      <div className="nft__black">
        <section className='container'>
          <div className='row'>
            <div className="col-md-6 text-center">
            </div>
            <h4><span className="centered">¿Cómo Participar? </span></h4>
          </div>
          <div className="spacer-single"></div>
          <div className="text-center">
            <p>El sorteo lo realizará la empresa Trick NFTS, dedicada a la comercialización de Token no fungibles. Para participar, el interesado podrá comprar, 
              clickeando en el botón de abajo, tickets que le darán chances en el sorteo que se realizará en junio de este año.</p>

            <p>Asimismo el comprador recibirá en una dirección de billetera electrónica un NFT del Fuego de D10s. </p>
            <p>Seguí a Trick NFT en instagram para recibir noticias y novedades del sorteo.</p>

            <p onClick={()=> window.open("https://www.instagram.com/trick.nfts/", "_bank")}>          
            <div className="centered">
              <OptionButton icon="fa fa-instagram fa-lg" title="Instagram" link="" />
            </div>
            </p>
          </div>
          <div className="spacer-single"></div>
          <div className="centered">
            <ActionButton text={t('action.buy')} onClick={()=> window.open("/ticket", "_self")} />
          </div>
        </section>
      </div>

      <section className='container caja'>
        <div className="row">
          <div className="bloglist item">
            <div className="post-content">
              <div className="centered">
                <div className="col-md-7 col-sm-7 col-xs-1">
                  <h2><span className="centered">Etapas </span></h2>
                  <div className="spacer-single"></div>
                  <img src="https://static.tricknfts.com/assets/Recurso4.png" className="lazy img-fluid" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="nft__black">
        <section className='container'>
          <div className='row'>
            <div className="col-md-6 text-center">
            </div>
            <h4><span className="centered">Beneficios</span></h4>
          </div>
          <div className="spacer-single"></div>
          <div className="text-center">
            <p>Descuentos exclusivos futuras colecciones, NFT referentes a este evento.
              White List, ingreso a listas por invitación para eventos que se desarrollen referentes a la marca.<br></br>
              Con solo mostrar tu NFT de El fuego de D10s serás miembro del club exclusivo.
              Entre otros beneficios
            </p>
          </div>
          <div className="centered">
            <ActionButton text={t('action.buy')} onClick={()=> window.open("/ticket", "_self")} />
          </div>
        </section>
      </div>
    </>
  )
}

export default ExtraBuy
