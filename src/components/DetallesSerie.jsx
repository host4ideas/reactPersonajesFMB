import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class DetallesSerie extends Component {
    render() {
        return (
            <div className="d-flex justify-content-center">
                <div className="mt-5">
                    <div className="card" style={{ width: "18rem" }}>
                        <img
                            src={this.props?.serie?.imagen}
                            className="card-img-top"
                            alt="Serie"
                        />
                        <div className="card-body">
                            <h5 className="card-title">
                                {this.props?.serie?.nombre}
                            </h5>
                            <p className="card-text">
                                <p>Año: {this.props?.serie?.anyo}</p>
                                <p>
                                    Puntuacion: {this.props?.serie?.puntuacion}
                                </p>
                            </p>
                            <Link
                                to={`/personajesSerie/${this.props?.serie?.idSerie}`}
                                className="btn btn-success"
                            >
                                Personajes
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
