import * as React from 'react';
import {Box, Skeleton} from '@mui/material';
import {LoadingButton} from "@mui/lab"

const LoadingCardComponent = () => {
  return (
    <Box sx={{
        flexBasis: {
          es:'calc(50% - 16px)',
          xs:'calc(33.33% - 16px)',
          sm:'calc(25% - 16px)',
          md:'calc(25% - 16px)',
          lg:'calc(25% - 16px)',
          xl:'calc(25% - 16px)',
        },
        height:'auto',
        backgroundColor:'rgba(0,0,0,0)',
        borderRadius:2,
        boxSizing:'border-box'
      }}
      elevation={0}
    >
        <Box sx={{widht:'100%',p:0,aspectRatio: '1 / 1',}}>
            <Skeleton variant="rectangular" height={'100%'} width={'100%'} sx={{borderRadius:2}}/>
        </Box>
        
    
        <Box sx={{width:'100%', p:0, py:1, cursor:'default'}}>
            <Skeleton variant="rectangular" height={'2.4em'} width={'100%'} sx={{mb:1,borderRadius:2}}/>
            <Skeleton variant="rectangular" height={''} width={'100%'} sx={{borderRadius:2}}/>
        </Box>

        <LoadingButton disableElevation sx={{px:2,py:2,color:'',width:1,borderRadius:2}}  size="large" loading variant="contained">
        </LoadingButton>
    </Box>
  )
}

export default LoadingCardComponent;