import HelloWorldButton from './components/hello-world-button/hello-world-button.js';
import Heading from './components/heading/heading.js';
const heading = new Heading
heading.render();
import addImage from './add-image.js';
const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();
addImage();

const ten = 11;


if (process.env.NODE_ENV === 'production') {
  console.log(' Production mode')

} else if (process.env.NODE_ENV === 'development') {
  console.log('Development mode')

}
