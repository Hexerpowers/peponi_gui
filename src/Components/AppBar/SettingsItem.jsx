import React, {Component} from 'react';
import Swal from 'sweetalert2'
import settings_ico from "../../Assets/Img/AppBar/settings.png";

class SettingsItem extends Component {
    constructor(props) {
        super(props);
        this.openSettings = this.openSettings.bind(this);
    }

    openSettings(){
        if (this.props.state){
            Swal.fire({
                title: '<strong>HTML <u>example</u></strong>',
                icon: 'info',
                html:
                    'You can use <b>bold text</b>, ' +
                    '<a href="//sweetalert2.github.io">links</a> ' +
                    'and other HTML tags',
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> Great!',
                confirmButtonAriaLabel: 'Thumbs up, great!',
                cancelButtonText:
                    '<i class="fa fa-thumbs-down"></i>',
                cancelButtonAriaLabel: 'Thumbs down'
            })
        }else{
            alert('close')
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
