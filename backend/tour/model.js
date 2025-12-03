import mongoose from "mongoose";

const { Schema } = mongoose;

const tourSchema = new Schema(
 {
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  duration: { type: Number, required: true, min: 1 }, // 일 단위
  price: { type: Number, required: true, min: 0 },
  maxGroupSize: { type: Number, required: true, min: 1 },
  difficulty: {
   type: String,
   enum: ["easy", "moderate", "difficult"],
   default: "moderate",
  },
  images: [{ type: String, trim: true }],
  includedServices: [{ type: String, trim: true }],
  excludedServices: [{ type: String, trim: true }],
  itinerary: [
   {
    day: { type: Number, required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    activities: [{ type: String, trim: true }],
   },
  ],
  startDates: [{ type: Date }],
  ratingAverage: { type: Number, default: 0, min: 0, max: 5 },
  ratingCount: { type: Number, default: 0 },
  category: {
   type: String,
   enum: [
    "adventure",
    "cultural",
    "nature",
    "food",
    "relaxation",
    "historical",
   ],
   required: true,
  },
  guide: { type: Schema.Types.ObjectId, ref: "User" },
  status: {
   type: String,
   enum: ["active", "inactive", "soldout"],
   default: "active",
  },
  tags: [{ type: String, trim: true }],
 },
 {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
 }
);

tourSchema.index({ city: 1, category: 1, status: 1 });
tourSchema.index({ price: 1 });

tourSchema.set("toJSON", {
 virtuals: true,
 transform: (_doc, ret) => {
  ret.id = ret._id;
  ret.tourId = ret._id;
  delete ret._id;
  delete ret.__v;
 },
});

export const Tour = mongoose.model("Tour", tourSchema);
export default Tour;
