import Image from 'next/image';

import classes from './hero.module.css';

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image src={'vercel.svg'} alt="Hero Image" width={600} height={600} />
      </div>
      <h1>Hi, I'm Phoenix</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
        corporis optio est distinctio, id quos!
      </p>
    </section>
  );
};

export default Hero;
