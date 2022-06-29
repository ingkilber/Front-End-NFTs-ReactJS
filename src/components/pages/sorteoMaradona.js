import React, { useState } from 'react';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import SliderCarouselAuto from '../components/SliderCarouselNews';
import CarouselCollection from '../components/CarouselCollection';

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

const Sorteo= () => {

  const [openModal, setOpenModal] = useState(false);
  const [datosModal, setDatosModal] = useState({});

return(
<div>
<GlobalStyles/>

  <section className='jumbotron breadcumb no-bg'  style={{backgroundImage: `url(${'./img/background/1.jpg'})`}}>
    <div className='mainbreadcumb'>
      <div className='container'>
        <div className='row m-10-hor'>
          <div className='col-12 text-center'>
            <h1>Pantalla de pruebas</h1>
            {/* <p>Diego Armando Maradona</p> */}
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className='container caja'>
    <div className="row ">
      <div className="col-lg-6 ">
        <div className="bloglist item mb10">
            <div className="post-content">
                <div className="post-image">
                <SliderCarouselAuto/>
                </div>
                </div>
                </div>
                </div>

                <div className="col-lg-6 ">
                   <div className="bloglist item">
                  <div className="post-content ">
                  <div className="post-text">
                    {/* <span className="p-tagline">Tips &amp; Tricks</span> */}
                    <span className="p-date">Abril 11, 2022</span>
                    <h4><span> Ganate la Fuego GTA Max que usó Diego Maradona (y muchos premios más)<span></span></span></h4>
                    <div className=''>
                    <p>El Fuego de D10S </p>

                        <p>Ganate la Fuego GTA Max que Diego Maradona compró en 1991 como 0km. Es un ejemplar en perfecto estado de conservación y que contiene un altísimo valor tanto para los fanáticos como para los coleccionistas. </p>

                       <p> Mecánica
                        Para obtener esta unidad la modalidad es simple: tenés que adquirir uno de los 500.000 ticket NFT disponibles (o la cantidad que prefieras para maximizar tus chances). </p>

                        <p>La venta de los ticket NFT consta de cuatro etapas, con amplios beneficios para quienes lo hagan de manera anticipada: a intervalos de 15 días, la primera etapa (Bronce) consta de 200.000 ticket NFT a un valor de 250 pesos (80% de descuento); la siguiente (Plata) tiene 100.000 ticket NFT disponibles a un costo de 500 pesos (60% de descuento); la tercera (Oro) otros 100.000 ticket NFT a un valor de 750 pesos (40% de descuento) y la cuarta (Platino) dispone de otros 100.000 ticket NFT al costo final de 1.250 pesos.
                        Cada NFT, además de participar del sorteo, quedará como un activo Digital para cada uno de los participantes, pudiendo con los mismos acceder a infinidad de Beneficios </p>

                  </div>
                   
                    
                  </div>
                  </div>
                  </div>

        


                  <div className="col-md-6 col-lg-12 ">
                  <div className="bloglist item">
                  <div className="post-content ">
                  <div className="post-text">
                   
                   
                  </div>
                 </div>
               </div>
                </div>
       
       {/* bonton ver imagenes */}
                {/* <div className="col-lg-6 ">
                 <div className="bloglist item mb10">
                 <div className="post-content">
                 <div className="post-image">
                   <button className='btn btn-primary'
                   onClick={()=>{setOpenModal(true)}}
                   >Ver</button>
                   {openModal && < Modal closeModal={setOpenModal}/>}
                 </div>
                </div>
                </div>
                </div> */}


                </div>



                {/* Ver colecciones en el sorteo */}
                <section className='container no-top'>
        <div className='row'>
          <div className='col-lg-12'>
            <h2 className='style-2'>Colecciones</h2>
          </div>
        </div>
        <div className='container no-top'>
          <div className='row'>
            <div className='col-lg-12 px-0'>
              <CarouselCollection/>
            </div>
          </div>
        </div>
      </section>
                
      
        
    </div>
  </section>
   
 
  <Footer />
</div>
 ) 
};
  


export default Sorteo
  
