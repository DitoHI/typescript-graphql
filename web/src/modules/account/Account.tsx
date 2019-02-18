import * as React from 'react';
import {Query} from "react-apollo";
import {Redirect} from "react-router-dom";
import {SubscribeUser} from "./SubscribeUser";
import {ChangeCreditCard} from "./ChangeCreditCard";
import {meQuery} from "../../graphql/queries/me";
import {MeQuery} from "../../schemaTypes";

export class Account extends React.PureComponent {
    render() {
        return (
            <Query<MeQuery> query={meQuery}>
                {({data, loading}) => {
                    if (loading) {
                        return null;
                    }

                    if (!data) {
                        return <div>data is undefined</div>;
                    }

                    if (!data.me) {
                        return <Redirect to="/login"/>;
                    }

                    if (data.me.type === 'free-trial') {
                        return <SubscribeUser/>
                    }

                    // if (data.me.type === 'paid')
                    return <div>
                        <div>Your current last 4 digits: {data.me.ccLast4}</div>
                        <ChangeCreditCard />
                    </div>;
                }}
            </Query>
        );
    }
}
