import { StyleSheet, TextInput, View, Alert, Text } from 'react-native';
import Button from '../components/control/button';
import { useState } from 'react';
import { usuario_changepassword } from "@/hooks/dataBaseInteraction";
import { router } from 'expo-router';


//PAgina para cambio de pContraseña pos envio de mail con codigo de validación.
export default function ChangePassword() {

  const styles = {
    container: {
      minHeight: '100%',
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

  const [codigo, setCodigo] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');

  const onSave = (e: any) => {
    if (!codigo.trim())
      return Alert.alert('Información Faltante', 'Ingrese el código que envió  su email, por favor verifique la carpeta de Spam..');
    if (!password.trim() || !passwordCheck.trim())
      return Alert.alert('Información Faltante', 'Asegúrese de que el usuario y el email sean válidos.');
    if (password !== passwordCheck)
      return Alert.alert('Información Faltante', 'Las contraseñas no coinciden.');

    usuario_changepassword(parseInt(codigo), password).then((res) => {
      if (!res) {
        Alert.alert("Verifique información ingresada, Código inválido.")
        return
      }

      router.navigate('/login');


    })

  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Crear nueva Contraseña</Text>
      <TextInput placeholder="Código" value={codigo} onChangeText={setCodigo} autoCapitalize="none" style={styles.text} />
      <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" style={styles.text} />
      <TextInput placeholder="Confirmar Contraseña" value={passwordCheck} onChangeText={setPasswordCheck} secureTextEntry autoCapitalize="none" style={styles.text} />

      <Button title='Cambio de Contraseña' onPress={onSave} />
    </View>
  );
}


