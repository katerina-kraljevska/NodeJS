import Trainer from "../models/models.js";
import { v4 as uuidv4 } from "uuid";

export default class TrainerService {
  static async getAllTrainers() {
    return await Trainer.getAll();
  }

  static async getTrainerById(id) {
    const trainer = await Trainer.getById(id);
    if (!trainer) throw new Error("Trainer not found");
    return trainer;
  }

  static async addTrainer(body) {
    const trainer = {
      ...body,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    return await Trainer.create(trainer);
  }

  static async updateTrainer(id, body) {
    return await Trainer.update(id, {
      ...body,
      updatedAt: new Date().toISOString(),
    });
  }

  static async deleteTrainer(id) {
    await Trainer.delete(id);
  }
  static async deleteAllTrainers() {
    await Trainer.deleteAllTrainers();
  }
}
