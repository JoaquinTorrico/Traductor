
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from "expo-document-picker";


export async function translateAudioToText() {
  const audioFile = await getAudioFile();

  if (audioFile) {
    const result = await sendRecognizeServicess(audioFile!)

    return {
      audioFile,
      transcript: result.results[0].alternatives[0].transcript
    }
  }

  return null;
}


export async function getAudioFile() {

  const DocumentPickerOptions = {
    copyToCacheDirectory: true,
    multiple: false,
    type: "audio/mpeg" //  type: [Platform.OS === 'ios' ? 'public.mp3' : 'audio/mpeg'],
  }

  try {

    const result = await DocumentPicker.getDocumentAsync(DocumentPickerOptions)

    if (!result.canceled)//Archivo seleccionado
    {
      console.log("Archivo seleccionado: " + result.assets[0].name)
      return result
    }
    else {
      console.log("Selección de Archivo cancelada: ")
    }
  } catch (error) {
    console.error("Error durante la selección del archivo de audio: ...")
    console.error(error)
  }

  return false
}

async function sendRecognizeServicess(audioFile: DocumentPicker.DocumentPickerSuccessResult) {
  /*
  const fileInfo = FileSystem.getInfoAsync("file:///data/user/0/host.exp.exponent/cache/DocumentPicker/b8eb40f0-27b8-42ca-b10d-d809333ea8c7.mp3")
  .then((result) => {
    console.log("paso #1")
    console.log(result)
  })
*/

  const audioBase64 = await FileSystem.readAsStringAsync(audioFile.assets[0].uri, { encoding: FileSystem?.EncodingType?.Base64 })

  //Armo Cabecera para ell llamado al API "Speech"
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept-Encoding", "gzip");

  //Armo el contenido raw para el cuerpo del llamado al API "Speech"
  const raw = JSON.stringify({
    "audio": { "content": audioBase64 },
    "config":
    {
      "enableAutomaticPunctuation": true,
      "encoding": "MP3",
      "languageCode": "es-AR",
      "model": "default",
      "sampleRateHertz": "16000"
    }
  });

  //Junto las partes para armar el llamado al API
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  //  Llamado al API
  const response = await fetch("https://speech.googleapis.com/v1p1beta1/speech:recognize?key=AIzaSyC24ziagkoPY956VdfQ2UL3EAL5i5aw4e4", requestOptions as any)
  const result = await response.json()

  return result

}
