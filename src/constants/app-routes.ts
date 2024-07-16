export const APP_ROUTES = {
  private: {
    dashboard: {
      name: '/dashboard'
    },
    unauthorized: {
      name: '/unauthorized'
    }
  },
  public: {
    login: '/login',
    forget_password: '/forget-password/:id',
    landing: '/landing',
    register: '/register',
  }
}