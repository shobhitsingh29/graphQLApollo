import React, {Component} from 'react';
import styles from "../../../main.module.css";

class AddMeetingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "",
            startTime: "",
            endTime: "",
            title: "",
        };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handlestartTimeChange = this.handlestartTimeChange.bind(this);
        this.handleendTimeChange = this.handleendTimeChange.bind(this);
        this.handletitleChange = this.handletitleChange.bind(this);
    }


    handletitleChange(e) {
        this.setState({title: e.target.value});
    }

    handleDateChange(e) {
        const TDate=new Date(Date.now()).toLocaleString().split(",")[0].split("/").reverse().join("-");
        if(e.target.value<TDate){
            window.alert(" Date of meeting must be more than today's date")
        }else{

            this.setState({date: e.target.value});
        }
    }

    handlestartTimeChange(e) {
        this.setState({startTime: e.target.value});
    }

    handleendTimeChange(e) {
        if(e.target.value<this.state.startTime){
            window.alert("endTime of meeting must be more than start time")
        }else {
            this.setState({endTime: e.target.value});

        }
    }

    render() {
        const {nextStateChange} = this.props;
        return (
            <div>
                <div className={styles.AddMeetingForm}>
                    <div>
                        <form name="addMeet" className={styles.formStyles}>
                            <div>
                                <label>Title:</label>
                                <input type="text"
                                       value={this.state.title}
                                       onChange={this.handletitleChange}
                                />
                            </div>
                            <br></br>

                            <div>
                                <label>Date:</label>
                                <input type="date"
                                       value={this.state.date}
                                       onChange={this.handleDateChange}
                                />
                            </div>
                            <br></br>
                            <div>

                                <label>Start Time:</label>
                                <input type="time"
                                       value={this.state.startTime}
                                       onChange={this.handlestartTimeChange}
                                />
                            </div>
                            <br></br>
                            <div >
                                <label>End Time:</label>
                                <input type="time"
                                       value={this.state.endTime}
                                       onChange={this.handleendTimeChange}

                                />
                            </div>
                            <br></br>
                        </form>
                    </div>
                </div>
                <input type="button" className={styles.btnContainerAddMeet} onClick={e => {
                    e.preventDefault();
                    nextStateChange(e, this.state);
                }
                } value="NEXT"/>
            </div>

        );
    }
}

export default AddMeetingForm;
