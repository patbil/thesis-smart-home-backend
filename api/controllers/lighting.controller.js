const { Code } = require("../const/response.code");
const { Messages } = require("../const/response.message");
const { changeStateLighting } = require("../devices/lighting");
const {
  getInfo: svcGetInfo,
  update: svcUpdate,
} = require("../services/lighting.services");

async function getInfo(req, res) {
  const result = await svcGetInfo();
  if (result.length) {
    return res.status(Code.Success).json(result);
  }
  return res.status(Code.NotFound).json({ message: Messages.ResourceNotFound });
}

async function turn(req, res) {
  const data = req.body;
  changeStateLighting(data);
  const result = await svcUpdate(data.name, data.state);
  if (result.affectedRows) {
    return res
      .status(Code.Success)
      .json({ message: Messages.LightingModified });
  }
  return res.status(Code.ServerError).json({ message: Messages.ServerError });
}

async function turnAllOutside(req, res) {
  const state = Number(req.body.enabled);
  const result = await svcGetInfo();

  for (const el of result.filter((el) => el.location === "out")) {
    changeStateLighting({ name: el.name, state });
    await update(el.name, state);
  }

  return res
    .status(Code.Success)
    .json({ message: Messages.SuccessTurnLighting });
}

async function turnAllInside(req, res) {
  const state = Number(req.body.enabled);
  const result = await svcGetInfo();

  for (const el of result.filter((el) => el.location === "in")) {
    changeStateLighting({ name: el.name, state });
    await update(el.name, state);
  }

  return res
    .status(Code.Success)
    .json({ message: Messages.SuccessTurnLighting });
}

exports.controller = {
  getInfo,
  turn,
  turnAllOutside,
  turnAllInside,
};
