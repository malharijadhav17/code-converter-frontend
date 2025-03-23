import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const Container = styled.div`
  background-color: #000;
  color: ${(props) => props.textColor || '#0f0'};
  font-family: 'Courier New', Courier, monospace;
  height: 100vh;
  padding: 20px;
  overflow-y: auto;
  white-space: pre-wrap;
  position: relative;
`;

const Cursor = styled.span`
  display: inline-block;
  background-color: ${(props) => props.textColor || '#0f0'};
  width: 10px;
  height: 18px;
  animation: ${blink} 0.7s infinite;
`;

const Popup = styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.9);
  padding: 20px;
  font-size: 30px;
  font-weight: bold;
  border: 2px solid ${(props) => props.color};
  color: ${(props) => props.color};
  box-shadow: 0 0 20px ${(props) => props.color};
  z-index: 999;
  animation: ${blink} 1s infinite;
  text-align: center;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ColorPicker = styled.input`
  border: none;
  outline: none;
  cursor: pointer;
`;

const HackerTyper = () => {
  const [code, setCode] = useState('');
  const [index, setIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupColor, setPopupColor] = useState('#f00');
  const [textColor, setTextColor] = useState('#0f0');
  const containerRef = useRef(null);

  // Sample code (100+ lines)
  const sampleCode = `
import os
import sys
import time
import random

def hack_the_system():
    print("Initializing hack...")
    time.sleep(1)
    
    print("Establishing connection...")
    for i in range(10):
        print(f"Connection Step {i + 1}/10: OK")
        time.sleep(0.1)

    print("Bypassing firewalls...")
    for i in range(5):
        print(f"Bypass Attempt {i + 1}/5: SUCCESS")
        time.sleep(0.1)
    
    print("Injecting malicious payload...")
    for i in range(20):
        payload = f"Payload_{random.randint(1000, 9999)}"
        print(f"Injecting {payload}... COMPLETE")
        time.sleep(0.05)

    print("Accessing root directory...")
    for i in range(10):
        print(f"Root Access Step {i + 1}/10: GRANTED")
        time.sleep(0.05)

    print("Reading system files...")
    for i in range(20):
        file = f"/etc/config_{random.randint(1000, 9999)}"
        print(f"Reading {file}... OK")
        time.sleep(0.05)

    print("Extracting user credentials...")
    for i in range(15):
        user = f"user_{random.randint(1000, 9999)}"
        password = f"pass_{random.randint(1000, 9999)}"
        print(f"User: {user} | Password: {password}")
        time.sleep(0.05)

    print("Installing backdoor...")
    for i in range(10):
        print(f"Installing backdoor... {i + 1}/10 COMPLETE")
        time.sleep(0.1)

    print("Cleaning up logs...")
    for i in range(5):
        print(f"Cleanup Step {i + 1}/5: SUCCESS")
        time.sleep(0.1)
    
    print("Spoofing IP address...")
    for i in range(5):
        ip = f"{random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}"
        print(f"New IP Address: {ip}")
        time.sleep(0.1)

    print("Sending encrypted data to secure server...")
    for i in range(5):
        print(f"Data Packet {i + 1}/5: SENT")
        time.sleep(0.1)

    print("Deleting logs...")
    for i in range(5):
        print(f"Log {i + 1}/5: DELETED")
        time.sleep(0.1)

    print("HACK COMPLETE!")

hack_the_system()
`;

  useEffect(() => {
    const handleKeyPress = () => {
      if (index < sampleCode.length) {
        const nextChunk = sampleCode.slice(index, index + Math.floor(Math.random() * 3) + 1);
        setCode((prev) => prev + nextChunk);
        setIndex(index + nextChunk.length);

        // Auto-scroll to bottom
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      } else if (!showPopup) {
        // Show popup when code ends
        const isGranted = Math.random() > 0.5;
        setPopupMessage(isGranted ? '🟢 ACCESS GRANTED 🟢' : '🚨 ACCESS DENIED 🚨');
        setPopupColor(isGranted ? '#0f0' : '#f00');
        setShowPopup(true);

        setTimeout(() => setShowPopup(false), 2000); // Hide popup after 2 seconds
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [index, sampleCode, code, showPopup]);

  return (
    <Container ref={containerRef} textColor={textColor}>
      {code}
      <Cursor textColor={textColor} />

      {showPopup && <Popup color={popupColor}>{popupMessage}</Popup>}

      <Footer>
        <span>Change Text Color:</span>
        <ColorPicker
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
        />
      </Footer>
    </Container>
  );
};

const App = () => {
  return <HackerTyper />;
};

export default App;
