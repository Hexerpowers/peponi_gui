import React, {Component} from 'react';
import Swal from 'sweetalert2'
import settings_ico from "../../Assets/Img/AppBar/settings.png";

class SettingsItem extends Component {
    constructor(props) {
        super(props);
        this.openSettings = this.openSettings.bind(this);
        this.syncSettings = this.syncSettings.bind(this);
        this.validate_float = this.validate_float.bind(this);
        this.sendMode = this.sendMode.bind(this);
        this.sendReboot = this.sendReboot.bind(this);
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
        this.state = {
            takeoff: 'false',
            land: 'false',
            stop: 'false',
            photo: 'false',
            main_cam_mode: 'false',
            mission: 'false',
            x: 0,
            y: 0,
            yaw: 0,
            cam_pitch: 0,
            cam_zoom: 0,
            comm_ok: 0,
            takeoff_speed: 0,
            ground_speed: 0,
            target_alt: 0,
            copter_state: 0,
            pir_cam_mode: 0,
            power_onboard: 0,
            alt: 0,
            roll: 0,
            pitch: 0,
            tel_yaw: 0,
            t_yaw: 0,
            gps_sat: 0,
            actual_mode: 'UNDEFINED',
            state: 0,
            voltage: 0,
            current_0: 0,
            current_1: 0,
            charge: 0,
        }

        this.endpoint_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/post/settings"
        this.core_url = "http://127.0.0.1:5053/api/v1/post/settings"
        this.debug_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/get/debug"
        this.manual_mode_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/post/mode"
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

        if (localStorage.getItem('theme') === '0') {
            if (document.body.classList.contains('theme-light')) {
                document.body.classList.toggle("theme-light")
                document.body.classList.toggle("theme-dark")
            }
        } else {
            if (document.body.classList.contains('theme-dark')) {
                document.body.classList.toggle("theme-dark")
                document.body.classList.toggle("theme-light")
            }
        }

        if (this.props.link) {
            try {
                fetch(this.endpoint_url, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({
                        ground_speed: localStorage.getItem('ground_speed'),
                        target_alt: localStorage.getItem('target_alt'),
                        takeoff_speed: localStorage.getItem('takeoff_speed'),
                        power_onboard: localStorage.getItem('power_onboard'),
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
    }

    componentDidUpdate(prevProps, prevState) {
        if ((prevProps.link === false && this.props.link === true) || (prevProps.link_local === false && this.props.link_local === true)) {
            this.syncSettings()
        }
    }

    componentDidMount() {
        let self = this
        this.addEvent(document, "keypress", function (e) {
            if (e.code === 'KeyY' && !(localStorage.getItem("dev_press_br") === "1" && localStorage.getItem("dev_press_bl") === "1")) {
                self.openSettings()
            }
        });
        setInterval(() => this.syncSettings(), 3000)
        setInterval(() => {
            this.debug_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/get/debug"
            if (this.props.link && localStorage.getItem('debug_enable') === 'true') {
                fetch(this.debug_url)
                    .then((res) => {
                        if (res.status >= 200 && res.status < 300) {
                            return res;
                        } else {
                            let error = new Error(res.statusText);
                            error.response = res;
                            throw error
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        this.setState({
                            takeoff: data['takeoff'],
                            land: data['land'],
                            stop: data['stop'],
                            photo: data['photo'],
                            main_cam_mode: data['main_cam_mode'],
                            mission: data['mission'],
                            x: data['x'],
                            y: data['y'],
                            yaw: data['yaw'],
                            cam_pitch: data['cam_pitch'],
                            cam_zoom: data['cam_zoom'],
                            comm_ok: data['comm_ok'],
                            takeoff_speed: data['takeoff_speed'],
                            ground_speed: data['ground_speed'],
                            target_alt: data['target_alt'],
                            copter_state: data['copter_state'],
                            pir_cam_mode: data['pir_cam_mode'],
                            power_onboard: data['power_onboard'],
                            alt: data['alt'],
                            roll: data['roll'],
                            pitch: data['pitch'],
                            tel_yaw: data['tel_yaw'],
                            t_yaw: data['t_yaw'],
                            gps_sat: data['gps_sat'],
                            actual_mode: data['actual_mode'],
                            state: data['state'],
                            voltage: data['voltage'],
                            current_0: data['current_0'],
                            current_1: data['current_1'],
                            charge: data['charge'],
                        })
                    })
                    .catch((e) => {
                        this.setState({
                            takeoff: 'false',
                            land: 'false',
                            stop: 'false',
                            photo: 'false',
                            main_cam_mode: 'false',
                            mission: 'false',

                            x: 0,
                            y: 0,
                            yaw: 0,
                            cam_pitch: 0,
                            cam_zoom: 0,

                            comm_ok: 0,
                            takeoff_speed: 0,
                            ground_speed: 0,
                            target_alt: 0,
                            copter_state: 0,
                            pir_cam_mode: 0,
                            power_onboard: 0,

                            alt: 0,
                            roll: 0,
                            pitch: 0,
                            tel_yaw: 0,
                            t_yaw: 0,
                            gps_sat: 0,
                            actual_mode: 'UNDEFINED',

                            state: 0,
                            voltage: 0,
                            current_0: 0,
                            current_1: 0,
                            charge: 0,
                        })
                    });
            }
        }, 200)
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
        localStorage.setItem('block_aggressive_popups', '1')
        let debug_enable = ''
        if (localStorage.getItem('debug_enable') === 'true') {
            debug_enable = 'checked'
        }
        let power_onboard = ''
        if (localStorage.getItem('power_onboard') === 'true') {
            power_onboard = 'checked'
        }
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
                '<div class="table-row">' +
                '<div class="table-row-name">Режим отладки: </div>' +
                '<label class="switch">' +
                '<input id="debug_enable" onchange="localStorage.setItem(\'debug_enable\', this.checked)" ' + debug_enable + ' type="checkbox">' +
                '<span class="slider round"></span>' +
                '</label>' +
                '</div>' +
                '<div class="table-row">' +
                '<div class="table-row-name">Перезагрузить EDP: </div>' +
                '<input id="reboot_btn" onclick="' +
                '   localStorage.setItem(\'remote_reboot\', \'1\');\n' +
                '   document.querySelector(\'#reboot_btn\').classList.toggle(\'reboot-btn-enabled\');\n' +
                '" style="width: 314px;" type="button" class="table-row-val table-btn" value="ПЕРЕЗАГРУЗИТЬ"/>' +
                '</div>' +
                '<div class="table-row last">' +
                '<div class="table-row-name">Сбросить настройки приложения: </div>' +
                '<input onclick="' +
                '   localStorage.setItem(\'takeoff_speed\', \'0.5\');\n' +
                '   localStorage.setItem(\'ground_speed\', \'0.5\');\n' +
                '   localStorage.setItem(\'target_alt\', \'3\');\n' +
                '   localStorage.setItem(\'endpoint_address\', \'192.168.88.254\');\n' +
                '   location.reload();\n' +
                '" style="width: 314px;" type="button" class="table-row-val table-btn" value="СБРОСИТЬ"/>' +
                '</div>' +
                '</div>' +
                '<h2 class="ab-popup-settings-h2">Настройки коптера:</h2>' +
                '<div class="table-holder">' +
                '<div class="table-row">' +
                '<div class="table-row-name">Высота взлёта <i>[2 — 100]</i>, м: </div>' +
                '<input id="target_alt" class="table-row-val" value="' + localStorage.getItem('target_alt') + '" />' +
                '</div>' +
                '<div class="table-row">' +
                '<div class="table-row-name">Скорость взлёта <i>[0.1 — 1.5]</i>, м/c: </div>' +
                '<input id="takeoff_speed" class="table-row-val" value="' + localStorage.getItem('takeoff_speed') + '" />' +
                '</div>' +
                '<div class="table-row last">' +
                '<div class="table-row-name">Горизонтальная скорость <i>[0.1 — 2]</i>, м/c: </div>' +
                '<input id="ground_speed" class="table-row-val" value="' + localStorage.getItem('ground_speed') + '" />' +
                '</div>' +
                '</div>' +
                '</div>',
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Сохранить",
            showClass: {popup: ''},
            hideClass: {popup: ''},
            preConfirm: () => {
                const takeoff_speed = Swal.getContainer().querySelector('#takeoff_speed').value;
                const target_alt = Swal.getContainer().querySelector('#target_alt').value;
                const ground_speed = Swal.getContainer().querySelector('#ground_speed').value;

                if (!this.validate_float(target_alt, 2, 100)) {
                    Swal.showValidationMessage('Неверное значение высоты взлёта')
                } else {
                    localStorage.setItem('target_alt', target_alt)
                }

                if (localStorage.getItem('remote_reboot') === '1') {
                    localStorage.setItem('remote_reboot', '0')
                    this.sendReboot()
                }

                if (!this.validate_float(takeoff_speed, 0.1, 1.5)) {
                    Swal.showValidationMessage('Неверное значение скорости взлёта')
                } else {
                    localStorage.setItem('takeoff_speed', takeoff_speed)
                }

                if (!this.validate_float(ground_speed, 0.1, 2)) {
                    Swal.showValidationMessage('Неверное значение горизонтальной скорости')
                } else {
                    localStorage.setItem('ground_speed', ground_speed)
                }

                return true
            },
        }).then((result) => {
            localStorage.setItem('block_aggressive_popups', '0')
            if (result.isConfirmed) {
                this.syncSettings(true)
            }
        })
    }

    sendMode() {
        this.manual_mode_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/post/mode"
        let index = document.querySelector('#mode_select').selectedIndex
        if (index > 4) {
            index += 2
        }
        fetch(this.manual_mode_url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                mode: index,
            })
        }).then(response => response.json())
            .then(data => {
                // console.log(data);
            });
    }

    sendReboot() {
        this.reboot_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/trig/reboot"
        fetch(this.reboot_url)
            .then(response => response.json())
            .then(data => {
                if (data['status'] === 'OK') {
                    this.toast.fire({
                        icon: 'success',
                        title: 'Команда на перезагрузку отправлена'
                    })
                }
            });
    }

    render() {
        let inverted = 'ab-item-icon'
        if (localStorage.getItem('theme') !== '0') {
            inverted = 'ab-item-icon ab-item-icon-inverted'
        }
        let item_classname = 'ab-item-debugger hidden'
        if (localStorage.getItem('debug_enable') === 'true') {
            item_classname = 'ab-item-debugger'
        }
        return (
            <>
                <div onClick={this.openSettings} className="ab-item">
                    <img draggable="false" className={inverted} src={settings_ico} alt=""/>
                    <div className="item-toast">
                        [Н]
                    </div>
                    <div className="ab-item-description">Настр.</div>
                </div>
                <div className={item_classname}>
                    <div className="display_block">
                        <h4 className="dt-heading">signals</h4>
                        <div className="display_table">
                            <div className="dt-row">
                                <div className="dt-label">takeoff</div>
                                <div className="dt-value">{this.state.takeoff}</div>
                            </div>
                            <div className="dt-row">
                                <div className="dt-label">land</div>
                                <div className="dt-value">{this.state.land}</div>
                            </div>
                            <div className="dt-row">
                                <div className="dt-label">stop</div>
                                <div className="dt-value">{this.state.stop}</div>
                            </div>
                            <div className="dt-row">
                                <div className="dt-label">mission</div>
                                <div className="dt-value">{this.state.mission}</div>
                            </div>
                        </div>
                        <h4 className="dt-heading">runtime</h4>
                        <div className="display_table">
                            <div className="dt-row">
                                <div className="dt-label">comm_ok</div>
                                <div className="dt-value">{this.state.comm_ok}</div>
                            </div>
                            <div className="dt-row">
                                <div className="dt-label">takeoff_speed</div>
                                <div className="dt-value">{this.state.takeoff_speed}</div>
                            </div>
                            <div className="dt-row">
                                <div className="dt-label">ground_speed</div>
                                <div className="dt-value">{this.state.ground_speed}</div>
                            </div>
                            <div className="dt-row">
                                <div className="dt-label">target_alt</div>
                                <div className="dt-value">{this.state.target_alt}</div>
                            </div>
                            <div className="dt-row">
                                <div className="dt-label">copter_state</div>
                                <div className="dt-value">{this.state.copter_state}</div>
                            </div>
                        </div>
                    </div>
                    <div className="display_block">
                        <h4 className="dt-heading">telemetry</h4>
                        <div className="display_table">
                            <div className="dt-row">
                                <div className="dt-label">alt</div>
                                <div className="dt-value">{this.state.alt}</div>
                            </div>
                            <div className="dt-row">
                                <div className="dt-label">roll</div>
                                <div className="dt-value">{this.state.roll}</div>
                            </div>
                            <div className="dt-row">
                                <div className="dt-label">pitch</div>
                                <div className="dt-value">{this.state.pitch}</div>
                            </div>
                            <div className="dt-row">
                                <div className="dt-label">yaw</div>
                                <div className="dt-value">{this.state.tel_yaw}</div>
                            </div>
                            <div className="dt-row">
                                <div className="dt-label">gps_sat</div>
                                <div className="dt-value">{this.state.gps_sat}</div>
                            </div>
                            <div className="dt-row">
                                <div className="dt-label">actual_mode</div>
                                <div className="dt-value">{this.state.actual_mode}</div>
                            </div>
                        </div>
                        <h4 className="dt-heading">power</h4>
                        <div className="display_table">
                            <div className="dt-row">
                                <div className="dt-label">voltage</div>
                                <div className="dt-value">{this.state.voltage}</div>
                            </div>
                            <div className="dt-row">
                                <div className="dt-label">charge</div>
                                <div className="dt-value">{this.state.charge}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default SettingsItem;
