'use client';

import { useEffect } from "react";
import EmptyState from "./components/EmptyState";

interface ErrorStateProps {
    error: Error
}

// component to handle the errors
const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
    
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <EmptyState
            title="Uh Oh"
            subtitle="Something went wrong!"
        />
    );
}

export default ErrorState;