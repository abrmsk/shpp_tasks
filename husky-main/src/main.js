/* eslint-disable no-console */
window.onload = () => {
  const root = document.getElementById('root');
  root.innerText = 'Hello';

  console.log('1');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const name = 'Bob';

  if (root.innerText === 'Hello') {
    // eslint-disable-next-line no-console
    console.log('test');
    root.innerText += ', from Berdichev!!!';
  }
};
