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
    const [idInstituicao, setIdInstituicao] = useState("63e9879b-9d01-43ae-914b-0863bcb349e3")
    

    const [evento, setEvento] = useState([])
    const [idEvento, setIdEvento] = useState("")
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
                console.log(tipoE.data);
                setEvento(promise.data)
                setTiposEvento(tipoE.data)

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
            const retorno = await api.post("/Evento", { 
                nomeEvento: name, 
                descricao: descricao,
                idTipoEvento: tipoEvento, 
                dataEvento: eventDate,
                idInstituicao: idInstituicao 
                })
            console.log("Cadastrado com sucesso!");
            console.log(retorno.data);
            setName("")
            setDescricao("")
            setTipoEvento("")
            setEventDate("")

            const event = await api.get(`/Evento`);
            console.log(event.data);
            setEvento(event.data)
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

    // Salvar os dados (PUT)
        try {
            const retorno = await api.put(`/Evento/${idEvento}`,{
                NomeEvento : name
            })
    // Atualizar state (GET)
            const retornoGet = await api.get('/Evento');
            setEvento(retornoGet.data)
            console.log("Atualizado com sucesso!");
            editActionAbort();

            const event = await api.get(`/Evento`);
            console.log(event.data);
            setEvento(event.data)
        } 
    // Erro na api (GET)
        catch (error) 
        {
            console.log("Erro inesperado na API.");
            console.log(evento.data)
        }

        setNotifyUser({
            titleNote: "Sucesso",
            textNote: `Atualizado com sucesso!`,
            imgIcon: "success",
            imgAlt:
              "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
            showMessage: true,
          });
    }

// ---------------------------------------------------------------- //

// UPDATE FORM
    async function showUpdateForm(idEvento) {
        setFrmEdit(true)

        try {
            const retorno = await api.get(`/Evento/${idEvento}`)
            setName(retorno.data.NomeEvento)
            // setDescricao
            // setEventDate
            setIdEvento(idEvento)
        } 
        catch (error) 
        {
            console.log("Erro inesperado na API.");
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

// EDIT ACTION ABORT
    function editActionAbort() 
    {
        setFrmEdit(false)
        setName("")
        setIdEvento(null);
    }

// ---------------------------------------------------------------- //

// HANDLE DELETE
    async function handleDelete(id) 
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

          const event = await api.get(`/Evento`);
            console.log(event.data);
            setEvento(event.data)
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
                                        dados={tiposEvento}
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
                                        type={"date"}
                                        id={"Dataevento"}
                                        name={"Dataevento"}
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
                                        dados={tiposEvento}
                                        id={"Tipoevento"}
                                        name={"Tipoevento"}
                                        required={"required"}
                                        value={tipoEvento}
                                        manipulationFunction={(e) => {
                                            setTipoEvento(e.target.value)
                                        }
                                    }
                                />
                                {/* INPUT DATA DO EVENTO */}
                                    <Input 
                                        type={"date"}
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