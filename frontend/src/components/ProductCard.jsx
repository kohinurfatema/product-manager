const backendUrl = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace('/api', '')
  : 'http://localhost:5000';

const ProductCard = ({ product, onEdit, onDelete }) => {
  const imageUrl = product.image
    ? product.imageType === 'upload'
      ? `${backendUrl}${product.image}`
      : product.image
    : null;

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s' }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)'; }}
    >
      <div style={{ height: '200px', backgroundColor: '#f3f4f6', overflow: 'hidden' }}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>🛍️</div>
        )}
      </div>

      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1f2937', margin: 0 }}>{product.name}</h3>
        <p style={{ fontSize: '1.4rem', fontWeight: '800', color: '#667eea', margin: 0 }}>${product.price}</p>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0, lineHeight: '1.5', flex: 1 }}>
          {product.description.length > 100 ? product.description.slice(0, 100) + '...' : product.description}
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
          <button
            onClick={() => onEdit(product)}
            style={{ flex: 1, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '0.6rem', borderRadius: '8px', border: 'none', fontSize: '0.875rem', fontWeight: '600', cursor: 'pointer' }}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product._id)}
            style={{ flex: 1, backgroundColor: '#fef2f2', color: '#dc2626', padding: '0.6rem', borderRadius: '8px', border: '2px solid #fecaca', fontSize: '0.875rem', fontWeight: '600', cursor: 'pointer' }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
