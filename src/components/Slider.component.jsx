import React from 'react'
import Carousel from "react-material-ui-carousel";
import {Paper,Box} from '@mui/material';

const Slider = (props) => {
  return (
    <Carousel
        children={{height:'100%'}}
        timeout={0}
        autoPlay={true}
        animation="false"
        navButtonsAlwaysVisible={true}
        navButtonsAlwaysInvisible={false}
        cycleNavigation={false}
        indicators={false}
        height='100%'
        sx={{
            height: "100%",
            boxSizing:'border-box',
            width: '100%', 
            borderRadius: 2,
        }}
    >
        {
            props.images.length>0
            ?
            props.images.map((image, i) => (
                <Box
                    key={i}
                    style={{
                        position: "relative",
                        color: "#fff",
                        height:'100%',
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundImage: `url(${import.meta.env.VITE_API_URL+image.filename})`,
                        transition:'none',
                    }}
                ></Box>
            ))
            :
            <Box
                key={1}
                style={{
                    position: "relative",
                    color: "#fff",
                    minHeight:'100%',
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundImage: `url(${import.meta.env.VITE_API_URL}defaultProductImage.jpg)`,
                    transition:'none',
                }}
                elevation={0}
            ></Box>
        }
    </Carousel>
  )
}

export default Slider