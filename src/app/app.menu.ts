export const MenuItem = [
  {
      'name'   : 'Home',
      'icon'   : 'fas fa-home',
      'link'   : '/'
  },
  {
    'name'   : 'Administração',
    'icon'   : 'fas fa-university',
    'link'   : false,
    'open'   : false,
      'sub'    :  [
                      {
                          'name'  : 'Grupos',
                          'link'  : '/grupos',
                          'icon'  : 'fas fa-users-cog'
                      }
                  ]
  }
]
