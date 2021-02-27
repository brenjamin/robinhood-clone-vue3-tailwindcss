import { ref } from "vue";

const getVerticalSlides = () => {
  const slides = [
    {
        button: 'Learn',
        headline: 'Learn As You Grow',
        description: 'Our goal is to make investing in financial markets more affordable, more intuitive, and more fun, no matter how much experience you have (or don’t have).',
        img: {
            src: 'assets/img/vertical-slide-learn.png',
            alt: ''
        }
    },
    {
        button: 'Manage',
        headline: 'Manage Your Portfolio',
        description: 'Keep your portfolio in your pocket. Everything you need to manage your assets is available in a single app.',
        img: {
            src: 'assets/img/vertical-slide-manage.png',
            alt: ''
        }
    },
    {
        button: 'Customize',
        headline: 'Keep Tabs on Your Money',
        description: 'Set up customized news and notifications to stay on top of your assets as casually or as relentlessly as you like. Controlling the flow of info is up to you.',
        img: {
            src: 'assets/img/vertical-slide-customize.png',
            alt: ''
        }
    }
  ];

  return ref(slides);
};

export default getVerticalSlides;
