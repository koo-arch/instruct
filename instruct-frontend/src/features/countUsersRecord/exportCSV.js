import React from 'react';
import { useCustomContext } from '../../components/customContexts';
import useAuthAxios from '../../hooks/useAuthAxios';
import urls from '../../api/urls';
import { Fab } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { format } from 'date-fns'


const ExportButton = () => {
    const authAxios = useAuthAxios();
    const { setSnackbarStatus } = useCustomContext();

    const exportCSVRecord = () => {
        return authAxios.get(urls.ExportCountUsers, { responseType: 'blob' })
    }
  
    const formattedDate = format(new Date(), 'yyyyMMdd');
    const fileName = '利用人数記録_' + formattedDate + '.csv'


    const exportToCSV = () => {
        exportCSVRecord()
            .then(res => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                a.click();
            })
            .catch(err => {
                console.log(err)
                setSnackbarStatus({
                    open: true,
                    severity: "error",
                    message: "エクスポートに失敗しました"
                })
            })
    }
    return (
        <Fab color='primary' variant='extended' onClick={exportToCSV}>
            <FileDownloadIcon sx={{ mr: 1 }} />
            エクスポート
        </Fab>
    )
}

export default ExportButton