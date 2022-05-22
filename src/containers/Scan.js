import React, { useCallback, useContext, useEffect, useState, useRef } from 'react';
import Scanner from '../components/Scanner/Scanner';
import { ActionsContext } from '../contexts/context';

const Scan = () => {
    const [message, setMessage] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const { actions, setActions} = useContext(ActionsContext);

    let [Error,setError] = useState("Scanning....");
    

    const scan = useCallback(async() => {

        if ('NDEFReader' in window) { 
            try {
                const ndef = new window.NDEFReader();
                await ndef.scan();
                
                console.log("Scan started successfully.");
                ndef.onreadingerror = () => {
                    setError("Cannot read data from the NFC tag. Try another one?");
                };
                
                ndef.onreading = event => {
                    console.log("NDEF message read.");
                    onReading(event);
                    setActions({
                        scan: 'scanned',
                        write: null
                    });
                    
                };

            } catch(error){
                console.log(`Error! Scan failed to start: ${error}.`);
                setError("!! Enable NFC on your device !!")
                
            };
        }
        else{
            setError("!! Browser and Device not compatible !!");
        }
    },[setActions]);
    console.log(Error);

    const onReading = ({message, serialNumber}) => {
        setSerialNumber(serialNumber);
        const decoder = new TextDecoder();
        for (const record of message.records) {
            switch (record.recordType) {
                case "text":
                    const textDecoder = new TextDecoder(record.encoding);
                    setMessage(textDecoder.decode(record.data));
                    break;
                case "url":
                     setMessage(decoder.decode(record.data));
                    break;
                default:
                    // TODO: Handle other records with record data.
                }
        }
    };

    useEffect(() => {
        scan();
    }, [scan]);


    return(
        <>
            {actions.scan === 'scanned' ?  
            <div>
                <p>Serial Number: {serialNumber}</p>
                <p>Message: {message}</p>
            </div>
            : <Scanner status={actions.scan} Error = {Error} ></Scanner>
            
            }
        </>
    );
};

export default Scan;