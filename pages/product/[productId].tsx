/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import axios from 'axios'
import { SettingsRemoteTwoTone } from '@material-ui/icons';
import Theme from '../../components/Theme';
import Header from '../../components/global/Header';
import OwnerDropdownItem from '../../components/global/OwnerDropdownItem';
import PlaceBidModal from '../../components/global/PlaceBidModal';
import CheckoutModal from '../../components/global/CheckoutModal';
import Likes from '../../components/global/Likes';
import Favorite from '../../components/global/Favorite';
import ButtonsStyled from '../../components/product/ButtonsStyled';
import * as utils from '../../utils';
import type * as Types from '../../types/index.d';


interface ProductProps {
  app?: Types.AppProps;
}

/**
 * Страница одного товара
 * @param props
 * @returns
 */
function Product({app, data}): React.ReactElement {
  const { lang } = app;
  const [item, setItem] = useState<Types.ItemProps>();
  const [open, setOpen] = useState<boolean>(false);

  const Footer = useMemo(() => {
    return dynamic<any>(() => import('../../components/global/Footer').then((mod) => mod.default));
  }, []);

  useEffect(() => {
    (async () => {
      const info = await utils.d.getItems(1);
      setItem(info[0]);
    })();
  }, []);
  return (
    <Theme>
      <Header app={app} />
      <div className="wrapper">
        <div className="content single-product">
          <main className="main product">
            <div className="heading center">
              <h1>{data.title}</h1>
            </div>

            <div className="product__block">
              <div className="product__image">
                <img src={data.img} alt="img" />
                <div className='verified__gold'>
                 <img src="/img/verified-gold.png" alt="" /> 
                </div>
                
                <a href={data.img} className="product__image-resize">
                  <span />
                </a>
              
              </div>
              <div className="product__bottom">
 {/*                <div className="product__views">
                  <i className="flaticon-eye" /> <span>{item?.views}</span>
                </div> */}
{/*                 {item && (
                  <>
                    <Favorite favoriteMe={item?.favoriteMe} app={app} />
                    <Likes likeMe={item?.likeMe} likes={item?.likes} app={app} />
                  </>
                )} */}
{/*                 <div className="product__share">
                  <a href="#">
                    <i className="flaticon-share" /> <span>{lang.share}</span>
                  </a>
                </div> */}
               <div className="product__doc">
                  <a href={data.pdf}>
                    <i className="flaticon-file" /> <span>{lang.documents}</span>
                  </a>
                </div>
{/* 
                <div className="product__buy button">
                  <ButtonsStyled
                    rate={true}
                    text1={lang.placeBid}
                    fill1={false}
                    text2={lang.buy}
                    fill2={true}
                  />
                </div> */}
              </div>
            </div>
          </main>

          <aside className="aside author">
{/*             <div className="author__rate">{lang.highestBid} 0.02 ETH</div> */}
            <div className="author__block">
              <div className="author__img">
                <img src={data.owner.imgUrl} alt="img" />
              </div>
              <div className="author__cover">
                <div className="author__status">
                  {lang.author}
                  <div className="products__item-info info">
                    <div
                      role="button"
                      className={clsx('item-info__icon', open && 'close')}
                      onClick={() => {
                        setOpen(!open);
                      }}>
                      <i className="flaticon-information" />
                      <i className="flaticon-letter-x cross" />
                    </div>
                    <div className={clsx('item-info__dropdown', open && 'active')}>
                        <OwnerDropdownItem {...data.owner} />
                      
                    </div>
                  </div>
                </div>
                <div className="author__name">{data.owner.name}</div>
                <div className="author__count">1/1</div>
              </div>
            </div>
            <div className="author__text">
              <p>
                {data.description}
              </p>
            </div>
            <div className="author__buttons button">
              <ButtonsStyled text1={lang.history} fill1={true} text2={lang.bids} fill2={false} />
            </div>
            <div className="author__sale">
              <span>{data.royalty}%</span> of sales will go to creator
            </div>

            {/* <div className="author__bid">
              <div className="author__bid-img">
                <img src="/img/artist.png" alt="img" />
              </div>
              <div className="author__bid-cover">
                <div className="author__bid-title">
                  Highest bid by <span>Assassin7</span>
                </div>
                <div className="author__bid-value">
                  <span className="eth">1.69 ETH</span> <span className="usd">$3,598.05</span>
                </div>
              </div>
            </div> */}
          </aside>
        </div>
        <PlaceBidModal app={app} />
        <CheckoutModal app={app} />
        <Footer {...app} />
      </div>
    </Theme>
  );
}

Product.getInitialProps = async ({req, res, query}) => {
  const response = await axios.get(`https://desolate-inlet-76011.herokuapp.com/nft/${query.productId}`)
  return {data: response.data}
}

export default Product;
