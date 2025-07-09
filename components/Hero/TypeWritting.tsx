import { TypeAnimation } from 'react-type-animation';
 
const TypeWritting = () => {
  return (
    <TypeAnimation
      sequence={[
        'const Tomas = ( name, lastname ) => { ',
        1500, // Waits 1s
        'Bienvenido, mi nombre es...',
        1000,
      ]}
      wrapper="span"
      cursor={true}
      repeat={Infinity}
      style={{ fontSize: 'clamp(0.9rem, 2vw, 1.3em)', display: 'inline-block' }}
      className='font-medium'
    />
  );
};

export default TypeWritting;