import { TextInput, View, Alert, Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from '../components/control/button';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import { usuario_login } from '@/hooks/dataBaseInteraction';

export default function Register() {

  //Estilos de la app, van dentro de la funcion para evitar que se pisen con otras paginas
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

  //Variables del State que usa la vista
  const [usuario, setUsuario] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onLogin = () => {
    //Valido campos antes de llamar a la db para verificar si existe el usuario
    if (!usuario.trim() || !password.trim())
      return Alert.alert('Información Faltante', 'Por favor verifique la información.');

      usuario_login(usuario, password).then((user) => {
      
      if (!user){//Usuario inexistente
        Alert.alert("Usuario Inexistente, verifique la información y vuelva a intentar.")
        return;
      } 

      AsyncStorage.setItem(
        'USER',
        JSON.stringify(user),
      ).then(() => 
        router.navigate('/main')
      );
      
    })
  }


  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Iniciar Sesion</Text>
      <TextInput placeholder="Usuario" value={usuario} onChangeText={setUsuario} autoCapitalize="words" style={styles.text} />
      <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" style={styles.text}/>
        
      <Link href="/recuperaPass" style={{ textAlign: 'right' }}>¿Olvidaste tu Contraseña?</Link>

      <Button title='Login' onPress={onLogin} buttonStyles={{ marginTop: 15 }} />
    </View>
  );
}


