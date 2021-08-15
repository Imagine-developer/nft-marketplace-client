import React, { useState, useEffect, useMemo } from 'react';
import type { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Theme from '../components/Theme';
import Header from '../components/global/Header';
import Banner from '../components/global/Banner';
import ArtistsList from '../components/global/ArtistsList';
import StyledSelect from '../components/UI/StyledSelect';
import MarketplaceItems from '../components/global/MarketplaceItems';

import type * as Types from '../types/index.d';
import * as utils from '../utils';



/**
 * Страница Marketplace
 * @param props
 * @returns
 */
function Marketplace(props): React.ReactElement {
  const { app, data } = props;
  const { banners } = data;
  const { lang } = app;
  const [filterBy, setFilterBy] = useState<number>(1);

  const Footer = useMemo(() => {
    return dynamic<any>(() => import('../components/global/Footer').then((mod) => mod.default));
  }, []);

  useEffect(() => {
    utils.$.setStylesArtistList();
  }, []);
  return (
    <Theme>
      <Header app={app} {...app} />
      <div className="wrapper ">
        <div className="heading center">
          <h1>
            <i className="flaticon-fire" /> {lang.pageNames.marketPlace}
          </h1>
        </div>
        <Banner {...app} banners={banners} />
        <div className="content marketplace">
          <ArtistsList app={app} />
          <main className="main marketplace">
            <div className="main__top">
              <div className="heading__sort main__sort">
                <StyledSelect
                  variant="outlined"
                  value={filterBy}
                  onChange={(e: any) => {
                    setFilterBy(e.target.value);
                  }}
                  options={[
                    {
                      value: 1,
                      text: `${lang.price} &uarr;`,
                    },
                    {
                      value: 2,
                      text: `${lang.price} &darr;`,
                    },
                    {
                      value: 3,
                      text: `${lang.date} &uarr;`,
                    },
                    {
                      value: 3,
                      text: `${lang.date} &darr;`,
                    },
                  ]}
                />
              </div>
            </div>
            <MarketplaceItems app={app} />
          </main>
        </div>
        <Footer {...app} />
      </div>
    </Theme>
  );
}

Marketplace.getInitialProps = async (ctx: GetServerSidePropsContext) => {
  const result = await axios.get('https://desolate-inlet-76011.herokuapp.com/banner')
  return {
    data: {
      banners: result.data,
    },
  };
};

export default Marketplace;
