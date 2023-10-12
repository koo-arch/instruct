import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const isCompletedField =
{
    field: 'is_completed',
    headerName: '状況',
    sortable: false,
    flex: 1,
    renderCell: (params) => {
        return params.value ? <CheckIcon color='success' /> : <ClearIcon color='error' />;
    }
}

export default isCompletedField;