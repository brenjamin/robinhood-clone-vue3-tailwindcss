import { ref } from "vue";

const getLinks = () => {
  const links = [
    {
      top: {
        name: "Products",
        route: "",
        active: false,
      },
      submenu: [
        {
          name: "Stocks & Funds",
          route: "",
        },
        {
          name: "Options",
          route: "",
        },
        {
          name: "Gold",
          route: "",
        },
        {
          name: "Cash Management",
          route: "",
        },
        {
          name: "Crytpo",
          route: "",
          offset: true,
        },
      ],
    },
    {
      top: {
        name: "Learn",
        route: "",
        active: false,
      },
      submenu: [
        {
          name: "Investing Basics",
          route: "",
        },
        {
          name: "Library",
          route: "",
        },
        {
          name: "Snacks",
          route: "",
        },
      ],
    },
    {
      top: {
        name: "Support",
        route: "",
        active: false,
      },
      submenu: [],
    },
    {
      top: {
        name: "Who we are",
        route: "",
        active: false,
      },
      submenu: [
        {
          name: "About us",
          route: "",
        },
        {
          name: "Our customers",
          route: "",
        },
        {
          name: "Our commitments",
          route: "",
        },
        {
          name: "Blog",
          route: "",
        },
      ],
    },
  ];

  return ref(links);
};

export default getLinks;
