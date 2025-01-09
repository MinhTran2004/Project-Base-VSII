import { Button } from "@mui/material"
import React from "react";

interface Props {
    disabled?: boolean,
    label: string,
    onPress?: () => void,
    icon?: React.ReactNode,
    styleButton?: React.CSSProperties,
    styleText?: React.CSSProperties,
}

const PrimaryButton: React.FC<Props> = (props) => {
    return (
        <Button variant="text"
            disabled={props.disabled}
            sx={{
                fontSize: 16,
                backgroundColor: '#FFA21A',
                padding: '11px 20px 11px 20px',
                borderRadius: '10px',
                color: '#121110',
                fontWeight: 600,
                fontFamily: 'Inter',
                ...props.styleButton,
                ...props.styleText,
                '@media (max-width:440px)': {
                    fontSize: 12,
                },
            }}
            startIcon={props.icon}
            onClick={props.onPress}>
            {props.label}
        </Button>
    )
}

export default PrimaryButton;