interface BookItem {
  isbn: string;
}

class MockDatabase {
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

  public getAll(): BookItem[] {
    return JSON.parse(localStorage.getItem(this.dbName) || "[]");
  }

  public getById(isbn: string): BookItem | undefined {
    const records = this.getAll();
    return records.find((record) => record.isbn === isbn);
  }

  public create(record: BookItem): void {
    const records = this.getAll();
    records.push(record);
    localStorage.setItem(this.dbName, JSON.stringify(records));
  }

  public update(isbn: string, updatedRecord: Partial<BookItem>): void {
    const records = this.getAll();
    const recordIndex = records.findIndex((record) => record.isbn === isbn);
    if (recordIndex !== -1) {
      records[recordIndex] = { ...records[recordIndex], ...updatedRecord };
      localStorage.setItem(this.dbName, JSON.stringify(records));
    }
  }

  public delete(isbn: string): void {
    let records = this.getAll();
    records = records.filter((record) => record.isbn !== isbn);
    localStorage.setItem(this.dbName, JSON.stringify(records));
  }
}
