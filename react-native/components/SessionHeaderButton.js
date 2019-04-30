import React, { Component } from 'react';
import { Button } from 'react-native';

class SaveSessionButton extends Component {
    render() {
        const { title, navigation, navigationParam, isCancel } = this.props;

        return (
            <Button
                title={title}
                onPress={navigation.getParam(navigationParam)}
                color={isCancel ? '#FF4C4C' : undefined }
            />
        );
    }
}

export default SaveSessionButton;