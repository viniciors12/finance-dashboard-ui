export class Transaction {
  transactionId?: number;
  type?: number;
  category?: string;
  description?: string;
  amount?: number;
  date?: Date;
  constructor(transaction?: Transaction) {
    this.transactionId = transaction?.transactionId;
    this.type = transaction?.type;
    this.category = transaction?.category;
    this.description = transaction?.description;
    this.amount = transaction?.amount;
    this.date = transaction?.date;
  }
}
