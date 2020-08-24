import request from 'supertest';

import { app } from '../../app';
import { Ticket } from '../../models/ticket'

const createTicket = async () => {
	let title = Math.random().toString(36).substring(2)
	let price = Math.floor(Math.random() * 1000)
	let userId = Math.floor(Math.random() * 100000000).toString()

	const ticket = await Ticket.build({ title, price, userId }).save();
}


it('can fetch a list of tickets', async () => {
	for (let ticketNumber = 0; ticketNumber < 5; ticketNumber++) {
		await createTicket()
	};

	const response = await request(app)
		.get('/api/tickets')
		.send()
		.expect(200);

	expect(response.body.length).toEqual(5)
})
