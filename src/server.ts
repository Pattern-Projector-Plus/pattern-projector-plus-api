import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(cors());

// Define your API routes here

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.post('/calibration-settings', async (req, res) => {
  const { name, x1, y1, x2, y2, x3, y3, x4, y4 } = req.body;
  try {
    if (!name.trim()) {
      throw new Error('Column value cannot be empty');
    }
    const calibrationSettings = await prisma.calibrationSettings.create({
      data: {
        name,
        x1,
        y1,
        x2,
        y2,
        x3,
        y3,
        x4,
        y4,
      },
    });
    res.status(201).json(calibrationSettings);
  } catch (error) {
    console.error('Error creating calibration settings:', error);
    res.status(500).json({ error: 'An error occurred while creating calibration settings.' });
  }
});

app.get('/calibration-settings/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const calibrationSettings = await prisma.calibrationSettings.findUnique({
      where: { id: parseInt(id) },
    });
    if (calibrationSettings) {
      res.json(calibrationSettings);
    } else {
      res.status(404).json({ error: 'Calibration settings not found.' });
    }
  } catch (error) {
    console.error('Error retrieving calibration settings:', error);
    res.status(500).json({ error: 'An error occurred while retrieving calibration settings.' });
  }
});

app.put('/calibration-settings/:id', async (req, res) => {
  const { id } = req.params;
  const { name, x1, y1, x2, y2, x3, y3, x4, y4 } = req.body;
  try {
    if (!name.trim()) {
      throw new Error('Column value cannot be empty');
    }
    const calibrationSettings = await prisma.calibrationSettings.update({
      where: { id: parseInt(id) },
      data: {
        name,
        x1,
        y1,
        x2,
        y2,
        x3,
        y3,
        x4,
        y4,
      },
    });
    res.json(calibrationSettings);
  } catch (error) {
    console.error('Error updating calibration settings:', error);
    res.status(500).json({ error: 'An error occurred while updating calibration settings.' });
  }
});


app.delete('/calibration-settings/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const calibrationSettings = await prisma.calibrationSettings.delete({
      where: { id: parseInt(id) },
    });
    res.json(calibrationSettings);
  } catch (error) {
    console.error('Error deleting calibration settings:', error);
    res.status(500).json({ error: 'An error occurred while deleting calibration settings.' });
  }
});

app.get('/calibration-settings', async (req, res) => {
  try {
    const calibrationSettingsList = await prisma.calibrationSettings.findMany();
    res.json(calibrationSettingsList);
  } catch (error) {
    console.error('Error retrieving calibration settings list:', error);
    res.status(500).json({ error: 'An error occurred while retrieving calibration settings list.' });
  }
});
