import React, {Component} from 'react';
import Swal from 'sweetalert2'
import settings_ico from "../../Assets/Img/AppBar/settings.png";

class SettingsItem extends Component {
    constructor(props) {
        super(props);
        this.openSettings = this.openSettings.bind(this);
        this.syncSettings = this.syncSettings.bind(this);
        this.toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        this.base_url = "http://192.168.22.13:5052/api/v1/post/settings"
        this.api_url = "http://127.0.0.1:5053/api/v1/post/path"
    }

    syncSettings() {
        if (this.props.state) {
            try {
                fetch(this.base_url, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({
                        takeoff_speed: localStorage.getItem('t_spd'),
                        ground_speed: localStorage.getItem('g_spd'),
                        target_alt: localStorage.getItem('alt')
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                    });
                fetch(this.api_url, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({
                        path: localStorage.getItem('path')
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                    });
            } catch {
                console.log('no link')
            }
        }else {
            console.log('no link')
        }
    }


    componentDidMount() {
        if(localStorage.getItem('t_spd') === null){
            localStorage.setItem('path', "C:\Watchman\Camera")
            localStorage.setItem('t_spd', "0.5")
            localStorage.setItem('g_spd', "0.5")
            localStorage.setItem('alt', "3")
        }
        this.syncSettings()
    }


    openSettings() {
        if (this.props.state) {
            Swal.fire({
                title: '<strong>Настройки</strong>',
                width: '700px',
                html:
                    '<div class="abi-set-holder">' +
                    '<h2 class="abi-set-h2">Настройки приложения:</h2>' +
                    '<div class="table-holder">' +
                    '<div class="table-row last">' +
                    '<div class="table-row-name">Путь для сохранения фото и видео: </div>' +
                    '<input onchange="localStorage.setItem(\'path\', this.value)" class="table-row-val" value="' + localStorage.getItem('path') + '" />' +
                    '</div>' +
                    '</div>' +
                    '<h2 class="abi-set-h2">Настройки коптера:</h2>' +
                    '<div class="table-holder">' +
                    '<div class="table-row">' +
                    '<div class="table-row-name">Высота взлёта, м: </div>' +
                    '<input onchange="localStorage.setItem(\'alt\', this.value)" class="table-row-val" value="' + localStorage.getItem('alt') + '" />' +
                    '</div>' +
                    '<div class="table-row">' +
                    '<div class="table-row-name">Скорость взлёта, м/c: </div>' +
                    '<input onchange="localStorage.setItem(\'t_spd\', this.value)" class="table-row-val" value="' + localStorage.getItem('t_spd') + '" />' +
                    '</div>' +
                    '<div class="table-row last">' +
                    '<div class="table-row-name">Горизонтальная скорость, м/c: </div>' +
                    '<input onchange="localStorage.setItem(\'g_spd\', this.value)" class="table-row-val" value="' + localStorage.getItem('g_spd') + '" />' +
                    '</div>' +
                    '</div>' +
                    '<h2 class="abi-set-h2">Настройки катушки:</h2>' +
                    '<div class="table-holder">' +
                    '<div class="table-row">' +
                    '<div class="table-row-name">Коэффициент P: </div>' +
                    '<input class="table-row-val" value="1" />' +
                    '</div>' +
                    '<div class="table-row">' +
                    '<div class="table-row-name">Коэффициент I: </div>' +
                    '<input class="table-row-val" value="1" />' +
                    '</div>' +
                    '<div class="table-row last">' +
                    '<div class="table-row-name">Коэффициент D: </div>' +
                    '<input class="table-row-val" value="1" />' +
                    '</div>' +
                    '</div>' +
                    '</div>',
                showCloseButton: true,
                confirmButtonText: 'Сохранить',
            }).then((result) => {
                console.log(result)
                if (result.isConfirmed) {
                    this.syncSettings()
                    this.toast.fire({
                        icon: 'success',
                        title: 'Настройки синхронизированы'
                    })
                }
            })

        } else {
            this.toast.fire({
                icon: 'error',
                title: 'Нет соединения с коптером!'
            })
        }
    }

    render() {
        return (
            <div onClick={this.openSettings} className="appbar-icon-item">
                <img draggable="false" className="appbar-img-icon" src={settings_ico} alt=""/>
                <div className="img-toast-lower">
                    [Н]
                </div>
                <div className="appbar-description">Настр.</div>
            </div>
        );
    }
}

export default SettingsItem;
