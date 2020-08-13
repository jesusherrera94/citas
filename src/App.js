import React, {useState, useEffect} from 'react';
import Form from './components/Form';
import Cita from './components/Cita';
import PropTypes from 'prop-types';
function App() {

  //obtener citas de localstorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'))
  if(!citasIniciales){
    citasIniciales = [];
  }

  //arreglo de citas
  const [citas,guardarCitas] = useState(citasIniciales);
  //funcion que tome las citas actuales y las nuevas
  const crearCita = (cita) =>{
    guardarCitas([
      ...citas,
        cita
    ])
  }
  //useEffect para realizar operaciones  cuando el storage cambia
  useEffect(()=>{
    let citasIniciales = JSON.parse(localStorage.getItem('citas'))
    if(citasIniciales){
      localStorage.setItem('citas',JSON.stringify(citas))
    }else{
      localStorage.setItem('citas',[])
    }
  },[citas])
  //funcion que elimina las citas por su ID
  const eliminarCita = id =>{
    const nuevasCitas = citas.filter(cita=>cita.id !== id);
    guardarCitas(nuevasCitas)
  }

  const titulo = citas.length === 0 ? 'No hay citas':'Administra tus citas'

  return (
    <div className="App">
      <h1>Administrador de citas</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Form
              crearCita = {crearCita}
            />
          </div>
          <div className="one-half column">
          <h1>{titulo}</h1>
          {citas.map(cita=>(
            <Cita
            key = {cita.id} 
              cita={cita}
              eliminarCita = {eliminarCita}
            />
          ))}
          </div>
        </div>
      </div>
       
    </div>
  );
}
//para documentar los props y sus tipos, para evitar errores posteriores o 
//de mantenimiento
Form.protoTypes = {
  crearCita: PropTypes.func.isRequired
}

export default App;
