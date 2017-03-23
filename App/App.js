import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Image,
  View
} from 'react-native';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class helloGraphQL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'knewter'
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          GraphQL in React Native
        </Text>

        <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(username) => this.setState({username})}
                value={this.state.username}
              />

        <GithubWithApollo username={this.state.username} data={this.props.data} />
      </View>
    );
  }
}

const GithubInformation = (props) => {
 if (props.data.error) {
    console.log(props.data.error)
    return (<Text style={{marginTop: 64}}>An unexpected error occurred</Text>)
  }

  if (props.data.loading) {
    return (<Text style={{marginTop: 64}}>Loading</Text>)
  }

  return (
      <View style={styles.container}>

        <Text style={styles.text}>
          User: {props.data.github.user.login}!
        </Text>

        <Text style={styles.text}>
          Company: {props.data.github.user.company}!
        </Text>

        <Image source={{uri: props.data.github.user.avatar_url}}
          style={{width: 100, height: 100}} />

      </View>
    )
}

GithubInformation.propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      github: React.PropTypes.shape({
        user: React.PropTypes.shape({
          login: React.PropTypes.string,
          id: React.PropTypes.number,
          company: React.PropTypes.string,
        })
      })
    }),
  }

const GithubQuery = gql`
  query ($username: String!){
     graphQLHub
      github {
        user(username: $username) {
          login
          id
          company
          avatar_url
        }
      }
  }
`

const GithubWithApollo = graphql(GithubQuery, {
  options: (props) => {
    return {
      variables: {
        username: props.username
      }
    }
  }
})(GithubInformation)

export default helloGraphQL

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

AppRegistry.registerComponent('helloGraphQL', () => helloGraphQL);
