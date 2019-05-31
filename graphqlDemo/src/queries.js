import {gql} from 'apollo-boost'


const meetingQuery = gql`
    query {
        MeetingRooms {
            name
            id
            floor
            building {
                name
                id
            }
            meetings {
                title
                date
                startTime
                id
                endTime
            }
        }
    }
`
const buildingQuery = gql`
    query {
        Buildings {
            name
            meetingRooms{
                name
                meetings{
                    title
                    date
                    startTime
                    endTime
                }
            }
        }
    }`

const meetingMut = gql`
    mutation AddMeeting(
        $id:Int!,
        $title: String!,
        $date: String!,
        $startTime: String!,
        $endTime: String!,
        $meetingRoomId: Int!) {

        Meeting(id: $id,title:$title,date:$date,startTime:$startTime,endTime:$endTime,meetingRoomId: $meetingRoomId) {
            id
            title
        }
    }
`

export {meetingQuery, buildingQuery, meetingMut}
