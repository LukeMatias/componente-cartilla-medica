import { useEffect, useState, useReducer } from "react";
import "./App.css";
import BoxEspecialidad from "./components/BoxEspecialidad";

const initialState = {
  profesionales: [],
  copiaProfesionales: [],
  especialidades: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "fetchApi":
      return {
        ...state,
        profesionales: action.data,
        copiaProfesionales: action.data,
      };
    case "especialidades":
      let especialidadesLimpias = Array.from(new Set(state.copiaProfesionales.map(e => e.especialidad)))
      //   //pushes only unique element
      //   // let especialidadesLimpias = [];
      //   // state.copiaProfesionales.map((p) => {
      //   //   //pushes only unique element
      //   //   if (!especialidadesLimpias.includes(p.especialidad)) {
      //   //     especialidadesLimpias.push(p.especialidad);
      //   //   }
      console.log(state)
      return { ...state, especialidades: especialidadesLimpias };

    case "filtrar":
      let buscadosInputs = state.copiaProfesionales.filter((e) => e.nombre.toLowerCase().includes(action.buscar.toLowerCase()));

      let newCategorias = buscadosInputs.map(e => e.especialidad)
      console.log("filtrados ", buscadosInputs);
      console.log("action ", action.buscar);
      return {
        ...state,
        profesionales: buscadosInputs,
        especialidades: newCategorias
      };
    default:
      return {
        ...state,
        profesionales: state.copiaProfesionales,
      };
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [search, setSearch] = useState("");
  const [selectEspecialidades, setSelectEspecialidades] = useState("");

  let url = "https://clinicasanjorge.panalsoft.com/profesionales.json";

  // ******************
  // Fetching data
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((prof) => {
        dispatch({ type: "fetchApi", data: prof });
        dispatch({ type: "especialidades" });
      })
      .catch((err) => console.log(err.message));
  }, []);

  // ******************
  // Handlers
  function handleChangeInput(e) {
    setSearch(e.target.value);
    console.log(search);
  }

  function handleChangeSelect(e) {
    setSelectEspecialidades(e.target.value);
    dispatch({ type: "filtrar", buscar: selectEspecialidades });
    console.log(state);
  }

  function handleClick(e) {
    e.preventDefault();
    dispatch({ type: "filtrar", buscar: search });
    console.log(state)
  }


  // ******************
  // Render component
  return (
    <div className="container">
      <h2> Profesionales</h2>
      {/* Inputs */}
      <div className="row">
        <input
          type="text"
          name={search}
          placeholder="Buscar profesional"
          autoFocus={true}
          onChange={(e) => handleChangeInput(e)}
        />
        <input type="submit" onClick={(e) => handleClick(e)} />
        <select onChange={(e) => handleChangeSelect(e)}>
          {state.especialidades.map((e, i) => (
            <option key={i} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>
      {/* Section */}
      <section className="container">
        {state.especialidades.length ? (
          state.especialidades.map((esp, i) => (
            <BoxEspecialidad
              key={i}
              especialidad={esp}
              profesionales={state.profesionales}
            />
          ))
        ) : (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
