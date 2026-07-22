import path from "path";
import fs from "fs";
function handler(req, res) {
  if (req.method === "GET") {

    const dbPath = path.join(process.cwd(), "data", "db.json");
    const data = fs.readFileSync(dbPath);

    const parsedData = JSON.parse(data);

    const user = parsedData.dataBase.find((user) => user.id == req.query.id);


    if (user) {
      res.status(202).json({ message: "The desired user was found.", data: user })
    } else {
      res.status(404).json({ message: "User not found !!" })
    }
  } else if (req.method === "DELETE") {
    const dbPath = path.join(process.cwd(), "data", "db.json");
    const data = fs.readFileSync(dbPath);

    const parsedData = JSON.parse(data);

    const NewUser = parsedData.dataBase.filter((user) => user.id !== req.query.id);

    const err = fs.writeFileSync(dbPath, JSON.stringify({ ...parsedData, dataBase: NewUser }));

    if (err) {
      return res.json({ message: "delete user error" })
    } else {
      return res.json({ message: "delete user" })
    }

  }
}
export default handler;
