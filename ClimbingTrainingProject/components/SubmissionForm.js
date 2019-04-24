import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native';
import Button from './Button';

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
    subjectTextInput: {
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
            title: '',
            contact: '',
            body: ''
        }
    }

    render() {
        const {
            buttonTitle,
        } = this.props;

        return (
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.textInput}
                    value={this.state.title}
                    onChangeText={this.titleTextChanged.bind(this)}
                />

                <Text style={styles.label}>Contact (email)</Text>
                <TextInput
                    textContentType='emailAddress'
                    style={styles.textInput}
                    value={this.state.contact}
                    onChangeText={this.contactTextChanged.bind(this)}
                />

                <Text style={styles.label}>Issue</Text>
                <TextInput
                    style={{
                        ...styles.textInput,
                        ...styles.subjectTextInput
                    }}
                    multiline={true}
                    value={this.state.body}
                    onChangeText={this.bodyTextChanged.bind(this)}
                />

                <Button 
                    title={buttonTitle ? buttonTitle : 'Submit'}
                    onPress={this._onButtonPress.bind(this)}
                    fontSize={20}
                    fontColor={'#FDFDFD'}
                    isEmphasized={true}
                    style={styles.submitButton}
                />
            </View>
        );
    }

    _onButtonPress() {
        const { onButtonPress } = this.props;
        const {
            title,
            contact,
            body
        } = this.state;

        onButtonPress(title, contact, body);
    }

    titleTextChanged(newTitle) {
        this.setState({
            title: newTitle
        });
    }

    contactTextChanged(newContact) {
        this.setState({
            contact: newContact
        });
    }

    bodyTextChanged(newBodyText) {
        this.setState({
            body: newBodyText
        });
    }
}

export default SubmissionForm;