const express = require('express'); 
const mongoose = require('mongoose'); 
const app = express();             
app.use(express.json());
const Student = require('./models/Student');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const cors = require('cors'); 


app.use(cors()); // 2. Kích hoạt cors trước các router
app.use(express.json());
// Kết nối Express Backend với MongoDB Atlas qua Mongoose
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Kết nối MongoDB Atlas thành công!');
  })
  .catch((err) => {
    console.error('Lỗi kết nối MongoDB:', err.message);
  });

// API Hello
app.get('/api/hello', (req, res) => {
  res.json({
    status: "success",
    message: "System is steady running"
  });
});

//API GET
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API POST
app.post('/api/students', async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//API PUT
// Cập nhật thông tin sinh viên theo ID
app.put('/api/students/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Trả về document mới sau khi đã cập nhật
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//API DELETE
// Xóa sinh viên theo ID
app.delete('/api/students/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
    }

    res.status(200).json({ message: 'Xóa sinh viên thành công' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}); 

app.listen(5000, () => {
  console.log('Server online tại port 5000');
});
