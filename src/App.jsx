import React from 'react';
//import shortid from 'shortid';
import axios from "axios";
function App() {
   
 
   const [tarea, setTarea] = React.useState('')
   const [tareas, setTareas] = React.useState([])
   const [modoEdicion,setModoEdicion] = React.useState(false)
   const [id,setId] = React.useState(0)
   const [mensageError, setMensageError] =React.useState(false)

  React.useEffect(() => {
    actualizarTareas();
  }, [])


  //Para actualizar tarea_______________________________
  const actualizarTareas = async () => {
    let lastareas = await axios.get("http://localhost:3001/usuarios");
      setTareas(lastareas.data);
  }

  //Para agregar tareas_______________________________
   const agregarTarea = async e => {
     e.preventDefault();
      try {
        if (!tarea.trim()) {
          setMensageError(true);
          return
        }
        await axios.post("http://localhost:3001/usuarios", { title: tarea });
        console.log("Success");
        setTarea("");
        actualizarTareas();
        setMensageError(false);
      } catch (error) {
        console.log(error.message);
      }    
   }
 
//Para eliminar tareas_______________________________   
   const eliminarTarea = async (id) => {
    try {
      await axios.delete("http://localhost:3001/usuarios/"+id,);
      console.log("Success");
      actualizarTareas();
    } catch (error) {
      console.log(error.message);
    }     
   }


   const cambiarEstado = (item) => {
     setModoEdicion(true);
     setTarea(item.title);
     setId(item.id);
   }



//Para editar tareas_______________________________
   const editarTarea = async (e) => {
     e.preventDefault()
     console.log(id);
     try {
      if (!tarea.trim()) {
        setMensageError(true);
        return
      }
      await axios.put("http://localhost:3001/usuarios/"+id, { title: tarea});
      actualizarTareas();     
      setTarea("");
      setModoEdicion(false);
      setMensageError(false);
     } catch (error) {
       console.log(error.message);
     }
   }
  



  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD</h1>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {
              tareas.length === 0 ? (
                <li className="list-group-item none">
                  <div className="alert alert-success text-center margin-right: 3rem" role="alert">
                    <span className="lead">No existen tareas agrege nuevas tareas</span>
                  </div>
                </li>
              ) :
              (
                {/* El mapa de la lista------------------------------------------------------- */},
                tareas.map(item => (
                  <li className="list-group-item" key={item.id}>
                    <span className="lead">{ item.title }</span>
                    <button
                      className="btn btn-danger btn-sm float-end mx-2"
                      onClick={() => eliminarTarea(item.id)}
                    >
                      Eliminar
                    </button>
                    
                    <button
                      className="btn btn-warning btn-sm float-end mx-2"
                      onClick={ () => cambiarEstado(item) }
                    >
                      Editar
                    </button>
                  </li>
                ))
              )
            }
          </ul>
        </div>
        {/* Edicion------------------------------------------------------- */}
        <div className="col-4">
          <h4 className="text-center"> { modoEdicion ? 'Editar' : 'Registrar' }</h4>
          {
            mensageError ? (
              <div class="alert alert-danger d-flex align-items-center" role="alert">                    
                    <div>
                      Este campo<strong> no </strong>puede estar vacio
                    </div>
              </div>
            ) : ( <h6>  </h6> )
          }
          <h4 className="text-center">


            <form onSubmit={ modoEdicion ? editarTarea : agregarTarea }>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Ingrese tarea"
                onChange={e => setTarea(e.target.value)}
                value={tarea}
              />


              {
                modoEdicion ? (
                  <button className="btn btn-warning btn-block" type="submit">Editar</button>
                ): (
                  <button className="btn btn-dark btn-block" type="submit">Agregar</button>
                )
              }
            </form>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default App;