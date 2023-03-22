import { Actions } from '@twilio/flex-ui';



export const uploadAudio = async (buffer, conversationSid) => {

    const audioFile = new File(buffer, 'audioFile.mp3', {
          type: 'audio/mpeg',
          lastModified: Date.now()
        });
            
    Actions.invokeAction('AttachFiles', {
        files: [audioFile],
        conversationSid: conversationSid
    })

};
