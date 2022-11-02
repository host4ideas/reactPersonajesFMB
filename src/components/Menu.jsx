import React, { Component } from "react";
import { Outlet, Link } from "react-router-dom";
import menuIcon from "../assets/images/menu-icon.png";

export default class Menu extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            <img width={50} src={menuIcon} alt="Champions" />
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarSupportedContent"
                        >
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/"}>
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to={"/nuevoPersonaje"}
                                    >
                                        Nuevo Personaje
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to={"/modificarPersonaje"}
                                    >
                                        Modificar Personaje
                                    </Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Series
                                    </Link>
                                    <ul className="dropdown-menu">
                                        {this.props?.series?.map(
                                            (serie, index) => {
                                                return (
                                                    <li key={index}>
                                                        <Link
                                                            key={index}
                                                            className="dropdown-item"
                                                            to={`/detallesSerie/${index}`}
                                                        >
                                                            {serie.nombre}
                                                        </Link>
                                                    </li>
                                                );
                                            }
                                        )}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* Outlet nos permite insertar componentes definidos por las rutas, 
                en este caso, todos los componentes hijos de la ruta /, se insertarán */}
                <Outlet />
            </div>
        );
    }
}
