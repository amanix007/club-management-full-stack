import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Suspense } from 'react';
// import HomePage from '../Components/home/HomePage';
import Dashboard from '../Components/Dashboard/Dashboard';
import UpdateMember from '../Components/UpdateMember/UpdateMember';
export interface IRoutesProps {
}

export interface IRoutesState {
}

export default class Routes extends React.Component<IRoutesProps, IRoutesState> {
    constructor(props: IRoutesProps) {
        super(props);

        this.state = {
        }
    }

    public render() {
        return (
            <div className="Routes">
                <Router>
                    <Suspense fallback={<p>Loading Compoent.</p>}>
                        <Switch>
                            {/* <Route exact path="/" component={HomePage} /> */}
                            <Route exact path="/" component={Dashboard} />
                            <Route exact path="/update/:slug" component={UpdateMember} />
                            {/* <Route component={Error404Page} /> */}
                        </Switch>
                    </Suspense>
                </Router>
            </div>
        );
    }
}
