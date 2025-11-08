export default function ReviewCard({ data }) {
  return (
    <div
      className="card"
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(190, 149, 57, 0.2)",
        transition: "all 0.3s ease",
        background: "linear-gradient(to bottom, #ffffff, #fffbf5)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(190, 149, 57, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(190, 149, 57, 0.2)";
      }}
    >
      {data.imageUrl && (
        <img
          src={`http://localhost:3000${data.imageUrl}`}
          className="card-img-top"
          alt={data.name}
          style={{
            borderBottom: "2px solid #BE9539",
            objectFit: "cover",
            height: "200px",
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "data:image/svg+xml;utf8," +
              encodeURIComponent(
                "<svg xmlns='http://www.w3.org/2000/svg' width='320' height='180'><rect fill='%23fffbf5' width='100%' height='100%'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23BE9539' font-family='Arial' font-size='16'>No Image</text></svg>"
              );
          }}
        />
      )}
      <div className="card-body" style={{ padding: "1.25rem" }}>
        <h6
          className="fw-bold mb-2"
          style={{ color: "#BE9539", fontSize: "1.1rem" }}
        >
          {data.name}
        </h6>
        <p className="mb-0" style={{ color: "#555", lineHeight: "1.6" }}>
          {data.message}
        </p>
      </div>
    </div>
  );
}
