import * as React from 'react';
import {Mutation} from "react-apollo";
import {gql} from 'apollo-boost';
import {LoginMutation, LoginMutationVariables} from "../../schemaTypes";
import {RouteComponentProps} from "react-router-dom";
import {meQuery} from "../../graphql/queries/me";
import {userFragment} from "../../graphql/fragments/userFragment";

const loginMutation = gql`
    mutation LoginMutation($email: String!, $password: String!){
        login(email: $email, password: $password){
            ...UserInfo
        }
    }
    
    ${userFragment}
`;

export class LoginView extends React.PureComponent<RouteComponentProps<{}>> {
    state = {
        email: '',
        password: '',
    };

    handleChange = (e: any) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    };

    render() {
        const {password, email} = this.state;
        return (
            <Mutation<LoginMutation, LoginMutationVariables>
                mutation={loginMutation}
                update={(cache, { data }) => {
                    if (!data || !data.login) {
                        return;
                    }

                    cache.writeQuery({
                        query: meQuery,
                        data: { me: data.login },
                    });
                }}
            >
                {(mutate, {client}) => (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <div>
                            <input
                                type="text"
                                name="email"
                                placeholder="email"
                                value={email}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                value={password}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <button onClick={async () => {
                                // optional reset cache
                                await client.resetStore();

                                const response = await mutate({
                                    variables: this.state
                                });
                                console.log(response);
                                this.props.history.push("/account");
                            }}>
                                Login
                            </button>
                        </div>
                    </div>
                )}
            </Mutation>

        );
    }
}
