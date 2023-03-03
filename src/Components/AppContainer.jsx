import {Component} from "react";
import "../Assets/Styles/Common/AppContainer.css"

export class AppContainer extends Component {
    render() {
        return (
            <div className="app-container">
                {this.props.children}
            </div>
        );
    };
}
