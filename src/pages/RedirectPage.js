import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

export default function RedirectPage() {
    const { id } = useParams();
    const [is404, setIs404] = React.useState(false);
    const navigate = useNavigate();


    const redirect = async () => {

        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/getURL/${id}`);


            if (res.status === 404) {
                setIs404(true);
                return;

            }

            const data = await res.json();
            window.location.href = data.url;

        } catch (error) {
            console.log(error);

        }
    }


    useEffect(() => {
        if (id.length === 7) {

            redirect();
        }
        else {
            setIs404(true);
        }

        // eslint-disable-next-line
    }, [])




    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                flexDirection: "column",
                backgroundColor: '#0f172a',
                color: 'white'
            }}
        >
            {is404 ? <h1>404 Not Found</h1> : <h1>Redirecting...</h1>}
            {
                is404 &&
                <>
                    <p>
                        The URL you are trying to reach does not exist.
                    </p>
                    <button
                        onClick={() => navigate("/")}
                        style={{
                            padding: "10px",
                            borderRadius: "5px",
                            border: "none",
                            backgroundColor: "blue",
                            color: "white",
                            cursor: "pointer"
                        }}
                    >
                        Home
                    </button>
                </>
            }
        </div>
    )


}
