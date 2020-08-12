import React, {Fragment, useState} from 'react';
import {v4 as uuid} from "uuid";

const Form = ({crearCita}) => {
    //crear State de Citas
    const [cita,actualizarCita] = useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:'',
        
    });
    const [error,setError] = useState(false);

    //funcion que actualiza los valores de los inputs
    const actualizarState = e =>{

        actualizarCita({
            ...cita,
            [e.target.name]:e.target.value
        })
    }

    //extraer los valores
const {mascota,propietario,fecha,hora,sintomas} = cita;
const submitCita = (e)=>{
    e.preventDefault();
    //Validar
    if(mascota.trim()===''||propietario.trim()===''||fecha.trim()===''||hora.trim()===''||sintomas.trim()===''){
        setError(true)
        return;
    }
    //asignarID
    setError(false);
    cita.id = uuid();

    //crear cita
    crearCita(cita);

    //reiniciar el formulario
    actualizarCita({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:'',
    })
}
    return ( 
        <Fragment>
            <h2>Crear Cita</h2>
            {error?(<p className="alerta-error">Todos los campos son obligatorios</p>):null}
            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value = {mascota}
                />
                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Del Propietario"
                    onChange={actualizarState}
                    value = {propietario}
                />
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value = {fecha}
                />
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value = {hora}
                />
                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    placeholder="Describa los sintomas aquí"
                    onChange={actualizarState}
                    value = {sintomas}
                ></textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >
                    Agregar Cita
                </button>
            </form>
        </Fragment>
        )
}
 
export default Form;