import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Linking,
} from 'react-native';
import AppColors from '../../enums/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.white,
        paddingTop: 60,
        paddingLeft: 15,
        paddingRight: 15,
    },
    paragraph: {
        marginTop: 20,
    },
    list: {
        marginLeft: 15,
    },
    link: {
        color: AppColors.linkBlue,
    },
});

const aboutMeBlurb = 'Hey! This app is developed by a climber in their free time between a full-time job and climbing. \
Any help and support is greatly appreciated.';
const shoutOuts = 'Shout-out to the fantastic folks at Purdue Climbing Club, Boulders in Madison, WI, and Brooklyn \
Boulders in Chicago for awesome gyms and community!';
const contributions = 'Parts of this app were made possible by free contributions from others.';

interface IconBlurb {
    text: string;
    url: string;
    creator: string;
}

const IconBlurb = (props: IconBlurb) => {
    const {
        text,
        creator,
    } = props;

    return (
        <Text style={styles.list}>
            {text}

            <Text
                onPress={() => {
                    Linking.openURL(props.url);
                }}
                style={styles.link}
            >
                {creator}
            </Text>

            {' from '}

            <Text
                onPress={() => {
                    Linking.openURL('https://www.flaticon.com');
                }}
                style={styles.link}
            >
                {'www.flaticon.com'}
            </Text>
        </Text>
    );
};

class AboutView extends Component {
    public static navigationOptions() {
        return {
            title: '‍‍About',
        };
    }

    public render() {
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>{aboutMeBlurb}</Text>

                <Text style={styles.paragraph}>{shoutOuts}</Text>

                <Text style={styles.paragraph}>{contributions}</Text>

                {IconBlurb({
                    text: '* app logo, diskette icon, and the calendar icon were made by ',
                    url: 'https://www.flaticon.com/authors/smashicons',
                    creator: 'Smashicons',
                })}

                {IconBlurb({
                    text: '* the line chart icon was made by ',
                    url: 'https://www.freepik.com',
                    creator: 'Freepik',
                })}

                {IconBlurb({
                    text: '* the flash icon was made ',
                    url: 'https://www.freepik.com',
                    creator: 'Freepik',
                })}

                {IconBlurb({
                    text: '* the onsite icon was made by ',
                    url: 'https://www.freepik.com',
                    creator: 'Freepik',
                })}

                {IconBlurb({
                    text: '* the redpoint icon was made by ',
                    url: 'https://www.freepik.com',
                    creator: 'Freepik',
                })}

                {IconBlurb({
                    text: '* the warmup icon was made by ',
                    url: 'https://www.freepik.com',
                    creator: 'Freepik',
                })}
            </View>
        );
    }
}

export default AboutView;
