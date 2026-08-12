import * as ort from "onnxruntime-node";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let session = null;

export async function loadModel() {

    if (session) {
        return session;
    }

    const modelPath = path.join(__dirname, "../../models/V1/V1.3/Cap.ai.onnx")

    session = await ort.InferenceSession.create(
        modelPath
    );

    return session;
}