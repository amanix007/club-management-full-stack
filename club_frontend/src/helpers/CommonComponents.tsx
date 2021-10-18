import { ReactElement } from 'react'
import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';



export function LoadingComponent(): ReactElement {
    return (
        <div>
            <Box sx={{ width: "100%" }}>

                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />

            </Box>
        </div>
    )
}

