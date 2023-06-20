import chalk from "chalk";

// @middleware logger
function requestLogger (req, res, next) {
    console.log(chalk.yellow(req.method) + ` : ${req.url}`);
    next();
}

export default requestLogger;