import React, { useEffect, useState } from 'react';
import './TipoEventosPage.css'
import Title from '../../components/Title/Title';
import MainContent from '../../components/MainContent/MainContent';
import Container from '../../components/Container/Container'
import ImageIllustartor from '../../components/ImageIllustartor/ImageIllustartor';
import eventTypeImage from '../../assets/images/tipo-evento.svg'
import { Button, Input } from '../../components/FormComponents/FormComponents';
import api from '../../Services/Service'
import TableTp from './TableTp/TableTp';
import Notification from '../../components/Notification/Notification';
import Spinner from '../../components/Spinner/Spinner';

const TipoEventos = () => {

    const [frmEdit, setFrmEdit] = useState(false)

    const [notifyUser, setNotifyUser] = useState({})
    const [showSpinner, setShowSpinner] = useState(true)

    const [title, setTitle] = useState("")
    const [tiposEventos, setTiposEventos] = useState([]);//array
    const [idTipoEvento, setIdTipoEventos] = useState("")

    useEffect(() => {
        async function getTipoEventos() {
            setShowSpinner(true);
            try {
                const promise = await api.get("/TiposEvento")
                
                console.log(promise.data);
                setTiposEventos(promise.data)
            } catch (error) {
                console.log("deu ruim aq")
                console.log(error);
            }
        }
        getTipoEventos()
    }, [])


    async function handleSubmit(e) {
        //parar o submit do form
        e.preventDefault();
        //validar pelo menos 3 caracteres
        if (title.trim().length < 3) {
            alert("O título precisa ter mais de 3 letras!")
            return
        }
        //chamar api
        try {
            const retorno = await api.post("/TiposEvento", { titulo: title })
            console.log("Cadastrado com sucesso");
            console.log(retorno.data);
            setTitle("")
        } catch (error) {
            console.log("deu ruim na api");
            console.log(error);
        }

        setNotifyUser({
            titleNote: "Sucesso",
            textNote: `Cadastrado com sucesso!`,
            imgIcon: "success",
            imgAlt:
              "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
            showMessage: true,
          });
    }
    async function handleUpdate(e) {
        e.preventDefault();

        try {
            //Salvar os dados
            const retorno = await api.put(`/TiposEvento/${idTipoEvento}`,{
                titulo: title
            })

            //Atualizar o state (GET)
            const retornoGet = await api.get('/TiposEvento');
            setTiposEventos(retornoGet.data); // Atualiza o state da tabela

            console.log("Atualizado com sucesso.");
            editActionAbort();
        } catch (error) {
            console.log("Problemas na atualização");
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
    async function showUpdateForm(idTipoEvento) {
        setFrmEdit(true);
        try {
            const retorno = await api.get(`/TiposEvento/${idTipoEvento}`)
            setTitle(retorno.data.titulo)
            setIdTipoEventos(idTipoEvento)

            const retornoGet = await api.get('/TiposEvento');
            setTiposEventos(retornoGet.data);
        } catch (error) {
            console.log("deu ruim aq");
        }
    }
    function editActionAbort() {
        setFrmEdit(false)
        setTitle("")
        setIdTipoEventos(null);
    }
    async function handleDelete(id) {
        try {
            api.delete(`/TiposEvento/${id}`)
            console.log("Deletado com sucesso.")

            const retornoGet = await api.get('/TiposEvento');
            setTiposEventos(retornoGet.data);
        } catch (error) {
            console.log("deu ruim aq")
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

    return (
        <MainContent>
            <Notification {...notifyUser} setNotifyUser={setNotifyUser} />
            
            { showSpinner ? <Spinner /> : null}
            {/* Cadastro tipo de eventos */}
            <section className='cadastro-evento-section'>
                <Container>
                    <div className="cadastro-evento__box">
                        <Title titleText={"Página de Tipos de Evento"} />
                        <ImageIllustartor
                            imageRender={eventTypeImage}
                            alterText={""}

                        />

                        <form onSubmit={frmEdit ? handleUpdate : handleSubmit} className="ftipo-evento">
                            {!frmEdit
                                ?
                                (<>
                                    <Input
                                        type={"text"}
                                        id={"Titulo"}
                                        name={"Titulo"}
                                        placeholder={"Titulo"}
                                        required={"required"}
                                        value={title}
                                        manipulationFunction={
                                            (e) => {
                                                setTitle(e.target.value)
                                            }
                                        }
                                    />

                                    <Button
                                        text={"Cadastrar"}
                                        type={"submit"}
                                        id={"Button"}
                                        name={"Button"}
                                    />
                                </>)
                                :
                                (<>
                                    <Input
                                        type={"text"}
                                        id={"Titulo"}
                                        name={"Titulo"}
                                        placeholder={"Titulo"}
                                        required={""}
                                        value={title}
                                        manipulationFunction={
                                            (e) => {
                                                setTitle(e.target.value)
                                            }
                                        }
                                    />

                                    <div className='buttons-editbox'>
                                        <Button
                                            text={"Atualizar"}
                                            type={"submit"}
                                            id={"Button-Update"}
                                            name={"Button-Update"}
                                            additionalclass={"button-component--middle"}
                                        />

                                        <Button
                                            text={"Cancelar"}
                                            type={"cancel"}
                                            id={"Cancel-Button"}
                                            name={"Cancel-Button"}
                                            additionalclass={"button-component--middle"}
                                            manipulationFunction={() => {editActionAbort()}}
                                        />
                                    </div>
                                </>


                                )
                            }
                        </form>
                    </div>
                </Container>
            </section>

            {/* Listagem de eventos */}
            <section className='lista-eventos-section'>
                <Container>
                    <Title titleText={"Lista Tipo de Eventos"} color="white" />

                    <TableTp
                        dados={tiposEventos}
                        fnUpdate={showUpdateForm}
                        fnDelete={handleDelete}
                    />

                </Container>
            </section>
        </MainContent>
    );
};

export default TipoEventos;