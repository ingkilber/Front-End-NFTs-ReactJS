import React, { memo } from 'react';
import styled from "styled-components";

import Clock from "./Clock";
import NftPreview from './NftPreview';
import UserImage from './UserImage';
import LikeButton from './LikeButton';

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

//react functional component
const NftLoading = ({ className = 'd-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4', height }) => {

  const NftBlurCard = () => {
    return (
      <div className={className}>
        <div className="nft__item m-0">
          <div className="author_list_pp">
            <span>
            </span>
          </div>
          <div className="nft__item_wrap" style={{ height }}>
            <Outer>
              <span>
                <div className="lazy nft__item_preview animate-flicker"></div>
              </span>
            </Outer>
          </div>
          <div className="nft__item_info">
            <span>
              <h4 style={{filter:'blur(5px)'}}>Lorem ipsum dolor sit amet, consectetur adipisicing.</h4>
            </span>
            <div className="nft__item_price" style={{filter:'blur(5px)'}}>
              100 TRCK
            </div>
            <div className="nft__item_action" style={{marginBottom:20}}>
              <span style={{filter:'blur(5px)'}}>Lorem</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    {
      Array.apply(null, {length: 8}).map((e, i) => {
        return <NftBlurCard key={i} />
      })
    }
    </>
  );
};

export default memo(NftLoading);