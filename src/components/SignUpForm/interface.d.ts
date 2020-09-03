interface SignUpFormProps {
    submit: (data: object) => void;
    loading: boolean;
    error: {
        message: string,
        isError: boolean
    }
}
