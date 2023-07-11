import React, {Component} from 'react';
import Swal from 'sweetalert2'

class DevSettingsItem extends Component {
    constructor(props) {
        super(props);
        this.openDevSettings = this.openDevSettings.bind(this);
        this.syncDevSettings = this.syncDevSettings.bind(this);
        this.sendMode = this.sendMode.bind(this);
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
        this.state = {
            takeoff: 'false',
            land: 'false',
            stop: 'false',
            photo: 'false',
            main_cam_mode: 'false',
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
            state: 0,
            voltage: 0,
            current_0: 0,
            current_1: 0,
            charge: 0,
        }

        this.endpoint_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/post/dev_settings"
        this.core_url = "http://127.0.0.1:5053/api/v1/post/dev_settings"
        this.debug_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/get/debug"
        this.manual_mode_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/post/mode"
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
        this.addEvent(document, "keydown", function (e) {
            if (e.code === 'BracketRight') {
                localStorage.setItem("dev_press_br", "1")
            }
            if (e.code === 'BracketLeft') {
                localStorage.setItem("dev_press_bl", "1")
            }
        });
        this.addEvent(document, "keyup", function (e) {
            if (e.code === 'BracketRight') {
                localStorage.setItem("dev_press_br", "0")
            }
            if (e.code === 'BracketLeft') {
                localStorage.setItem("dev_press_bl", "0")
            }
        });
        this.addEvent(document, "keypress", function (e) {
            if (e.code === 'KeyY' && (localStorage.getItem("dev_press_br") === "1" && localStorage.getItem("dev_press_bl") === "1")) {
                self.openDevSettings()
            }
        });
        setInterval(() => this.syncDevSettings(), 3000)
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

                            state: 0,
                            voltage: 0,
                            current_0: 0,
                            current_1: 0,
                            charge: 0,
                        })
                    });
            }
        }, 250)
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
        let debug_enable = ''
        if (localStorage.getItem('debug_enable') === 'true') {
            debug_enable = 'checked'
        }
        let hank_mode_select = ['', '', '']
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
                '<div class="table-row">' +
                '<div class="table-row-name">Режим отладки: </div>' +
                '<label class="switch">' +
                '<input id="debug_enable" onchange="localStorage.setItem(\'debug_enable\', this.checked)" ' + debug_enable + ' type="checkbox">' +
                '<span class="slider round"></span>' +
                '</label>' +
                '</div>' +
                '<div class="table-row">' +
                '<div class="table-row-name">IP адрес коптера в сети: </div>' +
                '<input id="endpoint_address" placeholder="192.168.88.252" class="table-row-val" value="' + localStorage.getItem('endpoint_address') + '" />' +
                '</div>' +
                '<div class="table-row last">' +
                '<div class="table-row-name">Сбросить настройки приложения: </div>' +
                '<input onclick="' +
                '   localStorage.setItem(\'camera_path\', \'C:/Watchman/Camera\');\n' +
                '   localStorage.setItem(\'pir_mode\', \'0\');\n' +
                '   localStorage.setItem(\'theme\', \'0\');\n' +
                '   localStorage.setItem(\'takeoff_speed\', \'0.5\');\n' +
                '   localStorage.setItem(\'ground_speed\', \'0.5\');\n' +
                '   localStorage.setItem(\'target_alt\', \'3\');\n' +
                '   localStorage.setItem(\'return_alt\', \'3\');\n' +
                '   localStorage.setItem(\'pull_force\', \'0\');\n' +
                '   localStorage.setItem(\'free_length\', \'2\');\n' +
                '   localStorage.setItem(\'power_onboard\', \'0\');\n' +
                '   localStorage.setItem(\'endpoint_address\', \'192.168.88.254\');\n' +
                '   localStorage.setItem(\'hank_mode\', \'1\');\n' +
                '   location.reload();\n' +
                '" style="width: 314px;" type="button" class="table-row-val" value="СБРОСИТЬ"/>' +
                '</div>' +
                '</div>' +
                '<h2 class="ab-popup-settings-h2">Настройки коптера:</h2>' +
                '<div class="table-holder">' +
                '<div class="table-row last">' +
                '<div class="table-row-name">Скорость взлёта <i>[0.1 — 1.5]</i>, м/c: </div>' +
                '<input id="takeoff_speed" class="table-row-val" value="' + localStorage.getItem('takeoff_speed') + '" />' +
                '</div>' +
                '</div>' +
                '<h2 class="ab-popup-settings-h2">Настройки катушки:</h2>' +
                '<div class="table-holder">' +
                '<div class="table-row last">' +
                '<div class="table-row-name">Режим катушки: </div>' +
                '<select id="hank_mode" class="table-row-val ab-popup-settings-select">' +
                '  <option ' + hank_mode_select[0] + '>Автономный</option>' +
                '  <option ' + hank_mode_select[1] + '>Автоматический</option>' +
                '  <option ' + hank_mode_select[2] + '>Управляемый</option>' +
                '</select>' +
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
                } else {
                    localStorage.setItem('endpoint_address', endpoint_address)
                }

                if (!this.validate_float(takeoff_speed, 0.1, 1.5)) {
                    Swal.showValidationMessage('Неверное значение скорости взлёта')
                } else {
                    localStorage.setItem('takeoff_speed', takeoff_speed)
                }

                localStorage.setItem('hank_mode', hank_mode)

                return true
            },
        }).then((result) => {
            if (result.isConfirmed) {
                this.syncDevSettings(true)
            }
        })
    }

    sendMode() {
        this.manual_mode_url = "http://" + localStorage.getItem('endpoint_address') + ":5052/api/v1/post/mode"
        let index = document.querySelector('#mode_select').selectedIndex
        if (index>4){
            index+=2
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

    render() {
        let item_classname = 'ab-item-debugger hidden'
        if (localStorage.getItem('debug_enable') === 'true') {
            item_classname = 'ab-item-debugger'
        }
        return (
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
                            <div className="dt-label">photo</div>
                            <div className="dt-value">{this.state.photo}</div>
                        </div>
                        <div className="dt-row">
                            <div className="dt-label">main_cam_mode</div>
                            <div className="dt-value">{this.state.main_cam_mode}</div>
                        </div>
                    </div>
                    <h4 className="dt-heading">move</h4>
                    <div className="display_table">
                        <div className="dt-row">
                            <div className="dt-label">x</div>
                            <div className="dt-value">{this.state.x}</div>
                        </div>
                        <div className="dt-row">
                            <div className="dt-label">y</div>
                            <div className="dt-value">{this.state.y}</div>
                        </div>
                        <div className="dt-row">
                            <div className="dt-label">yaw</div>
                            <div className="dt-value">{this.state.yaw}</div>
                        </div>
                        <div className="dt-row">
                            <div className="dt-label">cam_pitch</div>
                            <div className="dt-value">{this.state.cam_pitch}</div>
                        </div>
                        <div className="dt-row">
                            <div className="dt-label">cam_zoom</div>
                            <div className="dt-value">{this.state.cam_zoom}</div>
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
                        <div className="dt-row">
                            <div className="dt-label">pir_cam_mode</div>
                            <div className="dt-value">{this.state.pir_cam_mode}</div>
                        </div>
                        <div className="dt-row">
                            <div className="dt-label">power_onboard</div>
                            <div className="dt-value">{this.state.power_onboard}</div>
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
                            <div className="dt-label">t_yaw</div>
                            <div className="dt-value">{this.state.t_yaw}</div>
                        </div>
                    </div>
                    <h4 className="dt-heading">power</h4>
                    <div className="display_table">
                        <div className="dt-row">
                            <div className="dt-label">state</div>
                            <div className="dt-value">{this.state.state}</div>
                        </div>
                        <div className="dt-row">
                            <div className="dt-label">voltage</div>
                            <div className="dt-value">{this.state.voltage}</div>
                        </div>
                        <div className="dt-row">
                            <div className="dt-label">current_0</div>
                            <div className="dt-value">{this.state.current_0}</div>
                        </div>
                        <div className="dt-row">
                            <div className="dt-label">current_1</div>
                            <div className="dt-value">{this.state.current_1}</div>
                        </div>
                        <div className="dt-row">
                            <div className="dt-label">charge</div>
                            <div className="dt-value">{this.state.charge}</div>
                        </div>
                    </div>
                    <h4 className="dt-heading">COPTER_STATE</h4>
                    <select id="mode_select" className="dt-value dt-select">
                        <option>0 [Ожидание]</option>
                        <option>1 [Арминг]</option>
                        <option>2 [Взлёт]</option>
                        <option>3 [Висение]</option>
                        <option>4 [Посадка]</option>
                        <option>7 [Нет питания]</option>
                        <option>8 [Остановка]</option>
                        <option>9 [Нет связи]</option>
                    </select>
                    <div onClick={this.sendMode} className="dt-button">Отправить</div>
                </div>
            </div>
        );
    }
}

export default DevSettingsItem;
