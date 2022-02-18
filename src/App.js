import { useEffect, useState, useReducer } from "react";
import "./App.css";
import BoxEspecialidad from "./components/BoxEspecialidad";

const initialState = {
  profesionales: [],
  copiaProfesionales: [],
  especialidades: [],
  copiaEspecialidades: [],
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
      let especialidadesLimpias = Array.from(new Set(state.copiaProfesionales.map((e) => e.especialidad)));
      return {
        ...state,
        especialidades: especialidadesLimpias,
        copiaEspecialidades: especialidadesLimpias,
      };

    case "filtrarInput":
      let buscadosInputs = state.copiaProfesionales.filter(
        (e) =>
          e.nombre.toLowerCase().includes(action.buscar.toLowerCase()) ||
          e.especialidad.toLowerCase().includes(action.buscar.toLowerCase())
      );

      let newCategorias = buscadosInputs.length
        ? Array.from(new Set(buscadosInputs.map((e) => e.especialidad)))
        : state.copiaEspecialidades;
        console.log("state", state)
      return {
        ...state,
        profesionales: buscadosInputs,
        especialidades: newCategorias,
      };
    case "filtrarInput&Select":
      let buscadosInputsAndSelect = state.profesionales.filter(
        (e) => e.especialidad === action.buscarSelect
      );
      let especialidadFilter = buscadosInputsAndSelect.especialidad
      return {
        ...state,
        profesionales: buscadosInputsAndSelect,
        especialidades : especialidadFilter
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
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectEspecialidades, setSelectEspecialidades] = useState("");

  let url = "https://clinicasanjorge.panalsoft.com/profesionales.json";

  // ******************
  // Fetching data
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((prof) => {
        setLoading(false);
        dispatch({ type: "fetchApi", data: prof });
        dispatch({ type: "especialidades" });
      })
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    if (search.length) dispatch({ type: "filtrarInput", buscar: search });

    if (search.length && selectEspecialidades.length)
      dispatch({
        type: "filtrarInput&Select",
        buscarSelect: selectEspecialidades,
      });
    console.log(search, selectEspecialidades);
  }, [search]);

  // ******************
  // Handlers
  function handleChangeInput(e) {
    setSearch(e.target.value);
  }

  function handleChangeSelect(e) {
    setSelectEspecialidades(e.target.value);
  }

  // ******************
  // Render component
  return (
    <div className="container">
      <h2> Profesionales</h2>
      {/* ****************** */}
      {/* Input & Select */}

      <div className="row">
        <input
          type="text"
          name={search}
          placeholder="Buscar profesional"
          autoFocus={true}
          onChange={(e) => handleChangeInput(e)}
        />

        <select onChange={(e) => handleChangeSelect(e)}>
          {state.especialidades.map((e, i) => (
            <option key={i} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>
      {/* ****************** */}
      {/* Section */}
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <section className="container">
          {state.especialidades.length && state.profesionales.length ? (
            state.especialidades.map((esp, i) => (
              <BoxEspecialidad
                key={i}
                especialidad={esp}
                profesionales={state.profesionales}
              />
            ))
          ) : (
            <div className="alert alert-danger" role="alert">
              No hubo coincides en tu búsqueda.{" "}
              <a href="#" className="alert-link">
                Reestablecer{" "}
              </a>
              la misma por favor.
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default App;
