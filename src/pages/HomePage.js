import React from 'react'
import Loadar from '../components/Loadar';
import isUrl from 'is-url';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

export default function HomePage() {

    const [url, setUrl] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [shortendUrl, setShortendUrl] = React.useState('');




    const copyToClipboard = () => {
        navigator.clipboard.writeText(`https://shrnk.vercel.app/${shortendUrl}`);
        toast.success('Copied to clipboard');
    }

    const shortenUrl = async () => {

        setShortendUrl('');
        if (url === '') {
            toast.error('Please enter URL');
            return;

        }

        if (!isUrl(url)) {
            toast.error('Please enter valid URL');
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
            toast.warning('Shortened URL is valid for 3 days only');


        } catch (error) {

            toast.error('Something went wrong');
            console.log(error);

        }
        finally {
            setLoading(false);
        }
    }


    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center', alignItems: 'center', height: '90vh',
            flexDirection: 'column',
            backgroundColor: '#0f172a',
            color:'white',
         
        }}>
            <img src="./images/img2.png" alt="img" style={{ width: 'auto', height: 250 }} />
            <h4  style={{height:'2px'}}>
            Tired of big URLs ?
            </h4>
            <h1>
                Make Your <span style={{
                    color: 'blue'

                }}>URL</span> Short

            </h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <input type="url" placeholder="Enter URL" style={{ padding: '15px', width: '300px', borderRadius: '10px', border: '1px solid #ccc',backgroundColor:'black',color:'white' }}

                    value={url}
                    onChange={(e) => setUrl(e.target.value)}

                />
                
                <ArrowCircleRightOutlinedIcon fontSize='large' style={{ cursor: 'pointer', marginLeft: '5px' }} onClick={shortenUrl} />
            </div>
            {
                loading && <Loadar />
            }

            {
                shortendUrl && !loading &&
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

                    <h3
                    style={{height:'2px'}}
                    >Shortened URL</h3>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <p
                            style={{
                                padding: '10px', width: '280px', borderRadius: '10px', border: '1px solid #ccc',
                                wordBreak: 'break-all',
                                backgroundColor: 'black',

                            }}
                        >
                            <span
                                style={{
                                    color: 'blue'
                                }}
                            >https://shrnk.vercel.app/{shortendUrl}</span>

                            <ContentCopyOutlinedIcon style={{ cursor: 'pointer', marginLeft: '5px', marginBottom: '-5px' }}  onClick={copyToClipboard} />
                        </p>
                    </div>




                </div>}




            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Zoom}
                limit={1}
            />


        </div>
    )
}
