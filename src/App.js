import './App.css';

import { GeistProvider, CssBaseline } from '@geist-ui/react';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchResults from './pages/SearchResults';
import Job from './pages/Job';
import Explore from './pages/Explore';
import JobPosts from './pages/JobPosts';
import PostJob from './pages/PostJob';
import AssignedJob from './pages/AssignedJob';
import JobListings from './pages/JobListings';
import Applicants from './pages/Applicants';
import { QueryClient, QueryClientProvider } from 'react-query';

const myTheme = {
    type: 'Custom',
};

const queryClient = new QueryClient();

function App() {
    return (
        //themes={[myTheme]} themeType='Custom'
        <Router>
            <GeistProvider>
                <QueryClientProvider client={queryClient}>
                    <CssBaseline />
                    <Navbar />
                    <Switch>
                        <Route exact path='/'>
                            <Home />
                        </Route>
                        <Route path='/login'>
                            <Login />
                        </Route>
                        <Route path='/results/:term'>
                            <SearchResults />
                        </Route>
                        <Route path='/job/:id'>
                            <Job />
                        </Route>
                        <Route path='/explore'>
                            <Explore />
                        </Route>
                        <Route path='/post'>
                            <PostJob />
                        </Route>
                        <Route path='/yourjobs'>
                            <AssignedJob />
                        </Route>
                        <Route path='/listings'>
                            <JobListings />
                        </Route>
                        <Route path='/applicants/:jobID'>
                            <Applicants />
                        </Route>
                    </Switch>
                    <Footer />
                </QueryClientProvider>
            </GeistProvider>
        </Router>
    );
}
export default App;
