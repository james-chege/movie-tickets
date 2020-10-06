import React from "react";
import {ErrorMessage} from "@hookform/error-message";

const InlineError: React.FC<InlineErrorProps> = ({ name, errors }) => (
    <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => {
            return <span style={{ color: "#ae5856" }}>{message}</span>
        }}
    />
);

export default InlineError;
