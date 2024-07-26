import React, { useEffect,useState } from 'react'
import './Nft.css'
import { celebrities } from '../Celebrities';

const options = {
  method: 'GET',
  headers: {accept: 'application/json', 'x-api-key': '3349a82046694becbbfdf9280652cfa6'}
};

const Nft = () => {
  const [nft, setNft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [address, setAddress] = useState("0x437a17a4c3dac45e507e5636871952eeb4aba247");
  const [collection, setCollection] = useState([]);
  const [collectionIndex, setCollectionIndex] = useState(0);


  const defaultAddress = "0x437a17a4c3dac45e507e5636871952eeb4aba247";

  // TO DO

  // SUPPORT MULTIPLE CHAINS?

  // FILTER RESULTS FOR DISABLED, NSFW??

  // ME
  // 0x437a17a4c3dac45e507e5636871952eeb4aba247



  useEffect(()=>{
    fetchNfts(address);
  },[])


  const fetchNfts = async (walletAddress) => {
    setCollectionIndex(0);
    setIsLoading(true);

    try{
        const response = await fetch(`https://api.opensea.io/api/v2/chain/ethereum/account/${walletAddress}/nfts?`, options);
        // const response = await fetch('https://api.opensea.io/api/v2/chain/ethereum/account/0xce90a7949bb78892f159f428d0dc23a8e3584d75/nfts?', options);
        const collection = await(response.json());
        let nftArray = []
        // console.log(collection);
        collection.nfts.forEach(element => {
        nftArray.push(element.image_url);
      });
      // console.log(nftArray.length);
      setCollection(nftArray);
      setError(false);
      setAddress(walletAddress);
    }
    catch (e){
      // console.log(e);
      setError(true);
    }
    finally{
      setIsLoading(false);
    }

  } 


  // console.log(collection);

  // TO DO

  // MAYBE ADD GALLERY VIEW

  // PLAY WITH LIMITS

  const submitForm = (e) =>{
    e.preventDefault();

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);

    // console.log(payload.add);
    fetchNfts(payload.add);

  }

  const checkWallet = (celAdd) =>{
    fetchNfts(celAdd);
  }

  const clickBack = () =>{
    if(collectionIndex > 0){
      setCollectionIndex(collectionIndex-1);
    }else if(collectionIndex == 0){
      setCollectionIndex(collection.length-1);
    }
  }

  const clickNext = () =>{
    if(collectionIndex < collection.length-1){
      setCollectionIndex(collectionIndex+1);
    }else if(collectionIndex == collection.length - 1){
      setCollectionIndex(0);
    }
  }


  return (
    <div className='nft'>

      <div className="background">

        <span className='title'>Wallet Address</span>
        <span className='address'>{address}</span>

        <div className="img-holder">
          <img className='nft-image' src={collection[collectionIndex]} />
        </div>

        <div className="index-indicator">
          <span className='current-index'>{"( " + (collectionIndex + 1) + " / " + collection.length + " )"}</span>
        </div>

       
        <div className='nav-holder'>
          {collection.length > 1?
          <div className='nav-buttons'>
            <button className='back-button' onClick={clickBack}>Back</button>
            <button className='next-button' onClick={clickNext}>Next</button>
          </div>
          :
          <></>
          }
        </div>

        <span style={{color:'white'}}>Enter an Ethereum wallet public address</span>

        <div className="status">
          {isLoading? <span className='loading-text'>Loading...</span> : <></>}
          {error? <span className='error-text'>Oops! Double Check Your Wallet Address :D</span> : <></>}
        </div>


        <div className="input-form">
          <form onSubmit={submitForm}>
            <input className='text-area' type="text" name="add" id="" placeholder='0x437a17a4c3dac45e507e5636871952eeb4aba247'/>
            <button className='submit-button' type="submit" value="Submit">Submit</button>
          </form>
        </div>

        <div className="example-buttons">
          {celebrities.map((cel)=>
            <button onClick={()=>checkWallet(cel.address)} className='example-button' id={cel.id}>{cel.name}</button>
          )}
        </div>

      </div>
    </div>
  )
}

export default Nft






    // fetch('https://api.opensea.io/api/v2/chain/ethereum/account/0x437a17a4c3dac45e507e5636871952eeb4aba247/nfts?', options)
    //   .then(response => response.json())
    //   .then(response => 
    //     {
    //       // console.log(response);
    //       let nftArray = []
    //       response.nfts.forEach(element => {
    //         nftArray.push(element.image_url);
    //       });
    //       setCollection(nftArray);
    //       // setNft(response.nfts[11].display_image_url);
    //       // setNft(response.nfts[10].image_url);
    //     })
    //   .catch(err => console.error(err));


        // fetch(`https://api.opensea.io/api/v2/chain/ethereum/account/${payload.add}/nfts?`, options)
    // // fetch('https://api.opensea.io/api/v2/chain/ethereum/account/0x437a17a4c3dac45e507e5636871952eeb4aba247/nfts?', options)
    // .then(response => response.json())
    // .then(response => 
    //   {
    //     // console.log(response);
    //     let nftArray = []
    //     response.nfts.forEach(element => {
    //       nftArray.push(element.image_url);
    //     });
    //     setCollection(nftArray);
    //     // setNft(response.nfts[11].display_image_url);
    //     // setNft(response.nfts[10].image_url);
    //   })
    // .catch(err => console.error(err));