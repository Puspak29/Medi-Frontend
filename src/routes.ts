const routes = {
    home: '/',
    auth: {
        root: '/auth',
        user: {
            root: '/auth/user',
            login: '/auth/user/login',
            signup: '/auth/user/signup',
        },
        doctor: {
            root: '/auth/doctor',
            login: '/auth/doctor/login',
            signup: '/auth/doctor/signup'
        }
    },
    user: {
        root: '/user',
        profile: '/user/profile',
    }
}

export default routes