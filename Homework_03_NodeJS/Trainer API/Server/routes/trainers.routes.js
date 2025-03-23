import { Router } from "express";
import TrainersController from "../conroller/trainers.controller.js";

const trainersRouter = Router();

trainersRouter.get("/trainers", (req, res) =>
  TrainersController.getAllTrainers(req, res)
);
trainersRouter.get("/trainers/:id", (req, res) =>
  TrainersController.getTrainerById(req, res)
);
trainersRouter.post("/trainers", (req, res) =>
  TrainersController.addTrainer(req, res)
);
trainersRouter.patch("/trainers/:id", (req, res) =>
  TrainersController.updateTrainer(req, res)
);
trainersRouter.delete("/trainers/:id", (req, res) =>
  TrainersController.deleteTrainer(req, res)
);

trainersRouter.delete("/trainers", (req, res) =>
  TrainersController.deleteAllTrainers(req, res)
);
export default trainersRouter;
