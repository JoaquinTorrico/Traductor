import Button from "@/components/control/button";
import { Translate, translate_add, translate_delete, TranslateDto, Usuario, usuario_archivos } from "@/hooks/dataBaseInteraction";
import { saveTextToPDF } from "@/hooks/saveToPDF";
import { translateAudioToText } from "@/hooks/speechRecognition";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Timestamp } from "firebase/firestore/lite";
import { useEffect, useState } from "react"
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function main() {

  const styles = {
    card: {
      minHeight:'100%',
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#eeeeee',
      justifyContent: 'flex-end',
      borderRadius: 7,
      gap: 10
    },
    button: {
      backgroundColor: '#ffffff',
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 10
    },
    buttonText: {
      color: '#000',
      fontSize: 14,
      fontWeight: 400
    }
  }

  const [openedCard, setOpenedCard] = useState<Translate|undefined>(undefined);
  const [files, setFiles] = useState<TranslateDto[] | undefined>(undefined);
  const [user, setUser] = useState<Usuario|undefined>(undefined);
  useEffect(() => {
    AsyncStorage.getItem("USER").then(json => {
      const user = JSON.parse(json ?? '{}');
      setUser(user);

      usuario_archivos(user.Usuario).then(files => setFiles(files as TranslateDto[]));
    })
    
  }, []);

  const onQueryUpload = () => {
    
    translateAudioToText().then(res => {
      if (!res) return;

      translate_add({ Usuario: user!.Usuario, Fecha: Timestamp.now(), Audioname: res.audioFile.assets[0].name, Translate: res.transcript })
        .then(() => {
          // agregar a la lista ? consultar de nuevo? 
          usuario_archivos(user!.Usuario).then(files => setFiles(files as TranslateDto[]));
        })
    })
  }

  const onDownloadPDF = (text: string) => {
    saveTextToPDF(text).then(() => {});
  }

  const onDelete = (id: string) => {
    translate_delete(id).then(() => 
      usuario_archivos(user!.Usuario).then(files => setFiles(files as TranslateDto[]))
    )
  }


  return <>
    <View>
      <Button onPress={onQueryUpload} title="Cargar Audio" />
    </View>
    
    <ScrollView>
      {files?.map(file => 
        <TouchableOpacity key={file.Audioname}
          style={{ width: '100%', paddingLeft: 20, paddingRight: 20, paddingBottom: 12, paddingTop: 12 }}
          onPress={() => setOpenedCard(file)}
        >
          <View style={{...styles.card, ...{ backgroundColor: openedCard === file ? '#dddddd' : 'transparent' }}} >
            <Text style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10 }}>{"Archivo : " + file.Audioname + " Transcripción: " + file.Translate}</Text>
            
            {openedCard === file && <>
              <TouchableOpacity
                onPress={() => onDelete(file.id)}
              >
                <Image source={require('../assets/images/DELETE.png')} width={22} height={22} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onDownloadPDF(file.Translate)}
              >
                <Image source={require('../assets/images/PDF.png')} />
              </TouchableOpacity>
            </>}
          </View>
          <View style={{ display: openedCard === file ? 'flex' : 'none', backgroundColor: '#eeeeee', borderRadius: 7, }}>
            <Text style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10 }}>{file.Translate}</Text>
          </View>
        </TouchableOpacity>
      )}
    </ScrollView>
  </>;
}
