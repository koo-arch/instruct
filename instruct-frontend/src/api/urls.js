const urls = {
    Timetable: `/timetable/`,
    CurrentTimetable: `/timetable/current/`,
    
    PatrolPlaces: `/patrol/places/active/`,
    PatrolRecord: `/patrol/record/`,
    PatrolStatus: `/patrol/status/`,
    
    CountUsersProps: `/count/users/props/active/`,
    CountUsersRecord: `/count/users/record/`,
    CountUsersStatus: `/count/users/status/`,
    ExportCountUsers: `/count/users/export/csv/`,

    Register: `/auth/users/`,
    Activation: `/auth/users/activation/`,
    ResendActivation: `/auth/users/resend_activation/`,
    UserInfo: `/auth/users/me/`,
    Login: `/auth/jwt/create/`,
    Refresh: `/auth/jwt/refresh/`,
    ResetPassword: `/auth/users/reset_password/`,
    ResetPasswordConfirm: `/auth/users/reset_password_confirm/`,
    ResetEmail: `/auth/users/reset_email/`,
    ResetEmailConfirm: `/auth/users/reset_email_confirm/`,
    ChangePassword: `/auth/users/set_password/`,
}

export default urls;