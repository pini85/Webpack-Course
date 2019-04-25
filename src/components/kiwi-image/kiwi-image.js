import Kiwi from './haha.jpg';
import  './kiwi-image.scss';

class kiwiImage {
  render() {
    const img = document.createElement('img');
    img.src = Kiwi;
    img.alt = 'Kiwi';
    img.classList.add('kiwi-image');

    const body = document.querySelector('body');
    body.appendChild(img);
  }
}

export default kiwiImage;
