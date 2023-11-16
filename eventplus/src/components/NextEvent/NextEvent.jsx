import React from 'react';
import './NextEvent.css'
import { Tooltip } from 'react-tooltip'
// import {dateFormatDbToView} from '../../Utils/StringFunction'

//<p className='event-card__description'>dateFormatDbToView(eventDate)</p>

const NextEvent = ({ title, description, eventDate, idEvento }) => {

    function conectar(title) {
        alert(`Conectando ao evento: ${title}`)

    }

    return (
        <article className='event-card'>
            <h2 className='event-card__title'> {title} </h2>

            <p
                className='event-card__description'
                data-tooltip-id={idEvento}
                data-tooltip-content={description}
                data-tooltip-place="top"
            >
                <Tooltip id={idEvento} className='tooltip'/>
                {description.substr(0, 16)} ...
            </p>

            <p className='event-card__description'>{new Date(eventDate).toLocaleDateString()}</p>

            <a onClick={() => { conectar(title) }} href="" className='event-card__connect-link'>Conectar</a>
        </article>
    );
};

export default NextEvent;