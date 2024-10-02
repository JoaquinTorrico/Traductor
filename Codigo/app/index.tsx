//nNdex de la app donde se decide si entrar al login o registrar usuario.
import Button from '../components/control/button';
import { Image, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function IndexScreen() {
  const router = useRouter();

  return <>
    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#1F232C', width: '100%', height: '50%' }}>
      <Image
        source={require('../assets/images/login-background.png')}
        style={{
          left: 'auto',
          right: 'auto',
          top: 0,
          height: '100%',
          width: '100%',
        }}
      />
    </View>
    <View style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, marginTop: 12 }}>
      <Button onPress={(e) => router.navigate('/login')} title='Iniciar Sesion' buttonStyles={{ width: '80%', backgroundColor: '#1F232C' }} />
      <Button onPress={(e) => router.navigate('/register')} title='Crear cuenta' buttonStyles={{ width: '80%', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#1F232C' }} textStyles={{ color: '#1F232C' }} />

    </View>
  </>;
}
