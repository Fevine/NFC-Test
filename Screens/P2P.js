import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';

// Initialize NFC Manager
NfcManager.start();

const P2P = () => {
    useEffect(() => {
        const initNfc = async () => {
            try {
                await NfcManager.start();
            } catch (err) {
                console.warn('NFC initialization failed', err);
            }
        };

        initNfc();

        return () => {
            NfcManager.setEventListener(NfcTech.Ndef, null);
            NfcManager.stop();
        };
    }, []);

    const sendMessage = async () => {
        try {
            await NfcManager.requestTechnology(NfcTech.Ndef);
            const message = [
                Ndef.textRecord('Hello, world!'),
            ];
            await NfcManager.writeNdefMessage(message);
            await NfcManager.setAlertMessageIOS('Message sent!');
        } catch (ex) {
            console.warn('Error sending message', ex);
        } finally {
            NfcManager.cancelTechnologyRequest();
        }
    };

    const readMessage = async () => {
        try {
            await NfcManager.requestTechnology(NfcTech.Ndef);
            const tag = await NfcManager.getTag();
            console.log('Tag found:', tag);
            if (tag) {
                console.log('Message:', Ndef.text.decodePayload(tag.ndefMessage[0].payload));
            } else {
                console.warn('No tag found');
            }
            await NfcManager.setAlertMessageIOS('Message read!');
        } catch (ex) {
            console.warn('Error reading message', ex);
        } finally {
            NfcManager.cancelTechnologyRequest();
        }
    };

    return (
        <View style={styles.container}>
            <Text>NFC Peer to Peer Example</Text>
            <Button title="Send NFC Message" onPress={sendMessage} />
            <Button title="Read NFC Message" onPress={readMessage} />
        </View>
    );
};

export default P2P;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
