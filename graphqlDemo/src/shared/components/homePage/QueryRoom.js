import React, {Component} from 'react';
import {Query} from 'react-apollo'
import {meetingQuery} from '../../../queries'
import styles from '../../../main.module.css';

export default class  QueryRoom extends Component {
    constructor(props) {
        super(props);
        this.cal = this.cal.bind(this);

    }
    cal(mRomm) {
        var tMeet = 0;

        mRomm.map((v, k) => {

            tMeet += v.meetings.length;

        })

        return tMeet;
    }
    render() {
        return (
            <Query query={meetingQuery}>
                {result => {
                    if (result.loading) return <p>loading...</p>;
                    if (result.error) return <p>{result.error.message}</p>;
                    return (
                        <div className={styles.innerContainer}>
                            <h3>Rooms <br/>
                                <div>
                                      <span>
                                           Total: {JSON.stringify(result.data.MeetingRooms.length)}
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

