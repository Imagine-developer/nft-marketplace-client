/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useMemo } from 'react';
import type { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Theme from '../components/Theme';
import Header from '../components/global/Header';
import Banner from '../components/global/Banner';
import StyledSelect from '../components/UI/StyledSelect';
import MarketplaceItems from '../components/global/MarketplaceItems';
import FineArtItems from '../components/index/FineArtItems';
import PopularItems from '../components/index/PopularItems';

import * as utils from '../utils';
import type * as Types from '../types/index.d';


const useStyles = makeStyles({
  headerLink: {
    cursor: 'pointer',
    '&:hover': {
      color: utils.$.cyanColor,
    },
  },
});

interface HomeProps {
  data: {
    banners: Types.Banner[];
  };
  app?: Types.AppProps;
}

/**
 * Главная страница
 * @param props
 * @returns
 */
function Home(props: HomeProps): React.ReactElement {
  const { data, app } = props;
  const { lang } = app;
  const { banners } = data;
  console.log(data)
  

  const classes = useStyles();

  const [filterBy, setFilterBy] = useState<number>(1);
  const Footer = useMemo(() => {
    return dynamic<any>(() => import('../components/global/Footer').then((mod) => mod.default));
  }, []);
  return (
    <Theme>
      <Header app={app} />
      <div className="wrapper">
        <Banner banners={banners} {...app} />
        {/** Секция Fine Art */}
        <section className="fineart section">
          <div className="fineart__heading heading">
            <Link href="/fineart" passHref>
              <h3 className={classes.headerLink}>
                <i className="flaticon-fire" /> {lang.pageNames.fineArt}
              </h3>
            </Link>
          </div>
          <FineArtItems app={app} />
        </section>
        {/** Секция Popular */}
        <section className="popular section">
          <div className="popular__heading heading">
            <h3>
              <i className="flaticon-star" />
              {lang.popular}
            </h3>
            <div className="heading__sort sort">
              <StyledSelect
                variant="outlined"
                value={filterBy}
                onChange={(e: any) => {
                  setFilterBy(e.target.value);
                }}
                options={[
                  {
                    value: 1,
                    text: lang.filterBy.day,
                  },
                  {
                    value: 2,
                    text: lang.filterBy.week,
                  },
                  {
                    value: 3,
                    text: lang.filterBy.mouth,
                  },
                ]}
              />
            </div>
          </div>
          <PopularItems app={app} />
        </section>
        {/** Секция Маркетплейс */}
        <section className="marketplace section">
          <div className="marketplace__heading heading">
            <Link href="/marketplace" passHref>
              <h3 className={classes.headerLink}>
                <i className="flaticon-gold-ingots" />
                {lang.pageNames.marketPlace}
              </h3>
            </Link>
          </div>
          <MarketplaceItems app={app} />
        </section>
        <Footer {...app} />
      </div>
    </Theme>
  );
}

Home.getInitialProps = async (ctx: GetServerSidePropsContext): Promise<HomeProps> => {
  const result = await axios.get('https://desolate-inlet-76011.herokuapp.com/banner')
  return {
    data: {
      banners: result.data,
    },
  };
};


export default Home;
