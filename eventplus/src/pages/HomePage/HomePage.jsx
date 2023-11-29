import React, { useEffect, useState } from "react";
import "./HomePage.css";
import Title from "../../components/Title/Title";
import MainContent from "../../components/MainContent/MainContent";
import Banner from "../../components/Banner/Banner";
import VisionSection from "../../components/VisionSection/VisionSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import NextEvent from "../../components/NextEvent/NextEvent";
import Container from "../../components/Container/Container";
import api from '../../Services/Service'
import { useContext } from "react";
import { UserContext } from "../../context/AuthContext";

const HomePage = () => {
  const {userData} = useContext(UserContext)
  console.log("DADOS GLOBAIS DO USUARIO");
  console.log(userData);
  //Fake mock - api mocada
  const [nextEvents, setNextEvents] = useState([]);

  useEffect(() => {
    // chamar a api
    async function getNextEvets() {
      try {
        const promise = await api.get("/Evento/ListarProximos")

        console.log(promise.data);
        setNextEvents(promise.data)
      } catch (error) {
        console.log("deu ruim aq")
      }
    }
    getNextEvets();
  }, [])

  return (
    <MainContent>
      <Banner />

      <section className="proximos-eventos">
        <Container>
          <Title titleText="Próximos Eventos" additionalClass="margem-acima" />
          <div className="events-box">
            {nextEvents.map((e) => {
              return (
                <NextEvent
                  title={e.nomeEvento}
                  description={e.descricao}
                  eventDate={e.dataEvento}
                  idEvento={e.idEvento}
                />
              );
            })}
          </div>
        </Container>
      </section>

      <VisionSection />
      <ContactSection />
    </MainContent>
  );
};
export default HomePage;
