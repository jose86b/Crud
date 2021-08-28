import React from 'react'
import {
    BrowserRouter as Router ,
    Switch,
    Route,
    Link,
    NavLink,
  } from 'react-router-dom';
function Menu() {
    return (
        <div className="btn-grup">
            <Link to="./" className="btn btn-warning">Inicio</Link>
            <Link to="./conosenos" className="btn btn-warning">Conosenos</Link>
            <NavLink to="./contactanos" className="btn btn-warning">Contactanos</NavLink>
        </div>
    )
}
export default Menu;
