// Chuyển đến cơ sở dữ liệu admin để xác thực
db = db.getSiblingDB('admin');
db.auth('root', 'giftsmongodb');

// Chuyển đến cơ sở dữ liệu mục tiêu và tạo collection
db = db.getSiblingDB('giftsdb');
db.createCollection('users');
db.users.insertOne({ name: "John Doe", age: 30 });
