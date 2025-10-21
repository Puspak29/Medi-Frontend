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
    },
    doctor: {
        root: '/doctor',
        profile: '/doctor/profile',
        reportcard: {
            root: '/doctor/reportcard',
            generate: '/doctor/reportcard',
            verify: '/doctor/reportcard/verify',
        },
    }
}

export default routes