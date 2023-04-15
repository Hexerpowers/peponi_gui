import React, {Component} from 'react';

import hank_extend_0 from "../../Assets/Img/AppBar/hank/hank_extend_0.png"
import hank_extend_1 from "../../Assets/Img/AppBar/hank/hank_extend_1.png"
import hank_extend_2 from "../../Assets/Img/AppBar/hank/hank_extend_2.png"
import hank_extend_3 from "../../Assets/Img/AppBar/hank/hank_extend_3.png"

import hank_retract_0 from "../../Assets/Img/AppBar/hank/hank_retract_0.png"
import hank_retract_1 from "../../Assets/Img/AppBar/hank/hank_retract_1.png"
import hank_retract_2 from "../../Assets/Img/AppBar/hank/hank_retract_2.png"
import hank_retract_3 from "../../Assets/Img/AppBar/hank/hank_retract_3.png"

import hank_still from "../../Assets/Img/AppBar/hank/hank_still.png"
import hank_no_link from "../../Assets/Img/AppBar/hank/hank_no_link.png"
import Swal from "sweetalert2";

class HankItem extends Component {
    constructor(props) {
        super(props);
        this.openHank = this.openHank.bind(this)

        this.base_url = "http://127.0.0.1:5053/api/v1/get/hank"

        this.counter = 0

        this.state = {
            icon: hank_no_link,
            direction:0,
            load:'-',
            length:'-',
            op_time:'-'
        }
    }

    addEvent(element, eventName, callback) {
        if (element.addEventListener) {
            element.addEventListener(eventName, callback, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + eventName, callback);
        } else {
            element["on" + eventName] = callback;
        }
    }

    componentDidMount() {
        let self = this
        this.addEvent(document, "keypress", function (e) {
            if(e.keyCode === 114){
                self.openHank()
            }
        });
        setInterval(() => {
            if (this.state.direction===1) {
                switch (this.counter) {
                    case 0:
                        this.setState({icon: hank_extend_0});
                        break;
                    case 1:
                        this.setState({icon: hank_extend_1});
                        break;
                    case 2:
                        this.setState({icon: hank_extend_2});
                        break;
                    case 3:
                        this.setState({icon: hank_extend_3});
                        break;
                }
                if (this.counter === 3) {
                    this.counter = 0
                } else {
                    this.counter++
                }
            }

        }, 200)

        setInterval(() => {
            if (this.state.direction===-1) {
                switch (this.counter) {
                    case 0:
                        this.setState({icon: hank_retract_0});
                        break;
                    case 1:
                        this.setState({icon: hank_retract_1});
                        break;
                    case 2:
                        this.setState({icon: hank_retract_2});
                        break;
                    case 3:
                        this.setState({icon: hank_retract_3});
                        break;
                }
                if (this.counter === 3) {
                    this.counter = 0
                } else {
                    this.counter++
                }
            }

        }, 200)

        setInterval(() => {
            if (this.props.state){
                fetch(this.base_url)
                    .then(response => response.json())
                    .then(data => {
                        if (Math.abs(Number(data['length'])-this.state.length)<1){
                            this.setState({direction: 0})
                            this.setState({icon: hank_still});
                        }else{
                            this.setState({direction: Number(data['direction'])})
                        }
                        this.setState({load: Number(data['load'])})
                        this.setState({length: Number(data['length'])})
                        this.setState({op_time: Number(data['op_time'])})
                    });
            }else{
                this.setState({direction: 0})
                this.setState({load: '-'})
                this.setState({length: '-'})
                this.setState({op_time: '-'})
                this.setState({icon: hank_no_link});
            }
        }, 1000)
    }

    openHank() {
        Swal.fire({
            title: '<strong>Катушка</strong>',
            width: '500px',
            position: 'top-right',
            showClass: {popup: ''},
            hideClass: {popup: ''},
            html:
                '<div class="abi-lnk-holder">' +
                '<div class="abi-lnk-line">Режим: <i>Поддержание натяжения</i></div>' +
                '<div class="abi-lnk-line">Выдано кабеля: <i>'+this.state.length+' м</i></div>' +
                '<div class="abi-lnk-line">Натяжение кабеля: <i>'+this.state.load+' кг</i></div>' +
                '<div class="abi-lnk-line">Наработка кабеля: <i>'+this.state.op_time+' ч</i></div>' +
                '</div>',
            showCloseButton: true,
            showConfirmButton: false,
        })
    }

    render() {
        return (
            <div onClick={this.openHank} className="appbar-icon-item" style={{margin:"0 84px 0 0"}}>
                <div className="appbar-icon-flexrow">
                    <img draggable="false" className="appbar-img-icon" src={this.state.icon} alt=""/>
                    <div className="appbar-icon-textblock">
                        <div className="appbar-minitext">{this.state.length} м</div>
                        <div className="appbar-minitext">{this.state.load} кг</div>
                    </div>
                </div>
                <div className="img-toast-lower" style={{right:'-4px'}}>
                    [К]
                </div>
                <div className="appbar-description" style={{margin:"0px 0 0 3px"}}>Катушка</div>
            </div>
        );
    }
}

export default HankItem;
