import mongoose from 'mongoose';

interface TicketAttrs {
  title: string;
  price: number;
};

interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
};

interface TicketModel extends mongoose.Model <TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
};

const ticketSchema = new mongoose.Schema({
  title: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required:true,
    min: 0
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  }
});

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model <TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket, TicketDoc };
