import React from 'react'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
type Props = {}

const variants = [
    'h1',
    'h3',
    'body',
    'caption',
] as readonly TypographyProps['variant'][];
const Loader = (props: Props) => {
    return (
        <>
            <Box >
                <LinearProgress />
            </Box>
            <div className='p-4 mt-4'>
                <TypographyDemo />

            </div>
            <Grid container>
                {
                    Array(10).fill(null).map((_, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4}>
                            <Box p={3}>
                                <Skeleton variant="rectangular" width="100%" height={200} />
                            </Box>
                        </Grid>
                    ))
                }


            </Grid>
        </>


    )
}

function TypographyDemo() {

    return (
        <div>
            {variants.map((variant) => (
                <Typography component="div" key={variant} variant={variant}>
                    <Skeleton />
                </Typography>
            ))}
        </div>
    );
}

export default Loader