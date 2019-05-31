import React, {Component} from 'react';
import {Query} from 'react-apollo'
import {buildingQuery} from '../../../queries'
import styles from '../../../main.module.css';

class QueryBuilding extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Query query={buildingQuery}>
                {result => {
                    if (result.loading) return <p>loading...</p>;
                    if (result.error) return <p>{result.error.message}</p>;
                    return (
                        result.data && <div className={styles.container}>
                            <div className={styles.innerContainer}>
                                <h3>Buildings <br/>
                                    <span>
                                          Total: {JSON.stringify(result.data.Buildings.length)}
                                      </span>
                                </h3>

                            </div>
                        </div>
                    );
                }}
            </Query>
        )
    }
}

export default QueryBuilding;
