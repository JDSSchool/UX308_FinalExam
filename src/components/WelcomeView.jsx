import { Text, View, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import InputBar from "./InputBar"

export default function WelcomeView({scrollToBottom, sendMessage, setInputBarText, inputBarText}){
    return(
        <View style={styles.container}>
            <View style={styles.hero}>
                <Image 
                    source={{ uri: 'https://images.pexels.com/photos/4974568/pexels-photo-4974568.jpeg?auto=compress&cs=tinysrgb&w=1200' }} 
                    style={styles.heroImage} 
                />
                <Text style={styles.heroTitle}>Welcome to Glamour Salon</Text>
                <Text style={styles.heroSubtitle}>Book your perfect hair or nail service today!</Text>
            </View>
            <View style={styles.inputSection}>
                <InputBar 
                  onSendPressed={() => sendMessage()} 
                  onSizeChange={() => scrollToBottom(false)}
                  onChangeText={setInputBarText}
                  text={inputBarText}
                />
            </View>
            <View style={styles.buttons}>
                <Button mode="contained" onPress={() => sendMessage('buzz cut')} style={styles.button}>
                    Buzz Cut
                </Button>
                <Button mode="contained" onPress={() => sendMessage('1 blade')} style={styles.button}>
                    1 Blade
                </Button>
                <Button mode="contained" onPress={() => sendMessage('regular cut')} style={styles.button}>
                    Regular Cut
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    hero: {
        height: 300,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        paddingBottom: 10,
    },
    heroImage: {
        width: '100%',
        height: 220,
        resizeMode: 'cover',
    },
    heroTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    heroSubtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 5,
    },
    inputSection: {
        padding: 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
    },
});