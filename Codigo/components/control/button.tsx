import { Text, StyleSheet, Pressable, GestureResponderEvent, StyleProp, ViewStyle, TextStyle } from 'react-native';

export default function Button({ onPress, title, buttonStyles, textStyles }: {
    onPress: (event: GestureResponderEvent) => void | null | undefined,
    title?: string,
    buttonStyles?: StyleProp<ViewStyle>,
    textStyles?: StyleProp<TextStyle>
}) {
    const newStylesBtn = { ..._styles.button, ...buttonStyles as any } as StyleProp<ViewStyle>;
    const newStylesText = { ..._styles.text, ...textStyles as any } as StyleProp<TextStyle>;
    return (
        <Pressable style={newStylesBtn} onPress={onPress}>
            <Text style={newStylesText}>{title}</Text>
        </Pressable>
    );
}

const _styles = StyleSheet.create({ 
    button: { 
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingVertical: 12, 
        paddingHorizontal: 32, 
        borderRadius: 4, 
        elevation: 3, 
        backgroundColor: '#1F232C', 
    }, 
    text: { 
        fontSize: 16, 
        lineHeight: 21, 
        fontWeight: 'bold', 
        letterSpacing: 0.25, 
        color: 'white'
    }
});
