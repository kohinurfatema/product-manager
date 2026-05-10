import { useState, useEffect } from 'react';

const inputStyle = {
  width: '100%',
  border: '2px solid #e5e7eb',
  borderRadius: '10px',
  padding: '0.75rem 1rem',
  fontSize: '1rem',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
};

const labelStyle = {
  display: 'block',
  fontSize: '0.875rem',
  fontWeight: '600',
  color: '#374151',
  marginBottom: '0.4rem',
};

const ProductForm = ({ onSubmit, initialData, onCancel, loading }) => {
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    imageType: 'url',
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        price: initialData.price || '',
        description: initialData.description || '',
        image: initialData.image || '',
        imageType: initialData.imageType || 'url',
      });
      if (initialData.imageType === 'url') setPreview(initialData.image || '');
    }
  }, [initialData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
      setForm({ ...form, imageType: 'upload', image: '' });
    }
  };

  const handleUrlChange = (e) => {
    setForm({ ...form, image: e.target.value, imageType: 'url' });
    setPreview(e.target.value);
    setImageFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', form.name);
    data.append('price', form.price);
    data.append('description', form.description);
    if (imageFile) {
      data.append('image', imageFile);
    } else {
      data.append('image', form.image);
      data.append('imageType', 'url');
    }
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <label style={labelStyle}>Product Name</label>
        <input
          type="text"
          placeholder="Enter product name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = '#667eea')}
          onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Price ($)</label>
        <input
          type="number"
          placeholder="0.00"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = '#667eea')}
          onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
          min="0"
          step="0.01"
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Description</label>
        <textarea
          placeholder="Enter product description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
          onFocus={(e) => (e.target.style.borderColor = '#667eea')}
          onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Image URL</label>
        <input
          type="url"
          placeholder="https://example.com/image.jpg"
          value={form.image}
          onChange={handleUrlChange}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = '#667eea')}
          onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
        />
      </div>

      <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: '0.85rem', margin: '-0.5rem 0' }}>— or upload an image —</div>

      <div>
        <label style={labelStyle}>Upload Image</label>
        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileChange}
          style={{ ...inputStyle, padding: '0.5rem', cursor: 'pointer' }}
        />
      </div>

      {preview && (
        <div style={{ textAlign: 'center' }}>
          <img
            src={preview}
            alt="Preview"
            style={{ maxHeight: '180px', borderRadius: '10px', objectFit: 'cover', border: '2px solid #e5e7eb' }}
            onError={(e) => (e.target.style.display = 'none')}
          />
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
        <button
          type="submit"
          disabled={loading}
          style={{ flex: 1, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '0.85rem', borderRadius: '10px', border: 'none', fontSize: '1rem', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Saving...' : initialData ? 'Update Product' : 'Add Product'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            style={{ flex: 1, backgroundColor: '#f3f4f6', color: '#374151', padding: '0.85rem', borderRadius: '10px', border: '2px solid #e5e7eb', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
