import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Container, Typography } from '@mui/material';

const TableField = (props) => {
    const { 
        displayComponent: DisplayComponent, 
        rows, 
        columns, 
        title, 
        url, 
        message = "", 
    } = props;
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState({});

    
    const defaultSortModel = [
        {
            field: 'id',
            sort: 'desc',
        },
    ];

    const handleCellClick = (params) => {
        setSelectedRowData(params.row)
        setOpenDetail(true);
    }

    const handleClose = () => setOpenDetail(false);

    if (rows.length === 0 && message !== "") {
        return(
            <Typography component={"h2"} variant='h5' textAlign="center" sx={{ mt : 6, mb: 6 }}>
                {message}
            </Typography>
        )
    } else if (rows.length === 0) {
        return null;
    }
    return(
        <Box width="100%" sx={{ mb: 4 }}>
            <Container>
                <Typography component={"h2"} variant='h5' sx={{ mb: 1, mt : 2 }}>
                    {title}
                </Typography>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    onCellClick={handleCellClick}
                    disableColumnMenu
                    sortModel={defaultSortModel}
                    sx={{ mb : 10 }}
                />
                <DisplayComponent
                    open={openDetail} 
                    onClose={handleClose} 
                    rowData={selectedRowData}
                    url={url}
                />
            </Container>
        </Box>
    )
}

export default TableField;