import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CountUsersDetailDialog from './countUsersRecord/countUsersDetailDialog';
import { Box, Typography } from '@mui/material';

const TableField = ({ rows, columns, title, url, message = "" }) => {
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState({});

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
            <Typography component={"h2"} variant='h5' sx={{ mb: 1, mt : 2 }}>
                {title}
            </Typography>
            <DataGrid
                rows={rows}
                columns={columns}
                onCellClick={handleCellClick}
                disableColumnMenu
                sx={{ mb : 10 }}
            />
            <CountUsersDetailDialog 
                open={openDetail} 
                onClose={handleClose} 
                rowData={selectedRowData}
                url={url}
            />
        </Box>
    )
}

export default TableField;