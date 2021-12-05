function server(server) {
  
  const header = {
    headers: {
      "Server": server,
    }
  }
  return header
}

export default server; 