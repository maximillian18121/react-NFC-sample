import React,{useState} from 'react';
import './Writer.css';
import Save from '../SVGs/save';

const Writer = ({writeFn}) => {
    const [Message, setMessage] = useState('');

    const onSave = (e) => {
        e.preventDefault();
        writeFn(Message);
        setMessage('');
    };

    return (
      <>
        <form onSubmit={onSave}>
            <div className="writer-container">
                <input type="text" placeholder="Enter URL..." value={Message} onChange={(e)=>setMessage(e.target.value)}></input>
                <button className="btn" type="submit">
                    <Save/>
                    Save
                </button>
            </div>
        </form>
      </>
    );
};

export default Writer;