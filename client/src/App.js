import './App.css';
import { React } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store'
import {
    AppBanner,
    HomeWrapper,
    RegisterScreen,
    LoginScreen,
    Statusbar,
    ToolBar,
    WorkSpace,
    WorkspaceScreen,
    AllListsView,
    AggregateListsView,
    UserListsView
} from './components'

/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
/*
  This is the entry-point for our application. Notice that we
  inject our store into all the components in our application.
  
  @author McKilla Gorilla
*/
const App = () => {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <GlobalStoreContextProvider>              
                    <AppBanner />
                    {/* <ToolBar /> */}
                    <Switch>
                        <Route path="/" exact component={HomeWrapper} />
                        <Route path="/register/" exact component={RegisterScreen} />
                        <Route path="/login/" exact component={LoginScreen} />
                        <Route path="/top5list/:id" exact component={WorkSpace} />
                        <Route path="/alllistsviews/" exact component={AllListsView} />
                        <Route path="/aggregatelistsview/" exact component={AggregateListsView} />
                        <Route path="/userlistview/" exact component={UserListsView}/>
                    </Switch>
                    <Statusbar />
                </GlobalStoreContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    )
}

export default App