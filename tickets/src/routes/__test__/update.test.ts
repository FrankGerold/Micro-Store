import request from 'supertest';
import mongoose from 'mongoose';

import { app } from '../../app';
import { getAuthCookie } from '../../test/getAuthCookie';
import { Ticket } from '../../models/ticket'

it('returns a 404 if the provided id doesn\'t exist', async () => {
	const id = new mongoose.Types.ObjectId().toHexString();

	await request(app)
		.put(`/api/tickets/${id}`)
		.set('Cookie', getAuthCookie())
		.send({
			title: 'fake new title',
			price: 1234
		})
		.expect(404);
});


it('returns a 401 if the user  isn\'t authenticated', async () => {
	const id = new mongoose.Types.ObjectId().toHexString();

	await request(app)
		.put(`/api/tickets/${id}`)
		.send({
			title: 'Another fake new title',
			price: 2345
		})
		.expect(401);
});


it('returns a 401 if the user doesn\'t own the ticket', async () => {
	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', getAuthCookie())
		.send({
			title: 'new test ticket',
			price: 150
		})
		.expect(201);

	const ticketId = response.body.id;
		

	await request(app)
		.put(`/api/tickets/${ticketId}`)
		.set('Cookie', getAuthCookie())
		.send({
			title: 'Updated title',
			price: 5
		})
		.expect(401);

	const ticketInfo = await Ticket.findById(ticketId);
		
	expect(ticketInfo?.price).toEqual(response.body.price);
	expect(ticketInfo?.title).toEqual(response.body.title);
});



it('returns a 400 if the provides an invalid title', async () => {
	
});


it('returns a 400 if the provides an invalid price', async () => {
	
});


