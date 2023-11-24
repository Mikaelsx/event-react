import React, { useState } from 'react';
import "./TableEvent.css"
import editPen from '../../../assets/images/edit-pen.svg'
import trashDelete from '../../../assets/images/trash-delete.svg'

const TableEvent = ({ dados, fnUpdate, fnDelete }) => {
    return (
        <table className='table-data'>
            <thead className="table-data__head">
                <tr className="table-data__head-row">
                    <th className="table-data__head-title table-data__head-title--big">Evento</th>
                    <th className="table-data__head-title table-data__head-title--little">Descrição</th>
                    <th className="table-data__head-title table-data__head-title--little">Tipo Evento</th>
                    <th className="table-data__head-title table-data__head-title--little">Data</th>
                    <th className="table-data__head-title table-data__head-title--little">Editar</th>
                    <th className="table-data__head-title table-data__head-title--little">Deletar</th>
                </tr>
            </thead>

            <tbody>
                {dados.map((tp) => {
                    return (
                        <tr className="table-data__head-row">
                            <td className="table-data__data table-data__data--big">
                                {tp.nomeEvento}
                            </td>
                            <td className="table-data__data table-data__data--big">
                                {tp.descricao}
                            </td>
                            <td className="table-data__data table-data__data--big">
                                {tp.tiposEvento.titulo}
                            </td>
                            <td className="table-data__data table-data__data--big">
                                {new Date (tp.dataEvento).toLocaleDateString()}
                            </td>

                            <td className="table-data__data table-data__data--little">
                                <img className="table-data__icon" src={editPen} alt="Imagem de caneta, para editar cadastro" onClick={() => { fnUpdate(tp.idEvento) }} />
                            </td>

                            <td className="table-data__data table-data__data--little">
                                <img className="table-data__icon" src={trashDelete} alt="Imagem de Lata de lixo, para deletar cadastro" onClick={() => { fnDelete(tp.idEvento) }} />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TableEvent;