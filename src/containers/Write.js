import React from 'react';
import Writer from '../components/Writer/Writer';

const Write = () => {
    const onWrite = async(Message) => {
        try {
            const ndef = new window.NDEFReader();
            // This line will avoid showing the native NFC UI reader
            await ndef.scan();
            await ndef.write({records: [{ recordType:"url", data: Message }],});
            alert(`Value Saved!`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
      <Writer writeFn={onWrite}/>
    );
};

export default Write;