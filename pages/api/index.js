function handler(req, res) {
  switch (req.method) {
    case "GET": {
      res.json({ message: "GET" });
      break;
    }
    case "POST": {
      res.json({ message: "POST" });
      break;
    }
    case "PUT": {
      res.json({ message: "PUT" });
      break;
    }
    case "DELETE": {
      res.json({ message: "DELETE" });
      break;
    }
    case "PATCH": {
      res.json({ message: "PATCH" });
      break;
    }
    case "PATCH": {
      res.json({ message: "PATCH" });
      break;
    }
  }
}

export default handler;
