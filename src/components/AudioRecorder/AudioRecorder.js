import React, { useEffect, useState } from 'react';
import { Alert } from '@twilio-paste/core/alert';
import { Theme } from '@twilio-paste/core/theme';
import { Text } from '@twilio-paste/core/text';
import { Button } from '@twilio-paste/core/button';
import { Actions, Notifications, StateHelper, Manager, IconButton, TaskHelper, flex ,withTheme} from "@twilio/flex-ui";
import { recordAudioCustom, uploadAudio } from '../../helpers';
import RecordView from '../RecordView/RecordView';

class AudioRecorder extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        isOpen: true,
        showRecorder : false
        };
    }

  dismiss = () => this.setState({showRecorder : false});
  
  openHideRecorder = () => {
    if (this.state.showRecorder === false) {
      this.setState({ showRecorder: true });
    }
    else {
      this.setState({showRecorder : false});
    }
    //console.log('###### state showRecorder : ', this.state.showRecorder);
  };


  render() {
  return (
    <Theme.Provider theme="default">
        <div className="Twilio-MessageInputActions-default">
          <IconButton icon="Fullscreen" onClick={this.openHideRecorder} />
            <RecordView showRecorder={this.state.showRecorder} />
        </div>
    </Theme.Provider>
  );
}
};

export default AudioRecorder;
