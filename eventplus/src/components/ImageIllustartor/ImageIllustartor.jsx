import React from 'react';
import './ImageIllustartor.css'
import imageDefault from "../../assets/images/default-image.jpeg"

const ImageIllustartor = ({  alterText, imageRender = imageDefault, additionalClass = ""}) => {
    return (
        <figure className='illustrator-box'>
            <img 
                src={imageRender} 
                alt={alterText} 
                className ={` illustrator-box__image ${additionalClass}`}
            />
        </figure>
    );
};

export default ImageIllustartor;