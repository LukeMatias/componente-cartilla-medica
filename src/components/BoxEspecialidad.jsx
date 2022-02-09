import CardProfesional from "./CardProfesional";

export default function BoxEspecialidad({ especialidad, profesionales }) {
  //   console.log("desde box", profesionales);
  return (
    <div>
      <h2>{especialidad}</h2>
      <div className="">
        {profesionales.map((el, i) => {
          if (el.especialidad === especialidad) {
            return <CardProfesional key={i} profesionales={el} />;
          }
        })}
      </div>
    </div>
  );
}
