import React, {Component} from 'react';
import {Mutation, Query} from 'react-apollo'
import {buildingQuery, meetingMut, meetingQuery} from '../../../queries'
import styles from '../../../main.module.css';
import './freeRoom.css';

class FreeRoom extends Component {
    constructor(props) {
        super(props);
        this.getRoomDetails = this.getRoomDetails.bind(this);
        this.mutateFreeRoom = this.mutateFreeRoom.bind(this);
        this.getFreeRoomsFromMRooms = this.getFreeRoomsFromMRooms.bind(this);
        this.addOption = this.addOption.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.meetingRoomId = '';
        this.state = {
            freeRoomSelected: false,
            buildingName:'Building 8'
        }
    }

    handleSelect(e) {
        this.setState({buildingName: e.target.value});
    }
    addOption(data) {
        return data.map((val, key) => {
            return <option key={key} value={val.name}>{val.name}</option>
        });
    }
    mutateFreeRoom(details) {
        return (e) => {
            this.meetingRoomId = details.id;
            this.setState({freeRoomSelected: true})
        }
    }
    getRoomDetails(MRooms) {
        const freeRooms = this.getFreeRoomsFromMRooms(MRooms);
        return MRooms.map((val, key) => {
            if ( Array.isArray(freeRooms) && freeRooms[key].some((i)=>i===false) ) {
                return <div key={key} className={styles.innerContainer}>
                    <p>Meeting Room <span className={styles.meetName}>{val.name}</span>  not available at this point,try different combination
                    </p>
                </div>

            } else if (this.state.buildingName===val.building.name) {
                return <div key={key} onClick={this.mutateFreeRoom(val)} className={styles.innerContainer}>
                    <div>{val.name}
                    </div>
                    <div>Floor:{val.floor}
                    </div>
                    <div>building:{val.building.name}
                    </div>
                </div>

            }
            else {
                return <div key={key} className={styles.innerContainer}>
                    <p>NO Meeting Rooms  not available at this point in this building
                    </p>
                </div>;
            }

        });
    }

    getFreeRoomsFromMRooms(NRooms) {

        const {freeRoomstate: f} = this.props;

        f.date= f.date.split("-").reverse().join("/");

        return NRooms.map(({meetings}) => {
            if (meetings.length === 0) {
                return true;
            } else {
                return meetings.map((meetingsDetails) => {
                    if (f.date === meetingsDetails.date) {
                        if (f.endTime < meetingsDetails.startTime && f.endTime < meetingsDetails.endTime) {
                            return true;

                        } else if (f.startTime > meetingsDetails.startTime && f.startTime > meetingsDetails.endTime) {

                            return true;
                        }
                        return false;
                    }
                    return null;
                })
            }
        })
    }

    render() {
        const {selectFreeRoom, freeRoomstate} = this.props;
        return (
            <div className={styles.Home}>
                <Query query={buildingQuery}>
                    {result => {
                        if (result.loading) return <p>loading...</p>;
                        if (result.error) return <p>{result.error.message}</p>;
                        return (
                            result.data && <div className={styles.selectDiv}>
                                <label>Select Building :</label>
                                <select name="building" onChange={this.handleSelect}>
                                    {this.addOption(result.data.Buildings)}
                                </select>
                            </div>
                        );
                    }}
                </Query>
                <Query query={meetingQuery}>
                    {result => {
                        if (result.loading) return <p>loading...</p>;
                        if (result.error) return <p>{result.error.message}</p>;
                        const MRooms = result.data.MeetingRooms;
                        return (
                            result.data && <div className={styles.container}>
                                <div className={styles.innerContainer}>
                                    {!this.state.freeRoomSelected && this.getRoomDetails(MRooms)}
                                </div>
                            </div>
                        );
                    }}
                </Query>
                {this.state.freeRoomSelected && <Mutation mutation={meetingMut}>
                    {(AddMeeting, {data}) => {

                        this.setState({freeRoomSelected: false});

                        AddMeeting({
                            variables: {
                                id: parseInt(Math.random() * 100),
                                title: freeRoomstate.title,
                                date: freeRoomstate.date.split("-").reverse().join("/"),
                                startTime: freeRoomstate.startTime,
                                endTime: freeRoomstate.endTime,
                                meetingRoomId: parseInt(this.meetingRoomId)
                            }
                        }).then(res => {
                            console.log(res);
                            selectFreeRoom(freeRoomstate);
                        });
                        return <div></div>;

                    }}</Mutation>}
            </div>
        )
    }
}

export default FreeRoom;
