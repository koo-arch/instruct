import React from 'react';
import { 
    Box,
    Typography,
    Container,
    Card,
    CardContent,
    Divider
} from '@mui/material';
import IsCompletedField from './isCompletedField';

const StatusField = ({ rows, title, isLoading }) => {
    if (!rows.length) {
        return (
        <Typography variant='h6' align='center'>
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
                <Card style={{ marginBottom: 10 }}>
                    {isLoading ? (
                        <Typography variant='body1' align='center'>
                            Loading...
                        </Typography>
                    ) : (
                        rows.map((row, index) => (
                            <CardContent key={row.id} >
                                <Typography variant='h6'>
                                    {row.place}
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center', justifyContent: 'center' }}>
                                    <IsCompletedField isCompleted={row.is_completed} />
                                </Box>
                                { index !== rows.length - 1 && <Divider />}
                            </CardContent>
                        ))
                    
                    )}
                </Card>
            </Box>
        </Container>
    )
}

export default StatusField;