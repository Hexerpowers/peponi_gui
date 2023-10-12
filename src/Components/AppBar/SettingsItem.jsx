import React, {Component} from 'react';
import Swal from 'sweetalert2'
import settings_ico from "../../Assets/Img/AppBar/settings.png";

class SettingsItem extends Component {
    constructor(props) {
        super(props);
        this.openSettings = this.openSettings.bind(this);
        this.syncSettings = this.syncSettings.bind(this);
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

        if (localStorage.getItem('theme')==='0') {
            if (document.body.classList.contains('theme-light')){
                document.body.classList.toggle("theme-light")
                document.body.classList.toggle("theme-dark")
            }
        }else{
            if (document.body.classList.contains('theme-dark')){
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
                        return_alt: localStorage.getItem('return_alt'),
                        pir_mode: localStorage.getItem('pir_mode')
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
                    camera_path: localStorage.getItem('camera_path'),
                    pull_force: localStorage.getItem('pull_force'),
                    free_length: localStorage.getItem('free_length')
                })
            }).then(response => response.json())
                .then(data => {
                    if (showMessage) {
                        this.toast.fire({
                            icon: 'success',
                            title: 'Настройки синхронизированы'
                        })
                    }
                });
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
            if (e.code === 'KeyY' && !(localStorage.getItem("dev_press_br")==="1" && localStorage.getItem("dev_press_bl")==="1")) {
                self.openSettings()
            }
        });
        setInterval(() => this.syncSettings(), 3000)
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
        let pir_mode_select = ['','','','']
        pir_mode_select[Number(localStorage.getItem('pir_mode'))] = 'selected'
        let theme_select = ['','']
        theme_select[Number(localStorage.getItem('theme'))] = 'selected'
        Swal.fire({
            title: '<strong>Настройки</strong>',
            width: '700px',
            html:
                '<div class="ab-popup-settings-holder">' +
                '<h2 class="ab-popup-settings-h2">Настройки камеры и приложения:</h2>' +
                '<div class="table-holder">' +
                '<div class="table-row">' +
                '<div class="table-row-name">Цветовая тема: </div>' +
                '<select id="theme" class="table-row-val ab-popup-settings-select">' +
                '  <option '+ theme_select[0] +'>Тёмная</option>' +
                '  <option '+ theme_select[1] +'>Яркая</option>' +
                '</select>'+
                '</div>' +
                '<div class="table-row last">' +
                '<div class="table-row-name">Режим тепловизора: </div>' +
                '<select id="pir_mode" class="table-row-val ab-popup-settings-select">' +
                '  <option '+ pir_mode_select[0] +'>Белый - тёплый</option>' +
                '  <option '+ pir_mode_select[1] +'>Чёрный - тёплый</option>' +
                '  <option '+ pir_mode_select[2] +'>Радужный</option>' +
                '  <option '+ pir_mode_select[3] +'>Лавовый</option>' +
                '</select>'+
                '</div>' +
                // '<div class="table-row last">' +
                // '<div class="table-row-name">Путь для сохранения видео: </div>' +
                // '<input id="camera_path" class="table-row-val" value="' + localStorage.getItem('camera_path') + '" />' +
                // '</div>' +
                '</div>' +
                '<h2 class="ab-popup-settings-h2">Настройки коптера:</h2>' +
                '<div class="table-holder">' +
                '<div class="table-row">' +
                '<div class="table-row-name">Высота взлёта <i>[2 — 100]</i>, м: </div>' +
                '<input id="target_alt" class="table-row-val" value="' + localStorage.getItem('target_alt') + '" />' +
                '</div>' +
                // '<div class="table-row">' +
                // '<div class="table-row-name">Высота аварийного возврата <i>[2 — 100]</i>, м: </div>' +
                // '<input id="return_alt" class="table-row-val" value="' + localStorage.getItem('return_alt') + '" />' +
                // '</div>' +
                '<div class="table-row last">' +
                '<div class="table-row-name">Горизонтальная скорость <i>[0.1 — 2]</i>, м/c: </div>' +
                '<input id="ground_speed" class="table-row-val" value="' + localStorage.getItem('ground_speed') + '" />' +
                '</div>' +
                '</div>' +
                // '<h2 class="ab-popup-settings-h2">Настройки катушки:</h2>' +
                // '<div class="table-holder">' +
                // '<div class="table-row table-row-high">' +
                // '<div class="table-row-name">Скорость смотки кабеля:</div>' +
                // '<div class="range"> <input id="pull_force" class="table-row-val" type="range" min="-10" max="10" step="2" value="' + localStorage.getItem('pull_force') + '"></div>'+
                // '</div>' +
                // '<div class="table-row last">' +
                // '<div class="table-row-name">Свободный остаток кабеля: <i>[2 — 10]</i>, м: </div>' +
                // '<input id="free_length" class="table-row-val" value="' + localStorage.getItem('free_length') + '" />' +
                // '</div>' +
                // '</div>' +
                '</div>',
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Сохранить",
            showClass: {popup: ''},
            hideClass: {popup: ''},
            preConfirm: () => {
                // const camera_path = Swal.getContainer().querySelector('#camera_path').value;
                const target_alt = Swal.getContainer().querySelector('#target_alt').value;
                // const return_alt = Swal.getContainer().querySelector('#return_alt').value;
                const ground_speed = Swal.getContainer().querySelector('#ground_speed').value;
                // const pull_force = Swal.getContainer().querySelector('#pull_force').value
                // const free_length = Swal.getContainer().querySelector('#free_length').value
                const pir_mode = Swal.getContainer().querySelector('#pir_mode').selectedIndex
                const theme = Swal.getContainer().querySelector('#theme').selectedIndex

                // localStorage.setItem('camera_path', camera_path)

                if (!this.validate_float(target_alt, 2, 100)) {
                    Swal.showValidationMessage('Неверное значение высоты взлёта')
                } else { localStorage.setItem('target_alt', target_alt) }

                // if (!this.validate_float(return_alt, 2, 100)) {
                //     Swal.showValidationMessage('Неверное значение высоты возврата')
                // } else { localStorage.setItem('return_alt', return_alt) }

                if (!this.validate_float(ground_speed, 0.1, 2)) {
                    Swal.showValidationMessage('Неверное значение горизонтальной скорости')
                } else { localStorage.setItem('ground_speed', ground_speed) }

                // if (!this.validate_float(free_length, 2, 10)) {
                //     Swal.showValidationMessage('Неверное значение свободного остатка')
                // } else { localStorage.setItem('free_length', free_length) }

                // localStorage.setItem('pull_force', pull_force)
                localStorage.setItem('pir_mode', pir_mode)
                localStorage.setItem('theme', theme)

                return true
            },
        }).then((result) => {
            localStorage.setItem('block_aggressive_popups', '0')
            if (result.isConfirmed) {
                this.syncSettings(true)
            }
        })
    }

    render() {
        let inverted = 'ab-item-icon'
        if (localStorage.getItem('theme')!=='0') {
           inverted = 'ab-item-icon ab-item-icon-inverted'
        }
        return (
            <div onClick={this.openSettings} className="ab-item">
                <img draggable="false" className={inverted} src={settings_ico} alt=""/>
                <div className="item-toast">
                    [Н]
                </div>
                <div className="ab-item-description">Настр.</div>
            </div>
        );
    }
}

export default SettingsItem;
