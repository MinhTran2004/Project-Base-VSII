import React from "react";
import { Typography } from "@mui/material";

interface PageTitleProps {
    title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
    return (
        <Typography
            variant="h4"
            gutterBottom
            sx={{ textAlign: "center", fontWeight: "bold" }}
        >
            {title}
        </Typography>
    );
};

export default PageTitle;
