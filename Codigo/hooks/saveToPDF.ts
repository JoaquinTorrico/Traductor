
import * as Print from 'expo-print';
import * as Sharing from "expo-sharing";

export async function saveTextToPDF(transcript:string)
{
/*
  console.log( `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      </head>
      <body style="text-align: center;">
        <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
          Transcripción de audio:
        </h1>
  
        ` + transcript + `
  
      </body>
    </html>
    `);
    */
  const option = {html: transcript}

  
  const FilePrintResult = await Print.printToFileAsync(option)
      
    
  Sharing.shareAsync(FilePrintResult.uri);
    
  }
