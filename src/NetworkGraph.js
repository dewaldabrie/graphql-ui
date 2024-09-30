import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { ForceGraph2D } from 'react-force-graph';

const GET_GRAPH_DATA = gql`
  query GetGraphData($param1: String, $param2: String) {
    nodes(param1: $param1, param2: $param2) {
      id
      label
      links {
        source
        target
      }
    }
  }
`;

const NetworkGraph = ({ filters }) => {
  const { loading, error, data } = useQuery(GET_GRAPH_DATA, {
    variables: filters,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const graphData = {
    nodes: data.nodes.map(node => ({ id: node.id, name: node.label })),
    links: data.nodes.flatMap(node => node.links),
  };

  return (
    <ForceGraph2D
      graphData={graphData}
      nodeLabel="name"
      linkDirectionalParticles={2}
      linkDirectionalParticleSpeed={d => 0.005}
      width={800}
      height={600}
    />
  );
};

export default NetworkGraph;
