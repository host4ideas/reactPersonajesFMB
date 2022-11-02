import React, { Component } from "react";
import { Navigate, redirect } from "react-router-dom";
import Global from "../Global";
import axios from "axios";

export default class ModificarPersonaje extends Component {
    state = {
        redirect: false,
        personajes: [],
        indexSerieSeleccionada: null,
        indexPersonajeSeleccionado: null,
    };

    selectSerie = React.createRef();
    selectPersonaje = React.createRef();

    /**
     * Solo necesitamos hacer una peticion a la API para recoger los personajes,
     * ya que las series, las pasamos por props desde el Router
     */
    getPersonajes = () => {
        const request = Global.urlSeries + `/api/Personajes`;
        axios
            .get(request)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    personajes: res.data,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    /**
     * Cambiamos el state con un nuevo personaje seleccionado. Volvemos a renderizar la página
     * @param {Event} ev Evento para ser controlado
     */
    changePersonaje = (ev) => {
        ev.preventDefault();

        this.setState({
            indexPersonajeSeleccionado: this.selectPersonaje.current.value,
        });
    };

    /**
     * Cambiamos el state con la nueva serie seleccionada. Volvemos a renderizar la página
     * @param {Event} ev Evento para ser controlado
     */
    changeSerie = (ev) => {
        ev.preventDefault();
        this.setState({
            indexSerieSeleccionada: this.selectSerie.current.value,
        });
    };

    /**
     * Controlamos el submit y actualizamos el personaje en la BBDD
     * @param {Event} ev Evento para ser controlado
     */
    handleSubmit = (ev) => {
        ev.preventDefault();

        const idSerie =
            this.props.series[this.state.indexSerieSeleccionada].idSerie;
        const idPersonaje =
            this.state.personajes[this.state.indexPersonajeSeleccionado]
                .idPersonaje;

        const request =
            Global.urlSeries + `/api/Personajes/${idPersonaje}/${idSerie}`;

        axios
            .put(request)
            .then(() => {
                console.log("Personaje modificado");
                this.setState({
                    redirect: true,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    componentDidMount() {
        // Cargamos los personajes al cargar el componente
        this.getPersonajes();
    }

    render() {
        if (this.state.redirect) {
            return (
                <Navigate
                    to={`/personajesSerie/${
                        this.props.series[this.state.indexSerieSeleccionada]
                            ?.idSerie
                    }`}
                    replace={true}
                />
            );
        }
        return (
            <div>
                <h1>Modificar Personaje</h1>
                <form className="m-4" onSubmit={this.handleSubmit}>
                    {/* Series */}
                    <div className="row mb-3">
                        <div className="form-group">
                            <label for="selectSerie">
                                Selecciona una serie
                            </label>
                            <select
                                id="selectSerie"
                                ref={this.selectSerie}
                                className="form-select"
                                aria-label="Default select example"
                                onChange={this.changeSerie}
                            >
                                {this.props.series?.map((serie, index) => {
                                    return (
                                        <option key={index} value={index}>
                                            {serie.nombre}
                                        </option>
                                    );
                                })}
                            </select>
                            {this.state.indexSerieSeleccionada && (
                                <img
                                    src={
                                        this.props.series[
                                            this.state.indexSerieSeleccionada
                                        ]?.imagen
                                    }
                                    alt="Serie"
                                />
                            )}
                        </div>
                    </div>
                    {/* Personajes */}
                    <div className="row mb-3">
                        <div className="form-group">
                            <label for="selectPersonaje">
                                Selecciona un personaje
                            </label>
                            <select
                                ref={this.selectPersonaje}
                                id="selectPersonaje"
                                className="form-select"
                                aria-label="Default select example"
                                onChange={this.changePersonaje}
                            >
                                {this.state.personajes?.map(
                                    (personaje, index) => {
                                        return (
                                            <option key={index} value={index}>
                                                {personaje.nombre}
                                            </option>
                                        );
                                    }
                                )}
                            </select>
                            {this.state?.indexPersonajeSeleccionado && (
                                <img
                                    src={
                                        this.state.personajes[
                                            this.state
                                                .indexPersonajeSeleccionado
                                        ].imagen
                                    }
                                    alt="Personaje"
                                />
                            )}
                        </div>
                    </div>

                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary">
                            Modificar personaje
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
