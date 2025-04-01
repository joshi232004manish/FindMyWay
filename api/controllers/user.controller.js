import jwt from "jsonwebtoken";

export const test = (req, res, next) => {
  // console.log(req.params.id);
  // res.send(" Hi Hello!!!!!");

  // User logs in
  const fg = 123456;
  const token = jwt.sign({ id: fg }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  console.log(token);
  res.send(token);
};
export const test1 = (req, res, next) => {
  console.log(import.meta.url);

  res.send("Hello!!!!!");
};
