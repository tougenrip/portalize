import mongoose from 'mongoose';

export const eventSchema = new mongoose.Schema({
  title: {type: String},
  owner: {type: String},
  img: {type: String},
  website: {type: String},
});

const EventS = mongoose.models.events || mongoose.model('events', eventSchema, 'events');

export default EventS;