import React, {Component} from 'react';

class StatusItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state_text: 'Нет соединения',
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.link) {
            switch (props.status) {
                case 0:
                    return {state_text: "Коптер подготавливается"}
                case 1:
                    return {state_text: "Ожидание команды на взлёт"}
                case 2:
                    return {state_text: "Взлёт на указанную высоту"}
                case 3:
                    return {state_text: "В полёте"}
                case 4:
                    return {state_text: "Посадка на исходную точку"}
                case 8:
                    return {state_text: "Экстренная остановка"}
                case 9:
                    return {state_text: "Ошибка в процессе полёта, аварийная посадка"}
                default:
                    return {state_text: "Ошибка соединения"}
            }
        } else {
            return {state_text: "Нет соединения"}
        }
    }

    render() {
        return (
            <div className="appbar-status">-> {this.state.state_text}</div>
        );
    }
}

export default StatusItem;
