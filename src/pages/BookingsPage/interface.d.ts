interface BookingsPageProps {
    tickets: {
        errors: {isError: boolean, message: string};
        tickets: [],
        loading: boolean;
    };
    ticket: {
        id: number,
        image: string,
        movie: string,
        owner: string,
        summary: string,
        year: string
    },
}