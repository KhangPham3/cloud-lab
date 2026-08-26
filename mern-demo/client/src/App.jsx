import { useState, useEffect } from 'react';
import heroImg from './assets/hero.png';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import './App.css';

// Endpoint kết nối tới Server Backend
const API_URL = 'https://ubiquitous-trout-5g4647594j9xf77g5-5000.app.github.dev/api/students';

function App() {
  const [count, setCount] = useState(0);
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    mssv: '',
    name: '',
    email: ''
  });

  // 1. Hàm lấy danh sách sinh viên từ backend
  const fetchStudents = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (Array.isArray(data)) {
        setStudents(data);
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách sinh viên:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 2. Hàm cập nhật dữ liệu ô nhập
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 3. Hàm gửi form thêm sinh viên
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const url = editId ? `${API_URL}/${editId}` : API_URL;
    const method = editId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert(editId ? 'Cập nhật thành công!' : 'Thêm thành công!');
      setFormData({ mssv: '', name: '', email: '' });
      setEditId(null);
      fetchStudents(); // Gọi lại GET để làm mới danh sách
    }
  } catch (error) {
    console.error('Lỗi khi lưu dữ liệu:', error);
  }
};

  const handleEdit = (student) => {
    setEditId(student._id);
    setFormData({
      mssv: student.mssv,
      name: student.name,
      email: student.email
    });
  };

  const handleDelete = async (id) => {
  if (window.confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        alert('Đã xóa sinh viên thành công!');
        fetchStudents(); // Tải lại danh sách sau khi xóa
      }
    } catch (error) {
      console.error('Lỗi khi xóa sinh viên:', error);
    }
  }
};

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>

        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>

      {/* Khu vực Quản lý Sinh viên */}
      <section style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
        <h2>Quản lý Sinh viên</h2>
        
        {/* Form nhập sinh viên */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
          <input 
            type="text" 
            name="mssv" 
            placeholder="MSSV" 
            value={formData.mssv} 
            onChange={handleChange} 
            required 
            style={{ padding: '8px' }}
          />
          <input 
            type="text" 
            name="name" 
            placeholder="Họ tên" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            style={{ padding: '8px' }}
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            style={{ padding: '8px' }}
          />
          <button type="submit" style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
            Thêm sinh viên
          </button>
        </form>

        {/* Danh sách sinh viên */}
        <h3>Danh sách sinh viên hiện tại</h3>
        {students.length === 0 ? (
          <p>Chưa có sinh viên nào hoặc đang tải...</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {students.map((student) => (
              <li key={student._id || student.mssv} style={{ padding: '8px', borderBottom: '1px solid #444' }}>
                <strong>{student.mssv}</strong> - {student.name} ({student.email})
                 <button onClick={() => handleEdit(student)}>Sửa</button>
                  <button onClick={() => handleDelete(student._id)} style={{ color: 'red' }}>Xóa</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default App;