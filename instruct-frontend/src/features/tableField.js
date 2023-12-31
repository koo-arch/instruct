import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ExportButton from './countUsersRecord/exportCSV';
import { Box, Container, Typography, Grid, useMediaQuery } from '@mui/material';

const TableField = (props) => {
    const {
        displayComponent: DisplayComponent,
        rows,
        columns,
        title,
        url,
        message = "",
        fileName,
        exportURL,
    } = props;
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState({});
    const location = useLocation();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const isMobileSize = useMediaQuery('(max-width: 500px)')


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

    return (
        <Box sx={{ mb: 4 }}>
            <Container>
                <Grid container sx={{ mt: 3, mb: 1 }}>
                    <Grid item>
                        <Typography component={"h2"} variant='h5' sx={{ mb: 1, mt: 2 }}>
                            {title}
                        </Typography>
                    </Grid>
                    {isAuthenticated && !isMobileSize && location.pathname === "/records/countusers" && rows.length !== 0 &&
                        <Grid item sx={{ marginLeft: 'auto', mb: 3, }}>
                            <ExportButton
                                fileName={fileName}
                                url={exportURL}
                            />
                        </Grid>
                    }
                </Grid>
                {rows.length === 0 && message !== "" ?
                    <Typography component={"h2"} variant='h5' textAlign="center" sx={{ mt: 6, mb: 6 }}>
                        {message}
                    </Typography>
                    :
                    <div>
                        {
                            rows.length !== 0 &&
                                <div>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        onCellClick={handleCellClick}
                                        disableColumnMenu
                                        sortModel={defaultSortModel}
                                        sx={{ mb: 10 }}
                                    />
                                    <DisplayComponent
                                        open={openDetail}
                                        onClose={handleClose}
                                        rowData={selectedRowData}
                                        url={url}
                                    />
                                </div>
                        }
                    </div>
                }
            </Container>
        </Box>
    )
}

export default TableField;