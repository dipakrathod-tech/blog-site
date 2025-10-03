interface OGImageProps {
  title: string;
  description?: string;
  logoSrc?: string;
  category?: string;
}

export function OGImage({
  title,
  description,
  logoSrc,
  category,
}: OGImageProps) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        backgroundColor: "#0f172a", // slate-900
        padding: "80px",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* Top section with category badge */}
      {category && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#4f46e5", // indigo-600
            color: "white",
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: "24px",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {category}
        </div>
      )}

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          flex: 1,
          justifyContent: "center",
          width: "100%",
        }}
      >
        {/* Icon and title */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
          }}
        >
          {logoSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoSrc}
              alt="Logo"
              width="120"
              height="120"
              style={{
                filter: "invert(1)",
              }}
            />
          )}
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "800",
              color: "white",
              lineHeight: "1.1",
              margin: 0,
              maxWidth: logoSrc ? "800px" : "100%",
            }}
          >
            {title}
          </h1>
        </div>

        {/* Description */}
        {description && (
          <p
            style={{
              fontSize: "32px",
              color: "#94a3b8", // slate-400
              lineHeight: "1.5",
              margin: 0,
              maxWidth: "900px",
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Footer with branding */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          borderTop: "2px solid #334155", // slate-700
          paddingTop: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "white",
            }}
          >
            Dipak Rathod
          </span>
          <span
            style={{
              fontSize: "20px",
              color: "#64748b", // slate-500
            }}
          >
            Cloud & DevOps Engineer
          </span>
        </div>
        <div
          style={{
            fontSize: "24px",
            color: "#64748b", // slate-500
          }}
        >
          docs.dipakrathod.me
        </div>
      </div>
    </div>
  );
}
