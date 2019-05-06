import React, { Component } from 'react';
import { Text, StyleSheet} from 'react-native';
import { formatDate_MMMM_DD_YYYY } from './../helpers/DateFormatter';


const styles = (StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: '400',
        color: '#666',
        backgroundColor: '#F5FCFF'
    }
}));

class ClimbingSessionHeader extends Component {
    constructor(props) {
        super(props);

        let { title } = this.props;
        title = this._formatTitle(title);

        this.state = {
            title
        };
    }

    _formatTitle(title) {
        // Separate date from user entered title
        const titleParts = title.split('^');

        // Turn ms from epoch into human readable format
        const date = formatDate_MMMM_DD_YYYY(titleParts[0]);
        let formattedTitle = date;

        // Handles when user title may have '^' that were split
        if (this._hasCustomSessionTitle(titleParts, date)) {
            titleParts.shift(); // make join work as expected
            const userEnteredTitle = titleParts.join('^');

            formattedTitle = `${formattedTitle} : ${userEnteredTitle}`;
        }

        return formattedTitle;
    }

    _hasCustomSessionTitle(titleParts, date) {
        return (titleParts.length > 1 && titleParts[1] !== date);
    }

    render() {
        const title = this.state.title;

        return (
            <Text style={styles.text}>{title}</Text>
        );
    }
}

export default ClimbingSessionHeader;