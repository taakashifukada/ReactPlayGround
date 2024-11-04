import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authApi.login({ username, password });
      // トークンをローカルストレージに保存
      localStorage.setItem('token', response.token);
      // ユーザー情報を保存
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/dashboard');
    } catch (err) {
      setError('ログインに失敗しました。認証情報を確認してください。');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">ログイン</h2>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">ユーザー名</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;