import React, { Component } from "react";
import axios from "axios";
import Global from "../Global";
import { Link } from "react-router-dom";

export default class PersonajesSerie extends Component {
    state = {
        personajes: [],
    };

    /**
     * Cogemos los personajes para mostrarlos en la tabla
     */
    getPersonajes = () => {
        const request =
            Global.urlSeries +
            `/api/Series/PersonajesSerie/${this.props.idSerie}`;
        axios.get(request).then((res) => {
            console.log(res.data);
            this.setState({
                personajes: res.data,
            });
        });
    };

    componentDidMount() {
        this.getPersonajes();
    }

    render() {
        return (
            <div>
                <table className={"table"}>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Imagen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state?.personajes?.map((personaje, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{personaje.idPersonaje}</th>
                                    <td>{personaje.nombre}</td>
                                    <td>
                                        <img
                                            src={personaje.imagen}
                                            width={150}
                                            alt="Personaje"
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <Link
                    className="btn btn-success"
                    to={`/detallesSerie/${this.props?.indiceSerieActual}`}
                >
                    Volver
                </Link>
            </div>
        );
    }
}
