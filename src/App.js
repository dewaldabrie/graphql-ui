import React, { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';
import NetworkGraph from './NetworkGraph';
import Filters from './Filters';

const client = new ApolloClient({
  uri: 'https://your-graphql-endpoint.com/graphql',
  cache: new InMemoryCache(),
});

// Introspection query to get available queries and their params
const GET_SCHEMA_INTROSPECTION = gql`
  query IntrospectSchema {
    __schema {
      queryType {
        fields {
          name
          args {
            name
            type {
              kind
              name
              ofType {
                name
              }
            }
          }
        }
      }
    }
  }
`;

const App = () => {
  const [filters, setFilters] = useState({});
  const [availableParams, setAvailableParams] = useState([]);

  const { loading, error, data } = useQuery(GET_SCHEMA_INTROSPECTION);

  useEffect(() => {
    if (data && data.__schema) {
      const targetQuery = data.__schema.queryType.fields.find(field => field.name === 'nodes');
      if (targetQuery) {
        setAvailableParams(targetQuery.args);
      }
    }
  }, [data]);

  if (loading) return <p>Loading schema...</p>;
  if (error) return <p>Error loading schema: {error.message}</p>;

  return (
    <ApolloProvider client={client}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>GraphQL Network Explorer</h1>
        <Filters setFilters={setFilters} availableParams={availableParams} />
        <NetworkGraph filters={filters} />
      </div>
    </ApolloProvider>
  );
};

export default App;
