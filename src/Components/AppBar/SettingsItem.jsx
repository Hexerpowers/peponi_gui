import React, {Component} from 'react';
import Swal from 'sweetalert2'
import settings_ico from "../../Assets/Img/AppBar/settings.png";

class SettingsItem extends Component {
    constructor(props) {
        super(props);
        this.openSettings = this.openSettings.bind(this);
        this.syncSettings = this.syncSettings.bind(this);
        this.validate_ip = this.validate_ip.bind(this);
        this.validate_path = this.validate_path.bind(this);
        this.validate_float = this.validate_float.bind(this);
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

        this.endpoint_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/post/settings"
        this.core_url = "http://127.0.0.1:5053/api/v1/post/settings"
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

    syncSettings(showMessage = false) {
        this.endpoint_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/post/settings"

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
                        ground_speed: localStorage.getItem('ground_speed'),
                        target_alt: localStorage.getItem('target_alt'),
                        return_alt: localStorage.getItem('return_alt')
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        if (showMessage) {
                            this.toast.fire({
                                icon: 'success',
                                title: 'Настройки синхронизированы'
                            })
                        }
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
                    camera_path: localStorage.getItem('camera_path'),
                    pull_force: localStorage.getItem('pull_force'),
                    free_length: localStorage.getItem('free_length')
                })
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if ((prevProps.link === false && this.props.link === true) || (prevProps.link_local === false && this.props.link_local === true)) {
            this.syncSettings()
        }
    }

    componentDidMount() {
        let self = this
        this.addEvent(document, "keypress", function (e) {
            if (e.code === 'KeyY') {
                self.openSettings()
            }
        });
        setInterval(() => this.syncSettings(), 3000)
    }

    validate_ip(ipaddress) {
        return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress);
    }

    validate_path(path) {
        return true
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


    openSettings() {
        // let power_onboard = ''
        // if (localStorage.getItem('power_onboard') === 'true') {
        //     power_onboard = 'checked'
        // }
        Swal.fire({
            title: '<strong>Настройки</strong>',
            width: '700px',
            html:
                '<div class="ab-popup-settings-holder">' +
                '<h2 class="ab-popup-settings-h2">Настройки приложения:</h2>' +
                '<div class="table-holder">' +
                // '<div class="table-row">' +
                // '<div class="table-row-name">Взлёт с ненормативным питанием: </div>' +
                // '<label class="switch">' +
                // '<input id="power_onboard" onchange="localStorage.setItem(\'power_onboard\', this.checked)" ' + power_onboard + ' type="checkbox">' +
                // '<span class="slider round"></span>' +
                // '</label>' +
                // '</div>' +
                '<div class="table-row">' +
                '<div class="table-row-name">IP адрес коптера в сети: </div>' +
                '<input id="endpoint_address" class="table-row-val" value="' + localStorage.getItem('endpoint_address') + '" />' +
                '</div>' +
                '<div class="table-row last">' +
                '<div class="table-row-name">Путь для сохранения видео: </div>' +
                '<input id="camera_path" class="table-row-val" value="' + localStorage.getItem('camera_path') + '" />' +
                '</div>' +
                '</div>' +
                '<h2 class="ab-popup-settings-h2">Настройки коптера:</h2>' +
                '<div class="table-holder">' +
                '<div class="table-row">' +
                '<div class="table-row-name">Высота взлёта <i>[2 — 110]</i>, м: </div>' +
                '<input id="target_alt" class="table-row-val" value="' + localStorage.getItem('target_alt') + '" />' +
                '</div>' +
                '<div class="table-row">' +
                '<div class="table-row-name">Высота аварийного возврата <i>[2 — 110]</i>, м: </div>' +
                '<input id="return_alt" class="table-row-val" value="' + localStorage.getItem('return_alt') + '" />' +
                '</div>' +
                '<div class="table-row">' +
                '<div class="table-row-name">Скорость взлёта <i>[0.1 — 1]</i>, м/c: </div>' +
                '<input id="takeoff_speed" class="table-row-val" value="' + localStorage.getItem('takeoff_speed') + '" />' +
                '</div>' +
                '<div class="table-row last">' +
                '<div class="table-row-name">Горизонтальная скорость <i>[0.1 — 2]</i>, м/c: </div>' +
                '<input id="ground_speed" class="table-row-val" value="' + localStorage.getItem('ground_speed') + '" />' +
                '</div>' +
                '</div>' +
                '<h2 class="ab-popup-settings-h2">Настройки катушки:</h2>' +
                '<div class="table-holder">' +
                '<div class="table-row table-row-high">' +
                '<div class="table-row-name">Регулировка натяжения:</div>' +
                '<div class="range"> <input id="pull_force" class="table-row-val" type="range" min="-10" max="10" step="2" value="' + localStorage.getItem('pull_force') + '"></div>'+
                '</div>' +
                '<div class="table-row last">' +
                '<div class="table-row-name">Несматываемый остаток: <i>[2 — 10]</i>, м: </div>' +
                '<input id="free_length" class="table-row-val" value="' + localStorage.getItem('free_length') + '" />' +
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
                const camera_path = Swal.getContainer().querySelector('#camera_path').value;
                const target_alt = Swal.getContainer().querySelector('#target_alt').value;
                const return_alt = Swal.getContainer().querySelector('#return_alt').value;
                const takeoff_speed = Swal.getContainer().querySelector('#takeoff_speed').value;
                const ground_speed = Swal.getContainer().querySelector('#ground_speed').value;
                const pull_force = Swal.getContainer().querySelector('#pull_force').value
                const free_length = Swal.getContainer().querySelector('#free_length').value
                if (!this.validate_ip(endpoint_address)) {
                    Swal.showValidationMessage('Указан неверный IP адрес')
                } else {
                    localStorage.setItem('endpoint_address', endpoint_address)
                }
                if (!this.validate_path(camera_path)) {
                    Swal.showValidationMessage('Папка по указанному пути не существует')
                } else {
                    localStorage.setItem('camera_path', camera_path)
                }
                if (!this.validate_float(target_alt, 2, 110)) {
                    Swal.showValidationMessage('Неверное значение высоты взлёта')
                } else {
                    localStorage.setItem('target_alt', target_alt)
                }
                if (!this.validate_float(return_alt, 2, 110)) {
                    Swal.showValidationMessage('Неверное значение высоты возврата')
                } else {
                    localStorage.setItem('return_alt', return_alt)
                }
                if (!this.validate_float(takeoff_speed, 0.1, 1)) {
                    Swal.showValidationMessage('Неверное значение скорости взлёта')
                } else {
                    localStorage.setItem('takeoff_speed', takeoff_speed)
                }
                if (!this.validate_float(ground_speed, 0.1, 2)) {
                    Swal.showValidationMessage('Неверное значение горизонтальной скорости')
                } else {
                    localStorage.setItem('ground_speed', ground_speed)
                }
                if (!this.validate_float(free_length, 2, 10)) {
                    Swal.showValidationMessage('Неверное значение несматываемого остатка')
                } else {
                    localStorage.setItem('free_length', free_length)
                }
                localStorage.setItem('pull_force', pull_force)
                return true
            },
        }).then((result) => {
            if (result.isConfirmed) {
                this.syncSettings(true)
            }
        })
    }

    render() {
        return (
            <div onClick={this.openSettings} className="ab-item">
                <img draggable="false" className="ab-item-icon" src={settings_ico} alt=""/>
                <div className="item-toast">
                    [Н]
                </div>
                <div className="ab-item-description">Настр.</div>
            </div>
        );
    }
}

export default SettingsItem;
