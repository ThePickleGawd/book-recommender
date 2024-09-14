import { BookData } from "@/lib/book.types";

export class MockDatabase {
  private dbName: string;

  constructor(dbName: string = "MockDatabase") {
    this.dbName = dbName;
    this.init();
  }

  private init(): void {
    if (!localStorage.getItem(this.dbName)) {
      localStorage.setItem(this.dbName, JSON.stringify([]));
    }
  }

  public getAll(): BookData[] {
    return JSON.parse(localStorage.getItem(this.dbName) || "[]");
  }

  public findByKey(ol_key: string): BookData | undefined {
    const records = this.getAll();
    return records.find((record) => record.ol_key === ol_key);
  }

  public create(record: BookData): void {
    const records = this.getAll();
    if (
      records.some((existingRecord) => existingRecord.ol_key === record.ol_key)
    ) {
      console.log("Record with this ol_key already exists");
      return;
    }
    records.push(record);
    localStorage.setItem(this.dbName, JSON.stringify(records));
  }

  public update(ol_key: string, updatedRecord: Partial<BookData>): void {
    const records = this.getAll();
    const recordIndex = records.findIndex((record) => record.ol_key === ol_key);
    if (recordIndex !== -1) {
      records[recordIndex] = { ...records[recordIndex], ...updatedRecord };
      localStorage.setItem(this.dbName, JSON.stringify(records));
    } else {
      console.log("Record not found");
    }
  }

  public delete(ol_key: string): void {
    const records = this.getAll();
    const filteredRecords = records.filter(
      (record) => record.ol_key !== ol_key,
    );
    localStorage.setItem(this.dbName, JSON.stringify(filteredRecords));
  }

  public empty(): boolean {
    return this.getAll().length === 0;
  }
}
