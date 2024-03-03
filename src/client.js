import { useDispatch } from "react-redux";
import OpenAI from "openai";

const APIKey = "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";
const openai = new OpenAI;

export const createImages = (prompt) => {
    const dispatch = useDispatch();
    const images = openai.images.generate({ model: "dall-e-3", prompt: prompt });
}
