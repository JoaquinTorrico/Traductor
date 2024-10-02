import { StyleSheet, TextInput, View, Alert, Text } from 'react-native';
import Button from '../components/control/button';
import { useState } from 'react';
import { registroUsuario, Usuario } from "@/hooks/dataBaseInteraction";
import { router } from 'expo-router';

export default function Register() {

  const styles = {
    container: {
      minHeight:'100%',
      flex: 1,
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

  const [usuario, setUsuario] = useState<string>('');
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');

  const onSave = (e:any) => {
    if (!usuario.trim() || !mail.trim() || !password.trimEnd() || !passwordCheck.trimEnd() || (password !== passwordCheck)){
      return Alert.alert('Información Faltante o Erronea', 'Asegúrese de que el usuario y el email sean válidos; Asi como que la contraseña y verificación sean iguales');
    }

    if (!/\S+@\S+\.\S+/.test(mail))
      return Alert.alert('Email inválido', 'Por favor ingresa un email válido.');

    registroUsuario({ Usuario: usuario, Mail: mail, Password: password } as Usuario)
      .then((res) => {
        if (!res) return Alert.alert('Error de Base de datos', 'No se pudo guardar el usuario.');
        router.navigate('/login');
      })
  }


  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Crear Cuenta</Text>
      <TextInput placeholder="Usuario" value={usuario} onChangeText={setUsuario} autoCapitalize="words" style={styles.text} />
      <TextInput placeholder="Email" value={mail} onChangeText={setMail} autoCapitalize="words" keyboardType="email-address" style={styles.text} />
      <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" style={styles.text} />
      <TextInput placeholder="Confirmar Contraseña" value={passwordCheck} onChangeText={setPasswordCheck} secureTextEntry autoCapitalize="none" style={styles.text} />

      <Button 
        title='Registro' 
        onPress={onSave}
      ></Button>
    </View>
  );
}
