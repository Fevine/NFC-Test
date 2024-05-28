import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

// Initialize NFC Manager
NfcManager.start();

const NFC = () => {
    useEffect(() => {
        // Initialize NFC when the component mounts
        const initNfc = async () => {
            await NfcManager.start();
        };

        initNfc();

        // Clean up when the component unmounts
        return () => {
            NfcManager.setEventListener(NfcTech.Ndef, null);
            NfcManager.stop();
        };
    }, []);

    const readNfcTag = async () => {
        try {
            await NfcManager.requestTechnology(NfcTech.Ndef);
            const tag = await NfcManager.getTag();
            console.log(tag);
            await NfcManager.setAlertMessageIOS('NFC tag read!');
            await NfcManager.cancelTechnologyRequest();
        } catch (ex) {
            console.warn(ex);
            NfcManager.cancelTechnologyRequest();
        }
    };

    return (
        <View style={styles.container}>
            <Text>NFC Example</Text>
            <Button title="Read NFC Tag" onPress={readNfcTag} />
        </View>
    );
};

export default NFC;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
