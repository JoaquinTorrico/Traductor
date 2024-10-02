
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, Timestamp, query, where, updateDoc, doc, deleteDoc } from 'firebase/firestore/lite';

export type Usuario = {
  Usuario: string
  Mail: string
  Password: string
  CodigoResetPass?: number | undefined
}

export type Translate = {
  Usuario: string
  Fecha: Timestamp
  Audioname: string
  Translate: string
}

export type TranslateDto = {
  id: string
  Usuario: string
  Fecha: Timestamp
  Audioname: string
  Translate: string
}


//Establece Conexion con la DB
export async function initDatabase() {

  const firebaseConfig = {
    apiKey: "AIzaSyC4tTCDHKas9AV39gcyBVZPV6g62AvTTFA",
    authDomain: "coherent-span-436817-u2.firebaseapp.com",
    projectId: "coherent-span-436817-u2",
    storageBucket: "coherent-span-436817-u2.appspot.com",
    messagingSenderId: "382326617214",
    appId: "1:382326617214:web:e032270e043c8caa1a142f"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return db;
}

//Registro/alta de usuario
export async function registroUsuario(_usuario: Usuario) {
  const db = await initDatabase()

  try {
    const docRef = await addDoc(collection(db, 'Usuario'), _usuario);
    console.log("Usuario generado ID: ", docRef.id);
    return true
  } catch (e) {
    console.error("Error registrando Usuario: ", e);
    return false
  }
}

//Guardo Traducción de audio a texto
export async function setDBTransalte(_translate: Translate) {

  //Conecto a la DB
  const db = await initDatabase()

  try {
    const docRef = await addDoc(collection(db, 'Translate'), _translate);
    console.log("Document written with ID: ", docRef.id);
    return true
  } catch (e) {
    console.error("Error adding document: ", e);
    return false
  }
  return true
}

//Busco transcriciones guardadas
export async function getDBTransalte(user: string) {
  const db = await initDatabase()
  const ColeecionTest = collection(db, 'ColeecionTest');
  const ColeecionTestSnapshot = await getDocs(ColeecionTest);
  const ColeecionTestList = ColeecionTestSnapshot.docs.map(doc => doc.data());

}


//Generación de codigo de validacion para cambio de pass
export async function usuario_generacodigo(email: string) {

  const db = await initDatabase()
  const qry = query(collection(db, "Usuario"), where("Mail", "==", email));

  try {
    const rows = await getDocs(qry);


    const dbUsuario = rows.docs[0].data();
    const id = rows.docs[0].id;

    const codigo = new Date().getSeconds() * 1000 + new Date().getMilliseconds();
    console.log("codigo generado", codigo)
    var userRef = doc(db, "Usuario", id);

    await updateDoc(userRef, { CodigoResetPass: codigo });

    // mando email:
    const dbMail = {
      to: [dbUsuario.Mail],
      message: {
        subject: 'TSPEECH - Pedido de Cambio de Contraseña',
        //text: 'This is the plaintext section of the email body.',
        html: `TSPEECH te envía un código para que puedas recuperar tu cuenta <b><code>${codigo}</code></b>.`,
      }
    }
    return await addDoc(collection(db, 'mail'), dbMail);

  } catch (e) {
    return false
  }
  return false
}

//Cambio de password
export async function usuario_changepassword(codigo: number, newpassword: string) {
  const db = await initDatabase()

  const qry = query(collection(db, "Usuario"), where("CodigoResetPass", "==", codigo));

console.log("PAso codigo:" + codigo)

  try {
    const rows = await getDocs(qry);

    let id = rows.docs[0].id;

    console.log("ID:" + id)

    var userRef = doc(db, "Usuario", id);

    try{
       const ret = await updateDoc(userRef, { Password: newpassword });
       return true
      }
      catch{
        return false

      }
       return false
  }
  catch (e) {
    console.log("Error: " + e)
    return false
  }

}

//Login 
export async function usuario_login(usuario: string, password: string) {
  const db = await initDatabase()

  const qry = query(collection(db, "Usuario"), where("Usuario", "==", usuario), where("Password", "==", password));

  try {
    const rows = await getDocs(qry);
    return rows.docs[0].data();
  } catch (e) {
    return false
  }
}


export async function usuario_archivos(usuario: string) {
  const db = await initDatabase()

  const qry = query(collection(db, "Translate"), where("Usuario", "==", usuario));
  const rows = await getDocs(qry);
  return rows.docs.map(p => ({ id: p.id, ...p.data() }));
}


export async function translate_add(dbTranslate: Translate) {
  const db = await initDatabase()

  try {
    await addDoc(collection(db, 'Translate'), dbTranslate);
    return true
  } catch (e) {
    return false
  }
}

export async function translate_delete(id: string) {
  const db = await initDatabase()
  var transRef = doc(db, "Translate", id);

  return await deleteDoc(transRef);
}