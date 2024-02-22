import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Container } from '@mui/material';

const StatusField = ({ rows, columns, title, isLoading }) => {
    if (isLoading) {
        return (
            <Typography component={"h2"} variant='h5' textAlign="center" sx={{ mt : 2, mb: 2 }}>
                読み込み中...
            </Typography>
        )
    }
    else if (!rows.length) {
        return(
            <Typography component={"h2"} variant='h5' textAlign="center" sx={{ mt : 2, mb: 2 }}>
                授業時間外
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