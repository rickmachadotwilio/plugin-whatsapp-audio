import React, { useState, useEffect } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import { connect } from 'react-redux';
import { uploadAudio } from '../../helpers';
import FlexState from '../../states/FlexState';
import { Actions, Notifications, StateHelper, Manager, IconButton, TaskHelper, flex ,withTheme} from "@twilio/flex-ui";
import {Flex, Box, Stack, Grid, Card, Text, Heading, Paragraph, Button} from '@twilio-paste/core';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class RecordView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isRecording: false,
      isRecordingOK: false,
      blobURL: '',
      isBlocked: false,
      showRecorder : false
    };
  }

  startRec = () => {
    if (this.state.isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          this.setState({ isRecording: true });
        }).catch((e) => console.error(e));
    }
  };


  stopRec = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        //this.getTaskDetails();
        const blobURL = URL.createObjectURL(blob);
        const conversationSid = FlexState.flexState.chat.messageList.activeConversation;
        //console.log('conversationSid', conversationSid)
        this.setState({ blobURL, isRecording: false });
        this.sendRec(buffer, conversationSid);
      }).catch((e) => console.log(e));
  };

  sendRec = (buffer, conversationSid) => {
    uploadAudio(buffer, conversationSid)
  };


  componentDidMount() {
  //// navigator.getUserMedia() is obsolete and no longer supported in most modern browsers 
  //   navigator.getUserMedia({ audio: true },
  //     () => {
  //       console.log('Permission Granted');
  //       this.setState({ isBlocked: false });
  //     },
  //     () => {
  //       console.log('Permission Denied');
  //       this.setState({ isBlocked: true })
  //     },
  //   );
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
          console.log('Permission granted');
          this.setState({ isBlocked: false });
      })
      .catch(error => {
          console.log('Permission denied');
          this.setState({ isBlocked: true });
      });
    }
  }

  componentDidUpdate() {
    
  }

  
  render(){ 
    if (this.props.showRecorder === true) {
      return (
      <div>
        <Grid gutter="space4" vertical>
          <Card padding="space40">
            <Text as="p" marginBottom="space30" color="colorTextWeak">Audio Recorder</Text>
            <Text marginBottom="space20" ></Text>
            <Paragraph>
              <audio src={this.state.blobURL} controls="controls" disabled={this.state.isRecording} />
            </Paragraph>
            <Paragraph marginBottom="space8">
              <IconButton icon="MuteLarge" onClick={this.startRec} disabled={this.state.isRecording}/>
              <IconButton icon="MuteLargeBold" onClick={this.stopRec} disabled={!this.state.isRecording}/>
            </Paragraph>
          </Card>
        </Grid>
      </div>
    );
  } 
  return (
    <></>
  )
} 
}


export default RecordView;
