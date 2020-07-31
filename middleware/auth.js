export default function ({ store, redirect, route}) {
    // If the user is not authenticated
    if (!store.state.user && route.name != 'login') {
      return redirect('/login')
    }
    else if(store.state.user && route.name == 'login'){
      return redirect('/')
    }
}