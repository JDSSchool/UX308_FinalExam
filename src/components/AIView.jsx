import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import { handleInput } from '../Order';
import ChatView from './ChatView'
import WelcomeView from './WelcomeView';

export default function AIView(){
  const [messages, setMessages] = useState([]);
  const [inputBarText, setInputBarText] = useState('');
  const scrollViewRef = useRef(null);

  // Scroll to bottom helper
  const scrollToBottom = (animated = true) => {
    // Small timeout ensures the layout has calculated before scrolling
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated });
    }, 100);
  };

  useEffect(() => {
    // Setup keyboard listeners
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => scrollToBottom());
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => scrollToBottom());

    // Initial scroll
    scrollToBottom(false);

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  // Scroll whenever messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const clearMessages = () => {
    setMessages([]);
    setInputBarText('');
  };

  const sendMessage = (textToSend = inputBarText) => {
    const trimmedText = textToSend.trim();
    if (trimmedText.length === 0) return;

    let newMessages = [{ direction: 'right', text: trimmedText }];
    const aResponse = handleInput(trimmedText);
    for(const message of aResponse){
      newMessages.push({direction: "left", text: message});
    }
    setMessages([...messages, ...newMessages]);
    setInputBarText('');
  };

  return (
    <View style={styles.outer}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        {messages.length?(
        <ChatView scrollToBottom={scrollToBottom} 
        sendMessage={sendMessage} 
        scrollViewRef={scrollViewRef} 
        styles={styles} 
        messages={messages} 
        setInputBarText={setInputBarText}
        inputBarText={inputBarText}
        clearMessages={clearMessages}  />

        ):(
          <WelcomeView 
          scrollToBottom={scrollToBottom} 
        sendMessage={sendMessage} 
        scrollViewRef={scrollViewRef} 
        styles={styles} 
        messages={messages} 
        setInputBarText={setInputBarText}
        inputBarText={inputBarText}  />

        )}
      </KeyboardAvoidingView>
    </View>
  );
};

//TODO: separate these out. This is what happens when you're in a hurry!
const styles = StyleSheet.create({

  //ChatView

  outer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },

  messages: {
    flex: 1
  },

})