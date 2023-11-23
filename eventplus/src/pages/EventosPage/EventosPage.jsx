// IMPORTS

import React, { useEffect, useState } from 'react';
import './EventosPage.css'

import Title from '../../components/Title/Title';
import MainContent from '../../components/MainContent/MainContent';
import Container from '../../components/Container/Container'
import ImageIllustartor from '../../components/ImageIllustartor/ImageIllustartor';
import eventImage from '../../assets/images/evento.svg'
import { Button ,Input, Select } from '../../components/FormComponents/FormComponents';
import api from '../../Services/Service'
import Notification from '../../components/Notification/Notification';
import Spinner from '../../components/Spinner/Spinner';
import TableEvent from './TableEvent/TableEvent';




// ---------------------------------------------------------------- //

const EventosPage = () => {
    const [frmEdit, setFrmEdit] = useState(false);

    const [notifyUser, setNotifyUser] = useState({})
    const [showSpinner, setShowSpinner] = useState(true)

    const [name, setName] = useState("")
    const [descricao, setDescricao] = useState("")
    const [tipoEvento, setTipoEvento] = useState("")
    const [eventDate, setEventDate] = useState("")

    const [evento, setEvento] = useState([])
    const [idevento, setIdEvento] = useState("")
    const [tiposEvento, setTiposEvento] = useState([]);// TESTE

// ---------------------------------------------------------------- //

// LISTAR
    useEffect(() => {
        async function getEvento() {
            setShowSpinner(true);
        // Chamar api (GET)
            try {
                const promise = await api.get("/Evento")
                const tipoE = await api.get("/TiposEvento")
                console.log(promise.data);
                setEvento(promise.data)
                setTipoEvento(tipoE.data)

            }
        // Erro na api (GET)  
            catch (error) 
            {
                console.log("Erro inesperado na API.")
                console.log(error)
            }
        }
        getEvento()
    }, [])

// ---------------------------------------------------------------- //

// CADASTRAR
    // Handle Submit (POST)
    async function handleSubmit(e) {
        e.preventDefault();
    // Validar a quantidade de caracteres
        if (name.trim().length < 3) {
            alert("O nome precisa de no mínimo três caracteres.");
            return
        }
    // Chamar api (POST)
        try {
            const retorno = await api.post("/Evento", { NomeEvento: name, Descricao: descricao, TipoEvento: tipoEvento, DataEvento: eventDate,})
            console.log("Cadastrado com sucesso!");
            console.log(retorno.data);
            setName("")
        }
    // Erro na api (POST)    
        catch (error)
        {
            console.log("Erro inesperado na API.");
            console.log(error);
        }

        setNotifyUser({
            titleNote: "Sucesso",
            textNote: `Cadastrado com sucesso!`,
            imgIcon: "success",
            imgAlt:
              "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
            showMessage: true,
        })
    }

// ---------------------------------------------------------------- //

// ATUALIZAR
    async function handleUpdate(e) {
        e.preventDefault();

    // Atualizar state (GET)
        try {
            const retornoGet = await api.get('/Evento');
            setEvento(retornoGet.data)
            alert("Cadastrado com sucesso!")
            editActionAbort();
        } 
    // Erro na api (GET)
        catch (error) 
        {
            alert("Erro inesperado na API.")
        }
    }

// ---------------------------------------------------------------- //

// UPDATE FORM
    async function showUpdateForm(idEvento) {
        setFrmEdit(true)

        try {
            const retorno = await api.get(`/Evento/${idEvento}`)
            setName(retorno.data.NomeEvento)
            setIdEvento(idEvento)
        } 
        catch (error) 
        {
            console.log("Erro inesperado na API.");
        }
    }

// ---------------------------------------------------------------- //

// EDIT ACTION ABORT
    function editActionAbort() 
    {
        setFrmEdit(false)
        setName("")
        setIdEvento(null);
    }

// ---------------------------------------------------------------- //

// HANDLE DELETE
    function handleDelete(id) 
    {
        try {
            api.delete(`/Evento/${id}`)
            console.log("Deletado com sucesso");
        } catch (error) {
            console.log("Erro inesperado na API.");
            console.log(error);
        }

        setNotifyUser({
            titleNote: "Sucesso",
            textNote: `Deletado com sucesso!`,
            imgIcon: "success",
            imgAlt:
              "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
            showMessage: true,
          });
    }

// ---------------------------------------------------------------- //

return (
    <MainContent>

        {/* NOTIFICATION */}
        <Notification {...notifyUser} setNotifyUser={setNotifyUser} />

        {/* SPINNER */}
        { showSpinner ? <Spinner /> : null}

        <section className='cadastro-evento-section'>
            <Container>
                <div className='cadastro-evento__box'>

                    {/* TITLE */}
                    <Title titleText={"Cadastro de evento"}/>

                    {/* IMAGE */}
                    <ImageIllustartor 
                        imageRender={eventImage}
                        alterText={""}
                    />
                    
{/* //////////////////////////////////////////////////////////  FORM  /////////////////////////////////////////////////////////// */}

                    <form onSubmit={frmEdit ? handleUpdate : handleSubmit} className="ftipo-evento">
                        {!frmEdit
                            ?
                                (<>
                                {/* INPUT NOME EVENTO */}
                                    <Input 
                                        type={"text"}
                                        id={"NomeEvento"}
                                        name={"Nome"}
                                        placeholder={"Nome"}
                                        required={"required"}
                                        value={name}
                                        manipulationFunction={(e) => {
                                            setName(e.target.value)
                                        }
                                    }
                                    
                                />
                                {/* INPUT DESCRICAO DO EVENTO */}
                                    <Input 
                                        type={"text"}
                                        id={"Descricao"}
                                        name={"Descricao"}
                                        placeholder={"Descrição"}
                                        required={"required"}
                                        value={descricao}
                                        manipulationFunction={(e) => {
                                            setDescricao(e.target.value)
                                        }
                                    }
                                    
                                />

                                {/* INPUT TIPO EVENTO */}
                                    <Select 
                                        type={"text"}
                                        id={"Tipoevento"}
                                        name={"Tipoevento"}
                                        placeholder={"Tipo Evento"}
                                        required={"required"}
                                        value={tipoEvento}
                                        manipulationFunction={(e) => {
                                            setTipoEvento(e.target.value)
                                        }
                                    }
                                />
                                {/* INPUT DATA DO EVENTO */}
                                    <Input 
                                        type={"number"}
                                        id={"Dataevento"}
                                        name={"Dataevento"}
                                        placeholder={"data"}
                                        required={"required"}
                                        value={eventDate}
                                        manipulationFunction={(e) => {
                                            setEventDate(e.target.value)
                                        }
                                    }
                                />

                                {/* BUTTON CADASTRAR */}
                                    <Button 
                                        className='but' // TESTE
                                        text={"Cadastrar"}
                                        type={"submit"}
                                        id={"Button"}
                                        name={"Button"}
                                    />
                            </>)
                            :
                            (<>
                                {/* INPUT NOME EVENTO */}
                                    <Input 
                                        type={"text"}
                                        id={"NomeEvento"}
                                        name={"Nome"}
                                        placeholder={"Nome"}
                                        required={"required"}
                                        value={name}
                                        manipulationFunction={(e) => {
                                            setName(e.target.value)
                                        }
                                    }
                                />

                                {/* INPUT DESCRICAO DO EVENTO */}
                                    <Input 
                                        type={"text"}
                                        id={"Descricao"}
                                        name={"Descricao"}
                                        placeholder={"Descrição"}
                                        required={"required"}
                                        value={descricao}
                                        manipulationFunction={(e) => {
                                            setDescricao(e.target.value)
                                        }
                                    }
                                    
                                />

                                {/* INPUT TIPO EVENTO */}
                                    <Select 
                                        type={"text"}
                                        id={"Tipoevento"}
                                        name={"Tipoevento"}
                                        placeholder={"Tipo Evento"}
                                        required={"required"}
                                        value={tipoEvento}
                                        manipulationFunction={(e) => {
                                            setTipoEvento(e.target.value)
                                        }
                                    }
                                />
                                {/* INPUT DATA DO EVENTO */}
                                    <Input 
                                        type={"number"}
                                        id={"Dataevento"}
                                        name={"Dataevento"}
                                        placeholder={"data"}
                                        required={"required"}
                                        value={eventDate}
                                        manipulationFunction={(e) => {
                                            setEventDate(e.target.value)
                                        }
                                    }
                                />
                                
                                    <div className='buttons-editbox'>

                                        {/* BUTTON ATUALIZAR */}
                                        <Button
                                            text={"Atualizar"}
                                            type={"submit"}
                                            id={"Button-Update"}
                                            name={"Button-Update"}
                                            additionalclass={"button-component--middle"}
                                        />

                                        {/* BUTTON CANCELAR */}
                                        <Button
                                            text={"Cancelar"}
                                            type={"cancel"}
                                            id={"Cancel-Button"}
                                            name={"Cancel-Button"}
                                            additionalclass={"button-component--middle"}
                                            manipulationFunction={() => {editActionAbort()}}
                                        />
                                    </div>
                                
                            </>)
                                    
                        }
                            
                    </form>
                </div>
            </Container>
        </section>

        <section className='lista-eventos-section'>
            <Container>
                <Title titleText={"Lista de eventos"} color="white"/>
                <TableEvent
                dados={evento}
                fnUpdate={showUpdateForm}
                fnDelete={handleDelete}
                />
            </Container>
        </section>
    </MainContent>
    );
};

export default EventosPage;