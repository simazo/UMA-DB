import { Cryptid } from "../models/cryptid.mjs";
import { generateOgpHtml } from "../templates/generateOgpHtml.mjs";

export const getCryptidOgp = async (req, res, next) => {
  try {
    const cryptid = await Cryptid.findById(req.params.id);
    if (!cryptid) {
      return res.status(404).send("Cryptid Not Found");
    }

    const html = generateOgpHtml(cryptid);
    res.set("Content-Type", "text/html");
    res.send(html);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
