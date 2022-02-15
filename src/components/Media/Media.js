import React from 'react';
import Photo from '../Photo';

class Media extends Photo {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  render() {
    console.debug('RENDER FROM MEDIA!!');
    return this.render();
  }
}

export default Media;
