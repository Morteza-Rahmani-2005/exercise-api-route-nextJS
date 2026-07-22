import fs from "fs";
import path from "path";
function index(req, res) {
  switch (req.method) {
    case "GET": {
      const dbPath = path.join(process.cwd(), "data", "db.json");
      const data = fs.readFileSync(dbPath);

      const parsedData = JSON.parse(data);

      res.json(parsedData);
      break;
    }



    case "POST": {
      const dbPath = path.join(process.cwd(), "data", "db.json");
      const data = fs.readFileSync(dbPath);

      const parsedData = JSON.parse(data);

      const { name, password, email } = req.body;

      parsedData.dataBase.push({
        id: crypto.randomUUID(),
        name,
        email,
        password,
      });

      const err = fs.writeFileSync(dbPath, JSON.stringify(parsedData));

      if (!err) {
        res.json({
          message: "کاربر با موفقیت ثبت نام شد.",
          data: parsedData.dataBase,
        });
      } else {
        res.status(500).json({
          message: "خطا در ثبت نام کاربر.",
        });
      }
      break;
    }
    case "DELETE": {
      res.json({ message: "DELETE" });
      break;
    }
  }
}

export default index;
