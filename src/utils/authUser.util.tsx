export default (() => {
    try {
        return localStorage.getItem('token') as string;
    } catch (e) {}
    return null;
});