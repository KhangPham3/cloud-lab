const mongoose = require('mongoose');
// Model Student & API Student
const studentSchema = new mongoose.Schema({
  mssv: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true }
});

// Bước 2: Tạo và Xuất Model
// Tham số thứ nhất 'User' là tên Model. 
// Mongoose sẽ tự động chuyển thành bộ sưu tập 'users' (số nhiều, chữ thường) trong MongoDB.
const Student = mongoose.model('Student',studentSchema);

module.exports = Student;