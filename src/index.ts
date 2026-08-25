import express, { Request, Response } from 'express';
import Redis from 'ioredis';
import { BufferMemory } from "langchain/memory";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Helper to serialize/deserialize memory
const getMemoryForSession = async (sessionId: string) => {
    const memory = new BufferMemory({ returnMessages: true });
    const history = await redis.lrange(`memory:${sessionId}`, 0, -1);
    
    for (const msgStr of history.reverse()) {
        const msg = JSON.parse(msgStr);
        if (msg.type === 'human') {
            await memory.chatHistory.addUserMessage(msg.content);
        } else if (msg.type === 'ai') {
            await memory.chatHistory.addAIChatMessage(msg.content);
        }
    }
    return memory;
};

app.post('/memory/:sessionId', async (req: Request, res: Response) => {
    const { sessionId } = req.params;
    const { message, type } = req.body;

    if (!['human', 'ai'].includes(type)) {
        return res.status(400).json({ error: 'Invalid type' });
    }

    // Prepend to list (latest first)
    await redis.lpush(`memory:${sessionId}`, JSON.stringify({ type, content: message }));
    
    // Keep only last 100 messages for short-term memory
    await redis.ltrim(`memory:${sessionId}`, 0, 99);

    res.json({ success: true });
});

app.get('/memory/:sessionId', async (req: Request, res: Response) => {
    const { sessionId } = req.params;
    const memory = await getMemoryForSession(sessionId);
    const messages = await memory.chatHistory.getMessages();
    
    res.json({
        messages: messages.map(m => ({
            type: m instanceof HumanMessage ? 'human' : 'ai',
            content: m.content
        }))
    });
});

if (require.main === module) {
    app.listen(3000, () => console.log('Memory Service on port 3000'));
}

export { app, redis };
