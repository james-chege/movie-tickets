interface BookingFormProps {
    submit?: (movie: movie) => void;
    movie?: {Poster?: string, Year?: string, Title?: string, Type?: string};
    data?: { title: string, summary: string, year: string, image: string},
    errors?: { title: string, summary: string, year: string, image: string},
}