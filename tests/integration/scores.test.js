const { TextEncoder, TextDecoder } = require('util');
const mongoose = require('mongoose');
const {Score} = require('../../models/Scores')
const request = require('supertest')

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

let server;

describe('/api/scores', () => {
    beforeEach(() => {
        server = require('../../index')
    })
    afterEach(async () => {
        server.close()
        await Score.remove({})
    })

    describe('GET /', () => {
        it('should return all points with players descending', async () => {
            await Score.collection.insertMany([
                {
                    _player: 'player_id_1',
                    points: 100
                },
                {
                    _player: 'player_id_2',
                    points: 200
                }
            ])

            const res = await request(server).get('/api/scores')

            expect(res.status).toBe(200)
            expect(res.body.length).toBe(2)

            // the result should be ordered basing on points
            expect(res.body[0].points).toEqual(200)
            expect(res.body[1].points).toEqual(100)
        })
    })

    describe('POST /', () => {
        it('should add points if already exists', async () => {
            await Score.collection.insertMany([
                {
                    _player: mongoose.Types.ObjectId('63dbbd04e1087d4231a80899'),
                    points: 100
                },
                {
                    _player: mongoose.Types.ObjectId('63dbbd04e1087d4231a80892'),
                    points: 200
                }
            ])

            const res = await request(server)
                .post('/api/scores')
                .send({
                    userId: mongoose.Types.ObjectId('63dbbd04e1087d4231a80899'),
                    points: 50
                });

            expect(res.status).toBe(200)
            expect(res.body._player).toEqual('63dbbd04e1087d4231a80899')
            expect(res.body.points).toEqual(150)
        })

        it('should create a new position if does not exist', async () => {
            const res = await request(server)
                .post('/api/scores')
                .send({
                    userId: mongoose.Types.ObjectId('63dbbd04e1087d4231a80899'),
                    points: 50
                });

            // create a new position - status 201
            expect(res.status).toBe(201)
            expect(res.body.points).toEqual(50)
        })
    })
})
