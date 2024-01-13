import React, { useEffect, useState, useRef } from 'react';
import Peer from 'peerjs';

const WebRTCComponent = () => {
  const [stream, setStream] = useState(null);
  const [peerId, setPeerId] = useState('');
const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
const remoteVideoRef = useRef(null);
const currentUserVideoRef = useRef(null);
const peerInstance = useRef(null);


  useEffect(() => {
    const peer = new Peer();

    peer.on('open', (id) => {
      setPeerId(id)
      console.log('My peer ID is: ' + id);
    });

    peer.on('call', (call) => {
      var getUserMedia = navigator.getUserMedia 
      || navigator.webkitGetUserMedia 
      || navigator.mozGetUserMedia;

      getUserMedia({ video: true, audio: true }, (mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();
        call.answer(mediaStream)
        call.on('stream', function(remoteStream) {
          remoteVideoRef.current.srcObject = remoteStream
          remoteVideoRef.current.play();
        });
      });
    })
  peerInstance.current = peer;

   
  }, [stream]);


  const call = (remotePeerId) => {
    var getUserMedia = navigator.getUserMedia 
    || navigator.webkitGetUserMedia 
    || navigator.mozGetUserMedia;

    getUserMedia({ video: true, audio: true }, (mediaStream) => {

      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();

      const call = peerInstance.current.call(remotePeerId,mediaStream)
      console.log(mediaStream);

      call.on('stream', (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream
        remoteVideoRef.current.play();
      });
    });
  }

  return (
    <div className="App" style={{ textAlign: 'center' }}>
    <h1>Current user id is {peerId}</h1>
    <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} style={{ width: '200px', height: '30px', fontSize: '16px' }} />
    <button onClick={() => call(remotePeerIdValue)} style={{ marginLeft: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor:'green' }}>Call</button>
    <div style={{ marginTop: '20px' }}>
      <video ref={currentUserVideoRef} style={{ width: '300px', height: '200px' }} />
    </div>
    <div style={{ marginTop: '20px' }}>
      <video ref={remoteVideoRef} style={{ width: '300px', height: '200px' }} />
    </div>
  </div>
  );
};

export default WebRTCComponent;
