import request from 'supertest';
import mongoose from 'mongoose';

import { app } from '../../app';
import { getAuthCookie } from '../../test/getAuthCookie';
import { Ticket } from '../../models/ticket'
import { validateRequest } from '@microstore/common';

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
	const cookie = getAuthCookie();

	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', cookie)
		.send({
			title: 'New Test Ticket',
			price: 420
		})
		.expect(201);

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send({
			title: '',
			price: 420
		})
		.expect(400)
});


it('returns a 400 if the provides an invalid price', async () => {
	const cookie = getAuthCookie();

	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', cookie)
		.send({
			title: 'New Test Ticket',
			price: 420
		})
		.expect(201);

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send({
			title: 'New Test Ticket',
			price: -1
		})
		.expect(400);
});


it('updates the ticket when given valid inputs', async () => {
	const cookie = getAuthCookie();

	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', cookie)
		.send({
			title: 'New Test Ticket',
			price: 420
		})
		.expect(201);

	const ticketId = response.body.id;

	const updatedTicket = {
		title: 'Updated ticket!',
		price: 4321
	}
	
	await request(app)
		.put(`/api/tickets/${ticketId}`)
		.set('Cookie', cookie)
		.send(updatedTicket)
		.expect(200);

	const ticketInfo = await Ticket.findById(ticketId);

	expect(ticketInfo?.title).toEqual(updatedTicket.title);
	expect(ticketInfo?.price).toEqual(updatedTicket.price);

});


