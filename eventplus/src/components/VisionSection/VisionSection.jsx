import React from "react";
import "./VisionSection.css";
import Title from "../Title/Title";

const VisionSection = () => {
  return (
    <section className="vision">
      <div className="vision-box">
        <Title titleText={"Visão"} color='white' additionalClass="vision__title"/> 
        <p className="vision__text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam repudiandae fugit molestias natus, quae asperiores perspiciatis iusto atque et tenetur voluptate nam magni neque ab dolor, rerum cumque. Omnis, nostrum.
          Corrupti numquam libero eos, reiciendis nisi repudiandae blanditiis alias suscipit obcaecati ad deleniti accusamus in odit repellat porro ullam iste laudantium voluptatem rerum, incidunt error molestias assumenda. Aspernatur, porro ex?
        </p>
      </div>
    </section>
  );
};

export default VisionSection;
