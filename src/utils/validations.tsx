export default {
    validateEmail: (email: string) => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return re.test(String(email).toLowerCase())
        },
    validatePassword: (password: string) => {
        // simple validation for easy testing(improve this in future)
        return password.length >= 4
    },
    validateName: (password: string) => {
        // simple validation for easy testing(improve this in future)
        return password.length >= 4
    }
}