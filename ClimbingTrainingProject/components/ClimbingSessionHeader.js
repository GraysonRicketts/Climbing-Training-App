import React, { Component } from 'react';
import { Text, StyleSheet} from 'react-native';


const styles = (StyleSheet.create({
    text: {
        fontWeight: 'bold',
        color: '#999'
    }
}));

const MonthNames = [
   "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
   "November",
   "December",
]

class ClimbingSessionHeader extends Component {
    constructor(props) {
        super(props);

        let formattedDate = this.props.isTitleInMilliseconds ? this._formatDate(this.props.title) : undefined;

        this.state = {
            date: formattedDate
        };
    }
    render() {
        const date = this.state.date;

        return (
            <Text style={styles.text}>{date}</Text>
        );
    }

    _formatDate(dateInMilliseconds) {
        const date = new Date(parseInt(dateInMilliseconds));

        const year = date.getFullYear();
        let month = date.getMonth();
        month = MonthNames[month];
        const day = date.getDate();
        
        const formattedDate = `${month} ${day}, ${year}`;
        return formattedDate;
    }
}

export default ClimbingSessionHeader;