

const getLinks = () => {
    const links = [
        {
          top: {
            name: 'Products',
            route: '',
            active: false
          },
          submenu: [
            {
              name: 'Stocks & Funds',
              route: ''
            },
            {
                name: 'Options',
                route: ''
            }
          ]
        },
        {
            top: {
              name: 'Learn',
              route: '',
              active: false
            },
            submenu: [
              {
                name: 'Investing Basics',
                route: ''
              },
              {
                  name: 'Library',
                  route: ''
              }
            ]
          }
      ]

    return links
}


  export default getLinks