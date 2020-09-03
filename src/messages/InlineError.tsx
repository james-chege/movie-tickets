import React from "react";

const InlineError: React.FC<InlineErrorProps> = ({ text }) => (
    <span style={{ color: "#ae5856" }}>{text}</span>
);

export default InlineError;
