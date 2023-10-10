import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Container } from '@mui/material';

const StatusField = ({ rows, columns, title }) => {

    if (rows.length === 0) {
        return(
            <Typography component={"h2"} variant='h5' textAlign="center" sx={{ mt : 6, mb: 6 }}>
                現在の巡回場所はありません
            </Typography>
        )
    }
    return(
        <Container>
            <Box width="100%" sx={{ mb: 4 }}>
                <Typography component={"h2"} variant='h5' sx={{ mb: 1 }}>
                    {title}
                </Typography>
                <DataGrid 
                    rows={rows}
                    columns={columns}
                    hideFooter
                    disableColumnMenu
                />
            </Box>
        </Container>
    )
}

export default StatusField;