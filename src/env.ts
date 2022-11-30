import dotenv from "dotenv";

dotenv.config();

const PORT = +process.env.PORT!;
const BUILD_DIR = process.env.BUILD_DIR!;

export { PORT, BUILD_DIR };
