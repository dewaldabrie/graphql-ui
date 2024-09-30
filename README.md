# GraphQL Network Explorer

This is a simple React-based web application that visualizes GraphQL data as a network graph and allows users to filter the data using query parameters derived from the GraphQL schema.

## Features

- Dynamically infers filter options from the GraphQL schema via introspection
- Renders a force-directed graph using the `react-force-graph` library
- Easy to set up and Dockerized for fast deployment

## Setup

### Prerequisites

- Docker

### Running Locally

1. Clone the repository:

```bash
git clone https://github.com/your-repo/graphql-network-explorer.git
cd graphql-network-explorer
