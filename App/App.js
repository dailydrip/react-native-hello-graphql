import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const GithubQuery = gql`
  {
  graphQLHub
  github {
    user(username: "knewter") {
      login
      id
      company
      avatar_url
    }
  }
}
`

class helloGraphQL extends Component {
  static propTypes = {
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

  render() {
    if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<Text style={{marginTop: 64}}>An unexpected error occurred</Text>)
    }

    if (this.props.data.loading) {
      return (<Text style={{marginTop: 64}}>Loading</Text>)
    }

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          GraphQL in React Native
        </Text>

        <Text style={styles.text}>
          User: {this.props.data.github.user.login}!
        </Text>

        <Text style={styles.text}>
          Company: {this.props.data.github.user.company}!
        </Text>

        <Image source={{uri: this.props.data.github.user.avatar_url}}
               style={{width: 100, height: 100}} />
      </View>
    );
  }
}

const GraphqlWithData = graphql(GithubQuery)(helloGraphQL)

export default GraphqlWithData

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
