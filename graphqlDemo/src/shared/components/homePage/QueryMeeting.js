import React, {Component} from 'react';
import {Query} from 'react-apollo'
import {meetingQuery} from '../../../queries'
import styles from '../../../main.module.css';
class QueryMeeting extends Component {
    constructor(props) {
        super(props);
        this.getMeetings = this.getMeetings.bind(this);
        this.TDate=new Date(Date.now()).toLocaleString().split(",")[0];
        this.TTime=new Date(Date.now()).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
            .replace(/(:\d{2}| [AP]M)$/, "");

    }
    getMeetings(MeetingRooms){
        this.totalMeetings=0;
        this.totalMeetingsToday=0;
        this.totalMeetingsGoingOn=0;
        MeetingRooms.map(({meetings},key)=>{
            this.totalMeetings+=meetings.length;
            meetings.map((roomDetails)=>{
                if(roomDetails.date===this.TDate){
                    this.totalMeetingsToday++;
                }
                if(roomDetails.startTime<this.TTime && roomDetails.endTime>this.TTime){
                    this.totalMeetingsGoingOn++;
                }
            })
        })
    }

    render() {
        return (
            <Query query={meetingQuery}>
                {result => {
                    if (result.loading) return <p>loading...</p>;
                    if (result.error) return <p>{result.error.message}</p>;
                    return (
                        result.data && <div className={styles.innerContainer}>
                            {this.getMeetings(result.data.MeetingRooms)}
                            <h3>Meetings <br/>
                                <div>
                                      <span>
                                           Total: {this.totalMeetings}
                                      </span>

                                </div>
                                <div>
                                    <span>
                                           Total Meeting Today: {this.totalMeetingsToday}
                                      </span>
                                </div>
                                <div>
                                    <span>
                                           Total going on now: {this.totalMeetingsGoingOn}
                                      </span>
                                </div>
                                <div>
                                </div>
                            </h3>

                        </div>
                    );
                }}
            </Query>
        )
    }
}

export default QueryMeeting;
