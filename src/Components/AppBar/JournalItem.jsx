import React, {Component} from 'react';
import logs_ico from "../../Assets/Img/AppBar/logs.png";
import Swal from "sweetalert2";

class JournalItem extends Component {
    constructor(props) {
        super(props);
        this.openJournal = this.openJournal.bind(this);
        this.state = {
            logs:"-------Ожидаю подключение-------\r\n"
        }
        this.base_url = "http://"+localStorage.getItem('endpoint_address')+":5052/api/v1/get/logs"

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
            if(e.keyCode === 59){
                self.openJournal()
            }
        });
        setInterval(() => {
            if (this.props.state){
                fetch(this.base_url)
                    .then(response => response.json())
                    .then(data => {
                        this.setState({logs: data['log_list']})
                    });
            }
        }, 200)
    }


    openJournal() {
        Swal.fire({
            title: '<strong>Журнал событий (коптер)</strong>',
            width: '700px',
            position:'top-right',
            html:
                '<div class="abi-jrn-holder">' +
                this.state.logs+
                '</div>',
            showClass: {popup: ''},
            hideClass: {popup: ''},
            showCloseButton: true,
            showConfirmButton: false,
        }).then((result) => {
            if (result.isConfirmed) {
                this.toast.fire({
                    icon: 'success',
                    title: 'Настройки синхронизированы'
                })
            }
        })
    }

    render() {
        return (
            <div onClick={this.openJournal} className="appbar-icon-item">
                <img draggable="false" className="appbar-img-icon" src={logs_ico} alt=""/>
                <div className="img-toast-lower">
                    [Ж]
                </div>
                <div className="appbar-description">Журнал</div>
            </div>
        );
    }
}

export default JournalItem;
