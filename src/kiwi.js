import Heading from './components/heading/heading.js';
import KiwiImage from './components/kiwi-image/kiwi-image.js';
import _ from 'lodash';

const heading = new Heading
heading.render(_.upperCase('smiley face page'));

const kiwiImage = new KiwiImage();
kiwiImage.render();
