import React, { useState } from 'react';

const Input = (props) => {
    return (
        <div>
            <input 
            type={props.tipo} 
            id={props.id} 
            name={props.nome} 
            placeholder={props.dicaCampo}
            value={props.valor}
            onChange={(e) => { //encapsulado para não ser executado no criar da pagina
                props.fnAltera(e.target.value) // valor do campo
            }}
            />

            <span>{props.valor}</span>
        </div>
    );
};

export default Input;