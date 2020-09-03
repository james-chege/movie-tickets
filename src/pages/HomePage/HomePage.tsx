import React, { Fragment } from "react"
import { Container, Header} from "semantic-ui-react";
import {Link, useHistory} from "react-router-dom";
import authUser from "../../utils/authUser.util";

const HomePage: React.FC<HomePageProps>  = () => {
    const history = useHistory()
    const loggedInUser = authUser();
    if (loggedInUser) {
        history.push('/booking')
    }
    return (
        <Fragment>
            <Container text>
                <Header
                    as='h1'
                    content='Book a movie'
                    inverted
                    style={{
                        fontSize: '4em',
                        fontWeight: 'normal',
                        marginBottom: 0,
                        color: 'black',
                    }}
                />
                <Header
                    as='h2'
                    content="We are glad you're here, Welcome."
                    inverted
                    style={{
                        fontSize: '1.7em',
                        fontWeight: 'normal',
                        color: 'black',
                    }}
                />
                <button className='button'>
                    <Link to={'login'}>Login</Link>
                </button>
                <button className='button'>
                    <Link to={'signup'}>Signup</Link>
                </button>
            </Container>
        </Fragment>
    )
}
export default HomePage;