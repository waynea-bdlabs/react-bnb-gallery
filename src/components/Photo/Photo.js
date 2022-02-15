import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {CardMedia} from '@material-ui/core';

import omit from 'lodash/omit';
import classnames from 'classnames';

import Image from '../Image';
import PhotoShape from '../../shapes/PhotoShape';

import {
  imagePropTypes,
  imageDefaultProps,
} from '../../common';
import { forbidExtraProps } from '../../common/prop-types';
import noop from '../../utils/noop';
import Video from "../Media/Video";

const propTypes = forbidExtraProps({
  ...imagePropTypes,
  photo: PhotoShape,
  onPress: PropTypes.func,
  onTouchStart: PropTypes.func,
  onTouchMove: PropTypes.func,
  onTouchEnd: PropTypes.func,
});

const defaultProps = {
  ...imageDefaultProps,
  photo: null,
  onPress: noop,
  onTouchStart: noop,
  onTouchMove: noop,
  onTouchEnd: noop,
};

class Photo extends PureComponent {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    const { onPress } = this.props;
    onPress();
  }

  renderPhoto() {
    const {
      photo,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      ...rest
    } = this.props;

    if (!photo) {
      return null;
    }

    const {
      onLoad,
      onError,
      style,
    } = omit(rest, [
      'onPress',
    ]);

    if (Video.isVideo(photo)) {
      return (
        <button
          type="button"
          onClick={this.onPress}
          className="video-button"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <Video
            alt={photo.caption || ''}
            className="photo"
            src={photo.video}
            onLoad={onLoad}
            onError={onError}
            style={style}
          />
          {/*<CardMedia component="iframe"*/}
          {/*           height={340}*/}
          {/*           frameBorder="0"*/}
          {/*           allowfullscreen="allowfullscreen"*/}
          {/*           src={photo.video} />*/}
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={this.onPress}
        className="photo-button"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Image
          alt={photo.caption || ''}
          className="photo"
          src={photo.photo}
          onLoad={onLoad}
          onError={onError}
          style={style}
        />
      </button>
    );
  }

  render() {
    const className = classnames(
      'gallery-media-photo',
      'gallery-media-photo--block',
      'gallery-media-cover',
    );

    const photoRendered = this.renderPhoto();

    return (
      <ul className="gallery-images--ul">
        <li className={className}>
          {photoRendered}
        </li>
      </ul>
    );
  }
}

Photo.propTypes = propTypes;
Photo.defaultProps = defaultProps;

export default Photo;
