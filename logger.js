import pino from "pino";
import path from "path";

const __dirname = import.meta.dirname;


const transport = pino.transport({
    targets: [
        {
            target: "pino/file",
            options: {destination: path.join(__dirname, "logs", "main.ndjson")},
        },
    ],
});

const logger = pino(
    {
        timestamp: pino.stdTimeFunctions.isoTime,
    },
    transport
);

export default logger;