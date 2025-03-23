import TrainerService from "../services/trainers.services.js";

export default class TrainersController {
  static async getAllTrainers(req, res) {
    try {
      let trainers = await TrainerService.getAllTrainers();

      if (req.query.currentlyActive === "true") {
        trainers = trainers.filter((trainer) => trainer.isCurrentlyTeaching);
      }

      if (req.query.sortBy === "coursesAsc") {
        trainers.sort((a, b) => a.completedCourses - b.completedCourses);
      } else if (req.query.sortBy === "coursesDesc") {
        trainers.sort((a, b) => b.completedCourses - a.completedCourses);
      }

      res.send(trainers);
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  }

  static async getTrainerById(req, res) {
    try {
      const trainer = await TrainerService.getTrainerById(req.params.id);
      if (!trainer)
        return res.status(404).send({ message: "Trainer not found" });

      res.send(trainer);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async addTrainer(req, res) {
    try {
      const trainer = await TrainerService.addTrainer(req.body);
      res.status(201).send(trainer);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async updateTrainer(req, res) {
    try {
      const trainer = await TrainerService.updateTrainer(
        req.params.id,
        req.body
      );
      res.send(trainer);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async deleteTrainer(req, res) {
    try {
      await TrainerService.deleteTrainer(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async deleteAllTrainers(req, res) {
    try {
      const result = await TrainerService.deleteAllTrainers();
      res.send({
        message: "All trainers are deleted",
      });
    } catch (error) {
      res.status(500).send({ message: "Server Error" });
    }
  }
}
