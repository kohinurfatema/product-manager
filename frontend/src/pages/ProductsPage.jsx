import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/productApi';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';
import Spinner from '../components/Spinner';

const ProductsPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await getProducts({ search, minPrice, maxPrice, page, limit: 8 });
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  const handleSubmit = async (formData) => {
    setFormLoading(true);
    try {
      if (editProduct) {
        await updateProduct(editProduct._id, formData);
        toast.success('Product updated successfully!');
      } else {
        await createProduct(formData);
        toast.success('Product added successfully!');
      }
      setShowForm(false);
      setEditProduct(null);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save product');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(id);
      toast.success('Product deleted successfully!');
      fetchProducts();
    } catch {
      toast.error('Failed to delete product');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      {/* Navbar */}
      <nav style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 12px rgba(0,0,0,0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.75rem' }}>🛍️</span>
          <h1 style={{ color: 'white', fontSize: '1.4rem', fontWeight: '800', margin: 0 }}>Product Manager</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem' }}>Hello, {user?.name}</span>
          <button
            onClick={handleLogout}
            style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', padding: '0.5rem 1.25rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Add Product Button */}
        {!showForm && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
            <button
              onClick={() => { setShowForm(true); setEditProduct(null); }}
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '0.75rem 1.75rem', borderRadius: '10px', border: 'none', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(102,126,234,0.4)' }}
            >
              + Add Product
            </button>
          </div>
        )}

        {/* Product Form */}
        {showForm && (
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1f2937', marginBottom: '1.5rem' }}>
              {editProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <ProductForm
              onSubmit={handleSubmit}
              initialData={editProduct}
              onCancel={() => { setShowForm(false); setEditProduct(null); }}
              loading={formLoading}
            />
          </div>
        )}

        {/* Search & Filter */}
        <form onSubmit={handleSearch} style={{ backgroundColor: 'white', borderRadius: '16px', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: 2, minWidth: '180px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.35rem' }}>Search</label>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', border: '2px solid #e5e7eb', borderRadius: '8px', padding: '0.6rem 0.9rem', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ flex: 1, minWidth: '110px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.35rem' }}>Min Price</label>
            <input
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              style={{ width: '100%', border: '2px solid #e5e7eb', borderRadius: '8px', padding: '0.6rem 0.9rem', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ flex: 1, minWidth: '110px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.35rem' }}>Max Price</label>
            <input
              type="number"
              placeholder="9999"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              style={{ width: '100%', border: '2px solid #e5e7eb', borderRadius: '8px', padding: '0.6rem 0.9rem', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <button
            type="submit"
            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '0.65rem 1.5rem', borderRadius: '8px', border: 'none', fontWeight: '700', cursor: 'pointer', fontSize: '0.95rem' }}
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => { setSearch(''); setMinPrice(''); setMaxPrice(''); setPage(1); fetchProducts(); }}
            style={{ backgroundColor: '#f3f4f6', color: '#6b7280', padding: '0.65rem 1.25rem', borderRadius: '8px', border: '2px solid #e5e7eb', fontWeight: '600', cursor: 'pointer', fontSize: '0.95rem' }}
          >
            Clear
          </button>
        </form>

        {/* Products Grid */}
        {loading ? (
          <Spinner />
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📦</div>
            <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>No products found</p>
            <p style={{ fontSize: '0.9rem' }}>Add your first product to get started</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{ padding: '0.6rem 1.25rem', borderRadius: '8px', border: '2px solid #e5e7eb', backgroundColor: page === 1 ? '#f3f4f6' : 'white', color: page === 1 ? '#9ca3af' : '#374151', cursor: page === 1 ? 'not-allowed' : 'pointer', fontWeight: '600' }}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: '2px solid', borderColor: page === p ? '#667eea' : '#e5e7eb', backgroundColor: page === p ? '#667eea' : 'white', color: page === p ? 'white' : '#374151', cursor: 'pointer', fontWeight: '700' }}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={{ padding: '0.6rem 1.25rem', borderRadius: '8px', border: '2px solid #e5e7eb', backgroundColor: page === totalPages ? '#f3f4f6' : 'white', color: page === totalPages ? '#9ca3af' : '#374151', cursor: page === totalPages ? 'not-allowed' : 'pointer', fontWeight: '600' }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
