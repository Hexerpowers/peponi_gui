import React, {Component} from 'react';

class StatusItem extends Component {
    constructor(props) {
        super(props);
        this.base_url = "http://127.0.0.1:5052/api/v1/get/ready"
        this.state = {
            state: 0,
            state_text: "Подготовка к взлёту",
        }
    }

    componentDidMount() {
        setInterval(() => {
            if (this.props.state){
                fetch(this.base_url)
                    .then(response => response.json())
                    .then(data => {
                        this.setState({state: Number(data['state'])})
                        if(data['state'] === '1'){
                            this.setState({state_text: "Готов к взлёту"})
                        }else {
                            this.setState({state_text: "Подготовка к взлёту"})
                        }
                    });
            }else{
                this.setState({state_text: "Подготовка к взлёту"})
            }
        }, 1000)
    }

    render() {
        return (
            <div className="appbar-status">-> {this.state.state_text}</div>
        );
    }
}

export default StatusItem;
