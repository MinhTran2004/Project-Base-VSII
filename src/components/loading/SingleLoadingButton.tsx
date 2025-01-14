// components/MuiLoadingButton.tsx
import React from 'react';
import { LoadingButton } from '@mui/lab';
// import SaveIcon from '@mui/icons-material/Save';

interface SingleLoadingButtonProps {
    loading: boolean;
    onClick: (event: React.FormEvent) => void; // Update to accept an event parameter
}

const SingleLoadingButton: React.FC<SingleLoadingButtonProps> = ({ loading, onClick }) => {
    return (
        <LoadingButton
            loading={loading}
            variant="outlined"
            loadingPosition="start"
            // startIcon={<SaveIcon />}
            onClick={onClick} // No changes needed here, it will work with the updated prop type
        >
            Save
        </LoadingButton>
    );
}

export default SingleLoadingButton;
