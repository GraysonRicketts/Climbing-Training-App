import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    KeyboardAvoidingView,
    View
} from 'react-native';
import Button from './Button';
import sendEmail from '../util/EmailSender';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    label: {
        marginTop: 15,
        fontSize: 20,
        color: '#373737',// TODO: Use project defined color
    },
    textInput: {
        fontSize: 22,
        backgroundColor: '#FDFDFD',// TODO: Use project defined color
        borderWidth: 0.5,
        borderColor: '#AAA',// TODO: Use project defined color
        marginTop: 5,
        marginBottom: 15
    },
    bodyTextInput: {
        height: '30%'
    },
    submitButton: {
        backgroundColor: '#0F992D',// TODO: Use project defined color
        marginTop: 25,
        padding: 20,
    }
});

interface ISubmissionFormProps {
    buttonTitle?: string
    goBack: Function
    templateId: string
}

interface ISubmissionFormState {
    subject: string
    body: string
    from: string
}

class SubmissionForm extends Component<ISubmissionFormProps, ISubmissionFormState> {
    constructor(props: ISubmissionFormProps) {
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
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.container}
            >
                <View style={{ justifyContent: 'flex-end' }}>
                    <Text style={styles.label}>Subject</Text>
                    <TextInput
                        style={styles.textInput}
                        value={this.state.subject}
                        onChangeText={this._onSubjectTextChanged.bind(this)}
                    />

                    <Text style={styles.label}>From (optional)</Text>
                    <TextInput
                        style={styles.textInput}
                        value={this.state.from}
                        onChangeText={this._onFromTextChanged.bind(this)}
                    />

                    <Text style={styles.label}>Issue</Text>
                    <TextInput
                        style={{
                            ...styles.textInput,
                            ...styles.bodyTextInput
                        }}
                        multiline={true}
                        value={this.state.body}
                        onChangeText={this._onBodyTextChanged.bind(this)}
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
            </KeyboardAvoidingView>
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

    _onSubjectTextChanged(subject: string) {
        this.setState({
            subject
        });
    }

    _onFromTextChanged(from: string) {
        this.setState({
            from
        });
    }

    _onBodyTextChanged(body: string) {
        this.setState({
            body
        });
    }
}

export default SubmissionForm;