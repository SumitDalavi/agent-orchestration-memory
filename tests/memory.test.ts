import request from 'supertest';

jest.mock('ioredis', () => {
    class MockRedis {
        store: Record<string, string[]> = {};
        
        async lpush(key: string, value: string) {
            if (!this.store[key]) this.store[key] = [];
            this.store[key].unshift(value);
        }
        
        async lrange(key: string, start: number, end: number) {
            return this.store[key] || [];
        }
        
        async ltrim(key: string, start: number, end: number) {
            if (this.store[key]) {
                this.store[key] = this.store[key].slice(start, end + 1);
            }
        }
        
        quit() {}
    }
    return jest.fn(() => new MockRedis());
});

import { app, redis } from '../src/index';

describe('Agent Orchestration Memory', () => {
    afterAll(async () => {
        await redis.quit();
    });

    it('should save and retrieve memory', async () => {
        const sessionId = 'session-123';
        
        await request(app).post(`/memory/${sessionId}`).send({
            type: 'human',
            message: 'Hello agent'
        });
        
        await request(app).post(`/memory/${sessionId}`).send({
            type: 'ai',
            message: 'Hello human'
        });

        const res = await request(app).get(`/memory/${sessionId}`);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body.messages.length).toEqual(2);
        expect(res.body.messages[0]).toEqual({ type: 'human', content: 'Hello agent' });
        expect(res.body.messages[1]).toEqual({ type: 'ai', content: 'Hello human' });
    });
});
