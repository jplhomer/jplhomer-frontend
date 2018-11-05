import React, { Component } from 'react';
import App from '../components/App'
import Error from 'next/error';
import Header from '../components/Header'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';

const POST_QUERY = gql`
  query POST_QUERY($slug: String!) {
    posts(first: 1, where: {
      name: $slug
    }) {
      nodes {
        id
        title
        content
      }
    }
  }
`;

class Post extends Component {
  static getInitialProps(context) {
    const { slug } = context.query;

    return { slug }
  }

  render() {
    const { slug } = this.props;
    return (
      <App>
        <Header />
        <Query query={POST_QUERY} variables={{ slug }}>{
          ({ loading, error, data: { posts } }) => {
            if (!posts.nodes.length) return <Error statusCode={404} />
            if (error) return <h1>Whoops: ${error}</h1>
            if (loading) return <p>Loading...</p>
            const post = posts.nodes[0];

            return (
              <div>
                <Head>
                  <title>{post.title}</title>
                </Head>
                <h1 dangerouslySetInnerHTML={{
                    __html: post.title
                }} />

                <div className="content" dangerouslySetInnerHTML={{
                  __html: post.content
                }} />
              </div>
            );
          }
        }</Query>
      </App>
    );
  }
}

export default Post;
