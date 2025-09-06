'use strict';
import { consoleBar, timeLog } from "../config/common.js";

const ping = (req, res) => {
  const result = true;
  res.send({result});
  consoleBar();
  timeLog('[GET] /ping Get ping called');
};

export { ping };
