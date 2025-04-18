const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const getObservationData = () => {
  const raw = fs.readFileSync('./data.json');
  return JSON.parse(raw);
};

app.get('/api/observation', (req, res) => {
  const data = getObservationData();
  res.json(data);
});

app.put('/api/observation/save', (req, res) => {
  const { SamplingTime, Properties } = req.body;

  if (!SamplingTime || !Array.isArray(Properties)) {
    return res.status(400).json({ error: 'Missing or invalid SamplingTime or Properties' });
  }

  const observationData = getObservationData();
  const index = observationData.Datas.findIndex(item => item.SamplingTime === SamplingTime);

  if (index === -1) {
    return res.status(404).json({ error: 'Observation with given SamplingTime not found' });
  }

  observationData.Datas[index].Properties = Properties;

  try {
    fs.writeFileSync('./data.json', JSON.stringify(observationData, null, 2));
    res.status(200).json({ message: 'Observation updated successfully', updated: observationData.Datas[index] });
  } catch (err) {
    console.error('Error writing data:', err);
    res.status(500).json({ error: 'Failed to update observation data' });
  }
});
 
// display projects 
app.get('/api/projects', (req, res) => {
  try {
    const rawData = fs.readFileSync('./data.json');
    const parsed = JSON.parse(rawData);

    const transformed = parsed.Datas.map(item => {
      const obj = {
        samplingTime: item.SamplingTime,
        projectName: null,
        constructionCount: null,
        isCompleted: null,
        roadLength: null
      };

      item.Properties.forEach(prop => {
        const label = prop.Label.toLowerCase();
        if (label.includes('project name')) obj.projectName = prop.Value;
        else if (label.includes('construction count')) obj.constructionCount = prop.Value;
        else if (label.includes('completed')) obj.isCompleted = prop.Value;
        else if (label.includes('length')) obj.roadLength = prop.Value;
      });

      return obj;
    });

    res.json(transformed);
  } catch (err) {
    console.error('Error reading data:', err);
    res.status(500).json({ error: 'Failed to read data' });
  }
});

app.get('/api/observation/search', (req, res) => {
  const { date } = req.query;
  if (!date) return res.status(400).json({ error: "Missing 'date' query param" });

  const data = getObservationData();
  const result = data.Datas.find(item => item.SamplingTime === date);
  result ? res.json(result) : res.status(404).json({ message: "Not found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
