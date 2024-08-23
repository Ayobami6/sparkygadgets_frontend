import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import React from 'react'

type Props = {}

const Loading = (props: Props) => {
    return (
        <Box >
            <CircularProgress color='secondary' />
        </Box>
    )
}

export default Loading