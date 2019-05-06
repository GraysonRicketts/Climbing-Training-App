import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native';
import Button from './Button';
import sendEmail from './../helpers/EmailSender';

const styles = StyleSheet.create({
    label: {
        marginTop: 15,
        fontSize: 20,
        color: '#373737',
    },
    textInput: {
        fontSize: 22,
        backgroundColor: '#FDFDFD',
        borderWidth: 0.5,
        borderColor: '#AAA',
        marginTop: 5,
        marginBottom: 15
    },
    bodyTextInput: {
        height: '30%'
    },
    submitButton: {
        backgroundColor: '#0F992D',
        marginTop: 25,
        padding: 20,
    }
});

class SubmissionForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subject: '',
            body: '',
            from: ''
        }
    }

    // TODO: add validation that doesn't let user send if all fields not filled out
    // TODO: pull "From" from user data
    render() {
        const {
            buttonTitle,
        } = this.props;

        return (
            <View>
                <Text style={styles.label}>Subject</Text>
                <TextInput
                    style={styles.textInput}
                    value={this.state.subject}
                    onChangeText={this.subjectTextChanged.bind(this)}
                />

                <Text style={styles.label}>From (optional)</Text>
                <TextInput
                    style={styles.textInput}
                    value={this.state.from}
                    onChangeText={this.fromTextChanged.bind(this)}
                />

                <Text style={styles.label}>Issue</Text>
                <TextInput
                    style={{
                        ...styles.textInput,
                        ...styles.bodyTextInput
                    }}
                    multiline={true}
                    value={this.state.body}
                    onChangeText={this.bodyTextChanged.bind(this)}
                />

                <Button 
                    title={buttonTitle ? buttonTitle : 'Submit'}
                    onPress={this.submit.bind(this)}
                    fontSize={20}
                    fontColor={'#FDFDFD'}
                    isEmphasized={true}
                    style={styles.submitButton}
                />
            </View>
        );
    }

    submit() {
        const {
            templateId
        } = this.props;
        const { 
            from,
            subject,
            body 
        } = this.state;

        // TODO: add validation letting user know they can add email in from
        sendEmail(templateId, subject, from, body);

        this.props.goBack();
    }

    subjectTextChanged(subject) {
        this.setState({
            subject
        });
    }

    fromTextChanged(from) {
        this.setState({
            from
        });
    }

    bodyTextChanged(body) {
        this.setState({
            body
        });
    }
}

export default SubmissionForm;