import { ref } from "vue";

const getFooterLinks = () => {
  const links = [
      [
        {
            name: 'Stocks & Funds',
            route: 'Home',
        },
        {
            name: 'Options',
            route: 'Home',
        },
        {
            name: 'Gold',
            route: 'Home',
        },
        {
            name: 'Cash Management',
            route: 'Home',
        },
        {
            name: 'Crypto',
            route: 'Home',
            offset: true
        }
      ],
      [
        {
            name: 'Learn',
            route: 'Home',
        },
        {
            name: 'Support',
            route: 'Home',
        },
        {
            name: 'Snacks',
            route: 'Home',
        }
      ],
      [
        {
            name: 'About us',
            route: 'Home',
        },
        {
            name: 'Careers',
            route: 'Home',
        },
        {
            name: 'Blog',
            route: 'Home',
        }
      ]
      
     
  ];

  return ref(links);
};

export default getFooterLinks;
