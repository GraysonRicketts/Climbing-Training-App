import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    KeyboardAvoidingView,
    View,
} from 'react-native';
import Button from './Button';
import sendEmail from '../util/EmailSender';
import AppColors from '../enums/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    shiftContainer: {
        justifyContent: 'flex-end',
    },
    label: {
        marginTop: 15,
        fontSize: 20,
        color: AppColors.gray,
    },
    textInput: {
        fontSize: 22,
        backgroundColor: AppColors.white,
        borderWidth: 0.5,
        borderColor: AppColors.lightGray,
        marginTop: 5,
        marginBottom: 15,
    },
    bodyTextInput: {
        height: '30%',
    },
    submitButton: {
        backgroundColor: AppColors.saveGreen,
        marginTop: 25,
        padding: 20,
    },
});

interface SubmissionFormProps {
    goBack: Function;
    templateId: string;
}

interface SubmissionFormState {
    subject: string;
    body: string;
    from: string;
}

class SubmissionForm extends Component<SubmissionFormProps, SubmissionFormState> {
    public constructor(props: SubmissionFormProps) {
        super(props);

        this.submit = this.submit.bind(this);
        this.onSubjectTextChanged.bind(this);
        this.onBodyTextChanged.bind(this);
        this.onFromTextChanged.bind(this);

        this.state = {
            subject: '',
            body: '',
            from: '',
        };
    }

    private onSubjectTextChanged(subject: string) {
        this.setState({
            subject,
        });
    }

    private onFromTextChanged(from: string) {
        this.setState({
            from,
        });
    }

    private onBodyTextChanged(body: string) {
        this.setState({
            body,
        });
    }

    private submit() {
        const {
            templateId,
            goBack,
        } = this.props;
        const {
            from,
            subject,
            body,
        } = this.state;

        // TODO: add validation letting user know they can add email in from
        sendEmail(templateId, subject, from, body);

        goBack();
    }

    // TODO: add validation that doesn't let user send if all fields not filled out
    // TODO: pull 'From' from user data
    public render() {
        const {
            subject,
            from,
            body,
        } = this.state;

        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.container}
            >
                {/* This View is required for KeyboardAvoidingView to shift up */}
                <View style={styles.shiftContainer}>
                    <Text style={styles.label}>Subject</Text>
                    <TextInput
                        onChangeText={this.onSubjectTextChanged}
                        style={styles.textInput}
                        value={subject}
                    />

                    <Text style={styles.label}>From (optional)</Text>
                    <TextInput
                        onChangeText={this.onFromTextChanged}
                        style={styles.textInput}
                        value={from}
                    />

                    <Text style={styles.label}>Issue</Text>
                    <TextInput
                        multiline
                        onChangeText={this.onBodyTextChanged}
                        style={{
                            ...styles.textInput,
                            ...styles.bodyTextInput,
                        }}
                        value={body}
                    />

                    <Button
                        fontColor={AppColors.white}
                        fontSize={20}
                        isEmphasized
                        onPress={this.submit}
                        style={styles.submitButton}
                        title='Submit'
                    />
                </View>
            </KeyboardAvoidingView>
        );
    }
}

export default SubmissionForm;
