import './hello-world-button.scss';
class HelloWorldButton {
  buttonCssClass = 'hello-world-button'
  render() {
    const button = document.createElement('button');
    button.classList.add(this.buttonCssClass);
    //We use a property in our class not a method. And it is not supported in all browsers. So use babel to transpile it.
    const body = document.querySelector('body');
    button.innerHTML = 'Hello world';
    button.onclick = () => {
      const p = document.createElement('p');
      p.innerHTML = 'Hello World';
      p.classList.add('hello-world-text');
      body.appendChild(p);
    }

    body.appendChild(button);

  }
}



export default HelloWorldButton;
