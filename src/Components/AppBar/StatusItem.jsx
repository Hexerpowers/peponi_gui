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
                    return {state_text: "Подготовка аппарата"}
                case 1:
                    return {state_text: "Ожидание команды на взлёт"}
                case 2:
                    return {state_text: "Взлёт на указанную высоту"}
                case 3:
                    return {state_text: "В полёте"}
                case 4:
                    return {state_text: "Посадка"}
                case 6:
                    return {state_text: "Полёт по миссии"}
                case 7:
                    return {state_text: "Аварийная посадка - ошибка питания"}
                case 8:
                    return {state_text: "Остановка"}
                case 9:
                    return {state_text: "Аварийная посадка - ошибка связи"}
                default:
                    return {state_text: "Ошибка соединения"}
            }
        } else {
            return {state_text: "Нет соединения"}
        }
    }

    render() {
        return (
            <div className="ab-status">-> {this.state.state_text}</div>
        );
    }
}

export default StatusItem;
