import dotenv from 'dotenv';
import app from './app.js';
import chalk from 'chalk';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
 console.log(chalk.green(`🚀 Server running at http://localhost:${PORT}`));
});
