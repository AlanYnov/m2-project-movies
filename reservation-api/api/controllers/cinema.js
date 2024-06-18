const Cinema = require("../models/cinema");

exports.getCinemas = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;

  if (limit < 0 || limit > 50) {
    return res.status(422).json({ error: "Limit should be between 0 and 50" });
  }

  try {
    // Get number of cinemas
    const totalCinemas = await Cinema.countCinemas();
    if(totalCinemas === 0) {
      return res.status(404).json({ error: "Cinemas not found" });
    }
    const totalPages = Math.ceil(totalCinemas / limit);

    if (page < 1 || page > totalPages) {
      return res.status(404).json({ error: "Page not found" });
    }

    const offset = (page - 1) * limit;

    const cinemas = await Cinema.getCinemas(limit, offset);
    if (cinemas) {
      res.status(200).json({
        message: "Cinemas fetched successfully",
        meta: {
          total: totalCinemas,
          limit,
          page,
          totalPages,
        },
        cinemas,
      });
    } else {
      res.status(404).json({ error: "Cinemas not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching cinemas" });
  }
};

exports.getCinema = async (req, res) => {
  try {
    const cinema = await Cinema.getCinema(req.params.uid);
    if (cinema) {
      res.status(200).json({
        message: "Cinema fetched successfully",
        cinema,
      });
    } else {
      res.status(404).json({ error: "Cinema not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching cinema" });
  }
};

exports.createCinema = async (req, res) => {
  try {
    const data = req.body;

    if (!data || typeof data.name !== "string" || data.name.length > 128) {
      return res.status(422).json({
        error: "Invalid parameters",
      });
    }

    const cinema = await Cinema.createCinema(data);
    if (cinema) {
      res.status(201).json({
        message: "Cinema created successfully",
        cinema,
      });
    } else {
      res.status(400).json({ error: "Error creating cinema" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating cinema" });
  }
};

exports.updateCinema = async (req, res) => {
  try {
    const data = req.body;
    const { uid } = req.params;

    if (!data || typeof data.name !== "string" || data.name.length > 128) {
      return res.status(422).json({
        error: "Invalid parameters",
      });
    }

    const cinema = await Cinema.getCinema(uid);
    if (!uid || !cinema) {
      return res.status(404).json({ error: "Cinema not found" });
    }

    const updatedCinema = await Cinema.updateCinema(data, uid);

    return res.status(200).json({
      message: "Cinema updated successfully",
      updatedCinema,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating cinema" });
  }
};

exports.deleteCinema = async (req, res) => {
  try {
    const { uid } = req.params;
    const cinema = await Cinema.getCinema(uid);
    if (!uid || !cinema) {
      return res.status(404).json({ error: "Cinema not found" });
    }

    await Cinema.deleteCinema(uid);

    return res.status(200).json({
      message: "Cinema deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting cinema" });
  }
};
