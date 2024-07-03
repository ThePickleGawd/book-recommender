interface Book {
  id: number;
  isbn: string;
  name: string;
  author: string;
  personalRating: number;
  publicationYear?: number; // Optional property
}

class MockDatabase {
  private dbName: string;

  constructor(dbName: string) {
    this.dbName = dbName;
    this.init();
  }

  private init(): void {
    if (!localStorage.getItem(this.dbName)) {
      localStorage.setItem(this.dbName, JSON.stringify([]));
    }
  }

  public getAll(): Book[] {
    return JSON.parse(localStorage.getItem(this.dbName) || "[]");
  }

  public getById(id: number): Book | undefined {
    const records = this.getAll();
    return records.find((record) => record.id === id);
  }

  public create(record: Book): void {
    const records = this.getAll();
    records.push(record);
    localStorage.setItem(this.dbName, JSON.stringify(records));
  }

  public update(id: number, updatedRecord: Partial<Book>): void {
    const records = this.getAll();
    const recordIndex = records.findIndex((record) => record.id === id);
    if (recordIndex !== -1) {
      records[recordIndex] = { ...records[recordIndex], ...updatedRecord };
      localStorage.setItem(this.dbName, JSON.stringify(records));
    }
  }

  public delete(id: number): void {
    let records = this.getAll();
    records = records.filter((record) => record.id !== id);
    localStorage.setItem(this.dbName, JSON.stringify(records));
  }
}

// Example usage:
const db = new MockDatabase("myBooks");

// Create a new book record
db.create({
  id: 1,
  isbn: "9780735211292",
  name: "Atomic Habits",
  author: "James Clear",
  personalRating: 8.5,
  publicationYear: 2018,
});

// Get all books
console.log(db.getAll());

// Update a book's author and personal rating
db.update(1, { author: "James Clear Updated", personalRating: 9.0 });

// Delete a book
db.delete(1);
