import React from 'react';
import './ImageIllustrator.css'
import imageDefault from "../../assets/images/default-image.jpeg";

const ImageIllustrator = ( { alterText,
     imageRender = imageDefault,
     additionalCLass ="" 
    } ) => {
    return (
        <figure className='illustrator-box'>
            <img 
                src={imageRender}
                alt={alterText}
                className={`illustrator-box__image ${additionalCLass}`}
            />
        </figure>
    );
};

export default ImageIllustrator;