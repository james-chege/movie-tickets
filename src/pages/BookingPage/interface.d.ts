interface BookingPageProps {
    movie: { Title: string; Summary: string; Year: string; Poster: string; };
    tickets?: Array<object>;
    results?: Array<object> | any;
    value?: string;
}