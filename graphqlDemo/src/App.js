import React, {Component} from 'react';
import './App.css';
import styles from './main.module.css';

import QueryBuilding from "./shared/components/homePage/QueryBuilding"
import QueryMeeting from "./shared/components/homePage/QueryMeeting"
import QueryRoom from "./shared/components/homePage/QueryRoom"
import AddMeetingForm from "./shared/components/Addmeeting/addMeetingForm";
import FreeRoom from "./shared/components/FreeRoomSelect/freeRoom";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            home: true,
            next: false,
            selectRoom: false,
            freeRoomstate: {}
        }
        this.selectFreeRoom = this.selectFreeRoom.bind(this);
        this.meetingRoomAdd = this.meetingRoomAdd.bind(this);
    }

    selectFreeRoom(details) {
        console.log(details);
        this.setState({
            selectRoom: false,
            next: false,
            home: true,
        });

        window.location.reload(false);
    }

    meetingRoomAdd(e, freeRoomstate) {
        this.setState({
            selectRoom: true,
            next: false,
            home: false,
            freeRoomstate: freeRoomstate
        });
    }

    render() {
        return (
            <div className="App">
                <div className={styles.GotoHome} onClick={() => {
                    this.setState({
                        selectRoom: false,
                        next: false,
                        home: true,
                    });
                    window.location.reload(false);
                }}>GOTO HOMEPAGE
                </div>

                {this.state.home && <div className={styles.Home}>
                    <QueryBuilding/>
                    <QueryRoom/>
                    <QueryMeeting/>
                    <div className={styles.next}>
                        <div className={styles.btnContainer} onClick={() => {
                            this.setState({
                                next: true,
                                selectRoom: false,
                                home: false,
                            })
                        }}>Add a meeting
                        </div>
                    </div>
                </div>
                }
                {this.state.next && <div>
                    <AddMeetingForm nextStateChange={this.meetingRoomAdd}/>
                </div>}
                {this.state.selectRoom && <div>
                    <FreeRoom freeRoomstate={this.state.freeRoomstate} selectFreeRoom={this.selectFreeRoom}/>
                </div>}
            </div>
        );
    }
}

export default App;
