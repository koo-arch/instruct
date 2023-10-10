import React from 'react';
import { Container, useMediaQuery } from '@mui/material';
import TableField from '../tableField';
import urls from '../../api/urls';


const CountUsersRecords = ({record}) => {
    const isDesktopSize = useMediaQuery((theme) => theme.breakpoints.up('md'));
    const isMobileSize = useMediaQuery('(max-width: 500px');

    const moblieColumns = [
        // 900px未満の列項目
        { field: 'published_date', headerName: '日付', flex: 1 },
        { field: 'school_period', headerName: '時限', flex: 1 },
        { field: 'location', headerName: '場所', flex: 2 },
    ]

    const ExColumns = isDesktopSize ? [
        { field: 'univ_users_num', headerName: '大学PC数', flex: 1 },
        { field: 'own_users_num', headerName: '個人PC数', flex: 1 },
    ] : []

    const columns = [...moblieColumns, ...ExColumns]

    return (
        <Container>
            <TableField
                rows={record}
                columns={columns}
                url={urls.CountUsersRecord}
                title="記録データ"
            />
        </Container>
    )
}

export default CountUsersRecords;