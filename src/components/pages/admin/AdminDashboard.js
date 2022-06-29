import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { configurations, updateConfiguration, cache } from '../../../core/api';
import OptionButton from '../../components/OptionButton';
import ActionButton from '../../components/ActionButton';
import Subheader from '../../components/Subheader';

const AdminDashboard = () => {
  const [parameters, setParameters] = useState(null)
  const [originalParameters, setOriginalParameters] = useState(null)
  const [actualizando, setActualizando] = useState(false)
  const [borrando, setBorrando] = useState(false)

  useEffect(() => {
    async function getParameters() {
      const data = await configurations()
      if (data) {
        setParameters(data)
        updateOriginalParameters(data)
      }
    }

    getParameters()
  }, [])

  const updateOriginalParameters = (data) => {
    const jsonData = JSON.stringify(data)
    setOriginalParameters(JSON.parse(jsonData))
  }

  const deleteCache = () => {
    setBorrando(true)
    cache().then(() => {
      toast.info('Cache borrada!')
      setBorrando(false)
    }).catch(error => {
      console.log(error)
      setBorrando(false)
    })
  }

  const updateParameters = () => {
    if (originalParameters !== parameters) {
      var updatedParameters = {configurations: null, paymentMethods: null};
      updatedParameters.configurations = parameters.configurations.filter(configuration => {
        const filteredValue = originalParameters.configurations.filter(c => c.id === configuration.id)[0].value
        return filteredValue !== configuration.value
      }).map(configuration => {
        return {id: configuration.id, value: configuration.value}
      })

      updatedParameters.paymentMethods = parameters.paymentMethods.filter(paymentMethod => {
        const filteredActive = originalParameters.paymentMethods.filter(p => p.id === paymentMethod.id)[0].active
        return filteredActive !== paymentMethod.active
      }).map(paymentMethod => {
        return {id: paymentMethod.id, active: paymentMethod.active}
      })

      if (updatedParameters.configurations.length > 0 || updatedParameters.paymentMethods.length > 0) {
        setActualizando(true)
        updateConfiguration(updatedParameters).then(response => {
          setActualizando(false)
          toast.info('Configuracion actualizada!')
        }).catch(error => {
          console.log(error)
          setActualizando(false)
        })
        
        updateOriginalParameters(parameters)
      }
    } else {
      toast.info("No se encontraron cambios en la configuracion")
    }
  }

  const changeConfigValue = (id, value) => {
    var newConfigurations = parameters.configurations
    newConfigurations.forEach(parameter => {
      if (parameter.id === id) {
        parameter.value = value
      }
    })
    setParameters({...parameters, configurations: newConfigurations})
  }

  const changePaymentMethodsValue = (id, active) => {
    var newPaymentMethods = parameters.paymentMethods
    newPaymentMethods.forEach(paymentMethod => {
      if (paymentMethod.id === id) {
        paymentMethod.active = active
      }
    })
    setParameters({...parameters, paymentMethods: newPaymentMethods})
  }

  return (
    <div>
      <Subheader title="Panel de Administracion" />

      <section className='container'>
        <div className='row'>
          <OptionButton icon="fa fa-address-card-o" title="Crear Autores" link="/admin/author" />
          <OptionButton icon="fa fa-image" title="NFTs" link="/admin/nft" />
          <OptionButton icon="fa fa-newspaper-o" title="Noticias" link="/admin/news" />
        </div>
      </section>

      <div className="container">
        <section id="parametros" className="no-top">
          <div className="row">
            <div className="col-12 col-md-6">
              <h2>Configuraciones</h2>
              {parameters && parameters.configurations &&
                parameters.configurations.map(configuration => {
                  return (
                    <div>
                      <h4>{configuration.name}</h4>
                      <input
                        className="form-control"
                        value={configuration.value}
                        onChange={(e) => changeConfigValue(configuration.id, e.target.value)}
                      />
                    </div>
                  )
                })
              }
            </div>
            <div className="col-12 col-sm-6">
              <h2>Medios de Pago</h2>
              {parameters && parameters.paymentMethods &&
                parameters.paymentMethods.map(paymentMethod => {
                  return (
                    <div>
                      <h4>
                        <input
                          type="checkbox"
                          style={{marginRight:10,width:20,height:20}}
                          checked={paymentMethod.active}
                          onChange={(e) => changePaymentMethodsValue(paymentMethod.id, e.target.checked)}
                        />
                        {paymentMethod.name}
                      </h4>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <ActionButton
            text="Actualizar"
            loadingText="Actualizando"
            loading={actualizando}
            onClick={() => updateParameters()}
          />
          <div className="spacer-10"></div>
          <ActionButton
            text="Borrar cache"
            loadingText="Borrando"
            loading={borrando}
            onClick={() => deleteCache()}
          />
        </section>
      </div>
    </div>
  )
}

export default AdminDashboard;