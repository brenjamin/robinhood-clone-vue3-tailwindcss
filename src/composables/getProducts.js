import { ref } from 'vue';

const getProducts = () => {
  const products = [
    {
        name: 'Cash Management',
        description: 'Earn 0.30% APY* on your uninvested cash and get more flexibility with your brokerage account.',
        img: {
            src: 'assets/img/products/product-cash-management.png',
            alt: 'mobile phone viewing debit card activity on robinhood app'
        },
        regulatoryMessage: 'Cash Management offered through Robinhood Financial',
        disclosure: {
            title: 'Variable APY and Debit Card Disclosures',
            description: ['Cash Management is an added feature to your Robinhood Financial LLC brokerage account. The Annual Percentage Yield (APY) paid by program banks might change at any time at the program banks’ discretion. Interest is earned on uninvested cash swept from the brokerage account to the program banks. Neither Robinhood Financial LLC nor any of its affiliates are banks. The debit card is issued by Sutton Bank, Member FDIC, pursuant to a license from Mastercard® International Incorporated.'],
            color: 'text-text-gray'
        }
    },
    {
        name: 'Stocks & Funds',
        description: 'Get mobile access to the markets. Invest commission-free in individual companies or bundles of investments (ETFs).',
        img: {
            src: 'assets/img/products/product-stocks-and-funds.png',
            alt: 'mobile phone viewing stock activity on robinhood app'
        },
        regulatoryMessage: 'Stocks & funds offered through Robinhood Financial',
        disclosure: {
            title: 'Stocks & Funds Risk Disclosure',
            description: ['Investing involves risk, including the loss of capital. Investors should consider their investment objectives and risks carefully before investing.'],
            color: 'text-text-gray'
        }
    },
    {
        name: 'Options',
        description: 'Be bullish on stocks you believe in and bearish on the ones you don’t. It’s your call.',
        img: {
            src: 'assets/img/products/product-options.png',
            alt: 'mobile phone viewing options activity on robinhood app'
        },
        regulatoryMessage: 'Options offered through Robinhood Financial',
        disclosure: {
            title: 'Options Risk Disclosure',
            description: ['Options trading entails significant risk and is not appropriate for all investors. Certain complex options strategies carry additional risk. To learn more about the risks associated with options trading, please review the options disclosure document entitled Characteristics and Risks of Standardized Options, available <span class="text-green">here</span> or through <span class="text-green">https://www.theocc.com</span>. Investors should consider their investment objectives and risks carefully before trading options.', 'Supporting documentation for any claims, if applicable, will be furnished upon request.'],
            color: 'text-text-gray'
        }
    },
    {
        name: 'Gold',
        description: 'Access research reports, trade on margin at a 2.5% annual rate, and make bigger deposits with quicker access to funds—all starting at $5 per month.',
        img: {
            src: 'assets/img/products/product-gold.png',
            alt: 'mobile phone viewing gold offer on robinhood app'
        },
        regulatoryMessage: 'Gold offered through Robinhood Financial',
        disclosure: {
            title: 'Margin Disclosure',
            description: ['Margin trading involves interest charges and risks, including the potential to lose more than any amounts deposited or the need to deposit additional collateral in a falling market. Before using margin, customers must determine whether this type of trading strategy is right for them given their specific investment objectives, experience, risk tolerance, and financial situation.'],
            color: 'text-text-gray'
        }
    },
    {
        name: 'Crypto',
        description: 'Tap into the cryptocurrency market to buy, HODL, and sell Bitcoin, Ethereum, Dogecoin, and more, 24/7 with Robinhood Crypto.',
        img: {
            src: 'assets/img/products/product-crypto.png',
            alt: 'mobile phone viewing crypto activity on robinhood app'
        },
        regulatoryMessage: 'Crypto offered through Robinhood Crypto, not a member of FINRA.<br>Crypto investing involves significant risks.',
        disclosure: {
            title: 'Crypto Risk Disclosure',
            description: ['Trading in cryptocurrencies comes with significant risks, including volatile market price swings or flash crashes, market manipulation, and cybersecurity risks. In addition, cryptocurrency markets and exchanges are not regulated with the same controls or customer protections available in equity, option, futures, or foreign exchange investing. Cryptocurrency trading can lead to large and immediate financial losses and is suitable only for investors who can bear such losses.'],
            color: 'text-text-gray'
        },
        offset: true
    },

  ];

  return ref(products);
};

export default getProducts;
