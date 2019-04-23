import HAHA from './haha.jpg';

const addImage = () => {
  const img = document.createElement('img');
  img.alt = ' Haha';
  img.width = 300;
  img.src = HAHA;

  const body = document.querySelector('body');
  body.appendChild(img);
}

export default addImage;

