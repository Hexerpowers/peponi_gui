import React, {Component} from 'react';
import Swal from 'sweetalert2'
import settings_ico from "../../Assets/Img/AppBar/settings.png";

class DevSettingsItem extends Component {
    constructor(props) {
        super(props);
        this.openDevSettings = this.openDevSettings.bind(this);
        this.syncDevSettings = this.syncDevSettings.bind(this);
        this.validate_float = this.validate_float.bind(this);
        this.validate_ip = this.validate_ip.bind(this);
        this.toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        this.endpoint_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/post/dev_settings"
        this.core_url = "http://127.0.0.1:5053/api/v1/post/dev_settings"
    }

    syncDevSettings() {
        this.endpoint_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/post/dev_settings"

        if (this.props.link) {
            try {
                fetch(this.endpoint_url, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({
                        takeoff_speed: localStorage.getItem('takeoff_speed'),
                        power_onboard: localStorage.getItem('power_onboard')
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                            // console.log(data)
                    });
            } catch {
                console.log('Error while posting to [endpoint]')
            }
        }

        if (this.props.link_local) {
            fetch(this.core_url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    endpoint_address: localStorage.getItem('endpoint_address'),
                    hank_mode: localStorage.getItem('hank_mode'),
                })
            }).then(response => response.json())
                .then(data => {
                    // console.log(data);
                });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if ((prevProps.link === false && this.props.link === true) || (prevProps.link_local === false && this.props.link_local === true)) {
            this.syncDevSettings()
        }
    }

    componentDidMount() {
        setInterval(() => this.syncDevSettings(), 3000)
    }

    validate_float(val, min, max) {
        if (isNaN(Number(val))) {
            return false
        }
        if (val < min) {
            return false
        }
        return val <= max;
    }

    validate_ip(ipaddress) {
        return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress);
    }

    openDevSettings() {
        let power_onboard = ''
        if (localStorage.getItem('power_onboard') === 'true') {
            power_onboard = 'checked'
        }
        let hank_mode_select = ['','','']
        hank_mode_select[Number(localStorage.getItem('hank_mode'))] = 'selected'

        Swal.fire({
            title: '<strong>Настройки</strong>',
            width: '700px',
            html:
                '<div class="ab-popup-settings-holder">' +
                '<h2 class="ab-popup-settings-h2">Настройки приложения:</h2>' +
                '<div class="table-holder">' +
                '<div class="table-row">' +
                '<div class="table-row-name">Взлёт с ненормативным питанием: </div>' +
                '<label class="switch">' +
                '<input id="power_onboard" onchange="localStorage.setItem(\'power_onboard\', this.checked)" ' + power_onboard + ' type="checkbox">' +
                '<span class="slider round"></span>' +
                '</label>' +
                '</div>' +
                '<div class="table-row last">' +
                '<div class="table-row-name">IP адрес коптера в сети: </div>' +
                '<input id="endpoint_address" placeholder="192.168.88.252" class="table-row-val" value="' + localStorage.getItem('endpoint_address') + '" />' +
                '</div>' +
                '</div>' +
                '<h2 class="ab-popup-settings-h2">Настройки коптера:</h2>' +
                '<div class="table-holder">' +
                '<div class="table-row last">' +
                '<div class="table-row-name">Скорость взлёта <i>[0.1 — 0.7]</i>, м/c: </div>' +
                '<input id="takeoff_speed" class="table-row-val" value="' + localStorage.getItem('takeoff_speed') + '" />' +
                '</div>' +
                '</div>' +
                '<h2 class="ab-popup-settings-h2">Настройки катушки:</h2>' +
                '<div class="table-holder">' +
                '<div class="table-row last">' +
                '<div class="table-row-name">Режим катушки: </div>' +
                '<select id="hank_mode" class="table-row-val ab-popup-settings-select">' +
                '  <option '+ hank_mode_select[0] +'>Автономный</option>' +
                '  <option '+ hank_mode_select[1] +'>Автоматический</option>' +
                '  <option '+ hank_mode_select[2] +'>Управляемый</option>' +
                '</select>'+
                '</div>' +
                '</div>' +
                '</div>',
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Сохранить",
            showClass: {popup: ''},
            hideClass: {popup: ''},
            preConfirm: () => {
                const endpoint_address = Swal.getContainer().querySelector('#endpoint_address').value;
                const takeoff_speed = Swal.getContainer().querySelector('#takeoff_speed').value;
                const hank_mode = Swal.getContainer().querySelector('#hank_mode').selectedIndex

                if (!this.validate_ip(endpoint_address)) {
                    Swal.showValidationMessage('Указан неверный IP адрес')
                } else { localStorage.setItem('endpoint_address', endpoint_address) }

                if (!this.validate_float(takeoff_speed, 0.1, 0.7)) {
                    Swal.showValidationMessage('Неверное значение скорости взлёта')
                } else { localStorage.setItem('takeoff_speed', takeoff_speed) }

                localStorage.setItem('hank_mode', hank_mode)

                return true
            },
        }).then((result) => {
            if (result.isConfirmed) {
                this.syncDevSettings(true)
            }
        })
    }

    render() {
        return (
            <div onClick={this.openDevSettings} className="ab-item">
                <img draggable="false" className="ab-item-icon" src={settings_ico} alt=""/>
                <div className="ab-item-description">DEV</div>
            </div>
        );
    }
}

export default DevSettingsItem;
