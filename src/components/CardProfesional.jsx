export default function CardProfesional({ profesionales }) {
  return (
    <>
      <div className="">
        <h5>{profesionales.nombre}</h5>
        <p>{profesionales.mas_info}</p>

      </div>
    </>
  );
}
