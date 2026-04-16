import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Keyboard, Platform, TouchableOpacity, Text } from 'react-native';
import MessageBubble from './MessageBubble';
import InputBar from './InputBar';


export default function ChatView({scrollToBottom, scrollViewRef, sendMessage, styles, messages, setInputBarText, inputBarText, clearMessages}){
    return(
        <>
        <View style={chatStyles.header}>
            <TouchableOpacity onPress={clearMessages} style={chatStyles.closeButton}>
                <Text style={chatStyles.closeText}>✕</Text>
            </TouchableOpacity>
        </View>
        <ScrollView 
          ref={scrollViewRef} 
          style={styles.messages}
          onContentSizeChange={() => scrollToBottom()} // Auto-scrolls when new content arrives
        >
          {messages.map((msg, index) => (
            <MessageBubble 
              key={index} 
              direction={msg.direction} 
              text={msg.text} 
            />
          ))}
        </ScrollView>

        <InputBar 
          onSendPressed={sendMessage} 
          onSizeChange={() => scrollToBottom(false)}
          onChangeText={setInputBarText}
          text={inputBarText}
        />
    </>
    );
}

const chatStyles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
        backgroundColor: '#f9f9f9',
    },
    closeButton: {
        padding: 5,
    },
    closeText: {
        fontSize: 18,
        color: '#666',
    },
});