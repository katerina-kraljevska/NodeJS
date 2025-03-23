import DataService from "../services/data.services.js";
import path from "path";
import { fileURLToPath } from "url";

const currentFileUrl = import.meta.url;
const currentFilePath = fileURLToPath(currentFileUrl);
const filePathDirectory = path.dirname(currentFilePath);
const trainersPath = path.join(
  filePathDirectory,
  "..",
  "data",
  "trainers.json"
);

export default class Trainer {
  static async getAll() {
    return await DataService.readData(trainersPath);
  }

  static async getById(id) {
    const trainers = await DataService.readData(trainersPath);
    return trainers.find((trainer) => trainer.id === id);
  }

  static async create(body) {
    const trainers = await this.getAll();
    trainers.push(body);
    await DataService.writeData(trainersPath, trainers);
    return body;
  }

  static async update(id, body) {
    const trainers = await this.getAll();
    const index = trainers.findIndex((trainer) => trainer.id === id);
    if (index < 0) throw new Error("Trainer not found");

    trainers[index] = { ...trainers[index], ...body };
    await DataService.writeData(trainersPath, trainers);
    return trainers[index];
  }

  static async delete(id) {
    const trainers = await this.getAll();
    const updatedTrainers = trainers.filter((trainer) => trainer.id !== id);
    if (trainers.length === updatedTrainers.length)
      throw new Error("Trainer not found");

    await DataService.writeData(trainersPath, updatedTrainers);
  }

  static async deleteAllTrainers() {
    try {
      const trainers = await this.getAll();

      await DataService.writeData(trainersPath, []);
    } catch (error) {
      throw new Error("Error deleting trainers");
    }
  }
}
