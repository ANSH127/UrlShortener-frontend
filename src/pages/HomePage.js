import React from 'react'
import Loadar from '../components/Loadar';
import isUrl from 'is-url';

export default function HomePage() {

    const [url, setUrl] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [shortendUrl, setShortendUrl] = React.useState('');


    const copyToClipboard = () => {
        navigator.clipboard.writeText(`https://shrnk.vercel.app/${shortendUrl}`);
    }

    const shortenUrl = async () => {
        if (url === '') {
            alert('Please enter URL');
            return;

        }
        if (!isUrl(url)) {
            alert('Please enter valid URL');
            return;
        }



        try {
            setLoading(true);
            const res = await fetch(`${process.env.REACT_APP_API_URL}/createURL`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url })
            });
            const data = await res.json();
            // console.log(data);
            setShortendUrl(data.url);

        } catch (error) {
            console.log(error);

        }
        finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    }


    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center', alignItems: 'center', height: '90vh',
            flexDirection: 'column'
        }}>
            <img src="./images/img.jpg" alt="img" style={{ width: 250, height: 250 }} />

            <h1>
                Make Your <span style={{
                    color: 'blue'

                }}>URL</span> Short

            </h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <input type="url" placeholder="Enter URL" style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}

                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                {
                    !loading &&
                    <button style={{ padding: '10px', marginLeft: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: 'blue', color: 'white' }}
                        onClick={shortenUrl}
                    >Shorten</button>}
            </div>
            {
                loading && <Loadar />
            }

            {
                shortendUrl && !loading &&
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '10px' }}>

                    <h3>Shortened URL</h3>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <p
                            style={{
                                padding: '10px', width: '300px', borderRadius: '15px', border: '1px solid #ccc',
                                wordBreak: 'break-all',
                                backgroundColor: '#f9f9f9',

                            }}
                        >
                            https://shrnk.vercel.app/{shortendUrl}
                        </p>
                        <button style={{ padding: '10px', marginLeft: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: 'blue', color: 'white',cursor:'pointer' }}
                            onClick={copyToClipboard}
                        >Copy</button>
                    </div>




                </div>}







        </div>
    )
}
