interface LoginFormProps {
    submit: (data: object) => void;
    loading: boolean;
    error: { message: string },
}
