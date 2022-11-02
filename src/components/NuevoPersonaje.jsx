import React, { Component } from "react";
import Global from "../Global";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default class NuevoPersonaje extends Component {
    /**
     * @typedef {Object} nuevoPersonaje Objecto nuevo personaje
     * @property {Number} - idPersonaje (opcional)
     * @property {String} - nombre Nuevo nombre para el personaje
     * @property {String} - idSerie Serie para la que queremos insertar el nuevo personaje
     */

    state = {
        redirigir: false,
    };

    selectSerie = React.createRef();
    inputImagen = React.createRef();
    inputNombre = React.createRef();

    handleSubmit = (ev) => {
        ev.preventDefault();

        const request = Global.urlSeries + "/api/Personajes";

        /**
         * @type {nuevoPersonaje}
         */
        const nuevoPersonaje = {
            nombre: this.inputNombre.current.value,
            imagen: this.inputImagen.current.value,
            idSerie: parseInt(this.selectSerie.current.value),
        };

        axios
            .post(request, nuevoPersonaje)
            .then(() => {
                this.setState({
                    redirigir: true,
                });
                console.log("Personaje Añadido");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    render() {
        // Si queremos edirigir devolvemos en el render un Navigate 
        if (this.state.redirigir) {
            return (
                <Navigate
                    to={`/personajesSerie/${this.selectSerie.current.value}`}
                    replace={true}
                />
            );
        }

        return (
            <div>
                <h1>Nuevo Personaje</h1>
                <form className="m-4" onSubmit={this.handleSubmit}>
                    <div className="row mb-3">
                        <label
                            htmlFor="inputNombre"
                            className="col-sm-2 col-form-label"
                        >
                            Nombre
                        </label>
                        <div className="col-sm-10">
                            <input
                                ref={this.inputNombre}
                                type="text"
                                className="form-control"
                                id="inputNombre"
                                placeholder="Introduce el nombre del personaje"
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label
                            htmlFor="inputImagen"
                            className="col-sm-2 col-form-label"
                        >
                            Imagen
                        </label>
                        <div className="col-sm-10">
                            <input
                                ref={this.inputImagen}
                                type="text"
                                className="form-control"
                                id="inputImagen"
                                placeholder="Introduce la url de la imagen"
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="form-group">
                            <label for="selectSerie">
                                Selecciona una serie
                            </label>
                            <select
                                ref={this.selectSerie}
                                id="selectSerie"
                                className="form-select"
                                aria-label="Default select example"
                            >
                                {this.props?.series?.map((serie, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={serie.idSerie}
                                        >
                                            {serie.nombre}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary">
                            Añadir personaje
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
