import express from "express";
import { requestErrorHandler } from "../../helpers/request-handler.mjs";

import {
  getCryptids,
  getCryptidById,
} from "../../controllers/cryptidController.mjs";

const router = express.Router();

router.get("/:id", requestErrorHandler(getCryptidById));

//router.get("/", requestErrorHandler(getCryptids));
router.get("/", requestErrorHandler(async (req, res) => {
  
  const cryptids = await getCryptids();
  
  let html = '<h1>Cryptids</h1><ul>';
  cryptids.forEach(cryptid => {
    html += `<li>${cryptid.name}</li>`;
  });
  html += '</ul>';
  res.send(html);
}));

export default router;


// import express from "express";
// import { getCryptids } from "../../controllers/cryptidController.mjs";

// const router = express.Router();

// router.get("/", async (req, res, next) => {
//   try {
//     const cryptids = await getCryptids(); // これはデータの配列を返す想定

//     const html = `
//       <html>
//         <head>
//           <title>Cryptid List</title>
//           <style>
//             body { font-family: sans-serif; padding: 20px; }
//             table { border-collapse: collapse; width: 100%; }
//             th, td { border: 1px solid #ccc; padding: 8px; }
//           </style>
//         </head>
//         <body>
//           <h1>Cryptid 一覧</h1>
//           <table>
//             <thead>
//               <tr>
//                 <th>ID</th><th>Name</th><th>Description</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${cryptids.map(c => `
//                 <tr>
//                   <td>${c.id}</td>
//                   <td>${c.name}</td>
//                   <td>${c.description || ''}</td>
//                 </tr>
//               `).join('')}
//             </tbody>
//           </table>
//         </body>
//       </html>
//     `;

//     res.send(html);
//   } catch (err) {
//     console.log("xxxxx:" + err);
//     next(err);
//   }
// });

// export default router;
