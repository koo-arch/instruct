import React from 'react';
import { useMediaQuery } from '@mui/material';
import TableField from '../tableField';
import urls from '../../api/urls';
import PatrolDetailDialog from './patrolDetailDialog';


const PatrolRecord = ({ record }) => {
    const isDesktopSize = useMediaQuery((theme) => theme.breakpoints.up('md'));
    const isMobileSize = useMediaQuery('(max-width: 500px');

    const moblieColumns = [
        // 900px未満の列項目
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'published_date', headerName: '日付', flex: 3 },
        { field: 'name', headerName: '場所', flex: 3 },
        { field: 'published_time', headerName: '時間', flex: 3 },
    ]

    const ExColumns = isDesktopSize ? [
        { field: 'AM_or_PM', headerName: '時間帯', flex: 3 },
    ] : []

    const columns = [...moblieColumns, ...ExColumns]

    return (
        <div>
            <TableField
                displayComponent={PatrolDetailDialog}
                rows={record}
                columns={columns}
                url={urls.PatrolRecord}
                title="記録データ"
            />
        </div>
    )
}

export default PatrolRecord;