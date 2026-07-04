const { Schema, model, models } = require('mongoose');

const transactionSchema = new Schema(
  {
    date: { type: Date, required: true, index: true },
    incomingDonation: { type: Number, default: 0 },
    medicine: { type: Number, default: 0 },
    vetBill: { type: Number, default: 0 },
    neutering: { type: Number, default: 0 },
    aftercare: { type: Number, default: 0 },
    volunteerTransport: { type: Number, default: 0 },
    miscellaneous: { type: Number, default: 0 },
    dailyTotalExpense: { type: Number, default: 0 },
    sheetRowIndex: { type: Number, default: null },
  },
  { timestamps: true }
);

transactionSchema.pre('validate', function calculateDailyTotalExpense() {
  this.dailyTotalExpense =
    (this.medicine || 0) +
    (this.vetBill || 0) +
    (this.neutering || 0) +
    (this.aftercare || 0) +
    (this.volunteerTransport || 0) +
    (this.miscellaneous || 0);
});

module.exports = models.Transaction || model('Transaction', transactionSchema);