import React, { Component } from 'react';
import { Modal, Button, Text, View} from 'react-native';


class ConfirmModal extends Component {
    render() {
        const { confirmDialog, cancelText, confirmText, confirmAction, isVisible } = this.props;

        return (
            <Modal
                visible={isVisible}
                animationType={'none'}
                onRequestClose={this._hideModal.bind(this)}
                onBackdropPress={this._hideModal.bind(this)}
                avoidKeyboard={true}
            >
                <View>
                    <Text>{confirmDialog}</Text>
                    
                    <Button 
                        title={confirmText}
                        onPress={confirmAction}
                    />

                    <Button 
                        title={cancelText}
                        onPress={this._hideModal.bind(this)}
                    />
                </View>
            </Modal>
        );
    }

    _hideModal() {
        this.props.cancelAction();
    }
}

export default ConfirmModal;