interface SignUpPageProps {
    data: object;
    loading: boolean;
    users: {
        errors: {
            isError: boolean,
            message: string
        };
        isLogging: boolean;
        loading: boolean;
        user: object;
    }
}