import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';
import AudioRecorder  from './components/AudioRecorder/AudioRecorder';

const PLUGIN_NAME = 'WhatsappAudioPlugin';

export default class WhatsappAudioPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    const options = { sortOrder: -1 };
    flex.MessageInputV2.Content.add(<AudioRecorder key="WhatsappAudioPlugin-component" />, options);

  }
}
