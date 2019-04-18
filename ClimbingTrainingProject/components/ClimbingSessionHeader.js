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

        let { title } = this.props;

        const titleParts = title.split('^');
        
        title = formatDate_MMMM_DD_YYYY(titleParts[0]);
        if (titleParts.length > 1 && titleParts[1] !== title) {
            title += ' : ';
            for (let idx = 1; idx < titleParts.length; idx++) {
                title += titleParts[idx];
            }
        }

        this.state = {
            title
        };
    }

    render() {
        const title = this.state.title;

        return (
            <Text style={styles.text}>{title}</Text>
        );
    }
}

export default ClimbingSessionHeader;