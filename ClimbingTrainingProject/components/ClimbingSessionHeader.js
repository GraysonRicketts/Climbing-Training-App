import React, { Component } from 'react';
import { Text, StyleSheet} from 'react-native';
import formatDate_MMMM_DD_YYYY from './../helpers/DateFormatter';


const styles = (StyleSheet.create({
    text: {
        fontWeight: 'bold',
        color: '#999'
    }
}));

class ClimbingSessionHeader extends Component {
    constructor(props) {
        super(props);

        let formattedDate = this.props.isTitleInMilliseconds ? formatDate_MMMM_DD_YYYY(this.props.title) : undefined;

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
}

export default ClimbingSessionHeader;