import React, { Component } from "react";
import Clock from "./Clock";



export default class Responsive extends Component {

    dummyData = [{
        deadline:"Marzo, 3, 2022",
        authorLink: "ItemDetail",
        nftLink: "ItemDetail",
        bidLink: "ItemDetail",
        authorImg: "https://static.tricknfts.com/profiles/1644464179_lgante.jpg",
        previewImg: "./img/items/LGANTE.jpg",
        title: "Pinky Ocean",
        price: "0.08 ETH",
        bid: "1/20",
        likes: 50
    },
    {
        deadline:"Marzo, 3, 2022",
        authorLink: "#",
        nftLink: "#",
        bidLink: "#",
        authorImg: "https://static.tricknfts.com/profiles/1644464195_bochini.jpg",
        previewImg: "./img/items/BOCHA2.jpg",
        title: "Deep Sea Phantasy",
        price: "0.06 ETH",
        bid: "1/22",
        likes: 80
    },
    {
        deadline:"Marzo, 3, 2022",
        authorLink: "#",
        nftLink: "#",
        bidLink: "#",
        authorImg: "https://static.tricknfts.com/profiles/1644464167_pelea.jpg",
        previewImg: "./img/items/YAO.jpg",
        title: "Rainbow Style",
        price: "0.05 ETH",
        bid: "1/11",
        likes: 97
    },
    {
        deadline:"Marzo, 3, 2022",
        authorLink: "#",
        nftLink: "#",
        bidLink: "#",
        authorImg: "https://static.tricknfts.com/profiles/1644464189_peron.jpg",
        previewImg: "./img/items/PERON.jpg",
        title: "Two Tigers",
        price: "0.08 ETH",
        bid: "1/20",
        likes: 50
    },
    {
        deadline:"Marzo, 3, 2022",
        authorLink: "#",
        nftLink: "#",
        bidLink: "#",
        authorImg: "https://static.tricknfts.com/profiles/1644464179_lgante.jpg",
        previewImg: "./img/items/LGANTE3.jpg",
        title: "The Truth",
        price: "0.08 ETH",
        bid: "1/20",
        likes: 50
    },
    {
        deadline:"Marzo, 3, 2022",
        authorLink: "#",
        nftLink: "#",
        bidLink: "#",
        authorImg: "https://static.tricknfts.com/profiles/1644464195_bochini.jpg",
        previewImg: "./img/items/BOCHA3.jpg",
        title: "Running Puppets",
        price: "0.08 ETH",
        bid: "1/20",
        likes: 50
    },
    {
        deadline:"Marzo, 3, 2022",
        authorLink: "#",
        nftLink: "#",
        bidLink: "#",
        authorImg: "https://static.tricknfts.com/profiles/1644464167_pelea.jpg",
        previewImg: "./img/items/YAO2.jpg",
        title: "USA Wordmation",
        price: "0.08 ETH",
        bid: "1/20",
        likes: 50
    },
    {
        deadline:"Marzo, 3, 2022",
        authorLink: "#",
        nftLink: "#",
        bidLink: "#",
        authorImg: "https://static.tricknfts.com/profiles/1644464189_peron.jpg",
        previewImg: "./img/items/PERON3.jpg",
        title: "Loop Donut",
        price: "0.08 ETH",
        bid: "1/20",
        likes: 50
    },
    {
        deadline:"Marzo, 3, 2022",
        authorLink: "#",
        nftLink: "#",
        bidLink: "#",
        authorImg: "https://static.tricknfts.com/profiles/1644464179_lgante.jpg",
        previewImg: "./img/items/LGANTE2.jpg",
        title: "Lady Copter",
        price: "0.08 ETH",
        bid: "1/20",
        likes: 50
    },
    {
        deadline:"Marzo, 3, 2022",
        authorLink: "#",
        nftLink: "#",
        bidLink: "#",
        authorImg: "https://static.tricknfts.com/profiles/1644464195_bochini.jpg",
        previewImg: "./img/items/BOCHA.jpg",
        title: "Purple Planet",
        price: "0.08 ETH",
        bid: "1/20",
        likes: 50
    },
    {
        deadline:"Marzo, 3, 2022",
        authorLink: "#",
        nftLink: "#",
        bidLink: "#",
        authorImg: "https://static.tricknfts.com/profiles/1644464167_pelea.jpg",
        previewImg: "./img/items/YAO3.jpg",
        title: "Oh Yeah!",
        price: "0.08 ETH",
        bid: "1/20",
        likes: 50
    },
    {
        deadline:"Marzo, 3, 2022",
        authorLink: "#",
        nftLink: "#",
        bidLink: "#",
        authorImg: "https://static.tricknfts.com/profiles/1644464189_peron.jpg",
        previewImg: "./img/items/PERON2.jpg",
        title: "This is Our Story",
        price: "0.08 ETH",
        bid: "1/20",
        likes: 50
    },
    {
        deadline:"Marzo, 3, 2022",
        authorLink: "#",
        nftLink: "#",
        bidLink: "#",
        authorImg: "https://static.tricknfts.com/profiles/1644464195_bochini.jpg",
        previewImg: "./img/items/BOCHA4.jpg",
        title: "Pixel World",
        price: "0.08 ETH",
        bid: "1/20",
        likes: 50
    },
    {
        deadline:"Marzo, 3, 2022",
        authorLink: "#",
        nftLink: "#",
        bidLink: "#",
        authorImg: "https://static.tricknfts.com/profiles/1644464195_bochini.jpg",
        previewImg: "./img/items/BOCHA6.jpg",
        title: "I Believe I Can Fly",
        price: "0.08 ETH",
        bid: "1/20",
        likes: 50
    }]

  constructor(props) {
    super(props);
    this.state = {
        nfts: this.dummyData.slice(0,8),
        height: 0
    };
    this.onImgLoad = this.onImgLoad.bind(this);
    }

    loadMore = () => {
        let nftState = this.state.nfts
        let start = nftState.length
        let end = nftState.length+4
        this.setState({
            nfts: [...nftState, ...(this.dummyData.slice(start, end))]
        });
    }

    onImgLoad({target:img}) {
        let currentHeight = this.state.height;
        if(currentHeight < img.offsetHeight) {
            this.setState({
                height: img.offsetHeight
            })
        }
    }
    

 render() {
  return (
    <div className='row'>
        {this.state.nfts.map( (nft, index) => (
            <div key={index} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4">
                <div className="nft__item m-0">
                    { nft.deadline &&
                        <div className="de_countdown">
                            <Clock deadline={nft.deadline} />
                        </div>
                    }
                    <div className="author_list_pp">
                        <span onClick={()=> window.open(nft.authorLink, "_self")}>                                    
                            <img className="lazy" src={nft.authorImg} alt=""/>
                            <i className="fa fa-check"></i>
                        </span>
                    </div>
                    <div className="nft__item_wrap" style={{height: `${this.state.height}px`}}>
                        <span>
                            <img onLoad={this.onImgLoad} src={nft.previewImg} className="lazy nft__item_preview" alt=""/>
                        </span>
                    </div>
                    <div className="nft__item_info">
                        <span onClick={()=> window.open(nft.nftLink, "_self")}>
                            <h4>{nft.title}</h4>
                        </span>
                        <div className="nft__item_price">
                            {nft.price}<span>{nft.bid}</span>
                        </div>
                        <div className="nft__item_action">
                            <span onClick={()=> window.open(nft.bidLink, "_self")}>Place a bid</span>
                        </div>
                        <div className="nft__item_like">
                            <i className="fa fa-heart"></i><span>{nft.likes}</span>
                        </div>                            
                    </div> 
                </div>
            </div>  
        ))}
        { this.state.nfts.length !== this.dummyData.length &&
            <div className='col-lg-12'>
                <div className="spacer-single"></div>
                <span onClick={() => this.loadMore()} className="btn-main lead m-auto">Ver mas</span>
            </div>
        }
    </div>              
    );
}
}