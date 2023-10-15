import React from 'react';
import { useMediaQuery } from '@mui/material';
import TableField from '../tableField';
import urls from '../../api/urls';
import CountUsersDetailDialog from './countUsersDetailDialog';


const CountUsersRecords = ({record}) => {
    const isDesktopSize = useMediaQuery((theme) => theme.breakpoints.up('md'));
    const isMobileSize = useMediaQuery('(max-width: 500px');

    const moblieColumns = [
        // 900px未満の列項目
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'published_date', headerName: '日付', flex: 4 },
        { field: 'school_period', headerName: '時限', flex: 4 },
        { field: 'location', headerName: '場所', flex: 6 },
    ]

    const ExColumns = isDesktopSize ? [
        { field: 'univ_users_num', headerName: '大学PC数', flex: 2 },
        { field: 'own_users_num', headerName: '個人PC数', flex: 2 },
    ] : []

    const columns = [...moblieColumns, ...ExColumns]

    return (
        <div>
            <TableField
                displayComponent={CountUsersDetailDialog}
                rows={record}
                columns={columns}
                url={urls.CountUsersRecord}
                title="記録データ"
                fileName="利用人数記録"
                exportURL={urls.ExportCountUsers}
            />
        </div>
    )
}

export default CountUsersRecords;