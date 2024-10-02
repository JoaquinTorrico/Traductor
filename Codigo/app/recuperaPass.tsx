import { TouchableOpacity, StyleSheet, TextInput, View, Alert, Text } from 'react-native';
import Button from '../components/control/button';
import { useState } from 'react';
import { router } from 'expo-router';
import { usuario_generacodigo } from "@/hooks/dataBaseInteraction";

export default function Register() {

  const styles = {
    container: {
      minHeight:'100%',
      display: 'flex',
      backgroundColor: '#ffffff',
      alignContent: 'center',
      paddingLeft: 40,
      paddingRight: 40,
    },
    h1: {
      fontSize: 24,
      fontWeight: 800,
      width: '100%',
      marginBottom: 12
    },
    text: {
      backgroundColor: '#efefef',
      height: 35,
      width: '100%',
      borderColor: '#e5e5e5',
      borderWidth: 1,
      borderRadius: 7,
      paddingLeft: 10,
      paddingRight: 10,
      marginBottom: 12
    }
  }

  const [mail, setMail] = useState<string>('')

  const onSendMail = () => {
    if (!mail.trim()) 
      return Alert.alert('Información Faltante', 'Por favor verifique la información.');

    usuario_generacodigo(mail).then(res => {
      if(!res){
        Alert.alert("Ingrese un email registrado")
        return
      }

      router.navigate('/change-password');
    }).catch(ex => console.error("usuario_generacodigo", ex));
  }


  return (
    <View style={styles.container}>
      <Text style={styles.h1}>¿Olvidaste tu contraseña?</Text>
      <TextInput placeholder="Ingresar email" value={mail} onChangeText={setMail} autoCapitalize="words" keyboardType="email-address" style={styles.text} />

      <Button title='Enviar código' onPress={onSendMail} />
    </View>
  );
}


