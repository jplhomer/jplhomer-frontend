import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import ErrorMessage from './ErrorMessage'

export const allPostsQuery = gql`
  query allPosts($first: Int!) {
    posts(first: $first) {
      nodes {
        id
        link
        title
        date
        slug
        redirectUrl
      }
    }
  }
`
export const allPostsQueryVars = {
  first: 10
}

export default function PostList () {
  return (
    <Query query={allPostsQuery} variables={allPostsQueryVars}>
      {({ loading, error, data: { posts, _allPostsMeta }, fetchMore }) => {
        if (error) return <ErrorMessage message='Error loading posts.' />
        if (loading) return <div>Loading</div>

        return (
          <section>
            <ul>
              {posts.nodes.map((post, index) => (
                <li key={post.id}>
                  <div>
                    <span>{index + 1}. </span>
                    <a href={postLink(post)} dangerouslySetInnerHTML={{ __html: post.title }}></a>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )
      }}
    </Query>
  )
}

function postLink(post) {
  if (post.redirectUrl) return post.redirectUrl;

  return `/post/${post.slug}`;
}
