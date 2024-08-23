import React, { useState } from 'react';

function App() {
    const [image, setImage] = useState('');
    const [typeOfImage, setTypeOfImage] = useState('');
    
    const images = {
        nature: [
            'https://www.thewowstyle.com/wp-content/uploads/2015/01/images-of-nature-4.jpg',
            'https://wallpaperaccess.com/full/1131217.jpg',
            'https://www.wallpapertip.com/wmimgs/75-750439_nature-desktop-backgrounds.jpg'
        ],
        houses: [
            'https://wallpaperaccess.com/full/1126773.jpg',
            'https://wallpapercrafter.com/desktop/263079-mansion-house-huge-and-architecture-hd.jpg',
            'https://e0.pxfuel.com/wallpapers/12/377/desktop-wallpaper-beautiful-houses-beautiful-mansion.jpg'
        ]
    };

    const enter = (index) => {
        setImage(images[typeOfImage][index]);
    };

    const leave = () => {
        setImage('');
    };

    const imagePack = (text) => {
        setTypeOfImage(text);
    };

    return (
        <>
            <div style={{display:'flex',justifyContent:'center'}}>
                <img src={images.nature[0]} alt="" style={{height:'80px',width:'80px',borderRadius:'8px',margin:'0px 10px'}} onClick={() => imagePack('nature')}/>
                <img src={images.houses[0]} alt="" style={{height:'80px',width:'80px',borderRadius:'8px',margin:'0px 10px'}} onClick={() => imagePack('houses')}/>
            </div>
            <div className='container' style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ border: '2px solid #000', height: '300px', width: '300px', backgroundImage: `url(${image})`, backgroundSize: '100% 100%', margin: '20px', boxShadow: '0px 5px 15px rgba(0,0,0,.90)' }}></div>
                <div>
                    {images[typeOfImage] && images[typeOfImage].map((pic, index) =>
                        <img key={index} style={{ height: '100px', width: '100px', margin: '0px 10px' }} src={pic} alt="" onMouseEnter={() => enter(index)} onMouseLeave={leave} />
                    )}
                </div>
            </div>
        </>
    );
}

export default App;
