import React from 'react';
import { Component } from 'react';
import { 
    Text,
    StyleSheet 
} from 'react-native';
import { formatDate_MMMM_DD_YYYY } from '../helpers/DateFormatter';


const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: '400',
        color: '#666',
        backgroundColor: '#F5FCFF'
    }
});

interface IClimbingSessionHeaderProps {
    title: string
}

interface IClimbingSessionHeaderState {
    title: string
}

class ClimbingSessionHeader extends Component<IClimbingSessionHeaderState, IClimbingSessionHeaderProps> {
    constructor(props: IClimbingSessionHeaderProps) {
        super(props);

        const { title } = this.props;
        const formattedTitle = this._formatTitle(title);

        this.state = {
            title: formattedTitle
        };
    }

    _formatTitle(title: string) {
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

    _hasCustomSessionTitle(titleParts: string[], date: string) {
        if (!date) {
            return false;
        }

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