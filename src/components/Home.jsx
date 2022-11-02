import React, { Component } from "react";
import homeImage from "../assets/images/home-image.jpg";

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <img src={homeImage} alt="Home" width={500} />
            </div>
        );
    }
}
