import React, { Component } from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Global from "../Global";
import axios from "axios";
import Menu from "../components/Menu";
import Home from "../components/Home";
import ModificarPersonaje from "../components/ModificarPersonaje";
import NuevoPersonaje from "../components/NuevoPersonaje";
import DetallesSerie from "../components/DetallesSerie";
import PersonajesSerie from "../components/PersonajesSerie";

export default class Router extends Component {
    state = {
        series: [],
    };

    indiceSerieActual = 0;

    /**
     * Cargamos las series para mostrarlas en el menu
     * Además, al cargarlas en el router, podemos pasar la lista de series por props,
     * esto nos permite mostrar las series en diferentes componentes sin necesidad de
     * realizar peticiones adicionales.
     */
    getSeries = () => {
        const request = Global.urlSeries + "/api/Series";

        axios
            .get(request)
            .then((res) => {
                this.setState({
                    series: res.data,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    componentDidMount() {
        // Cargamos las series al iniciar
        this.getSeries();
    }

    render() {
        /**
         * Al no poder utilizar los parámetros de ruta directamente, accedemos a ellos en esta funcion, la cual nos devuelve
         * el componente en sí, con los parámetros de ruta como props.
         * @returns {DetallesSerie}
         */
        const DetallesSerieElement = () => {
            const { indexSerie } = useParams();

            this.indiceSerieActual = indexSerie;

            return (
                <DetallesSerie
                    serie={this.state.series[this.indiceSerieActual]}
                    indiceSerieActual={this.indiceSerieActual}
                />
            );
        };

        /**
         * Al no poder utilizar los parámetros de ruta directamente, accedemos a ellos en esta funcion, la cual nos devuelve
         * el componente en sí, con los parámetros de ruta como props.
         * @returns {PersonajesSerie}
         */
        const PersonajesSerieElement = () => {
            const { idSerie } = useParams();

            return (
                <PersonajesSerie
                    idSerie={idSerie}
                    indiceSerieActual={this.indiceSerieActual}
                />
            );
        };

        return (
            <BrowserRouter>
                <Routes>
                    {/* Al poner rutas hijas del componente Menu, se insetarán los componentes
                    donde hayamos localizado el elemento Outlet dentro de Menu.
                    
                    Esto nos permitiría tener varios Lyaouts y/o menús por grupos de páginas*/}
                    <Route
                        path="/"
                        element={<Menu series={this.state.series} />}
                    >
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/detallesSerie/:indexSerie"
                            element={<DetallesSerieElement />}
                        />
                        <Route
                            path="/modificarPersonaje/"
                            element={
                                <ModificarPersonaje
                                    series={this.state.series}
                                />
                            }
                        />
                        <Route
                            path="/nuevoPersonaje"
                            element={
                                <NuevoPersonaje series={this.state.series} />
                            }
                        />
                        <Route
                            path="/personajesSerie/:idSerie"
                            element={<PersonajesSerieElement />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    }
}
