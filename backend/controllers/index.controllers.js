import Replicate from "replicate";
import { REPLICATE_API_TOKEN } from '../config.js'

export const enviarMensaje = async (req, res) => {
    try {
        const { prompt } = req.body
        if (!prompt) {
            return res.status(400).json({ message: 'The variable prop does not exist' })
        }


        const replicate = new Replicate({
            auth: REPLICATE_API_TOKEN,
        });

        const input = {
            top_k: 0,
            top_p: 0.9,
            prompt: prompt,
            max_tokens: 128,
            min_tokens: 0,
            temperature: 0.6,
            system_prompt: "You are a helpful assistant",
            length_penalty: 1,
            stop_sequences: "<|end_of_text|>,<|eot_id|>",
            prompt_template: "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nYou are a helpful assistant<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
            presence_penalty: 1.15,
            log_performance_metrics: false
        };

        for await (const event of replicate.stream("meta/meta-llama-3-70b-instruct", { input })) {
            //process.stdout.write(event.toString());
            res.write(event.toString())
            console.log(event.toString())
        };
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' });
    }
}