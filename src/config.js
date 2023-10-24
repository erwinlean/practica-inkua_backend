var mongoose = require('mongoose'); 
require('dotenv').config();
const dbCluster = process.env.DB_CLUSTER;

console.log('DB Cluster:', dbCluster);

mongoose.connect(dbCluster, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Failed to connect to MongoDB Atlas:', err);
});