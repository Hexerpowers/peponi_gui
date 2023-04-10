import React, {Component} from 'react';
import power_ico_0 from "../../Assets/Img/AppBar/power/power_state_0.png";
import power_ico_1 from "../../Assets/Img/AppBar/power/power_state_1.png";
import power_ico_2 from "../../Assets/Img/AppBar/power/power_state_2.png";
import Swal from "sweetalert2";

class PowerItem extends Component {
    constructor(props) {
        super(props);
        this.openPower = this.openPower.bind(this)
        this.base_url = "http://127.0.0.1:5053/api/v1/get/power"
        this.state = {
            gen_status: "не запущен",
            out_status: "не выдано",
            icon: power_ico_0,
            voltage: 0,
            current: 0
        }
    }

    componentDidMount() {
        setInterval(() => {
            if (this.props.state){
                fetch(this.base_url)
                    .then(response => response.json())
                    .then(data => {
                        switch (data['status']){
                            case '1':
                                this.setState({gen_status: "запущен"})
                                this.setState({out_status: "не выдано"})
                                this.setState({icon: power_ico_1})
                                this.props.elevate(false)
                                break
                            case '2':
                                this.setState({gen_status: "запущен"})
                                this.setState({out_status: "выдано"})
                                this.setState({icon: power_ico_2})
                                this.props.elevate(true)
                                break
                            default:
                                this.setState({gen_status: "не запущен"})
                                this.setState({out_status: "не выдано"})
                                this.setState({icon: power_ico_0})
                                this.props.elevate(false)
                                break
                        }
                        this.setState({voltage: data['voltage']})
                        this.setState({current: data['current']})
                    });
            }else{
                this.setState({gen_status: "не запущен"})
                this.setState({out_status: "не выдано"})
                this.setState({icon: power_ico_0})
                this.setState({voltage: 0})
                this.setState({current: 0})
                this.props.elevate(false)
            }
        }, 1000)
    }



    openPower() {
        Swal.fire({
            title: '<strong>Генератор</strong>',
            width: '500px',
            position:'top-right',
            html:
                '<div class="abi-lnk-holder">'+
                '<div class="abi-lnk-line">Состояние: <i>'+this.state.gen_status+'</i></div>'+
                '<div class="abi-lnk-line">Питание на коптер: <i>'+this.state.out_status+'</i></div>'+
                '<div class="abi-lnk-line">Напряжение (на коптере): <i>'+this.state.voltage+' В</i></div>'+
                '<div class="abi-lnk-line">Ток (на коптере): <i>'+this.state.current+' А</i></div>'+
                '</div>',
            showCloseButton: true,
            showConfirmButton: false,
        })
    }

    render() {
        return (
            <div onClick={this.openPower} className="appbar-icon-item">
                <img draggable="false" className="appbar-img-icon" src={this.state.icon} alt=""/>
                <div className="img-toast-lower">
                    [Г]
                </div>
                <div className="appbar-description">Генер.</div>
            </div>
        );
    }
}

export default PowerItem;
