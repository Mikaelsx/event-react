import React from 'react';
import './FormComponents.css'

export const Input = ({
    type, 
    id, 
    value,
    required,
    additionalclass,
    name,
    placeholder,
    manipulationFunction
}) => {
    return (
        <input 
        type={type} 
        id={id} 
        name={name}
        value={value} 
        required={required}
        className={`input-component ${additionalclass}`}
        placeholder={placeholder}
        onChange={manipulationFunction}
        autoComplete='off'
        />
    );
};

export const Button =({
    text,
    id,
    name,
    type,
    additionalclass = "",
    manipulationFunction
}) => {
    return (
        <button 
        type={type}
        name={name}
        id={id}
        className={`button-component ${additionalclass}`}
        onClick={manipulationFunction}
        >
            {text}
        </button>
    );
};
