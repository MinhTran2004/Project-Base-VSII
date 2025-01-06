import React from 'react';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';

interface SingleLoadingButtonProps {
    loading: boolean;
    onClick: () => void;
}

const SingleLoadingButton: React.FC<SingleLoadingButtonProps> = ({ loading, onClick }) => {
    return (
        <LoadingButton
            loading={loading}
            variant="outlined"
            loadingPosition="start"
            startIcon={<SaveIcon />}
            onClick={onClick}
        >
            Save
        </LoadingButton>
    );
}

export default SingleLoadingButton;
